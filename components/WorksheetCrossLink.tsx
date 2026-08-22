import Link from "next/link";

/**
 * Lesson → printable bridge. Every competitor that outranks our learn guides
 * attaches a worksheet to the lesson (bilingualkidspot's colours post,
 * kalimah's handwriting guide). This box makes the pairing explicit and keeps
 * the download one click from the article.
 */
export function WorksheetCrossLink({
  locale,
  packId,
  titleEn,
  titleAr,
  textEn,
  textAr,
}: {
  locale: string;
  /** Worksheet pack id; omit to link the whole library. */
  packId?: string;
  titleEn: string;
  titleAr: string;
  textEn: string;
  textAr: string;
}) {
  const isAr = locale === "ar";
  return (
    <aside className="my-8 rounded-xl border-2 border-ink bg-saffron-soft/40 p-5 flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-display text-base font-extrabold text-ink">
          {isAr ? titleAr : titleEn}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink/75">
          {isAr ? textAr : textEn}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <Link href={`/${locale}/printables${packId ? `/${packId}` : ""}`} className="btn-chunky text-sm">
          📄 {isAr ? "أوراق العمل" : "Get the worksheets"}
        </Link>
        {packId && (
          <a href={`/printables/${packId}.pdf`} download className="btn-chunky btn-chunky-ghost text-sm">
            ⬇ {isAr ? "PDF مباشرةً" : "Direct PDF"}
          </a>
        )}
      </div>
    </aside>
  );
}
