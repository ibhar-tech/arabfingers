"use client";

import React, { useRef, useEffect } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface PhysicsObject {
  id: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  bounce: number;
  weight: number; // mass factor
}

interface GravitySimulatorProps {
  activeObject: "apple" | "rock" | "rocket" | "astronaut" | "none";
  gravitySlider: number; // 0 to 100
  isPlaying: boolean;
  locale: string;
}

export default function GravitySimulator({
  activeObject = "none",
  gravitySlider = 50,
  isPlaying = true,
  locale = "ar"
}: GravitySimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  
  const physicsObjectsRef = useRef<PhysicsObject[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  
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

    // Initialize physical objects if empty
    if (physicsObjectsRef.current.length === 0) {
      physicsObjectsRef.current = [
        { id: "apple", nameAr: "تفاحة 🍎", nameEn: "Apple 🍎", emoji: "🍎", x: 80, y: 50, vx: 0, vy: 0, size: 14, bounce: 0.72, weight: 1.0 },
        { id: "rock", nameAr: "صخرة 🪨", nameEn: "Rock 🪨", emoji: "🪨", x: 180, y: 50, vx: 0, vy: 0, size: 15, bounce: 0.25, weight: 1.6 },
        { id: "rocket", nameAr: "صاروخ 🚀", nameEn: "Rocket 🚀", emoji: "🚀", x: 280, y: 50, vx: 0, vy: 0, size: 16, bounce: 0.45, weight: 1.3 },
        { id: "astronaut", nameAr: "رائد فضاء 👨‍🚀", nameEn: "Astronaut 👨‍🚀", emoji: "👨‍🚀", x: 380, y: 50, vx: 0, vy: 0, size: 15, bounce: 0.6, weight: 0.8 }
      ];
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      // Draw experimental vacuum chamber background
      ctx.fillStyle = "#0c0a09"; // warm stone dark
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw heavy steel bottom pad
      ctx.fillStyle = "#1c1917";
      ctx.fillRect(0, height - 20, width, 20);
      ctx.fillStyle = "#fbbf24"; // yellow warning caution stripes
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fbbf24";
      for (let sx = 0; sx < width; sx += 25) {
        ctx.beginPath();
        ctx.moveTo(sx, height - 20);
        ctx.lineTo(sx + 10, height);
        ctx.stroke();
      }

      // Physics settings
      // Convert gravitySlider (0 to 100) to actual acceleration (e.g. 0 to 0.6)
      const baseGravity = (gravitySlider / 100) * 0.55;

      const items = physicsObjectsRef.current;
      const sparkles = sparklesRef.current;

      // Update & Draw physics objects
      for (const obj of items) {
        if (isPlaying) {
          // 1. Gravity acceleration
          obj.vy += baseGravity * obj.weight;

          // 2. Position updates
          obj.y += obj.vy;
          obj.x += obj.vx;

          // Air resistance / damping
          obj.vy *= 0.985;
          obj.vx *= 0.98;

          // 3. Collision with bottom
          const floorY = height - 20 - obj.size;
          if (obj.y >= floorY) {
            obj.y = floorY;
            obj.vy = -obj.vy * obj.bounce;

            // Stop sliding jitter
            if (Math.abs(obj.vy) < 0.4 && baseGravity > 0.02) {
              obj.vy = 0;
            }

            // Bounce sound sparkles
            if (Math.abs(obj.vy) > 1.2 && sparkles.length < 50) {
              for (let sp = 0; sp < 6; sp++) {
                sparkles.push({
                  x: obj.x,
                  y: floorY + obj.size,
                  vx: (Math.random() - 0.5) * 2,
                  vy: -Math.random() * 2 - 1,
                  size: Math.random() * 2 + 1,
                  alpha: 0.8,
                  life: 0,
                  maxLife: 30,
                  color: "rgba(251, 191, 36, " // golden bounce dust
                });
              }
            }
          }

          // Left/Right wall boundary checking
          if (obj.x <= obj.size) {
            obj.x = obj.size;
            obj.vx = -obj.vx * 0.8;
          } else if (obj.x >= width - obj.size) {
            obj.x = width - obj.size;
            obj.vx = -obj.vx * 0.8;
          }
        }

        // Draw active target overlay glow
        if (activeObject === obj.id) {
          ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.size + 6, 0, Math.PI * 2);
          ctx.stroke();

          // Outer pulsing ring
          const ringRad = obj.size + 6 + Math.sin(Date.now() / 200) * 3;
          ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, ringRad, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw object emoji
        ctx.font = `${obj.size * 2}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(obj.emoji, obj.x, obj.y);

        // Show active label above object
        if (activeObject === obj.id) {
          ctx.fillStyle = "#10b981";
          ctx.font = "bold 9px sans-serif";
          ctx.fillText(isAr ? obj.nameAr : obj.nameEn, obj.x, obj.y - obj.size - 8);
        }
      }

      // Update & Draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        if (isPlaying) {
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          s.alpha = 1 - s.life / s.maxLife;
        }

        ctx.fillStyle = s.color + s.alpha + ")";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
        }
      }

      // Display Gravity Chamber details
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.font = "800 12px sans-serif";
      ctx.textAlign = isAr ? "right" : "left";
      ctx.fillText(
        isAr ? "مُحاكاة غُرفة الجاذبية 🍎" : "Gravity Vacuum Chamber 🍎",
        isAr ? width - 15 : 15,
        height - 30
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    // Click handler to launch object when clicked!
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const items = physicsObjectsRef.current;
      const sparkles = sparklesRef.current;

      for (const obj of items) {
        const dx = clickX - obj.x;
        const dy = clickY - obj.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= obj.size + 10) {
          // LAUNCH!
          obj.vy = -6.5 - Math.random() * 3.5; // launch up
          obj.vx = (Math.random() - 0.5) * 3; // side momentum

          // Spawn high-energy emerald click sparkles!
          for (let sp = 0; sp < 12; sp++) {
            sparkles.push({
              x: obj.x,
              y: obj.y,
              vx: (Math.random() - 0.5) * 3.5,
              vy: (Math.random() - 0.5) * 3.5,
              size: Math.random() * 2.5 + 1.5,
              alpha: 0.9,
              life: 0,
              maxLife: 25 + Math.random() * 15,
              color: "rgba(16, 185, 129, " // green emerald sparkles
            });
          }
          break; // only click one object at a time
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
  }, [activeObject, gravitySlider, isPlaying, locale]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        title={isAr ? "اضغط على الأجسام لإطلاقها للأعلى!" : "Click on the objects to launch them up!"}
      />
    </div>
  );
}
