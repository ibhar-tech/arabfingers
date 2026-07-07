import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

import { FaqSection } from "@/components/FaqSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/contact", {
    titleEn: "Contact Us | Arab Fingers",
    titleAr: "تواصل معنا | عرب فنجرز",
    descriptionEn: "Contact the Arab Fingers team for questions, feedback, or support.",
    descriptionAr: "تواصل مع فريق عرب فنجرز للأسئلة أو الملاحظات أو الدعم.",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <article className="text-ink">
        {locale === "ar" ? <ContactAr /> : <ContactEn />}
      </article>
    </PageLayout>
  );
}

const faqEn = [
  { q: "Do you store or share my email address?", a: "Absolutely not. We collect zero personal data. We only use the email address you provide to reply to your questions or feedback, and we never share it with third parties." },
  { q: "How can I contribute to Arab Fingers?", a: "Arab Fingers is open-source and hosted on GitHub. If you are a developer, designer, or educator, you can contribute code, assets, or translations. Send us an email and we'll point you to our repository!" },
  { q: "How do I report a bug or technical issue?", a: "Please email us at ibhartech39@gmail.com. To help us fix it quickly, please mention the device you are using (e.g., iPhone 15, iPad, Windows PC), the browser (e.g., Safari, Chrome), and a brief description of what happened." },
  { q: "Are you open to educational partnerships?", a: "Yes! We love collaborating with schools, Arabic language centers, and educators. If you would like to use Arab Fingers in your classroom or suggest educational features, please reach out." },
];

const faqAr = [
  { q: "هل تقومون بحفظ أو مشاركة بريدي الإلكتروني؟", a: "بالتأكيد لا. نحن لا نجمع أي بيانات شخصية. نستخدم بريدك الإلكتروني فقط للرد على استفسارك وملاحظاتك، ولا نشاركه أبداً مع أي طرف ثالث." },
  { q: "كيف يمكنني المساهمة في تطوير عرب فنجرز؟", a: "عرب فنجرز هو مشروع مفتوح المصدر على GitHub. إذا كنت مطوراً أو مصمماً أو معلماً وتريد المساهمة، يسعدنا تواصلك معنا وسنوجهك إلى مستودع المشروع!" },
  { q: "كيف يمكنني الإبلاغ عن مشكلة تقنية أو خطأ؟", a: "يرجى مراسلتنا على البريد الإلكتروني ibhartech39@gmail.com. لمساعدتنا في حل المشكلة بسرعة، يرجى ذكر نوع الجهاز المتأثر (مثلاً: آيفون، آيباد، كمبيوتر ويندوز)، والمتصفح المستخدم، ووصف بسيط للمشكلة." },
  { q: "هل تقبلون الشراكات التعليمية؟", a: "نعم! نرحب بالتعاون مع المدارس، ومراكز تعليم اللغة العربية، والمعلمين. إذا كنت ترغب في استخدام عرب فنجرز في فصلك الدراسي أو اقتراح ميزات تعليمية، يرجى مراسلتنا." },
];

function ContactEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink">Contact Us</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80 mb-10">
        <p>
          We would love to hear from you. Whether you have a question, feedback, a bug report,
          or a suggestion for ArabFingers, feel free to reach out.
        </p>
        <section>
          <h2 className="mb-2 text-lg font-medium text-ink/90">Email</h2>
          <p>
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline text-base">
              ibhartech39@gmail.com
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-ink/90">What you can contact us about</h2>
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
          <h2 className="mb-2 text-lg font-medium text-ink/90">Response Time</h2>
          <p>We aim to respond to all inquiries within 48 hours.</p>
        </section>
      </div>

      <FaqSection
        locale="en"
        title="Contact & Support FAQ"
        items={faqEn}
      />
    </>
  );
}

function ContactAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-ink">تواصل معنا</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80 mb-10">
        <p>
          يسعدنا سماع رأيك. سواء كان لديك سؤال أو ملاحظة أو تقرير عن خطأ أو اقتراح لعرب فنجرز،
          لا تتردد في التواصل معنا.
        </p>
        <section>
          <h2 className="mb-2 text-lg font-medium text-ink/90">البريد الإلكتروني</h2>
          <p>
            <a href="mailto:ibhartech39@gmail.com" className="text-accent underline text-base" dir="ltr">
              ibhartech39@gmail.com
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-medium text-ink/90">يمكنك التواصل معنا بخصوص</h2>
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
          <h2 className="mb-2 text-lg font-medium text-ink/90">وقت الاستجابة</h2>
          <p>نهدف للرد على جميع الاستفسارات خلال ٤٨ ساعة.</p>
        </section>
      </div>

      <FaqSection
        locale="ar"
        title="الأسئلة الشائعة حول التواصل والدعم"
        items={faqAr}
      />
    </>
  );
}
