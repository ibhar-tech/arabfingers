"use client";

import React, { useRef, useEffect } from "react";

interface Asteroid {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
}

interface SolarSystemSimulatorProps {
  activePlanet: "mercury" | "venus" | "earth" | "mars" | "none";
  gravityFactor: number; // 0 to 100
  isPlaying: boolean;
  locale: string;
}

export default function SolarSystemSimulator({
  activePlanet = "none",
  gravityFactor = 50,
  isPlaying = true,
  locale = "ar"
}: SolarSystemSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const asteroidsRef = useRef<Asteroid[]>([]);
  
  const isAr = locale === "ar";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth || 480;
    let height = canvas.height = canvas.offsetHeight || 200;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 480;
      height = canvas.height = canvas.offsetHeight || 200;
    };
    window.addEventListener("resize", handleResize);

    const cx = width / 2;
    const cy = height / 2;

    // Orbit parameters
    const planets = [
      { id: "mercury", nameAr: "عطارد ☄️", nameEn: "Mercury ☄️", radius: 45, speed: 0.04, size: 5, color: "#94a3b8", emoji: "🪨" },
      { id: "venus", nameAr: "الزهرة 🪐", nameEn: "Venus 🪐", radius: 70, speed: 0.025, size: 7, color: "#fef08a", emoji: "🪐" },
      { id: "earth", nameAr: "الأرض 🌍", nameEn: "Earth 🌍", radius: 100, speed: 0.018, size: 8, color: "#38bdf8", emoji: "🌍", hasMoon: true },
      { id: "mars", nameAr: "المريخ 🔴", nameEn: "Mars 🔴", radius: 135, speed: 0.012, size: 6.5, color: "#f87171", emoji: "🔴" }
    ];

    // Current angle states
    const angles = { mercury: 0, venus: 2, earth: 4, mars: 1 };

    // Spawn 15 decorative starry background particles
    const stars: {x: number, y: number, size: number, alpha: number}[] = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      // Draw outer space background
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (const s of stars) {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha + Math.sin(Date.now() / 300 + s.x) * 0.2})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Orbit Rings
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      for (const p of planets) {
        ctx.beginPath();
        ctx.arc(cx, cy, p.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Highlight orbit if active
        if (activePlanet === p.id) {
          ctx.strokeStyle = p.color + "44";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, p.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.lineWidth = 1;
        }
      }

      // Draw Bright Glowing Sun in the center
      const sunPulse = 1 + Math.sin(Date.now() / 250) * 0.05;
      const sunRad = 16 * sunPulse;
      const sunGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, sunRad * 2.2);
      sunGlow.addColorStop(0, "#fffbeb");
      sunGlow.addColorStop(0.3, "#fde047");
      sunGlow.addColorStop(0.8, "rgba(234, 88, 12, 0.2)");
      sunGlow.addColorStop(1, "rgba(234, 88, 12, 0)");
      
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, sunRad * 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ea580c";
      ctx.beginPath();
      ctx.arc(cx, cy, sunRad, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(cx, cy, sunRad - 2, 0, Math.PI * 2);
      ctx.fill();

      // Update & Draw Planets
      const speedMultiplier = gravityFactor / 50;

      for (const p of planets) {
        if (isPlaying) {
          // Increment angle using Keplerian multiplier
          const baseAngle = angles[p.id as keyof typeof angles];
          angles[p.id as keyof typeof angles] = baseAngle + p.speed * speedMultiplier;
        }

        const angle = angles[p.id as keyof typeof angles];
        const px = cx + Math.cos(angle) * p.radius;
        const py = cy + Math.sin(angle) * p.radius;

        // Draw active selection indicator glow
        if (activePlanet === p.id) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 15;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, p.size + 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        }

        // Draw planet
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw cute details on earth/other planets
        if (p.id === "earth") {
          // Tiny Moon orbiting Earth
          const moonAngle = Date.now() / 200;
          const mx = px + Math.cos(moonAngle) * 13;
          const my = py + Math.sin(moonAngle) * 13;
          ctx.fillStyle = "#cbd5e1";
          ctx.beginPath();
          ctx.arc(mx, my, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw planet emoji on top of coordinates
        ctx.fillStyle = "#ffffff";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        
        // Show labels when active
        if (activePlanet === p.id) {
          ctx.fillStyle = p.color;
          ctx.font = "bold 10px sans-serif";
          ctx.fillText(isAr ? p.nameAr : p.nameEn, px, py - p.size - 6);
        }
      }

      // Draw custom asteroids triggered by clicks
      const asteroids = asteroidsRef.current;
      for (let i = asteroids.length - 1; i >= 0; i--) {
        const ast = asteroids[i];
        if (isPlaying) {
          ast.angle += ast.speed * speedMultiplier;
        }
        const ax = cx + Math.cos(ast.angle) * ast.radius;
        const ay = cy + Math.sin(ast.angle) * ast.radius;

        // Draw asteroid
        ctx.fillStyle = ast.color;
        ctx.beginPath();
        ctx.arc(ax, ay, ast.size, 0, Math.PI * 2);
        ctx.fill();

        // Asteroid trail
        ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, ast.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Display Solar System watermark
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.font = "800 12px sans-serif";
      ctx.textAlign = isAr ? "right" : "left";
      ctx.fillText(
        isAr ? "مُحاكاة النظام الشمسي 🚀" : "Solar System Orbit Simulator 🚀",
        isAr ? width - 15 : 15,
        height - 10
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    // Click handler to spawn asteroid particles!
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Calculate radius from center
      const dx = clickX - (canvas.width / 2);
      const dy = clickY - (canvas.height / 2);
      const r = Math.sqrt(dx * dx + dy * dy);

      if (r > 30 && r < 200) {
        // Spawn asteroid orbiting at this radius!
        const ang = Math.atan2(dy, dx);
        const KeplerSpeed = 0.15 / Math.sqrt(r); // slower farther away
        asteroidsRef.current.push({
          angle: ang,
          radius: r,
          speed: KeplerSpeed * (Math.random() * 0.4 + 0.8),
          size: Math.random() * 2 + 1.5,
          color: "#94a3b8"
        });

        // Cap asteroids list to 25 to prevent memory leaks
        if (asteroidsRef.current.length > 25) {
          asteroidsRef.current.shift();
        }
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) canvas.removeEventListener("click", handleCanvasClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activePlanet, gravityFactor, isPlaying, locale, isAr]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 bg-[#030712] shadow-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        title={isAr ? "اضغط لإنشاء كويكب يدور!" : "Click to spawn a cute orbiting asteroid!"}
      />
    </div>
  );
}
