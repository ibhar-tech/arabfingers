import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "About | عن التطبيق",
  description: "Learn about ArabFingers — a free bilingual Arabic & English keyboard smash toy for toddlers.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {locale === "ar" ? <AboutAr /> : <AboutEn />}
    </PageLayout>
  );
}

function AboutEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">About ArabFingers</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <p>
          ArabFingers is a free, bilingual (Arabic &amp; English) keyboard smash toy designed for toddlers
          and pre-schoolers aged 1–6. When kids press any key or tap the screen, they see beautiful animated
          Arabic letters with natural pronunciation, 3D floating objects, emoji bursts, and confetti celebrations.
        </p>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Features</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Full 28-letter Arabic alphabet with natural pronunciation</li>
            <li>Bilingual display — Arabic and English side by side</li>
            <li>High-quality letter pronunciation in Arabic and English</li>
            <li>3D animated floating objects background</li>
            <li>5 visual themes: Space, Desert, Jungle, Underwater, Ramadan</li>
            <li>Keyboard and touch screen support</li>
            <li>Multiple keyboard layout support (Standard, Phonetic, AZERTY)</li>
            <li>Parent control panel with PIN lock</li>
            <li>Installable as a PWA on mobile and desktop</li>
            <li>Works offline</li>
            <li>Child-safe — no data collection, no tracking</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Who is it for?</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>Toddlers (1–4 years) — smash keys, see and hear letters</li>
            <li>Pre-schoolers (4–6 years) — learn letter names, match Arabic to English</li>
            <li>Bilingual families — Arabic and English content side by side</li>
            <li>Parents — safe, ad-free play area with parental controls</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Contact</h2>
          <p>
            Developer: <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
}

function AboutAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">عن عرب فنجرز</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <p>
          عرب فنجرز هو لعبة لوحة مفاتيح مجانية ثنائية اللغة (عربي وإنجليزي) مصممة للأطفال الصغار
          من عمر ١ إلى ٦ سنوات. عندما يضغط الأطفال على أي مفتاح أو يلمسون الشاشة، يرون حروفاً عربية
          متحركة جميلة مع نطق طبيعي وأشكال ثلاثية الأبعاد عائمة ورموز تعبيرية واحتفالات بالقصاصات الملونة.
        </p>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">المميزات</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>الأبجدية العربية كاملة ٢٨ حرفاً مع نطق طبيعي</li>
            <li>عرض ثنائي اللغة — العربية والإنجليزية جنباً إلى جنب</li>
            <li>نطق عالي الجودة للحروف بالعربية والإنجليزية</li>
            <li>خلفية أشكال ثلاثية الأبعاد متحركة</li>
            <li>٥ ثيمات بصرية: الفضاء، الصحراء، الغابة، تحت الماء، رمضان</li>
            <li>دعم لوحة المفاتيح وشاشة اللمس</li>
            <li>دعم تخطيطات لوحة مفاتيح متعددة (قياسي، صوتي، AZERTY)</li>
            <li>لوحة تحكم للوالدين مع قفل PIN</li>
            <li>قابل للتثبيت كتطبيق على الهاتف وسطح المكتب</li>
            <li>يعمل بدون إنترنت</li>
            <li>آمن للأطفال — لا جمع بيانات، لا تتبع</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">لمن هذا التطبيق؟</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>الأطفال الصغار (١–٤ سنوات) — اضغط المفاتيح، شاهد واسمع الحروف</li>
            <li>أطفال ما قبل المدرسة (٤–٦ سنوات) — تعلم أسماء الحروف</li>
            <li>العائلات ثنائية اللغة — محتوى عربي وإنجليزي جنباً إلى جنب</li>
            <li>الوالدين — منطقة لعب آمنة مع أدوات تحكم أبوية</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">تواصل معنا</h2>
          <p>
            بريد المطور: <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
}
