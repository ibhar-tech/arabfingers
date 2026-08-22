"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Brush, Eraser, PaintBucket, RotateCcw, Sticker, Volume2 } from "lucide-react";
import { arabicLetters } from "@/lib/arabicMap";
import { playLetterSound, primeLetterSounds } from "@/lib/letterSounds";
import { useAppStore } from "@/store/useAppStore";

/**
 * Trace-and-colour sheet. One letter at a time on a paper-coloured stage, with a
 * brush, a one-tap fill, stickers and an eraser.
 *
 * The letters come from lib/arabicMap — the same table the game and the printable
 * worksheets use — so a letter cannot be right in one place and wrong here.
 */

const COLORS = [
  "#e23d3d", // red
  "#f97316", // orange
  "#ffb22e", // saffron
  "#3aa655", // green
  "#10a39a", // qalam teal
  "#3b82f6", // blue
  "#8b3df5", // violet
  "#ff5da2", // bubblegum
  "#2a1d4e", // ink
];

const STICKERS = ["⭐", "❤️", "🌸", "🦋", "🎈", "🐠"];

type Tool = "brush" | "fill" | "sticker" | "eraser";

const DONE_KEY = "arab_fingers_colored_letters";
/** Portion of the glyph that must be covered before the star is awarded. */
const DONE_AT = 0.7;

