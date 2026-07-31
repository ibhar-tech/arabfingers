import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/resources", {
    titleEn: "Recommended Bilingual Learning Resources for Kids",
    titleAr: "مصادر التعلم ثنائية اللغة الموصى بها للأطفال",
    descriptionEn:
      "Explore recommended websites, games, and tools for kids and beginners learning Arabic and English. Hand-picked educational portals.",
    descriptionAr:
      "اكتشف مواقع وألعاب وأدوات موصى بها للأطفال والمبتدئين لتعلم العربية والإنجليزية. منصات تعليمية مختارة بعناية.",
  });
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <Breadcrumbs
        locale={locale}
        crumbs={[{ label: locale === "ar" ? "المصادر" : "Resources", href: `/${locale}/resources` }]}
      />
      {locale === "ar" ? <ResourcesAr /> : <ResourcesEn />}
    </PageLayout>
  );
}

function ResourcesEn() {
  const arabicResources = [
    {
      name: "Madinah Arabic",
      url: "https://www.madinaharabic.com",
      desc: "An incredible free portal offering structured Arabic reading and writing courses, high-quality audio pronunciation keys, and quizzes. Highly recommended for absolute beginners of all ages.",
      badge: "Free Courses",
    },
    {
      name: "Arab Academy",
      url: "https://www.arabacademy.com",
      desc: "One of the most trusted structured learning portals. Offers dedicated, fun curriculum designs for kids and teenagers with gamified lessons, cultural insights, and professional tutoring options.",
      badge: "Kids & Adults",
    },
    {
      name: "Al-Jazeera Learning Arabic",
      url: "https://learning.aljazeera.net",
      desc: "A rich multimedia platform loaded with lessons, interactive sheets, poetry, and beginner articles that help bridge the gap between simple speech and formal Arabic writing.",
      badge: "Multimedia",
    },
  ];

  const kidsResources = [
    {
      name: "TinyFingers",
      url: "https://tinyfingers.net",
      desc: "The original safe keyboard smash toy website for babies and toddlers. Filled with delightful animations and interactive keyboard, mouse, and touch responses.",
      badge: "Keyboard Smash",
    },
    {
      name: "Starfall",
      url: "https://www.starfall.com",
      desc: "An outstanding, research-backed preschool learning website. Teaches English phonics, letter recognition, and early reading through cute, interactive songs and colorful games.",
      badge: "Phonics & Reading",
    },
    {
      name: "PBS KIDS",
      url: "https://pbskids.org",
      desc: "Curriculum-based educational games and videos featuring children's favorite characters. Perfect for developing social-emotional, math, science, and early literacy skills.",
      badge: "Educational Games",
    },
    {
      name: "ABCya",
      url: "https://www.abcya.com",
      desc: "Hundreds of fun, engaging educational games categorized by grade levels (Pre-K to 6+). Focuses on keyboard typing, math, vocabulary, and basic computer science concepts.",
      badge: "Computer Literacy",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-ink">Recommended Educational Resources</h1>
      <p className="mt-1 text-sm text-ink/50">
        Hand-picked, high-quality websites to support your child&apos;s learning journey in Arabic, English, and computer play.
      </p>

      {/* Arabic Learning Resources */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
          <span>📚</span> Arabic Learning for Absolute Beginners
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {arabicResources.map((res) => (
            <div key={res.name} className="group rounded-2xl border border-ink/8 bg-card p-5 transition hover:bg-card hover:border-ink/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2">
                    {res.badge}
                  </span>
                  <h3 className="text-base font-bold text-ink mb-2 group-hover:text-accent transition">
                    <a href={res.url} target="_blank" rel="nofollow noopener noreferrer" className="focus:outline-none focus:underline">
                      {res.name} <span className="inline-block text-xs font-normal opacity-50 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">{res.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Early Play and Early Childhood Resources */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
          <span>🧸</span> Interactive Play & Early Learning
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {kidsResources.map((res) => (
            <div key={res.name} className="group rounded-2xl border border-ink/8 bg-card p-5 transition hover:bg-card hover:border-ink/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2">
                    {res.badge}
                  </span>
                  <h3 className="text-base font-bold text-ink mb-2 group-hover:text-accent transition">
                    <a href={res.url} target="_blank" rel="nofollow noopener noreferrer" className="focus:outline-none focus:underline">
                      {res.name} <span className="inline-block text-xs font-normal opacity-50 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">{res.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-dashed border-ink/15 bg-card p-6 text-center">
        <h3 className="text-sm font-semibold text-ink mb-2">💡 Parent Teaching Tip</h3>
        <p className="text-sm text-ink/75 leading-relaxed max-w-lg mx-auto">
          Combining sensory keyboard games (like <strong>ArabFingers</strong> or <strong>TinyFingers</strong>) with phonics-based reading guides (like <strong>Starfall</strong>) offers a robust foundation. Introduce learning in short, daily, playful blocks rather than formal drilling sessions.
        </p>
      </div>

      <div className="text-center py-8">
        <Link href="/en/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 Ready to Play? Open ArabFingers Free
        </Link>
      </div>
    </>
  );
}

function ResourcesAr() {
  const arabicResources = [
    {
      name: "المدينة للعربية (Madinah Arabic)",
      url: "https://www.madinaharabic.com",
      desc: "بوابة مجانية رائعة تقدم دورات منظمة لتعلم القراءة والكتابة باللغة العربية، بالإضافة إلى ملفات صوتية عالية الجودة لتدريب النطق الصحيح. مناسبة جداً للمبتدئين من جميع الأعمار.",
      badge: "دورات مجانية",
    },
    {
      name: "أكاديمية العرب (Arab Academy)",
      url: "https://www.arabacademy.com",
      desc: "واحدة من أكثر المنصات التعليمية موثوقية. توفر مناهج تعليمية مخصصة وممتعة للأطفال واليافعين تعتمد على الألعاب التفاعلية والدروس الثقافية بإشراف معلمين متخصصين.",
      badge: "للأطفال واليافعين",
    },
    {
      name: "الجزيرة لتعلم العربية",
      url: "https://learning.aljazeera.net",
      desc: "منصة وسائط متعددة ثرية للغاية مليئة بالدروس التفاعلية، أوراق العمل البصرية، المقالات المبسطة، والأنشطة المتنوعة التي تساعد على سد الفجوة بين لغة المحادثة البسيطة واللغة الفصحى.",
      badge: "وسائط متعددة",
    },
  ];

  const kidsResources = [
    {
      name: "تايني فنجرز (TinyFingers)",
      url: "https://tinyfingers.net",
      desc: "موقع ألعاب لوحة المفاتيح الأصلي والآمن تماماً للرضع والأطفال الصغار. مليء بالرسوم المتحركة التفاعلية والاستجابات السريعة للّمس والمفاتيح والمؤشر.",
      badge: "لعبة لوحة المفاتيح",
    },
    {
      name: "ستارفال (Starfall)",
      url: "https://www.starfall.com",
      desc: "موقع ويب متميز لتعليم مرحلة ما قبل المدرسة مدعوم بالأبحاث. يركز على تعليم الصوتيات والتعرف على الحروف الإنجليزية والبدء في القراءة عبر أغانٍ تفاعلية مبهجة وألعاب ملونة.",
      badge: "الصوتيات والقراءة",
    },
    {
      name: "بي بي إس كيدز (PBS KIDS)",
      url: "https://pbskids.org",
      desc: "ألعاب وفيديوهات تعليمية مبنية على المناهج الدراسية وتضم شخصيات الأطفال المفضلة. رائعة لتطوير المهارات الاجتماعية والعاطفية، والرياضيات، والعلوم، والقراءة والكتابة المبكرة.",
      badge: "ألعاب تعليمية",
    },
    {
      name: "إيه بي سي يا (ABCya)",
      url: "https://www.abcya.com",
      desc: "مئات الألعاب التعليمية الممتعة والجذابة المصنفة حسب الصفوف الدراسية (من الروضة وحتى الصف السادس). تركز على الكتابة على لوحة المفاتيح، والرياضيات، وتنمية المفردات اللغوية الأساسية.",
      badge: "مهارات الكمبيوتر",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-ink">مصادر التعلم الموصى بها</h1>
      <p className="mt-1 text-sm text-ink/50">
        مجموعة مختارة بعناية من منصات وألعاب الويب عالية الجودة لدعم مسيرة طفلك التعليمية في اللغتين العربية والإنجليزية.
      </p>

      {/* Arabic Learning Resources */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
          <span>📚</span> تعلم اللغة العربية للمبتدئين تماماً
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {arabicResources.map((res) => (
            <div key={res.name} className="group rounded-2xl border border-ink/8 bg-card p-5 transition hover:bg-card hover:border-ink/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2">
                    {res.badge}
                  </span>
                  <h3 className="text-base font-bold text-ink mb-2 group-hover:text-accent transition">
                    <a href={res.url} target="_blank" rel="nofollow noopener noreferrer" className="focus:outline-none focus:underline">
                      {res.name} <span className="inline-block text-xs font-normal opacity-50 group-hover:translate-x-1 transition-transform">←</span>
                    </a>
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">{res.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Early Play and Early Childhood Resources */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
          <span>🧸</span> الألعاب التفاعلية والتعليم المبكر للأطفال
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {kidsResources.map((res) => (
            <div key={res.name} className="group rounded-2xl border border-ink/8 bg-card p-5 transition hover:bg-card hover:border-ink/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-2">
                    {res.badge}
                  </span>
                  <h3 className="text-base font-bold text-ink mb-2 group-hover:text-accent transition">
                    <a href={res.url} target="_blank" rel="nofollow noopener noreferrer" className="focus:outline-none focus:underline">
                      {res.name} <span className="inline-block text-xs font-normal opacity-50 group-hover:translate-x-1 transition-transform">←</span>
                    </a>
                  </h3>
                  <p className="text-sm text-ink/75 leading-relaxed">{res.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 rounded-2xl border border-dashed border-ink/15 bg-card p-6 text-center">
        <h3 className="text-sm font-semibold text-ink mb-2">💡 نصيحة تعليمية للوالدين</h3>
        <p className="text-sm text-ink/75 leading-relaxed max-w-lg mx-auto">
          الدمج بين ألعاب لوحة المفاتيح الحسية (مثل <strong>عرب فنجرز</strong> أو <strong>تايني فنجرز</strong>) والمواقع التفاعلية لتعليم الصوتيات (مثل <strong>ستارفال</strong>) يبني أساساً متيناً للطفل. قدّم هذا التعلم في فترات لعب يومية قصيرة وممتعة بدلاً من الحصص الدراسية الرسمية والملل.
        </p>
      </div>

      <div className="text-center py-8">
        <Link href="/ar/play" className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-ink transition hover:scale-105">
          🚀 هل أنت جاهز للّعب؟ افتح عرب فنجرز مجاناً
        </Link>
      </div>
    </>
  );
}
