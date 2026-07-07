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
      <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink mb-3">
        {isAr ? "جدول المحتويات" : "Table of Contents"}
      </h3>
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
