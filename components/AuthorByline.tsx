import Link from "next/link";
import Image from "next/image";

export const AUTHOR_NAME = "Aissa Trad";
export const BYLINE_NAME = "IBHAR TECH LEARNING";
export const AUTHOR_EMAIL = "ibhartech39@gmail.com";
// Placeholder avatar — replace /public/author.svg (or point this to /author.jpg) with a real photo.
export const AUTHOR_PHOTO = "/author.svg";

type AuthorBylineProps = {
  locale: string;
  datePublished?: string;
  dateModified?: string;
};

function formatDate(date: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

/** Visible byline shown on blog & learn articles — links to the author profile page (E-E-A-T). */
export function AuthorByline({ locale, datePublished, dateModified }: AuthorBylineProps) {
  const isAr = locale === "ar";
  return (
    <div className="flex items-center gap-3 border-y-2 border-ink/10 py-4 my-6">
      <Image
        src={AUTHOR_PHOTO}
        alt={BYLINE_NAME}
        width={44}
        height={44}
        unoptimized
        className="h-11 w-11 rounded-full object-cover border-2 border-ink bg-saffron-soft"
      />
      <div className="text-sm">
        <div className="text-ink/70 font-semibold">
          {isAr ? "بقلم " : "By "}
          <Link href={`/${locale}/author`} className="font-extrabold text-ink hover:text-qalam transition">
            {BYLINE_NAME}
          </Link>
        </div>
        <div className="text-xs text-ink/55">
          {datePublished && (
            <span>
              {isAr ? "نُشر " : "Published "}
              {formatDate(datePublished, locale)}
            </span>
          )}
          {dateModified && dateModified !== datePublished && (
            <span>
              {" · "}
              {isAr ? "حُدّث " : "Updated "}
              {formatDate(dateModified, locale)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
