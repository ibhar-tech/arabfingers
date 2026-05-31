"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
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

interface WaterCycleSimulatorProps {
  state: "evaporation" | "condensation" | "precipitation" | "collection" | "none";
  heatLevel: number; // 0 to 100
  isPlaying: boolean;
  locale: string;
}

export default function WaterCycleSimulator({
  state = "none",
  heatLevel = 50,
  isPlaying = true,
  locale = "ar"
}: WaterCycleSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  
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

    // Initialize particles list
    particlesRef.current = [];

    const drawLandscape = (c: CanvasRenderingContext2D) => {
      // 1. Draw sky
      const skyGrad = c.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#0b1528");
      skyGrad.addColorStop(0.6, "#0f233d");
      skyGrad.addColorStop(1, "#182a44");
      c.fillStyle = skyGrad;
      c.fillRect(0, 0, width, height);

      // 2. Draw Sun
      const sunPulse = 1 + Math.sin(Date.now() / 400) * 0.05;
      const sunX = width - 60;
      const sunY = 45;
      const sunRadius = 22 * sunPulse;
      
      const sunGlow = c.createRadialGradient(sunX, sunY, 2, sunX, sunY, sunRadius * 2);
      sunGlow.addColorStop(0, "#fffbeb");
      sunGlow.addColorStop(0.3, "#fef08a");
      sunGlow.addColorStop(0.7, "rgba(245, 158, 11, 0.25)");
      sunGlow.addColorStop(1, "rgba(245, 158, 11, 0)");
      
      c.fillStyle = sunGlow;
      c.beginPath();
      c.arc(sunX, sunY, sunRadius * 2.2, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = "#fbbf24";
      c.beginPath();
      c.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      c.fill();

      // 3. Draw cute mountain (left side)
      c.fillStyle = "#1e293b";
      c.beginPath();
      c.moveTo(0, height - 10);
      c.lineTo(70, height - 90);
      c.lineTo(130, height - 40);
      c.lineTo(200, height - 10);
      c.closePath();
      c.fill();

      // Mountain snow caps
      c.fillStyle = "#e2e8f0";
      c.beginPath();
      c.moveTo(60, height - 78);
      c.lineTo(70, height - 90);
      c.lineTo(82, height - 76);
      c.lineTo(76, height - 70);
      c.lineTo(70, height - 74);
      c.lineTo(65, height - 70);
      c.closePath();
      c.fill();

      // River flowing from mountain
      c.strokeStyle = "#38bdf8";
      c.lineWidth = 3.5;
      c.beginPath();
      c.moveTo(70, height - 85);
      c.bezierCurveTo(90, height - 55, 120, height - 45, 140, height - 20);
      c.stroke();

      // 4. Draw Ocean/Water Body at bottom
      const waterGrad = c.createLinearGradient(0, height - 25, 0, height);
      waterGrad.addColorStop(0, "#0284c7");
      waterGrad.addColorStop(1, "#0369a1");
      c.fillStyle = waterGrad;
      c.fillRect(0, height - 25, width, 25);

      // Cute waves on water
      c.strokeStyle = "rgba(255, 255, 255, 0.25)";
      c.lineWidth = 1.5;
      for (let xOffset = 0; xOffset < width; xOffset += 60) {
        const waveOffset = Math.sin((Date.now() / 300) + xOffset) * 2;
        c.beginPath();
        c.arc(xOffset + 30, height - 25 + waveOffset, 8, Math.PI, 0);
        c.stroke();
      }
    };

    const drawClouds = (c: CanvasRenderingContext2D) => {
      // Draw 2 happy cartoon clouds
      const cloudX1 = 120 + Math.sin(Date.now() / 1500) * 15;
      const cloudY1 = 45;
      
      const drawSingleCloud = (x: number, y: number, isDark = false) => {
        c.fillStyle = isDark ? "#475569" : "#f1f5f9";
        c.shadowColor = "rgba(0, 0, 0, 0.15)";
        c.shadowBlur = 6;
        
        c.beginPath();
        c.arc(x, y, 16, 0, Math.PI * 2);
        c.arc(x + 20, y - 8, 20, 0, Math.PI * 2);
        c.arc(x + 42, y, 15, 0, Math.PI * 2);
        c.rect(x, y - 6, 42, 22);
        c.closePath();
        c.fill();
        
        c.shadowBlur = 0; // reset

        // Draw cute cloud smiling eyes & mouth
        c.strokeStyle = "#1e293b";
        c.lineWidth = 1.5;
        // Eyes
        c.beginPath();
        c.arc(x + 13, y + 2, 2, 0, Math.PI * 2);
        c.arc(x + 27, y + 2, 2, 0, Math.PI * 2);
        c.fillStyle = "#1e293b";
        c.fill();
        // Happy mouth
        c.beginPath();
        c.arc(x + 20, y + 5, 3.5, 0, Math.PI);
        c.stroke();
      };

      // cloud 1
      drawSingleCloud(cloudX1, cloudY1, state === "precipitation");
      // cloud 2
      drawSingleCloud(240 - Math.sin(Date.now() / 2000) * 10, 35, state === "precipitation");
    };

    // Main physics particle loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear & Redraw Landscape background
      drawLandscape(ctx);

      const pArr = particlesRef.current;

      // Particle generator based on active state
      if (isPlaying) {
        if (state === "evaporation") {
          // Spawn rising vapor particles
          const spawnCount = Math.ceil(heatLevel / 20);
          for (let i = 0; i < spawnCount; i++) {
            if (pArr.length < 120 && Math.random() < 0.18) {
              pArr.push({
                x: Math.random() * (width - 100) + 40,
                y: height - 30,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(Math.random() * 0.7 + 0.4) * (1 + heatLevel / 100),
                size: Math.random() * 3 + 2,
                alpha: 0.85,
                life: 0,
                maxLife: 150 + Math.random() * 80,
                color: "rgba(186, 230, 253, " // sky blue vapor
              });
            }
          }
        } else if (state === "precipitation") {
          // Spawn falling rain or snow depending on heat level
          const rainCount = 4;
          for (let i = 0; i < rainCount; i++) {
            if (pArr.length < 180 && Math.random() < 0.35) {
              const isSnow = heatLevel < 25;
              pArr.push({
                x: Math.random() * (width - 150) + 80,
                y: 35,
                vx: isSnow ? (Math.random() - 0.5) * 0.5 : -0.2, // snow drifts, rain falls fast
                vy: isSnow ? Math.random() * 0.4 + 0.4 : Math.random() * 2.5 + 2.5,
                size: isSnow ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 1,
                alpha: 0.9,
                life: 0,
                maxLife: 120,
                color: isSnow ? "rgba(255, 255, 255, " : "rgba(56, 189, 248, " // snow vs rain
              });
            }
          }
        } else if (state === "collection" || state === "condensation") {
          // Cute drifting breeze particles
          if (pArr.length < 25 && Math.random() < 0.05) {
            pArr.push({
              x: 0,
              y: Math.random() * (height - 80) + 20,
              vx: Math.random() * 0.8 + 0.4,
              vy: (Math.random() - 0.5) * 0.15,
              size: Math.random() * 2 + 1,
              alpha: 0.6,
              life: 0,
              maxLife: 300,
              color: "rgba(255, 255, 255, "
            });
          }
        }
      }

      // Update & Draw particles
      for (let i = pArr.length - 1; i >= 0; i--) {
        const p = pArr[i];
        
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;
          p.life++;
          
          // Custom fade effects
          if (state === "evaporation") {
            p.alpha = Math.max(0, 1 - (p.life / p.maxLife));
          } else if (state === "precipitation") {
            // Die once hitting the water surface
            if (p.y >= height - 25) {
              p.life = p.maxLife; // trigger removal
              // Add a cute splash ring
              ctx.strokeStyle = p.color + "0.35)";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.arc(p.x, height - 25, 4, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }

        // Draw particle
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (p.life >= p.maxLife || p.x < 0 || p.x > width || p.y > height) {
          pArr.splice(i, 1);
        }
      }

      // 6. Draw Clouds on top of particles
      drawClouds(ctx);

      // Display Localized Mode Watermarks
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.font = "800 12px sans-serif";
      ctx.textAlign = isAr ? "right" : "left";
      ctx.fillText(
        isAr ? "مُحاكاة دورة المياه 💧" : "Water Cycle Simulator 💧",
        isAr ? width - 15 : 15,
        height - 10
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [state, heatLevel, isPlaying, locale]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950/70 backdrop-blur-md shadow-2xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
