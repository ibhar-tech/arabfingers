import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Contact Us | تواصل معنا",
  description: "Contact the ArabFingers team for questions, feedback, or support.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      {locale === "ar" ? <ContactAr /> : <ContactEn />}
    </PageLayout>
  );
}

function ContactEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Contact Us</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <p>
          We would love to hear from you. Whether you have a question, feedback, a bug report,
          or a suggestion for ArabFingers, feel free to reach out.
        </p>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Email</h2>
          <p>
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline text-base">
              ibhartech39@gmail.com
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">What you can contact us about</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>General questions about ArabFingers</li>
            <li>Bug reports or technical issues</li>
            <li>Feature requests and suggestions</li>
            <li>Privacy concerns or data requests</li>
            <li>Partnership or collaboration inquiries</li>
            <li>DMCA or copyright concerns</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">Response Time</h2>
          <p>We aim to respond to all inquiries within 48 hours.</p>
        </section>
      </div>
    </>
  );
}

function ContactAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">تواصل معنا</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/70">
        <p>
          يسعدنا سماع رأيك. سواء كان لديك سؤال أو ملاحظة أو تقرير عن خطأ أو اقتراح لعرب فنجرز،
          لا تتردد في التواصل معنا.
        </p>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">البريد الإلكتروني</h2>
          <p>
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline text-base" dir="ltr">
              ibhartech39@gmail.com
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">يمكنك التواصل معنا بخصوص</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li>أسئلة عامة حول عرب فنجرز</li>
            <li>تقارير الأخطاء أو المشاكل التقنية</li>
            <li>طلبات الميزات والاقتراحات</li>
            <li>مخاوف الخصوصية أو طلبات البيانات</li>
            <li>استفسارات الشراكة أو التعاون</li>
            <li>مخاوف حقوق النشر (DMCA)</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-white/90">وقت الاستجابة</h2>
          <p>نهدف للرد على جميع الاستفسارات خلال ٤٨ ساعة.</p>
        </section>
      </div>
    </>
  );
}
