"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParticleSimulatorProps {
  state: "solid" | "liquid" | "gas" | "plasma";
  temperature?: number; // 0 (Freezing) to 100 (Extremely Hot)
  isPlaying?: boolean;
  interactive?: boolean;
  locale?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  anchorX: number; // For solid state grid anchoring
  anchorY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  expression: "smile" | "blink" | "dizzy" | "excited";
  expressionTimer: number;
  rotation: number;
  rotSpeed: number;
  trail: { x: number; y: number }[];
}

export default function ParticleSimulator({
  state,
  temperature = 50,
  isPlaying = true,
  interactive = true,
  locale = "ar",
}: ParticleSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickPops, setClickPops] = useState<{ x: number; y: number; text: string; timer: number }[]>([]);

  const isAr = locale === "ar";

  // Re-initialize particles when the active state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const count = state === "solid" ? 64 : state === "liquid" ? 45 : state === "gas" ? 25 : 20;
    const newParticles: Particle[] = [];

    if (state === "solid") {
      // Solid: Create a tightly-knit 8x8 grid centered in the middle of the canvas
      const rows = 8;
      const cols = 8;
      const spacingX = 24;
      const spacingY = 24;
      const startX = (width - cols * spacingX) / 2 + spacingX / 2;
      const startY = (height - rows * spacingY) / 2 + spacingY / 2;

      let id = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * spacingX;
          const y = startY + r * spacingY;
          newParticles.push({
            id: id++,
            x,
            y,
            anchorX: x,
            anchorY: y,
            vx: 0,
            vy: 0,
            radius: 9,
            color: "#60A5FA", // Beautiful ice blue
            expression: Math.random() > 0.85 ? "blink" : "smile",
            expressionTimer: 0,
            rotation: 0,
            rotSpeed: 0,
            trail: [],
          });
        }
      }
    } else {
      // Liquid, Gas, Plasma: Random scatter in boundaries
      for (let i = 0; i < count; i++) {
        const radius = state === "gas" ? 11 : state === "plasma" ? 10 : 10;
        const x = radius + Math.random() * (width - radius * 2);
        const y = radius + Math.random() * (height - radius * 2);
        
        // Speed scaling based on temperature
        const baseSpeed = state === "liquid" ? 1.2 : state === "gas" ? 3.5 : 5.0;
        const angle = Math.random() * Math.PI * 2;
        const speed = baseSpeed * (0.3 + temperature / 75);

        let color = "#2DD4BF"; // Liquid aqua
        if (state === "gas") color = "#F87171"; // Gas warm red
        if (state === "plasma") color = "#C084FC"; // Plasma electric violet

        newParticles.push({
          id: i,
          x,
          y,
          anchorX: x,
          anchorY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          color,
          expression: Math.random() > 0.8 ? "blink" : "smile",
          expressionTimer: 0,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
          trail: [],
        });
      }
    }

    setParticles(newParticles);
    setClickPops([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Main physics loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const updatePhysics = () => {
      if (!isPlaying) return;

      // Speed multipliers based on temperature slider
      const tempFactor = 0.3 + (temperature / 100) * 2.2;

      setParticles((prevParticles) => {
        const next = prevParticles.map((p) => {
          const { anchorX, anchorY, rotSpeed } = p;
          let { x, y, vx, vy, expression, expressionTimer, rotation, trail } = p;

          // expressionTimer handling
          if (expressionTimer > 0) {
            expressionTimer--;
            if (expressionTimer === 0) {
              expression = "smile";
            }
          } else if (Math.random() > 0.995) {
            // Randomly blink
            expression = "blink";
            expressionTimer = 25;
          }

          if (state === "solid") {
            // Vibration around anchor based on temperature
            const amp = 0.8 + (temperature / 100) * 4.8;
            x = anchorX + (Math.random() - 0.5) * amp;
            y = anchorY + (Math.random() - 0.5) * amp;
            vx = 0;
            vy = 0;
          } else if (state === "liquid") {
            // Liquid: Slow drifting, bounce off walls, and slight gravity pull to bottom
            const gravity = 0.04;
            vy += gravity;

            // Apply friction/drag to prevent infinite velocity
            vx *= 0.99;
            vy *= 0.99;

            x += vx * tempFactor;
            y += vy * tempFactor;

            // Boundary collision with bottom, top, left, right
            if (x < p.radius) {
              x = p.radius;
              vx = -vx * 0.8;
            } else if (x > width - p.radius) {
              x = width - p.radius;
              vx = -vx * 0.8;
            }

            if (y < p.radius) {
              y = p.radius;
              vy = -vy * 0.8;
            } else if (y > height - p.radius) {
              y = height - p.radius;
              vy = -vy * 0.8;
              // Add a bit of horizontal friction when sliding on bottom
              vx *= 0.95;
            }

            rotation += rotSpeed * tempFactor;
          } else if (state === "gas") {
            // Gas: Fast bounce off walls, flying in all directions
            x += vx * tempFactor;
            y += vy * tempFactor;

            if (x < p.radius) {
              x = p.radius;
              vx = -vx;
            } else if (x > width - p.radius) {
              x = width - p.radius;
              vx = -vx;
            }

            if (y < p.radius) {
              y = p.radius;
              vy = -vy;
            } else if (y > height - p.radius) {
              y = height - p.radius;
              vy = -vy;
            }

            rotation += rotSpeed * tempFactor;
          } else if (state === "plasma") {
            // Plasma: Extreme speed, erratic movement, trails
            // Add a tiny random force to make movement erratic (ionized)
            vx += (Math.random() - 0.5) * 0.6;
            vy += (Math.random() - 0.5) * 0.6;

            // Keep speed clamped
            const speed = Math.sqrt(vx * vx + vy * vy);
            const maxSpeed = 7 * tempFactor;
            if (speed > maxSpeed) {
              vx = (vx / speed) * maxSpeed;
              vy = (vy / speed) * maxSpeed;
            }

            x += vx;
            y += vy;

            if (x < p.radius) {
              x = p.radius;
              vx = -vx;
            } else if (x > width - p.radius) {
              x = width - p.radius;
              vx = -vx;
            }

            if (y < p.radius) {
              y = p.radius;
              vy = -vy;
            } else if (y > height - p.radius) {
              y = height - p.radius;
              vy = -vy;
            }

            // Manage trails
            trail = [...trail, { x, y }].slice(-6);

            rotation += rotSpeed * 1.5 * tempFactor;
          }

          return { ...p, x, y, vx, vy, expression, expressionTimer, rotation, trail };
        });

        // Simple elastic collision between particles (for non-solid states)
        if (state !== "solid") {
          for (let i = 0; i < next.length; i++) {
            for (let j = i + 1; j < next.length; j++) {
              const p1 = next[i];
              const p2 = next[j];
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const minDist = p1.radius + p2.radius;

              if (dist < minDist) {
                // Overlap resolution
                const overlap = minDist - dist;
                const forceX = (dx / dist) * overlap * 0.5;
                const forceY = (dy / dist) * overlap * 0.5;

                if (state === "liquid") {
                  next[i].x -= forceX * 0.5;
                  next[i].y -= forceY * 0.5;
                  next[j].x += forceX * 0.5;
                  next[j].y += forceY * 0.5;
                } else {
                  next[i].x -= forceX;
                  next[i].y -= forceY;
                  next[j].x += forceX;
                  next[j].y += forceY;
                }

                // Elastic collision velocity swap
                const normalX = dx / dist;
                const normalY = dy / dist;
                const kx = p1.vx - p2.vx;
                const ky = p1.vy - p2.vy;
                const p = 2 * (normalX * kx + normalY * ky) / 2;

                next[i].vx -= p * normalX;
                next[i].vy -= p * normalY;
                next[j].vx += p * normalX;
                next[j].vy += p * normalY;
              }
            }
          }
        }

        return next;
      });

      // Update click pops timer
      setClickPops((prev) =>
        prev
          .map((pop) => ({ ...pop, y: pop.y - 0.7, timer: pop.timer - 1 }))
          .filter((pop) => pop.timer > 0)
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw specialized backgrounds based on state
      if (state === "solid") {
        // Frosty gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#1E293B");
        grad.addColorStop(1, "#0F172A");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw ICE structure connections (holding hands)
        ctx.strokeStyle = "rgba(147, 197, 253, 0.25)";
        ctx.lineWidth = 1.5;
        // Connect rows and columns
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          // Find adjacent particles in grid
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // Draw connection if close enough (horizontal or vertical adjacent)
            if (dist < 28) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      } else if (state === "liquid") {
        // Underwater-like gradient
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#0F172A");
        grad.addColorStop(1, "#115E59");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        
        // Bubbles in background floating up
        ctx.fillStyle = "rgba(45, 212, 191, 0.08)";
        for (let b = 0; b < 5; b++) {
          const bx = (Math.sin(Date.now() / 1000 + b) * 30) + (width / 5) * b + 30;
          const by = (Date.now() / 15 + b * 60) % (height + 20);
          ctx.beginPath();
          ctx.arc(bx, height - by, 6 + b, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (state === "gas") {
        // Steam gradient
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#450A0A");
        grad.addColorStop(1, "#0F172A");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else if (state === "plasma") {
        // Electric glow stars night background
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#3B0764");
        grad.addColorStop(1, "#090514");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Draw some little electrical arcs in the background
        if (Math.random() > 0.88 && particles.length > 2) {
          ctx.strokeStyle = "rgba(192, 132, 252, 0.4)";
          ctx.lineWidth = 1;
          const idx1 = Math.floor(Math.random() * particles.length);
          const idx2 = Math.floor(Math.random() * particles.length);
          if (idx1 !== idx2) {
            const p1 = particles[idx1];
            const p2 = particles[idx2];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              // Draw a zig-zag lightning line
              const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 20;
              const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 20;
              ctx.lineTo(midX, midY);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw each particle
      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw Trails (for Plasma ionized neon effect)
        if (state === "plasma" && p.trail.length > 1) {
          ctx.restore(); // Temp restore to use absolute coordinates
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = "rgba(192, 132, 252, 0.35)";
          ctx.lineWidth = p.radius * 1.4;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
          ctx.restore();
          
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
        }

        // 1. Particle Base Body (Glow or Standard Circle)
        ctx.shadowBlur = state === "plasma" ? 14 : state === "solid" ? 4 : 2;
        ctx.shadowColor = p.color;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // 2. Highlighting/Glossy overlay
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath();
        ctx.arc(-p.radius * 0.3, -p.radius * 0.3, p.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // 3. Cute Outfit Accessories!
        if (state === "liquid") {
          // Tiny Swim Goggles (Cyan strap and white frames)
          ctx.strokeStyle = "#0891B2";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(-p.radius * 0.7, -p.radius * 0.1);
          ctx.lineTo(p.radius * 0.7, -p.radius * 0.1);
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(-p.radius * 0.3, -p.radius * 0.1, p.radius * 0.22, 0, Math.PI * 2);
          ctx.arc(p.radius * 0.3, -p.radius * 0.1, p.radius * 0.22, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (state === "gas") {
          // Tiny Superhero Cape! (Red cape hanging behind)
          ctx.fillStyle = "#EF4444";
          ctx.beginPath();
          ctx.moveTo(-p.radius * 0.5, p.radius * 0.5);
          ctx.lineTo(-p.radius * 1.3, p.radius * 1.3);
          ctx.lineTo(p.radius * 0.1, p.radius * 1.1);
          ctx.closePath();
          ctx.fill();
        } else if (state === "plasma") {
          // Tiny Crown of Electricity! (Yellow three points crown on head)
          ctx.fillStyle = "#FBBF24";
          ctx.beginPath();
          ctx.moveTo(-p.radius * 0.5, -p.radius * 0.8);
          ctx.lineTo(-p.radius * 0.6, -p.radius * 1.4);
          ctx.lineTo(-p.radius * 0.2, -p.radius * 1.0);
          ctx.lineTo(0, -p.radius * 1.6);
          ctx.lineTo(p.radius * 0.2, -p.radius * 1.0);
          ctx.lineTo(p.radius * 0.6, -p.radius * 1.4);
          ctx.lineTo(p.radius * 0.5, -p.radius * 0.8);
          ctx.closePath();
          ctx.fill();
        }

        // 4. Draw Faces (Eyes and mouth)
        ctx.fillStyle = "#0F172A"; // Dark eyes/mouth
        
        // Eyes depending on expression
        if (p.expression === "blink") {
          // Horizontal blinking lines
          ctx.strokeStyle = "#0F172A";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-p.radius * 0.45, 0);
          ctx.lineTo(-p.radius * 0.15, 0);
          ctx.moveTo(p.radius * 0.15, 0);
          ctx.lineTo(p.radius * 0.45, 0);
          ctx.stroke();
        } else if (p.expression === "dizzy") {
          // Little crosses for dizzy
          ctx.strokeStyle = "#0F172A";
          ctx.lineWidth = 1.2;
          // Left eye X
          ctx.beginPath();
          ctx.moveTo(-p.radius * 0.4, -p.radius * 0.15);
          ctx.lineTo(-p.radius * 0.2, p.radius * 0.05);
          ctx.moveTo(-p.radius * 0.2, -p.radius * 0.15);
          ctx.lineTo(-p.radius * 0.4, p.radius * 0.05);
          // Right eye X
          ctx.moveTo(p.radius * 0.2, -p.radius * 0.15);
          ctx.lineTo(p.radius * 0.4, p.radius * 0.05);
          ctx.moveTo(p.radius * 0.4, -p.radius * 0.15);
          ctx.lineTo(p.radius * 0.2, p.radius * 0.05);
          ctx.stroke();
        } else if (p.expression === "excited") {
          // Glowing star eyes or happy curves
          ctx.strokeStyle = "#0F172A";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          // Curves up
          ctx.arc(-p.radius * 0.3, 0, p.radius * 0.12, Math.PI, 0);
          ctx.arc(p.radius * 0.3, 0, p.radius * 0.12, Math.PI, 0);
          ctx.stroke();
        } else {
          // Standard smiling eyes (black dots)
          ctx.beginPath();
          ctx.arc(-p.radius * 0.3, 0, p.radius * 0.12, 0, Math.PI * 2);
          ctx.arc(p.radius * 0.3, 0, p.radius * 0.12, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cute Smiling Mouth
        if (p.expression === "excited") {
          // Big laughing open mouth
          ctx.fillStyle = "#991B1B";
          ctx.beginPath();
          ctx.arc(0, p.radius * 0.3, p.radius * 0.2, 0, Math.PI);
          ctx.fill();
        } else if (p.expression === "dizzy") {
          // Confused straight line
          ctx.strokeStyle = "#0F172A";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-p.radius * 0.25, p.radius * 0.35);
          ctx.lineTo(p.radius * 0.25, p.radius * 0.3);
          ctx.stroke();
        } else {
          // Cute little happy curved line
          ctx.strokeStyle = "#0F172A";
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(0, p.radius * 0.1, p.radius * 0.25, 0.1 * Math.PI, 0.9 * Math.PI);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Draw Click Interaction Word Pops
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "bold 13px 'var(--font-ibm-plex-arabic)', 'Fredoka', sans-serif";
      ctx.textAlign = "center";
      clickPops.forEach((pop) => {
        ctx.save();
        // Text backdrop pill for readability
        ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
        const textWidth = ctx.measureText(pop.text).width;
        ctx.beginPath();
        ctx.roundRect(pop.x - textWidth / 2 - 8, pop.y - 14, textWidth + 16, 22, 6);
        ctx.fill();

        ctx.fillStyle = "#FBBF24";
        ctx.fillText(pop.text, pop.x, pop.y + 2);
        ctx.restore();
      });

      updatePhysics();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, isPlaying, temperature, state, clickPops]);

  // Click on Canvas handles particle exciting and cute words
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;

    // Find closest particle
    let closestIndex = -1;
    let minDist = Infinity;
    particles.forEach((p, idx) => {
      const dx = p.x - clickX;
      const dy = p.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = idx;
      }
    });

    if (closestIndex !== -1 && minDist < 35) {
      // Excite this particle!
      setParticles((prev) =>
        prev.map((p, idx) => {
          if (idx === closestIndex) {
            // Apply bounce force
            const angle = Math.random() * Math.PI * 2;
            const force = state === "solid" ? 0 : 5;
            return {
              ...p,
              vx: Math.cos(angle) * force,
              vy: Math.sin(angle) * force - 2,
              expression: "excited",
              expressionTimer: 90, // remain excited for 1.5 seconds
            };
          }
          return p;
        })
      );

      // Add a visual kid-friendly pop!
      const wordsAr = ["ياي! 🎉", "أنا أتحرك! 💨", "رائع! ✨", "مرحباً! 👋", "حرارة! 🔥"];
      const wordsEn = ["Yay! 🎉", "I'm moving! 💨", "Cool! ✨", "Hello! 👋", "Heat! 🔥"];
      const pool = isAr ? wordsAr : wordsEn;
      const randomWord = pool[Math.floor(Math.random() * pool.length)];

      setClickPops((prev) => [
        ...prev,
        {
          x: clickX,
          y: clickY - 15,
          text: randomWord,
          timer: 60, // frames duration
        },
      ]);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative rounded-2xl overflow-hidden shadow-inner border border-white/10">
      <canvas
        ref={canvasRef}
        width={480}
        height={270}
        onClick={handleCanvasClick}
        className="w-full h-full block bg-slate-900 cursor-pointer"
      />
      {interactive && (
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] text-white/80 px-2 py-0.5 rounded-full pointer-events-none select-none border border-white/5">
          {isAr ? "👆 اضغط على الجزيئات للمرح!" : "👆 Click particles for fun!"}
        </div>
      )}
    </div>
  );
}
