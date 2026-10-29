import Link from "next/link";
import { ArrowRight, BookOpen, Check, Clock3, Heart, Printer, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ActivityFinder } from "@/components/ActivityFinder";
import { ReadingAds } from "@/components/ReadingAds";
import { StarTotal } from "@/components/StarTotal";
import { AlphabetPreview } from "@/components/AlphabetPreview";
import { getActivityCatalog } from "@/lib/activityCatalog";
import { worksheetSets } from "@/lib/worksheets";
import { stories } from "@/lib/stories";

export function WarmHome({ locale }: { locale: string }) {
  const ar = locale === "ar";
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const pages = worksheetSets.filter((pack) => !pack.bundle).reduce((sum, pack) => sum + pack.pages, 0);
  const number = (count: number) => count.toLocaleString(ar ? "ar-u-nu-latn" : "en");
  return (
    <div className="theme-warm discovery-home" dir={ar ? "rtl" : "ltr"}>
      <SiteHeader locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <section className="discovery-hero discovery-container">
          <div className="hero-copy">
            <span className="discovery-eyebrow"><span />{t("LITTLE MOMENTS. BIG DISCOVERIES.", "لحظات صغيرة، اكتشافات كبيرة")}</span>
            <h1>{t("A little Arabic.", "قليلٌ من العربية.")}<br /><span>{t("A world of wonder.", "عالمٌ من الدهشة.")}</span></h1>
            <p>{t("Free Arabic worksheets, playful games, and stories to grow with. Pick something your little one loves. Let curiosity do the rest.", "أوراق عمل عربية مجانية، وألعاب وقصص تكبر مع طفلك. اختاروا ما يحبّه صغيركم، واتركوا الباقي لفضوله.")}</p>
            <div className="hero-actions">
              <a className="discovery-button" href="#explore">{t("Find our next adventure", "لنكتشف نشاطنا القادم")}<ArrowRight size={19} aria-hidden /></a>
              <Link className="discovery-button secondary" href={`/${locale}/printables`}><Printer size={18} aria-hidden />{t("Free printables", "أوراق مجانية للطباعة")}</Link>
            </div>
            <div className="hero-reassurance"><span><Check size={15} aria-hidden />{t("No sign-up", "بدون تسجيل")}</span><span><Check size={15} aria-hidden />{t("Arabic & English", "بالعربية والإنجليزية")}</span><span><Heart size={15} aria-hidden />{t("Made by a parent", "من صنع والد")}</span></div>
            <StarTotal locale={locale} />
          </div>
          <AlphabetPreview locale={locale} />
        </section>
        <div className="discovery-facts discovery-container">
          <p><strong>{number(28)}</strong>{t("letters to meet", "حرفاً للتعرّف عليها")}</p>
          <p><strong>{number(pages)}</strong>{t("pages to print", "صفحة للطباعة")}</p>
          <p><strong>{number(stories.length)}</strong>{t("stories to share", "قصة للمشاركة")}</p>
          <p><span className="fact-doodle" aria-hidden>✦</span>{t("A little learning, together.", "نتعلّم قليلاً، معاً.")}</p>
        </div>
        <div className="discovery-container"><ReadingAds placement="top" /></div>
        <section id="explore" className="discovery-container discovery-section" aria-labelledby="explore-title">
          <div className="discovery-section-heading"><div><span className="discovery-eyebrow">{t("FOLLOW THEIR CURIOSITY", "اتبعوا فضولهم")}</span><h2 id="explore-title">{t("What shall we explore today?", "ماذا نكتشف اليوم؟")}</h2></div><span className="handwritten">{t("Something for every little mind ✧", "لكل صغير اكتشاف جديد ✧")}</span></div>
          <ActivityFinder locale={locale} activities={getActivityCatalog(locale)} />
        </section>
        <section className="discovery-container discovery-section">
          <div className="together-panel">
            <div className="together-intro"><span className="discovery-eyebrow"><Clock3 size={16} aria-hidden />{t("A SIMPLE PLACE TO START", "بداية بسيطة")}</span><h2>{t("Ten minutes.\nThree little discoveries.", "عشر دقائق.\nثلاثة اكتشافات صغيرة.")}</h2><p>{t("No lesson planning needed. Try this gentle mix of listening, making, and reading together.", "لا حاجة لتحضير درس. جرّبوا هذه الرحلة القصيرة من الاستماع والرسم والقراءة معاً.")}</p><span className="together-flower" aria-hidden>✿</span></div>
            <ol className="together-steps">
              {[
                { href: "/games/tap", title: t("Hear a letter. Find its shape.", "اسمع حرفاً، وابحث عن شكله."), desc: t("Warm up with a listening game", "ابدأ بلعبة استماع"), time: t("2 min", "دقيقتان") },
                { href: "/printables/arabic-alphabet-tracing", title: t("Take the learning to paper.", "انقل التعلّم إلى الورق."), desc: t("Choose one letter to trace", "اختر حرفاً واحداً لتتبّعه"), time: t("5 min", "5 دقائق") },
                { href: "/stories/al-arnab-al-saeed", title: t("Finish with a little story.", "اختم بقصة صغيرة."), desc: t("Meet the Happy Rabbit together", "تعرّفوا إلى الأرنب السعيد معاً"), time: t("3 min", "3 دقائق") },
              ].map((step, index) => <li key={step.href}><Link href={`/${locale}${step.href}`}><span className="step-number">{number(index + 1)}</span><span className="step-copy"><strong>{step.title}</strong><span>{step.desc}</span></span><span className="step-time">{step.time}</span><ArrowRight size={19} aria-hidden /></Link></li>)}
            </ol>
          </div>
        </section>
        <section className="discovery-container discovery-section parent-corner">
          <div><span className="discovery-eyebrow"><BookOpen size={16} aria-hidden />{t("FOR THE GROWN-UPS", "للكبار أيضاً")}</span><h2>{t("You don't have to know it all.", "لا تحتاج أن تعرف كل شيء.")}</h2><p>{t("Learning Arabic together can start with one sound and one smile. Our guides help you find your next small step.", "تعلّم العربية معاً يبدأ بصوت واحد وابتسامة. أدلّتنا تساعدكم في اختيار الخطوة الصغيرة التالية.")}</p></div>
          <div className="parent-links">
            <Link href={`/${locale}/learn/teaching-arabic-non-speakers`}>{t("I don't speak Arabic. Where do I start?", "لا أتحدّث العربية. من أين أبدأ؟")}<ArrowRight size={18} aria-hidden /></Link>
            <Link href={`/${locale}/learn/best-age-to-learn-arabic`}>{t("What's right for my child's age?", "ما الذي يناسب عمر طفلي؟")}<ArrowRight size={18} aria-hidden /></Link>
            <Link href={`/${locale}/learn/arabic-activities-at-home`}>{t("Give me ideas for learning at home", "أريد أفكاراً للتعلّم في البيت")}<ArrowRight size={18} aria-hidden /></Link>
          </div>
        </section>
        <div className="discovery-signoff"><Sparkles size={20} aria-hidden /><p>{t("A little practice. A lot of possibility.", "قليل من التدريب. كثير من الإمكانات.")}</p></div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
