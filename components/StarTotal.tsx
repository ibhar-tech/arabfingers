"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { totalStars } from "@/lib/progress";

/**
 * Child-facing star total for the homepage. Stars live in localStorage, so the
 * count is read after mount only — server HTML stays neutral, which both avoids
 * hydration mismatches and keeps the chip invisible to first-time visitors
 * (nothing to celebrate yet). Re-reads on window focus, so coming back from a
 * game session updates the number without a reload.
 */
export function StarTotal({ locale }: { locale: string }) {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const read = () => setStars(totalStars());
    read();
    window.addEventListener("focus", read);
    return () => window.removeEventListener("focus", read);
  }, []);

  if (stars === 0) return null;

  const isAr = locale === "ar";
  return (
    <Link
      href={`/${locale}/games`}
      className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-4 py-1.5 text-sm font-extrabold text-ink shadow-[3px_3px_0_0_var(--ink)] transition hover:bg-saffron-soft"
    >
      <Star className="h-4 w-4 text-saffron" fill="currentColor" aria-hidden />
      {isAr
        ? `عندك ${stars} ${stars === 1 ? "نجمة" : "نجمات"} — واصل!`
        : `${stars} ${stars === 1 ? "star" : "stars"} earned so far!`}
    </Link>
  );
}
