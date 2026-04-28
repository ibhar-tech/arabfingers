import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Privacy Policy | سياسة الخصوصية",
  description: "ArabFingers privacy policy. We collect zero personal data.",
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {locale === "ar" ? <PrivacyAr /> : <PrivacyEn />}
    </PageLayout>
  );
}

function PrivacyEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>
      <p className="mt-1 text-sm text-white/40">Last updated: April 2026</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Overview</h2>
          <p>
            ArabFingers (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a free, open-source educational web application
            designed for children aged 1–6. We take children&apos;s privacy extremely seriously.
            This app is designed to collect zero personal data.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Data We Collect</h2>
          <p>
            <strong className="text-white/85">None.</strong> ArabFingers does not collect, store, transmit,
            or share any personal information. There are no accounts, no login, no analytics,
            no cookies (from us), and no tracking of any kind.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Local Storage</h2>
          <p>
            The app may use your browser&apos;s local storage to remember preferences such as theme,
            sound settings, and language. This data never leaves your device.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Cookies &amp; Third-Party Services</h2>
          <p>
            ArabFingers itself does not set cookies. However, we may display ads through Google AdSense.
            Google and its partners may use cookies to serve ads based on prior visits. You can opt out at{" "}
            <a href="https://adssettings.google.com" className="text-accent underline" target="_blank" rel="noopener noreferrer">
              Google&apos;s Ads Settings
            </a>.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Children&apos;s Privacy (COPPA)</h2>
          <p>
            This app is designed for use by children under parental supervision.
            We do not knowingly collect any personal information from children.
            If you believe any data has been inadvertently collected, please contact us immediately.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Changes to This Policy</h2>
          <p>We may update this policy from time to time. Changes will be posted on this page.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Contact</h2>
          <p>
            Questions? <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
}

function PrivacyAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">سياسة الخصوصية</h1>
      <p className="mt-1 text-sm text-white/40">آخر تحديث: أبريل ٢٠٢٦</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">نظرة عامة</h2>
          <p>
            عرب فنجرز هو تطبيق ويب تعليمي مجاني ومفتوح المصدر مصمم للأطفال من عمر ١ إلى ٦ سنوات.
            نحن نأخذ خصوصية الأطفال على محمل الجد. هذا التطبيق مصمم لعدم جمع أي بيانات شخصية.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">البيانات التي نجمعها</h2>
          <p>
            <strong className="text-white/85">لا شيء.</strong> لا يقوم عرب فنجرز بجمع أو تخزين أو نقل أو مشاركة أي معلومات شخصية.
            لا توجد حسابات، لا تسجيل دخول، لا تحليلات، لا ملفات تعريف ارتباط (منا)، ولا تتبع من أي نوع.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">التخزين المحلي</h2>
          <p>
            قد يستخدم التطبيق التخزين المحلي في متصفحك لتذكر التفضيلات. هذه البيانات لا تغادر جهازك أبداً.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">ملفات تعريف الارتباط وخدمات الطرف الثالث</h2>
          <p>
            عرب فنجرز نفسه لا يضع ملفات تعريف ارتباط. ومع ذلك، قد نعرض إعلانات من خلال Google AdSense.
            قد تستخدم Google وشركاؤها ملفات تعريف الارتباط لعرض الإعلانات. يمكنك إلغاء الاشتراك من إعدادات إعلانات Google.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">خصوصية الأطفال (COPPA)</h2>
          <p>
            هذا التطبيق مصمم للاستخدام من قبل الأطفال تحت إشراف أحد الوالدين.
            نحن لا نجمع عن قصد أي معلومات شخصية من الأطفال.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">تواصل معنا</h2>
          <p>
            أسئلة؟ <a href="mailto:ibhartech39@gmail.com" className="text-accent underline">ibhartech39@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
}
