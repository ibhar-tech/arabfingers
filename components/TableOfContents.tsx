"use client";

type TOCItem = {
  id: string;
  text: string;
};

type TableOfContentsProps = {
  locale: string;
  items: TOCItem[];
};

export function TableOfContents({ locale, items }: TableOfContentsProps) {
  const isAr = locale === "ar";
  if (!items || items.length === 0) return null;

  return (
    <div className="card-stock card-stock-qalam p-5 mb-8 max-w-md">
      {/* h2, not h3: this sits directly under the article's h1, and an h3 there
          skips a level, which reads as a hole in the outline to screen readers. */}
      <h2 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink mb-3">
        {isAr ? "جدول المحتويات" : "Table of Contents"}
      </h2>
      <nav aria-label="Table of contents">
        <ul className="space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="font-semibold text-ink/65 hover:text-qalam transition-colors hover:underline"
              >
                {isAr ? "• " : "• "}{item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
