import Link from "next/link";

export type RelatedArticle = {
  href: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
};

export function RelatedArticles({ locale, articles }: { locale: string; articles: RelatedArticle[] }) {
  const isAr = locale === "ar";

  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t-[2.5px] border-ink/10 pt-10">
      <h2 className="font-display text-2xl font-bold text-ink mb-6">
        {isAr ? "مقالات ذات صلة" : "Related Articles"}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {articles.map((article, i) => (
          <Link
            key={article.href}
            href={article.href}
            className={`group block card-stock ${["card-stock-saffron", "card-stock-qalam", "card-stock-rose", "card-stock-violet"][i % 4]} p-5 transition hover:-translate-y-0.5`}
          >
            <h3 className="font-display text-base font-semibold text-ink mb-2 group-hover:text-accent transition-colors">
              {isAr ? article.titleAr : article.titleEn}
            </h3>
            <p className="text-sm text-ink/75 leading-relaxed">
              {isAr ? article.descAr : article.descEn}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