export default function ColoringClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAr = locale === "ar";

  const stageRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLCanvasElement>(null);
  const outlineRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(26);
  const [tool, setTool] = useState<Tool>("brush");
  const [sticker, setSticker] = useState(STICKERS[0]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [collected, setCollected] = useState<string[]>([]);

  /* Pointer state lives in a ref, not state. It used to be state, and because
     startDrawing set it and called draw() in the same tick, the closure still saw
     `false` — so a single tap never left a mark. */
  const drawing = useRef(false);
  /** Byte offsets of the alpha channel for pixels inside the glyph, sampled once per letter. */
  const maskOffsets = useRef<Int32Array>(new Int32Array(0));

  const letter = arabicLetters[index];

  // The parent-panel Sound toggle must reach the games too, not just /play.
  // Imperative read: no re-render, and callbacks always see the current value.
  const soundEnabled = () => useAppStore.getState().soundEnabled;

  useEffect(() => {
    primeLetterSounds();
    try {
      const saved = localStorage.getItem(DONE_KEY);
      // Array.isArray: valid-but-wrong-shape JSON ("5", {}) would otherwise make
      // the includes()/length reads below misreport the star count.
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setCollected(parsed.filter((v): v is string => typeof v === "string"));
      }
    } catch {
      // A blocked or corrupt localStorage just means no stars; not worth surfacing.
    }
  }, []);

  // ---------------------------------------------------------------- geometry

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    /* Measure the stage, not the window: the stage is one nav-bar shorter than the
       viewport, and sizing to innerHeight pushed the letter off centre. */
    const measure = () => setSize({ width: stage.clientWidth, height: stage.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  /* The letter is centred in the band left over between the title chip and the
     control stack, not in the stage — centring it in the stage put it behind the
     controls and wasted the top third of the sheet. */
  const glyph = useMemo(() => {
    const { width, height } = size;
    const top = 64;
    // Phones carry an extra row for the brush-size slider.
    const bottom = height - (width < 640 ? 200 : 150);
    const band = Math.max(120, bottom - top);
    return {
      font: Math.min(width * 0.52, band * 0.96),
      cx: width / 2,
      bandCenter: (top + bottom) / 2,
    };
  }, [size]);

  /* Where the glyph is actually drawn. The em box is not the ink box — alef fills
     the top of its box and sits visibly high, while ain sits low — so the baseline
     anchor is nudged by the measured ink bounds. Outline, fill and scoring all read
     this so they cannot drift apart. */
  const anchor = useRef({ x: 0, y: 0, font: 0 });

  /** Same font string everywhere, so outline, fill and scoring agree on the shape. */
  const fontFor = useCallback((px: number) => {
    const family =
      typeof window === "undefined"
        ? ""
        : getComputedStyle(document.body).getPropertyValue("--font-noto-naskh").trim();
    return `800 ${px}px ${family || '"Noto Naskh Arabic"'}, serif`;
  }, []);

  /** Sets the backing store to device pixels so strokes are not soft on a phone. */
  const fitCanvas = useCallback((canvas: HTMLCanvasElement | null, width: number, height: number) => {
    if (!canvas || width === 0) return null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }, []);

  // ------------------------------------------------------------------ layers

  const clearPaint = useCallback(() => {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    setProgress(0);
  }, []);

  // Redraw the outline and rebuild the scoring mask whenever the letter or size changes.
  useEffect(() => {
    if (size.width === 0) return;

    const ctx = fitCanvas(outlineRef.current, size.width, size.height);
    fitCanvas(paintRef.current, size.width, size.height);
    if (!ctx) return;

    let cancelled = false;

    const render = () => {
      if (cancelled) return;
      ctx.clearRect(0, 0, size.width, size.height);
      ctx.font = fontFor(glyph.font);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const m = ctx.measureText(letter.ar);
      const ascent = m.actualBoundingBoxAscent || glyph.font * 0.5;
      const descent = m.actualBoundingBoxDescent || glyph.font * 0.2;
      anchor.current = {
        x: glyph.cx,
        y: glyph.bandCenter + (ascent - descent) / 2,
        font: glyph.font,
      };
      const { x, y } = anchor.current;

      // Faint tint inside the glyph so a child can see where to aim before colouring.
      ctx.fillStyle = "rgba(42, 29, 78, 0.05)";
      ctx.fillText(letter.ar, x, y);

      ctx.lineWidth = Math.max(5, glyph.font * 0.022);
      ctx.strokeStyle = "rgba(42, 29, 78, 0.55)";
      ctx.setLineDash([glyph.font * 0.05, glyph.font * 0.045]);
      ctx.lineJoin = "round";
      ctx.strokeText(letter.ar, x, y);
      ctx.setLineDash([]);

      buildMask();
    };

    /* Score against a fixed sample of points inside the glyph, taken once. Reading
       the whole mask on every stroke end was scanning a few million bytes per lift
       on a retina tablet. */
    const buildMask = () => {
      const off = document.createElement("canvas");
      off.width = size.width;
      off.height = size.height;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      octx.font = fontFor(glyph.font);
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#000";
      octx.fillText(letter.ar, anchor.current.x, anchor.current.y);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const inside: number[] = [];
      // Sample on a coarse lattice; ~10k points is plenty to judge coverage.
      const step = Math.max(2, Math.round(Math.sqrt((off.width * off.height) / 10000)));
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            // Translate to the paint canvas, which is backed at device resolution.
            const px = Math.round(x * dpr);
            const py = Math.round(y * dpr);
            inside.push((py * Math.round(size.width * dpr) + px) * 4 + 3);
          }
        }
      }
      maskOffsets.current = Int32Array.from(inside);
    };

    // Canvas cannot resolve a CSS variable font until the webfont has actually loaded.
    if (document.fonts?.status === "loaded") render();
    else document.fonts?.ready.then(render).catch(render);

    return () => {
      cancelled = true;
    };
  }, [letter.ar, size, glyph, fitCanvas, fontFor]);

  useEffect(() => {
    clearPaint();
    setDone(false);
  }, [index, size, clearPaint]);

  // ----------------------------------------------------------------- scoring

  const score = useCallback(() => {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    const offsets = maskOffsets.current;
    if (!canvas || !ctx || offsets.length === 0) return;

    let painted = 0;
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 0; i < offsets.length; i++) {
        if (data[offsets[i]] > 12) painted++;
      }
    } catch {
      return;
    }

    const ratio = painted / offsets.length;
    setProgress(ratio);
    if (ratio < DONE_AT || done) return;

    setDone(true);
    confetti({ particleCount: 160, spread: 75, origin: { y: 0.6 }, colors: COLORS });
    if (soundEnabled()) playLetterSound(letter.soundId);
    setCollected((previous) => {
      if (previous.includes(letter.ar)) return previous;
      const next = [...previous, letter.ar];
      try {
        localStorage.setItem(DONE_KEY, JSON.stringify(next));
      } catch {
        // Nothing to do — the star simply will not survive a reload.
      }
      return next;
    });
  }, [done, letter.ar, letter.soundId]);

  // ---------------------------------------------------------------- painting

  const pointAt = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const paintAt = (x: number, y: number, continuous: boolean) => {
    const ctx = paintRef.current?.getContext("2d");
    if (!ctx) return;

    if (tool === "sticker") {
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${brushSize * 2.6}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sticker, x, y);
      ctx.restore();
      return;
    }

    ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;

    if (continuous) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      // A tap should leave a dot, not nothing.
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = tool === "eraser" ? "#000" : color;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  /** One tap floods the whole letter — by far the fastest route to a finished sheet. */
  const fillLetter = () => {
    const ctx = paintRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.font = fontFor(anchor.current.font);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.fillText(letter.ar, anchor.current.x, anchor.current.y);
    ctx.restore();
    score();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    // Capture keeps the stroke tracking a finger that slides off the canvas. It can
    // throw for an already-released pointer; a failed capture must not abort the
    // tap (TraceClient guards the identical call for the same reason).
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // paint anyway
    }
    if (tool === "fill") {
      fillLetter();
      return;
    }
    drawing.current = true;
    const { x, y } = pointAt(event);
    paintAt(x, y, false);
    if (tool === "sticker") {
      drawing.current = false;
      score();
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const { x, y } = pointAt(event);
    paintAt(x, y, true);
  };

  const onPointerUp = () => {
    if (!drawing.current) return;
    drawing.current = false;
    paintRef.current?.getContext("2d")?.beginPath();
    score();
  };

  // ------------------------------------------------------------------- letter

  const goTo = (delta: number) => {
    setIndex((prev) => (prev + delta + arabicLetters.length) % arabicLetters.length);
    if (soundEnabled()) playLetterSound(arabicLetters[(index + delta + arabicLetters.length) % arabicLetters.length].soundId);
  };

  const tools: { id: Tool; icon: typeof Brush; label: string }[] = [
    { id: "brush", icon: Brush, label: isAr ? "فرشاة" : "Brush" },
    { id: "fill", icon: PaintBucket, label: isAr ? "تعبئة" : "Fill" },
    { id: "sticker", icon: Sticker, label: isAr ? "ملصقات" : "Stickers" },
    { id: "eraser", icon: Eraser, label: isAr ? "ممحاة" : "Eraser" },
  ];

  return (
    <div
      ref={stageRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative h-[calc(100dvh-var(--header-h))] w-full select-none overflow-hidden bg-canvas touch-none"
    >
      {/* Paper grain: a couple of very soft blooms so the sheet is not flat white. */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -start-16 -top-10 h-72 w-72 rounded-full bg-saffron/20 blur-[90px]" />
        <div className="absolute -end-16 top-1/3 h-80 w-80 rounded-full bg-violet/15 blur-[100px]" />
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-3">
        <div className="card-stock flex items-center gap-2 px-3 py-2">
          <span className="font-arabic-display text-2xl leading-none text-ink">{letter.ar}</span>
          <span className="text-sm font-extrabold text-ink/70">
            {isAr ? letter.arName : letter.enName}
          </span>
          <button
            type="button"
            onClick={() => {
              if (soundEnabled()) playLetterSound(letter.soundId);
            }}
            aria-label={isAr ? "استمع للحرف" : "Hear the letter"}
            className="ms-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/60 transition hover:bg-saffron-soft hover:text-ink"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="card-stock hidden items-center gap-1.5 px-3 py-2 text-sm font-extrabold text-ink/70 sm:flex">
            ⭐ {collected.length}/{arabicLetters.length}
          </div>
          <button
            type="button"
            onClick={clearPaint}
            className="card-stock flex min-h-11 items-center gap-1.5 px-3 py-2 text-sm font-extrabold text-ink transition hover:bg-saffron-soft"
          >
            <RotateCcw className="h-4 w-4" />
            {isAr ? "مسح" : "Clear"}
          </button>
        </div>
      </div>

      {/* Sheet */}
      <canvas
        ref={paintRef}
        className="absolute inset-0 z-10 touch-none"
        style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      />
      <canvas ref={outlineRef} className="pointer-events-none absolute inset-0 z-20" />

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 px-3 pb-5">
        {/* Coverage meter — the child can see the star coming. */}
        <div className="h-2.5 w-48 overflow-hidden rounded-full border-2 border-ink/15 bg-white/70">
          <div
            className="h-full rounded-full transition-[width] duration-200"
            style={{ width: `${Math.min(100, (progress / DONE_AT) * 100)}%`, background: color }}
          />
        </div>

        {tool === "sticker" && (
          <div className="card-stock flex items-center gap-1.5 px-2.5 py-2">
            {STICKERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSticker(item)}
                aria-label={item}
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition ${
                  sticker === item ? "scale-110 bg-saffron-soft" : "hover:bg-saffron-soft/60"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <div className="card-stock flex w-full max-w-2xl flex-wrap items-center justify-center gap-1.5 px-2.5 py-2">
          {COLORS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setColor(item);
                if (tool === "eraser" || tool === "sticker") setTool("brush");
              }}
              aria-label={`${isAr ? "لون" : "Colour"} ${item}`}
              className={`h-11 w-11 rounded-full border-2 border-ink/20 transition ${
                color === item ? "scale-110 ring-[3px] ring-ink" : "hover:scale-110"
              }`}
              style={{ backgroundColor: item }}
            />
          ))}

          <span className="mx-1 hidden h-7 w-0.5 rounded-full bg-ink/10 sm:block" />

          <label className="hidden items-center gap-2 sm:flex">
            <span className="text-xs font-extrabold text-ink/55">{isAr ? "الحجم" : "Size"}</span>
            <input
              type="range"
              min="8"
              max="70"
              value={brushSize}
              onChange={(event) => setBrushSize(parseInt(event.target.value, 10))}
              aria-label={isAr ? "حجم الفرشاة" : "Brush size"}
              className="touch-range h-11 w-28 appearance-none bg-transparent accent-qalam"
            />
            <span
              className="rounded-full border-2 border-ink/20"
              style={{
                width: Math.max(8, brushSize / 2.4),
                height: Math.max(8, brushSize / 2.4),
                backgroundColor: color,
              }}
            />
          </label>
        </div>

        <div className="flex w-full max-w-2xl items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label={isAr ? "الحرف السابق" : "Previous letter"}
            className="btn-chunky shrink-0 rounded-full px-4 py-2.5 text-lg"
          >
            {isAr ? "→" : "←"}
          </button>

          <div className="card-stock flex flex-1 items-center justify-center gap-1 px-2 py-1.5">
            {tools.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTool(item.id)}
                  title={item.label}
                  aria-label={item.label}
                  aria-pressed={tool === item.id}
                  className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-extrabold transition ${
                    tool === item.id ? "bg-ink text-card" : "text-ink/70 hover:bg-saffron-soft"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label={isAr ? "الحرف التالي" : "Next letter"}
            className="btn-chunky shrink-0 rounded-full px-4 py-2.5 text-lg"
          >
            {isAr ? "←" : "→"}
          </button>
        </div>

        {/* Phones do not have room for the slider beside the swatches. */}
        <div className="card-stock flex w-full max-w-2xl items-center gap-3 px-4 py-2 sm:hidden">
          <span className="text-xs font-extrabold text-ink/60">{isAr ? "الحجم" : "Size"}</span>
          <input
            type="range"
            min="8"
            max="70"
            value={brushSize}
            onChange={(event) => setBrushSize(parseInt(event.target.value, 10))}
            aria-label={isAr ? "حجم الفرشاة" : "Brush size"}
            className="touch-range h-11 flex-1 appearance-none bg-transparent accent-qalam"
          />
          <span
            className="rounded-full border-2 border-ink/20"
            style={{
              width: Math.max(8, brushSize / 2.4),
              height: Math.max(8, brushSize / 2.4),
              backgroundColor: color,
            }}
          />
        </div>
      </div>

      {/* Reward */}
      {done && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 backdrop-blur-sm">
          <div className="card-stock card-stock-saffron w-full max-w-sm p-7 text-center">
            <div className="mascot-bob text-6xl">🌟</div>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-ink">
              {isAr ? "أحسنت!" : "Great job!"}
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink/70">
              {isAr
                ? `لوّنت حرف ${letter.arName}. عندك ${collected.length} من ${arabicLetters.length} نجمة.`
                : `You coloured ${letter.enName}. That is ${collected.length} of ${arabicLetters.length} stars.`}
            </p>
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={() => {
                  clearPaint();
                  setDone(false);
                }}
                className="btn-chunky btn-chunky-ghost flex-1 rounded-full px-4 py-2.5 text-sm"
              >
                {isAr ? "مرة أخرى" : "Again"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  goTo(1);
                }}
                className="btn-chunky flex-1 rounded-full px-4 py-2.5 text-sm"
              >
                {isAr ? "الحرف التالي" : "Next letter"}
              </button>
            </div>
            <Link
              href={`/${locale}/printables`}
              className="mt-4 inline-block text-xs font-bold text-ink/55 underline hover:text-ink"
            >
              {isAr ? "اطبع أوراق التتبع" : "Print the tracing worksheets"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
