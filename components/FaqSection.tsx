type FaqItem = { q: string; a: string };

/**
 * Visible Q&A (native <details>, no JS, fully in the DOM for crawlers) plus
 * FAQPage JSON-LD. Targets the long-tail question queries a page already ranks
 * for, to win "People also ask" / featured snippets. Answers must be plain text.
 */
export function FaqSection({
  title,
  items,
  locale,
}: {
  title: string;
  items: FaqItem[];
  locale: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="mb-10" dir={locale === "ar" ? "rtl" : "ltr"}>
      <h2 className="text-xl font-semibold text-ink mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((it) => (
          <details
            key={it.q}
            className="card-stock rounded-xl border border-ink/10 bg-white/5 px-4 py-3 group"
          >
            <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden flex items-center justify-between gap-3">
              <span>{it.q}</span>
              <span className="text-accent transition-transform group-open:rotate-45 shrink-0">+</span>
            </summary>
            <p className="text-sm text-ink/75 leading-relaxed mt-2">{it.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
