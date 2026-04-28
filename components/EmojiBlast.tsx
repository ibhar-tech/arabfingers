"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { themes } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

type BurstEmoji = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotate: number;
  duration: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function EmojiBlast() {
  const currentKey = useAppStore((state) => state.currentKey);
  const theme = useAppStore((state) => state.theme);
  const reduceMotion = useAppStore((state) => state.reduceMotion);
  const [bursts, setBursts] = useState<BurstEmoji[]>([]);

  useEffect(() => {
    if (!currentKey) {
      return;
    }

    const pool = themes[theme].emojis;
    const count = reduceMotion ? 2 : Math.floor(randomBetween(3, 6));

    const nextBursts = Array.from({ length: count }, (_, index) => {
      const angle = randomBetween(0, Math.PI * 2);
      const distance = randomBetween(50, 100) * (reduceMotion ? 0.6 : 1);

      return {
        id: `${currentKey.id}-${index}-${Math.random().toString(36).slice(2, 7)}`,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        x: currentKey.x,
        y: currentKey.y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        rotate: randomBetween(-32, 32),
        duration: reduceMotion ? 0.35 : 0.6,
      };
    });

    setBursts((previous) => [...previous, ...nextBursts].slice(-40));
  }, [currentKey, theme, reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0.7, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.35,
              x: burst.dx,
              y: burst.dy,
              rotate: burst.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: burst.duration, ease: "easeOut" }}
            onAnimationComplete={() => {
              setBursts((previous) =>
                previous.filter((item) => item.id !== burst.id),
              );
            }}
            className="absolute text-2xl sm:text-4xl md:text-5xl"
            style={{ left: burst.x, top: burst.y }}
          >
            {burst.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
