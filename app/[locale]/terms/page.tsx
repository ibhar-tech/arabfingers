import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Terms of Service | شروط الاستخدام",
  description: "ArabFingers terms of service.",
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {locale === "ar" ? <TermsAr /> : <TermsEn />}
    </PageLayout>
  );
}

function TermsEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Terms of Service</h1>
      <p className="mt-1 text-sm text-white/40">Last updated: April 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Acceptance of Terms</h2>
          <p>By accessing and using ArabFingers, you agree to these terms. If you do not agree, please do not use the Service.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Description of Service</h2>
          <p>ArabFingers is a free, open-source educational web application that helps children learn the Arabic alphabet through interactive keyboard and touch experiences with bilingual display, pronunciation, 3D animations, and themed experiences.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Use of Service</h2>
          <p>This application is intended for use by children under parental supervision. You may use ArabFingers for personal, non-commercial, educational purposes. You agree not to misuse the service or use it for any unlawful purpose.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Intellectual Property</h2>
          <p>ArabFingers is open-source software. Sound effects, visual assets, and generated audio content are part of the application and subject to their respective licenses.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Advertisements</h2>
          <p>ArabFingers may display advertisements through Google AdSense. These ads help support the free availability of the application.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">DMCA &amp; Copyright</h2>
          <p>We respect intellectual property rights. If you believe content on ArabFingers infringes your copyright, contact us at <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a> with details of the alleged infringement.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Limitation of Liability</h2>
          <p>ArabFingers is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free operation.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Contact</h2>
          <p>Questions? <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a></p>
        </section>
      </div>
    </>
  );
}

function TermsAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">شروط الاستخدام</h1>
      <p className="mt-1 text-sm text-white/40">آخر تحديث: أبريل ٢٠٢٦</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">قبول الشروط</h2>
          <p>باستخدامك لتطبيق عرب فنجرز، فإنك توافق على شروط الاستخدام هذه. إذا كنت لا توافق، يرجى عدم استخدام الخدمة.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">وصف الخدمة</h2>
          <p>عرب فنجرز هو تطبيق ويب تعليمي مجاني ومفتوح المصدر يساعد الأطفال على تعلم الأبجدية العربية من خلال تجارب تفاعلية باستخدام لوحة المفاتيح واللمس مع نطق طبيعي ورسوم متحركة ثلاثية الأبعاد.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">استخدام الخدمة</h2>
          <p>هذا التطبيق مخصص للاستخدام من قبل الأطفال تحت إشراف الوالدين. يمكنك استخدام عرب فنجرز للأغراض الشخصية والتعليمية غير التجارية.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">الملكية الفكرية</h2>
          <p>عرب فنجرز هو برنامج مفتوح المصدر. المؤثرات الصوتية والأصول المرئية والمحتوى الصوتي المُنشأ هي جزء من التطبيق.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">الإعلانات</h2>
          <p>قد يعرض عرب فنجرز إعلانات من خلال Google AdSense. تساعد هذه الإعلانات في دعم توفر التطبيق مجاناً.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">حقوق النشر (DMCA)</h2>
          <p>نحن نحترم حقوق الملكية الفكرية. إذا كنت تعتقد أن محتوى في عرب فنجرز ينتهك حقوقك، تواصل معنا على <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">إخلاء المسؤولية</h2>
          <p>يتم تقديم عرب فنجرز &quot;كما هو&quot; بدون ضمانات من أي نوع. لا نضمن التشغيل المتواصل أو الخالي من الأخطاء.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">تواصل معنا</h2>
          <p>أسئلة؟ <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a></p>
        </section>
      </div>
    </>
  );
}
