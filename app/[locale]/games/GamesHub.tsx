"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { arabicLetters } from "@/lib/arabicMap";
import { getProgress, coloredCount, totalStars } from "@/lib/progress";

/**
 * The /games hub. A friendly grid of the activities, each showing how many stars the
 * child has earned so far (read from localStorage — no account, no backend).
 */

const TOTAL = arabicLetters.length;

type Activity = {
  href: string;
  emoji: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  /** How to show the badge: a star count out of 28, or a plain label. */
  count: (p: { traced: number; tapped: number; colored: number }) => string | null;
};

const activities: Activity[] = [
  {
    href: "/games/trace",
    emoji: "✏️",
    titleEn: "Trace the letters",
    titleAr: "تتبّع الحروف",
    descEn: "Follow the dotted shape with your finger and earn a star.",
    descAr: "اتبع الشكل المنقّط بإصبعك واكسب نجمة.",
    count: (p) => `${p.traced}/${TOTAL}`,
  },
  {
    href: "/games/tap",
    emoji: "👂",
    titleEn: "Tap the letter",
    titleAr: "انقر الحرف",
    descEn: "Hear a letter and tap the shape that matches.",
    descAr: "استمع إلى حرف وانقر شكله المطابق.",
    count: (p) => `${p.tapped}/${TOTAL}`,
  },
  {
    href: "/coloring",
    emoji: "🎨",
    titleEn: "Colour the letters",
    titleAr: "لوّن الحروف",
    descEn: "Paint each letter with colours and stickers.",
    descAr: "لوّن كلّ حرف بالألوان والملصقات.",
    count: (p) => `${p.colored}/${TOTAL}`,
  },
  {
    href: "/play",
    emoji: "⌨️",
    titleEn: "Letter keyboard",
    titleAr: "لوحة الحروف",
    descEn: "No rules, no score — press or tap any letter and hear it said aloud.",
    descAr: "بلا قواعد ولا نقاط — اضغط أو المس أيّ حرف لتسمع نطقه.",
    count: () => null,
  },
];

export function GamesHub({ locale }: { locale: string }) {
  const params = useParams();
  const isAr = (params?.locale ?? locale) === "ar";

  // localStorage is client-only; render neutral until mounted to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ traced: 0, tapped: 0, colored: 0, total: 0 });

  useEffect(() => {
    const p = getProgress();
    setStats({ traced: p.traced.length, tapped: p.tapped.length, colored: coloredCount(), total: totalStars() });
    setMounted(true);
  }, []);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-4xl px-5 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {isAr ? "الألعاب" : "Games"}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-ink/70">
          {isAr
            ? "ألعاب قصيرة مجانية تعلّم الحروف العربية بالتتبّع والاستماع واللعب. لا تحميل ولا حساب."
            : "Short, free games that teach the Arabic letters by tracing, listening and playing. No download, no account."}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-card px-5 py-2 font-display text-lg font-extrabold text-ink shadow-[0_3px_0_0_var(--ink)]">
          <span className="text-xl">⭐</span>
          {mounted
            ? isAr
              ? `عندك ${stats.total} نجمة`
              : `You have ${stats.total} ${stats.total === 1 ? "star" : "stars"}`
            : isAr
              ? "نجماتك"
              : "Your stars"}
        </div>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {activities.map((a) => {
          const badge = mounted ? a.count({ traced: stats.traced, tapped: stats.tapped, colored: stats.colored }) : null;
          return (
            <Link
              key={a.href}
              href={`/${locale}${a.href}`}
              className="card-stock group flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:border-qalam"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-saffron-soft text-4xl transition group-hover:scale-110">
                {a.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-lg font-extrabold text-ink">{isAr ? a.titleAr : a.titleEn}</h2>
                  {badge ? (
                    <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-xs font-extrabold text-card">
                      ⭐ {badge}
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border-2 border-ink/15 px-2.5 py-1 text-xs font-extrabold text-ink/50">
                      {isAr ? "لعب حرّ" : "Free play"}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{isAr ? a.descAr : a.descEn}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
