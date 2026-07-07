import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleStructuredData } from "@/components/ArticleStructuredData";
import { AuthorByline } from "@/components/AuthorByline";

type Crumb = { label: string; href?: string };

type ArticleMetaProps = {
  locale: string;
  title: string;
  description: string;
  /** Path after the locale, e.g. "learn/arabic-numbers". */
  slug: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
  crumbs: Crumb[];
};

/**
 * Shared top-of-article block: Article JSON-LD + breadcrumbs + a visible author byline
 * linking to the author profile page. Reused across learn guides for consistent E-E-A-T.
 */
export function ArticleMeta({
  locale,
  title,
  description,
  slug,
  datePublished,
  dateModified,
  section,
  crumbs,
}: ArticleMetaProps) {
  const updatedCrumbs = crumbs.map((crumb, i) => {
    if (i === crumbs.length - 1 && !crumb.href) {
      return { ...crumb, href: `/${locale}/${slug}` };
    }
    return crumb;
  });

  return (
    <>
      <ArticleStructuredData
        title={title}
        description={description}
        slug={slug}
        locale={locale}
        datePublished={datePublished}
        dateModified={dateModified}
        section={section}
      />
      <Breadcrumbs locale={locale} crumbs={updatedCrumbs} />
      <AuthorByline locale={locale} datePublished={datePublished} dateModified={dateModified} />
    </>
  );
}
