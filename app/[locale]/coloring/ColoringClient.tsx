"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Brush, Eraser, PaintBucket, RotateCcw, Sticker, Volume2, Download, Undo2, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { arabicLetters } from "@/lib/arabicMap";
import { playLetterSound, primeLetterSounds } from "@/lib/letterSounds";
import { coloringTopics, coloringSvg } from "@/lib/coloringTopics";
import { coloringShapes } from "@/lib/coloringShapes";
import { fillRegion } from "@/components/coloring/fillRegion";
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
  const [topicId, setTopicId] = useState("letters");
  const [canUndo, setCanUndo] = useState(false);
  const undoRef = useRef<ImageData | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [collected, setCollected] = useState<string[]>([]);

  /* Pointer state lives in a ref, not state. It used to be state, and because
     startDrawing set it and called draw() in the same tick, the closure still saw
     `false` — so a single tap never left a mark. */
  const drawing = useRef(false);
  /** Byte offsets of the alpha channel for pixels inside the glyph, sampled once per letter. */
  const maskOffsets = useRef<Int32Array>(new Int32Array(0));

  const topic = coloringTopics.find(candidate => candidate.id === topicId)!;
  const isLetter = topicId === "letters";
  const letter = arabicLetters[isLetter ? index : 0];
  const picture = isLetter ? null : topic.pictures[index];
  const pictureCount = isLetter ? arabicLetters.length : topic.pictures.length;
  const pictureName = picture ? (isAr ? picture.ar : picture.en) : (isAr ? letter.arName : letter.enName);
  const pictureId = picture?.id ?? letter.ar;

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
    const top = 24;
    const bottom = height - 24;
    const band = Math.max(120, bottom - top);
    return {
      font: Math.min(width * 0.75, band * 0.88),
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
    if (picture) {
      const outlineImage = new Image();
      outlineImage.onload = () => {
        if (cancelled) return;
        const side = Math.min(size.width - 32, size.height - 32);
        ctx.drawImage(outlineImage, (size.width - side) / 2, (size.height - side) / 2, side, side);
      };
      outlineImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coloringSvg(picture.shape))}`;
      maskOffsets.current = new Int32Array(0);
      return () => { cancelled = true; };
    }

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
      ctx.fillStyle = "rgba(16, 163, 154, 0.035)";
      ctx.fillText(letter.ar, x, y);

      ctx.lineWidth = Math.max(2, glyph.font * 0.007);
      ctx.strokeStyle = "#344b5a";
      ctx.setLineDash([]);
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
  }, [letter.ar, picture, size, glyph, fitCanvas, fontFor]);

  useEffect(() => {
    clearPaint();
    setDone(false);
    setCanUndo(false);
    undoRef.current = null;
  }, [pictureId, size, clearPaint]);

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
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 }, colors: COLORS });
    }
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

  const rememberPaint = () => {
    const canvas = paintRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    undoRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
    setCanUndo(true);
  };

  const undoPaint = () => {
    if (!undoRef.current) return;
    paintRef.current?.getContext("2d")?.putImageData(undoRef.current, 0, 0);
    undoRef.current = null;
    setCanUndo(false);
    setDone(false);
    score();
  };

  const savePicture = () => {
    const paint = paintRef.current;
    const outline = outlineRef.current;
    if (!paint || !outline) return;
    const exported = document.createElement("canvas");
    exported.width = paint.width;
    exported.height = paint.height;
    const context = exported.getContext("2d");
    if (!context) return;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, exported.width, exported.height);
    context.drawImage(paint, 0, 0);
    context.drawImage(outline, 0, 0);
    const download = document.createElement("a");
    download.download = `arabfingers-${pictureId}.png`;
    download.href = exported.toDataURL("image/png");
    download.click();
  };

  const fillPicture = (point: { x: number; y: number }) => {
    if (isLetter) { fillLetter(); return; }
    const paint = paintRef.current;
    const outline = outlineRef.current;
    if (!paint || !outline) return;
    const scale = paint.width / size.width;
    fillRegion(paint, outline, { x: point.x * scale, y: point.y * scale }, color);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;
    rememberPaint();
    // Capture keeps the stroke tracking a finger that slides off the canvas. It can
    // throw for an already-released pointer; a failed capture must not abort the
    // tap (TraceClient guards the identical call for the same reason).
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // paint anyway
    }
    if (tool === "fill") {
      fillPicture(pointAt(event));
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
    const next = (index + delta + pictureCount) % pictureCount;
    setIndex(next);
    if (isLetter && soundEnabled()) playLetterSound(arabicLetters[next].soundId);
  };

  const tools: { id: Tool; icon: typeof Brush; label: string }[] = [
    { id: "brush", icon: Brush, label: isAr ? "فرشاة" : "Brush" },
    { id: "fill", icon: PaintBucket, label: isAr ? "تعبئة" : "Fill" },
    { id: "sticker", icon: Sticker, label: isAr ? "ملصقات" : "Stickers" },
    { id: "eraser", icon: Eraser, label: isAr ? "ممحاة" : "Eraser" },
  ];

  const selectTopic = (id: string) => {
    setTopicId(id);
    setIndex(0);
  };

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-[#f1f7f6] px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#08796f]">{isAr ? "مساحة صغيرة لخيال كبير" : "A little space for big imaginations"}</p>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">{isAr ? "استوديو التلوين" : "The colouring studio"} <span aria-hidden>🎨</span></h2>
            <p className="mt-2 text-sm text-ink/75">{isAr ? "10 مواضيع، 84 رسمة وحرفاً. اختر، لوّن، ثم احفظ رسمتك." : "10 topics, 84 pictures and letters. Pick a page, add colour, make it yours."}</p>
          </div>
          <Link href={`/${locale}/printables`} className="rounded-full border border-ink/15 bg-white px-4 py-3 text-sm font-bold text-ink hover:border-qalam">{isAr ? "أوراق تلوين للطباعة ↗" : "Prefer paper? Print a page ↗"}</Link>
        </div>

        <div aria-label={isAr ? "مواضيع التلوين" : "Colouring topics"} className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {coloringTopics.map(candidate => (
            <button key={candidate.id} type="button" aria-pressed={topicId === candidate.id} onClick={() => selectTopic(candidate.id)} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${topicId === candidate.id ? "border-[#08796f] bg-[#08796f] text-white" : "border-ink/10 bg-white text-ink hover:border-qalam"}`}>
              <span aria-hidden>{candidate.icon}</span>{isAr ? candidate.ar : candidate.en}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="min-w-0 rounded-3xl border border-ink/10 bg-white p-3">
            <div className="mb-3 flex items-center justify-between px-1"><h2 className="font-display font-extrabold text-ink">{isAr ? topic.ar : topic.en}</h2><span className="text-xs font-bold text-ink/60">{pictureCount}</span></div>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:max-h-[650px] lg:grid-cols-2 lg:overflow-y-auto lg:overflow-x-hidden">
              {(isLetter ? arabicLetters.map(entry => ({ id: entry.ar, en: entry.enName, ar: entry.arName, shape: "" })) : topic.pictures).map((entry, pictureIndex) => (
                <button key={entry.id} type="button" onClick={() => setIndex(pictureIndex)} aria-pressed={index === pictureIndex} aria-label={isAr ? entry.ar : entry.en} className={`flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl border-2 p-2 transition lg:w-full ${index === pictureIndex ? "border-qalam bg-[#e8f6f2]" : "border-transparent bg-[#f7f8fa] hover:border-qalam/40"}`}>
                  {isLetter ? <span className="font-arabic-display text-4xl leading-[1.4] text-ink">{entry.id}</span> : <svg viewBox="0 0 200 200" aria-hidden className="h-14 w-14" fill="none" stroke="#344b5a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: coloringShapes[entry.shape] }} />}
                  <span className="mt-1 line-clamp-1 text-xs font-bold text-ink">{isAr ? entry.ar : entry.en}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="min-w-0 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_8px_30px_#2340390a]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-extrabold text-ink">{pictureName}</h2>
                {picture && <span lang={isAr ? "en" : "ar"} className="text-sm text-ink/65">{isAr ? picture.en : picture.ar}</span>}
                {isLetter && <button type="button" onClick={() => { if (soundEnabled()) playLetterSound(letter.soundId); }} aria-label={isAr ? "استمع للحرف" : "Hear the letter"} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f6f2] text-[#08796f] hover:bg-qalam/15"><Volume2 className="h-5 w-5" /></button>}
              </div>
              <div className="flex items-center gap-1 text-ink">
                <button type="button" onClick={undoPaint} disabled={!canUndo} aria-label={isAr ? "تراجع" : "Undo"} title={isAr ? "تراجع" : "Undo"} className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-ink/5 disabled:opacity-30"><Undo2 className="h-5 w-5" /></button>
                <button type="button" onClick={() => { rememberPaint(); clearPaint(); setDone(false); }} aria-label={isAr ? "مسح" : "Clear"} title={isAr ? "مسح" : "Clear"} className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-ink/5"><RotateCcw className="h-5 w-5" /></button>
                <button type="button" onClick={savePicture} className="flex min-h-11 items-center gap-2 rounded-xl bg-saffron px-3 text-sm font-bold"><Download className="h-4 w-4" />{isAr ? "حفظ" : "Save"}</button>
              </div>
            </div>

            <div ref={stageRef} className="relative h-[340px] bg-white sm:h-[440px] lg:h-[470px]">
              <canvas ref={paintRef} aria-label={isAr ? `لوحة تلوين: ${pictureName}` : `Colouring canvas: ${pictureName}`} className="absolute inset-0 z-10 touch-none" style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} />
              <canvas ref={outlineRef} aria-hidden className="pointer-events-none absolute inset-0 z-20" />
              {done && <p role="status" className="pointer-events-none absolute inset-x-4 bottom-3 z-30 mx-auto w-fit rounded-full bg-saffron-soft px-4 py-2 text-sm font-bold text-ink">⭐ {isAr ? "أحسنت! تابع التلوين كما تحب." : "Great job! Keep colouring your way."}</p>}
            </div>

            <div className="border-t border-ink/10 bg-[#fafcfb] px-3 py-3 sm:px-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <button type="button" onClick={() => goTo(-1)} aria-label={isAr ? "الرسمة السابقة" : "Previous picture"} className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink">{isAr ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}</button>
                <p aria-live="polite" className="text-center text-xs font-bold text-ink/70"><span dir="ltr">{index + 1} / {pictureCount}</span>{isLetter && <span className="ms-3">⭐ {collected.length}/28</span>}</p>
                <button type="button" onClick={() => goTo(1)} aria-label={isAr ? "الرسمة التالية" : "Next picture"} className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink">{isAr ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}</button>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5" aria-label={isAr ? "الألوان" : "Colours"}>
                {COLORS.map((swatch, swatchIndex) => <button key={swatch} type="button" onClick={() => { setColor(swatch); if (tool === "eraser" || tool === "sticker") setTool("brush"); }} aria-label={(isAr ? ["أحمر", "برتقالي", "أصفر", "أخضر", "فيروزي", "أزرق", "بنفسجي", "وردي", "داكن"] : ["Red", "Orange", "Yellow", "Green", "Teal", "Blue", "Purple", "Pink", "Dark"])[swatchIndex]} aria-pressed={color === swatch} className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white shadow-sm ${color === swatch ? "ring-2 ring-ink ring-offset-2" : "hover:scale-105"}`} style={{ backgroundColor: swatch }}>{color === swatch && <Check className="h-5 w-5" strokeWidth={3} />}</button>)}
              </div>
              <div className="mt-4 grid grid-cols-4 gap-1 rounded-2xl bg-white p-1 ring-1 ring-ink/10">
                {tools.map(({ id, icon: Icon, label }) => <button key={id} type="button" onClick={() => setTool(id)} aria-pressed={tool === id} className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-xs font-bold sm:flex-row sm:gap-2 ${tool === id ? "bg-[#08796f] text-white" : "text-ink/75 hover:bg-qalam/10"}`}><Icon className="h-4 w-4" />{label}</button>)}
              </div>
              {tool === "sticker" ? <div className="mt-3 flex flex-wrap justify-center gap-2">{STICKERS.map(stamp => <button key={stamp} type="button" onClick={() => setSticker(stamp)} aria-label={stamp} aria-pressed={sticker === stamp} className={`h-11 w-11 rounded-xl text-2xl ${sticker === stamp ? "bg-saffron-soft ring-2 ring-saffron" : "bg-white"}`}>{stamp}</button>)}</div> : <label className="mt-2 flex items-center justify-center gap-3 text-xs font-bold text-ink/70">{isAr ? "حجم الفرشاة" : "Brush size"}<input type="range" min="8" max="70" value={brushSize} onChange={event => setBrushSize(Number(event.target.value))} aria-label={isAr ? "حجم الفرشاة" : "Brush size"} className="h-11 min-w-0 flex-1 accent-qalam sm:max-w-64" /><span className="w-6 text-end">{brushSize}</span></label>}
              <p className="mt-1 text-center text-xs leading-relaxed text-ink/65">{tool === "fill" ? (isAr ? "المس داخل الشكل لتعبئته باللون." : "Tap inside a shape to fill it with colour.") : (isAr ? "ارسم بإصبعك أو بالفأرة. احفظ الرسم قبل اختيار رسمة جديدة." : "Draw with a finger or mouse. Save your artwork before choosing another page.")}</p>
              {isLetter && <div role="progressbar" aria-label={isAr ? "تقدم التلوين" : "Colouring progress"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(Math.min(100, progress / DONE_AT * 100))} className="mx-auto mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-ink/10"><div className="h-full bg-qalam transition-[width]" style={{ width: `${Math.min(100, progress / DONE_AT * 100)}%` }} /></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
