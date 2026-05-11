"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const LETTERS = [
  { char: "ا", name: "Alef" },
  { char: "ب", name: "Ba" },
  { char: "ت", name: "Ta" },
  { char: "ث", name: "Tha" },
  { char: "ج", name: "Jeem" },
  { char: "ح", name: "Hha" },
  { char: "خ", name: "Kha" },
  { char: "د", name: "Dal" },
  { char: "ذ", name: "Thal" },
  { char: "ر", name: "Ra" },
  { char: "ز", name: "Zay" },
  { char: "س", name: "Seen" },
  { char: "ش", name: "Sheen" },
  { char: "ص", name: "Sad" },
  { char: "ض", name: "Dad" },
  { char: "ط", name: "Tah" },
  { char: "ظ", name: "Zah" },
  { char: "ع", name: "Ain" },
  { char: "غ", name: "Ghain" },
  { char: "ف", name: "Fa" },
  { char: "ق", name: "Qaf" },
  { char: "ك", name: "Kaf" },
  { char: "ل", name: "Lam" },
  { char: "م", name: "Meem" },
  { char: "ن", name: "Noon" },
  { char: "ه", name: "Ha" },
  { char: "و", name: "Waw" },
  { char: "ي", name: "Ya" },
];

const COLORS = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#ec4899", // Pink
  "#ffffff", // White
];

export default function ColoringClient() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAr = locale === "ar";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(20);
  const [letterIndex, setLetterIndex] = useState(0);

  // Use a ref to store the background layer (the outline) so we don't clear the user's drawing 
  // when the window resizes, or if we want to redraw the outline on top, we can composite.
  // Actually, the simplest approach: 
  // We draw the outline text first, and user paints ON TOP. 
  // Or user paints BEHIND the outline (using globalCompositeOperation = "destination-over").
  // Let's draw the user strokes on the main canvas, and have the outline drawn on top always.
  // We can do this by using two canvases: an offscreen one for user strokes, or just rendering
  // the text every frame. Since it's a simple drawing app, we can just let them draw *over* the text, 
  // or draw *under* it using globalCompositeOperation.

  const drawOutline = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We want the text to act as a stencil or just an outline.
    // If we want it to be an outline that stays visible above the drawing:
    // We shouldn't clear the user's drawing. We should just redraw the outline over it? No, then it covers their paint.
    // If we let them draw *under* the outline:
    // We can set globalCompositeOperation to 'destination-over' to draw the text behind, but wait, 
    // if text is behind, it gets covered.
    // If we want the text outline to stay on top, we could draw it, then set 'destination-over' for user strokes.
    // Actually, drawing ON TOP is fine (like a coloring book where the black lines stay visible).
    // To do that easily with a single canvas: 
    // 1. We draw user strokes as normal.
    // 2. We don't redraw the outline continuously because that would mean clearing the canvas.
    // We need 2 canvases overlaid: one for the outline (top, pointer-events: none), one for drawing (bottom).
  }, [letterIndex]);

  // Let's use two layers for simplicity.
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear drawing canvas when letter changes or on clear button
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [letterIndex, clearCanvas, dimensions]);

  // Handle drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) ctx.beginPath(); // Reset path so next click doesn't connect
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get coordinates
    let x = 0;
    let y = 0;
    if ("touches" in e) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // The outline layer renderer
  const outlineRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = outlineRef.current;
    if (!canvas || dimensions.width === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const letter = LETTERS[letterIndex].char;
    const fontSize = Math.min(canvas.width, canvas.height) * 0.6;
    
    ctx.font = `800 ${fontSize}px "Noto Naskh Arabic", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw thick dashed outline
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.setLineDash([15, 15]);
    ctx.strokeText(letter, canvas.width / 2, canvas.height / 2);

    // Draw inner fill very transparently
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
  }, [letterIndex, dimensions]);

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-[#050816] select-none touch-none">
      {/* Top Nav */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <Link
          href={`/${locale}`}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
        >
          {isAr ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <div className="text-white/50 text-sm font-medium bg-white/5 px-4 py-2 rounded-full backdrop-blur-md">
          {LETTERS[letterIndex].char} - {LETTERS[letterIndex].name}
        </div>
        <button
          onClick={clearCanvas}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
        >
          {isAr ? "مسح" : "Clear"}
        </button>
      </div>

      {/* Main Drawing Area */}
      <div className="absolute inset-0 z-0">
        {/* User Drawing Canvas (Bottom Layer) */}
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 cursor-crosshair z-10"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
        
        {/* Outline Canvas (Top Layer, Pointer Events None) */}
        <canvas
          ref={outlineRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 pointer-events-none z-15"
        />
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-[90%] max-w-lg z-20">
        
        {/* Navigation */}
        <div className="flex items-center gap-4 w-full justify-between">
          <button
            onClick={() => setLetterIndex((prev) => (prev - 1 + LETTERS.length) % LETTERS.length)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
            aria-label="Previous Letter"
          >
            ←
          </button>
          
          {/* Colors */}
          <div className="flex flex-1 items-center justify-center gap-2 overflow-x-auto py-2 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className={`h-8 w-8 shrink-0 rounded-full transition-transform ${currentColor === color ? "scale-125 ring-2 ring-white" : "hover:scale-110"}`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          <button
            onClick={() => setLetterIndex((prev) => (prev + 1) % LETTERS.length)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
            aria-label="Next Letter"
          >
            →
          </button>
        </div>
        
        {/* Brush Size */}
        <div className="flex items-center gap-3 w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2">
          <span className="text-white/50 text-xs">{isAr ? "حجم الفرشاة" : "Brush"}</span>
          <input 
            type="range" 
            min="5" 
            max="60" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="flex-1 accent-accent h-1.5 rounded-full bg-white/20 appearance-none" 
          />
          <div 
            className="rounded-full bg-white flex items-center justify-center" 
            style={{ width: 24, height: 24 }}
          >
            <div 
              className="rounded-full" 
              style={{ 
                backgroundColor: currentColor, 
                width: Math.max(4, (brushSize / 60) * 20), 
                height: Math.max(4, (brushSize / 60) * 20) 
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
