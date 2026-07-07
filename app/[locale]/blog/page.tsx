import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { blogPosts } from "@/lib/blog-data";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/blog", {
    titleEn: "ArabFingers Blog — Arabic Learning Tips & Insights",
    titleAr: "مدونة عرب فنجرز — نصائح ورؤى حول تعلم العربية",
    descriptionEn:
      "Expert articles on teaching Arabic to children, bilingual parenting, Arabic calligraphy, screen time guidelines, and more. Updated regularly with fresh insights.",
    descriptionAr:
      "مقالات متخصصة حول تعليم العربية للأطفال، والتربية ثنائية اللغة، والخط العربي، وإرشادات وقت الشاشة، والمزيد. نحدّثها باستمرار برؤى جديدة.",
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <Breadcrumbs
        locale={locale}
        crumbs={[{ label: isAr ? "المدونة" : "Blog", href: `/${locale}/blog` }]}
      />

      <h1 className="font-display text-3xl font-semibold text-ink mb-2">
        {isAr ? "مدونة عرب فنجرز" : "ArabFingers Blog"}
      </h1>
      <p className="text-sm text-ink/50 mb-4">
        {isAr
          ? "مقالات ونصائح حول تعليم العربية للأطفال، التربية ثنائية اللغة، والمزيد"
          : "Articles and tips on teaching Arabic to kids, bilingual parenting, and more"}
      </p>
      <p className="text-sm text-ink/75 leading-relaxed mb-10">
        {isAr
          ? "مرحباً بك في مدونة عرب فنجرز. هنا نشارك رؤى مبنية على الأبحاث حول تعليم الأطفال الصغار اللغة العربية، وفوائد ثنائية اللغة، وأنشطة عملية يمكنك تجربتها في المنزل. نؤمن بأن كل طفل يستحق فرصة التواصل مع اللغة العربية — وهذه المقالات هنا لمساعدتك في تحقيق ذلك."
          : "Welcome to the ArabFingers blog. Here we share research-backed insights on teaching young children Arabic, the benefits of bilingualism, and practical activities you can try at home. We believe every child deserves the chance to connect with the Arabic language — and these articles are here to help you make that happen."}
      </p>

      <div className="space-y-4 mb-10">
        {blogPosts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className={`group block card-stock ${["card-stock-saffron", "card-stock-qalam", "card-stock-rose", "card-stock-violet"][i % 4]} p-5 transition hover:-translate-y-0.5`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl shrink-0 mt-0.5">{post.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base font-semibold text-ink mb-1 group-hover:text-accent transition-colors">
                  {isAr ? post.titleAr : post.titleEn}
                </h2>
                <p className="text-sm text-ink/75 leading-relaxed mb-2">
                  {isAr ? post.descAr : post.descEn}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-ink/40">
                  <span>{isAr ? post.readingTimeAr : post.readingTimeEn}</span>
                  <span>·</span>
                  <time dateTime={post.datePublished}>
                    {new Date(post.datePublished).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.dateModified !== post.datePublished && (
                    <>
                      <span>·</span>
                      <span>
                        {isAr ? "محدث: " : "Updated: "}
                        {new Date(post.dateModified).toLocaleDateString(isAr ? "ar-SA" : "en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="font-display text-xl font-semibold text-ink mb-3">
          {isAr ? "أدلة التعلم" : "Learning Guides"}
        </h2>
        <p className="text-sm text-ink/75 mb-4">
          {isAr
            ? "بالإضافة إلى المدونة، لدينا أدلة تعليمية شاملة لمساعدتك في تعليم طفلك العربية."
            : "In addition to the blog, we have comprehensive learning guides to help you teach your child Arabic."}
        </p>
        <Link
          href={`/${locale}/learn`}
          className="text-sm text-accent underline hover:text-accent/80 transition-colors"
        >
          {isAr ? "استكشف جميع الأدلة ←" : "Explore all guides →"}
        </Link>
      </section>

      <div className="text-center py-6">
        <Link
          href={`/${locale}/play`}
          className="btn-chunky text-base"
        >
          🚀 {isAr ? "جرب عرب فنجرز الآن" : "Try ArabFingers Now"}
        </Link>
      </div>
    </PageLayout>
  );
}
