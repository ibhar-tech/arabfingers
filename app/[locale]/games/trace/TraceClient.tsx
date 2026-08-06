"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { RotateCcw, Volume2 } from "lucide-react";
import { arabicLetters } from "@/lib/arabicMap";
import { playLetterSound, primeLetterSounds } from "@/lib/letterSounds";
import { award, getProgress } from "@/lib/progress";

/**
 * Trace-the-letter game. One glyph at a time as a dashed outline; the child draws
 * over it with a finger and earns a star at ~70% coverage.
 *
 * The canvas mechanics (device-pixel backing store, the ink-bounds anchor that keeps
 * outline/mask/scoring aligned, and the sampled coverage mask) are the same proven
 * approach as the colouring sheet — this is the tracing variant: one pen, a fixed
 * brush, and a start hint, so it reads as writing practice rather than free colouring.
 */

const PEN = "#10a39a"; // qalam teal — high contrast on the cream canvas
const BRUSH = 24;
/** Portion of the glyph that must be covered before the star is awarded. */
const DONE_AT = 0.7;

export default function TraceClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAr = locale === "ar";

  const stageRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLCanvasElement>(null);
  const outlineRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [traced, setTraced] = useState<string[]>([]);
  const [hint, setHint] = useState<{ x: number; y: number } | null>(null);

  /* Pointer state lives in a ref: startDrawing sets it and calls draw() in the same
     tick, where a state value would still read the previous `false`. */
  const drawing = useRef(false);
  /** Alpha-channel byte offsets for pixels inside the glyph, sampled once per letter. */
  const maskOffsets = useRef<Int32Array>(new Int32Array(0));
  /** The background, sampled like the glyph. Painting it counts against you. */
  const maskOutside = useRef<Int32Array>(new Int32Array(0));
  const anchor = useRef({ x: 0, y: 0, font: 0 });

  const letter = arabicLetters[index];

  useEffect(() => {
    primeLetterSounds();
    setTraced(getProgress().traced);
  }, []);

  // ---------------------------------------------------------------- geometry

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setSize({ width: stage.clientWidth, height: stage.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const glyph = useMemo(() => {
    const { width, height } = size;
    const top = 72;
    const bottom = height - 120;
    const band = Math.max(120, bottom - top);
    return {
      font: Math.min(width * 0.52, band * 0.96),
      cx: width / 2,
      bandCenter: (top + bottom) / 2,
    };
  }, [size]);

  const fontFor = useCallback((px: number) => {
    const family =
      typeof window === "undefined"
        ? ""
        : getComputedStyle(document.body).getPropertyValue("--font-noto-naskh").trim();
    return `800 ${px}px ${family || '"Noto Naskh Arabic"'}, serif`;
  }, []);

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
      const right = m.actualBoundingBoxRight || glyph.font * 0.3;
      anchor.current = { x: glyph.cx, y: glyph.bandCenter + (ascent - descent) / 2, font: glyph.font };
      const { x, y } = anchor.current;

      // Faint tint so the child can see where to aim before the first stroke.
      ctx.fillStyle = "rgba(42, 29, 78, 0.05)";
      ctx.fillText(letter.ar, x, y);

      ctx.lineWidth = Math.max(5, glyph.font * 0.02);
      ctx.strokeStyle = "rgba(42, 29, 78, 0.5)";
      ctx.setLineDash([glyph.font * 0.05, glyph.font * 0.045]);
      ctx.lineJoin = "round";
      ctx.strokeText(letter.ar, x, y);
      ctx.setLineDash([]);

      // Start hint near the top-right of the ink (Arabic is written right-to-left).
      // A generic orientation cue, not a per-letter stroke order.
      setHint({ x: x + right * 0.7, y: y - ascent * 0.7 });

      buildMask();
    };

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
      const outside: number[] = [];
      const step = Math.max(2, Math.round(Math.sqrt((off.width * off.height) / 10000)));
      for (let py = 0; py < off.height; py += step) {
        for (let px = 0; px < off.width; px += step) {
          const dx = Math.round(px * dpr);
          const dy = Math.round(py * dpr);
          const offset = (dy * Math.round(size.width * dpr) + dx) * 4 + 3;
          if (data[(py * off.width + px) * 4 + 3] > 128) inside.push(offset);
          else outside.push(offset);
        }
      }
      maskOffsets.current = Int32Array.from(inside);
      // Sampled at the same step as the glyph, so the two coverages are directly
      // comparable and the background can be subtracted from the score.
      maskOutside.current = Int32Array.from(outside);
    };

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
    let spilled = 0;
    const outsideOffsets = maskOutside.current;
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 0; i < offsets.length; i++) {
        if (data[offsets[i]] > 12) painted++;
      }
      for (let i = 0; i < outsideOffsets.length; i++) {
        if (data[outsideOffsets[i]] > 12) spilled++;
      }
    } catch {
      return;
    }

    // Covering the whole sheet used to score 100%, because only pixels inside the
    // glyph were ever counted. Subtracting how much of the background got painted
    // means a scribble simply stops filling the bar — the child sees why without
    // needing to be told. Following the letter costs almost nothing here, since
    // overshoot is a small share of a large background.
    const covered = painted / offsets.length;
    const spill = outsideOffsets.length ? spilled / outsideOffsets.length : 0;
    const ratio = Math.max(0, covered - spill);
    setProgress(ratio);
    if (ratio < DONE_AT || done) return;

    setDone(true);
    confetti({ particleCount: 160, spread: 75, origin: { y: 0.6 }, colors: [PEN, "#ffb22e", "#ff5da2"] });
    playLetterSound(letter.soundId);
    setTraced(award("traced", letter.ar).traced);
  }, [done, letter.ar, letter.soundId]);

  // ---------------------------------------------------------------- painting

  const pointAt = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const paintAt = (x: number, y: number, continuous: boolean) => {
    const ctx = paintRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = BRUSH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = PEN;
    if (continuous) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, BRUSH / 2, 0, Math.PI * 2);
      ctx.fillStyle = PEN;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    // Capture keeps the stroke tracking a finger that slides off the canvas. It can
    // throw for an already-released pointer; a failed capture must not abort the stroke.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // draw anyway
    }
    drawing.current = true;
    setHint(null);
    const { x, y } = pointAt(event);
    paintAt(x, y, false);
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
    const next = (index + delta + arabicLetters.length) % arabicLetters.length;
    setIndex(next);
    playLetterSound(arabicLetters[next].soundId);
  };

  return (
    <div
      ref={stageRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative h-[calc(100dvh-var(--header-h))] w-full select-none overflow-hidden bg-canvas touch-none"
    >
      {/* Paper grain */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -start-16 -top-10 h-72 w-72 rounded-full bg-qalam/15 blur-[90px]" />
        <div className="absolute -end-16 top-1/3 h-80 w-80 rounded-full bg-saffron/15 blur-[100px]" />
      </div>

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-3">
        <div className="card-stock flex items-center gap-2 px-3 py-2">
          <span className="font-arabic-display text-2xl leading-none text-ink">{letter.ar}</span>
          <span className="text-sm font-extrabold text-ink/70">{isAr ? letter.arName : letter.enName}</span>
          <button
            type="button"
            onClick={() => playLetterSound(letter.soundId)}
            aria-label={isAr ? "استمع للحرف" : "Hear the letter"}
            className="ms-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/60 transition hover:bg-saffron-soft hover:text-ink"
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="card-stock hidden items-center gap-1.5 px-3 py-2 text-sm font-extrabold text-ink/70 sm:flex">
            ⭐ {traced.length}/{arabicLetters.length}
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
        style={{ cursor: "crosshair" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      />
      <canvas ref={outlineRef} className="pointer-events-none absolute inset-0 z-20" />

      {/* Start hint — pulsing ring where the child should begin */}
      {hint && progress === 0 && !done && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: hint.x, top: hint.y }}
        >
          <span className="cue-ping block h-6 w-6 rounded-full border-[3px] border-qalam bg-qalam/30" />
          <span className="mt-1 block whitespace-nowrap text-[11px] font-extrabold text-qalam">
            {isAr ? "ابدأ من هنا" : "Start here"}
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-3 pb-5">
        <div className="h-2.5 w-48 overflow-hidden rounded-full border-2 border-ink/15 bg-white/70">
          <div
            className="h-full rounded-full bg-qalam transition-[width] duration-200"
            style={{ width: `${Math.min(100, (progress / DONE_AT) * 100)}%` }}
          />
        </div>

        <div className="flex w-full max-w-md items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label={isAr ? "الحرف السابق" : "Previous letter"}
            className="btn-chunky rounded-full px-5 py-2.5 text-lg"
          >
            {isAr ? "→" : "←"}
          </button>
          <p className="text-center text-xs font-extrabold text-ink/55">
            {isAr ? "تتبّع الحرف بإصبعك" : "Trace the letter with your finger"}
          </p>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label={isAr ? "الحرف التالي" : "Next letter"}
            className="btn-chunky rounded-full px-5 py-2.5 text-lg"
          >
            {isAr ? "←" : "→"}
          </button>
        </div>
      </div>

      {/* Reward */}
      {done && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink/45 px-4 backdrop-blur-sm">
          <div className="card-stock card-stock-saffron w-full max-w-sm p-7 text-center">
            <div className="mascot-bob text-6xl">🌟</div>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-ink">{isAr ? "أحسنت!" : "Great job!"}</h2>
            <p className="mt-1 text-sm font-semibold text-ink/70">
              {isAr
                ? `تتبّعت حرف ${letter.arName}. عندك ${traced.length} من ${arabicLetters.length} نجمة.`
                : `You traced ${letter.enName}. That is ${traced.length} of ${arabicLetters.length} stars.`}
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
              href={`/${locale}/games`}
              className="mt-4 inline-block text-xs font-bold text-ink/55 underline hover:text-ink"
            >
              {isAr ? "كل الألعاب" : "All games"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
