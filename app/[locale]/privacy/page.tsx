import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

const CONTACT_EMAIL = "ibhartech39@gmail.com";
const UPDATED_EN = "5 September 2026";
const UPDATED_AR = "٥ سبتمبر ٢٠٢٦";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/privacy", {
    titleEn: "Privacy Policy | Arab Fingers",
    titleAr: "سياسة الخصوصية | عرب فنجرز",
    descriptionEn:
      "How Arab Fingers handles data: no accounts, no personal data collection, advertising on parent-facing pages only, and what your browser stores locally.",
    descriptionAr:
      "كيف يتعامل عرب فنجرز مع البيانات: بلا حسابات وبلا جمع بيانات شخصية، وإعلانات في صفحات القراءة الموجّهة إلى الآباء فقط، وما يخزّنه متصفّحك محلياً.",
  });
}

type Section = { h: string; body: string[]; list?: string[] };

const en: { title: string; updated: string; intro: string; sections: Section[] } = {
  title: "Privacy Policy",
  updated: `Last updated: ${UPDATED_EN}`,
  intro:
    "Arab Fingers (“we”, “our”, “us”) runs arabfingers.site, a free bilingual Arabic learning site for young children and their parents. This policy explains, in plain language, what happens to data when you or your child use the site. It applies to every page and to the downloadable worksheet PDFs.",
  sections: [
    {
      h: "The short version",
      body: [
        "We do not ask for a name, an email address or a password, because there is nothing on this site to sign up for. We do not build a profile of you or your child, we do not sell data to anyone, and we do not run our own analytics.",
        "The one way the site funds itself is advertising, shown on the reading pages written for parents and teachers. Nothing a child plays ever carries an ad. Advertising is served through Adsterra, and advertising technology may set cookies or use similar mechanisms to serve and measure the ads — that is described in full below.",
      ],
    },
    {
      h: "Information we collect ourselves",
      body: [
        "None that identifies you. There are no accounts, no login, no newsletter, no comment section and no upload feature. Nothing your child draws on the colouring canvas is transmitted to us or stored on any server — it exists only in the browser tab and disappears when the canvas is cleared or the page is closed.",
        "Our hosting provider, Cloudflare, processes standard server request data such as IP address, browser type and the page requested, in order to deliver the site and protect it from abuse. We do not use that data to identify individuals and we do not receive it as a report.",
      ],
    },
    {
      h: "What your browser stores locally",
      body: [
        "The site uses your browser's local storage to remember preferences so that the site behaves the way you left it. This information stays on your device, is never sent to us, and can be erased at any time by clearing your browser's site data.",
      ],
      list: [
        "Your chosen language (Arabic or English)",
        "Sound on or off, and the selected visual theme",
        "The optional parent-panel PIN, if you set one",
        "A service worker cache of pages and audio, so the site works offline once installed",
      ],
    },
    {
      h: "Advertising and third-party cookies",
      body: [
        "Arab Fingers displays advertising supplied by Adsterra on the parent-facing reading pages — the blog, the learning guides, the printables and the glossary. We do not set advertising cookies ourselves, and we do not pass any information about you to advertisers.",
        "There are no ads at all on the interactive activities — the keyboard toy, the colouring canvas, the tracing game and the tapping game. Those are the pages a child actually holds, and an ad beside a small finger is an accident waiting to happen.",
        "Adsterra and the advertisers it works with may use cookies or similar technologies, such as anonymous identifiers, to serve ads, cap how often an ad is shown and measure performance. You can review or limit ad personalisation through your browser settings and through industry opt-out tools such as aboutads.info/choices.",
      ],
    },
    {
      h: "Children's privacy (COPPA and GDPR-K)",
      body: [
        "This site is written for parents and teachers, and its activities are intended to be used by a child alongside an adult. We do not knowingly collect personal information from anyone under the age of 13, and there is no mechanism on the site through which a child could supply any.",
        "We treat the whole site as directed to children. Every activity a child operates is free of advertising, and no tap anywhere in those activities can produce one; the ads that fund the site live on the reading pages written for the adults next to them.",
        "If you believe a child has somehow provided personal information to us, please write to us at the address below and we will delete it immediately.",
      ],
    },
    {
      h: "Your rights",
      body: [
        "Under the GDPR, the UK GDPR and the CCPA you have the right to access, correct, export or delete the personal data an operator holds about you, and to object to its processing. Because we hold no personal data about our visitors, there is in practice nothing for us to return or erase — but you are welcome to write and ask, and we will confirm that in writing.",
      ],
    },
    {
      h: "The worksheet PDFs",
      body: [
        "The printable worksheets are ordinary static files. Downloading one does not require an email address, does not create an account, and does not tag your browser. The files contain no tracking pixels and no embedded scripts.",
      ],
    },
    {
      h: "Links to other sites",
      body: [
        "Some pages link to outside resources that we think are useful for families learning Arabic. Those sites have their own privacy policies, which we do not control and are not responsible for. We recommend reading the policy of any site you visit from here.",
      ],
    },
    {
      h: "Changes to this policy",
      body: [
        "If this policy changes in a way that affects what happens to your data — for example if we ever add analytics — we will update the date at the top of this page and describe the change here. We will not make a change retroactive.",
      ],
    },
    {
      h: "Contact",
      body: [
        `Questions about this policy, or a request relating to your data, can be sent to ${CONTACT_EMAIL} and we will reply. The site is operated by Aissa Trad.`,
      ],
    },
  ],
};

const ar: { title: string; updated: string; intro: string; sections: Section[] } = {
  title: "سياسة الخصوصية",
  updated: `آخر تحديث: ${UPDATED_AR}`,
  intro:
    "عرب فنجرز («نحن») يدير موقع arabfingers.site، وهو موقع مجاني ثنائي اللغة لتعليم العربية للأطفال الصغار وأهاليهم. توضّح هذه السياسة بلغة مباشرة ما يحدث للبيانات حين تستعمل أنت أو طفلك الموقع، وتسري على كلّ الصفحات وعلى ملفّات أوراق العمل القابلة للتنزيل.",
  sections: [
    {
      h: "الخلاصة باختصار",
      body: [
        "لا نطلب اسماً ولا بريداً إلكترونياً ولا كلمة مرور، لأنه لا يوجد في هذا الموقع ما يُسجَّل فيه. ولا نبني ملفّاً عنك أو عن طفلك، ولا نبيع البيانات لأحد، ولا نشغّل تحليلات خاصة بنا.",
        "والشيء الوحيد الذي يموّل الموقع هو الإعلانات، وتُعرض في صفحات القراءة المكتوبة للآباء والمعلّمين. ولا يحمل أيّ نشاط لعبه الطفل إعلاناً إطلاقاً. تُقدَّم الإعلانات عبر Adsterra، وقد تستعمل تقنيات الإعلان ملفّات ارتباط أو وسائل مشابهة لعرض الإعلانات وقياسها — وهذا موضّح بالتفصيل أدناه.",
      ],
    },
    {
      h: "المعلومات التي نجمعها بأنفسنا",
      body: [
        "لا شيء يعرّف بك. لا حسابات ولا تسجيل دخول ولا نشرة بريدية ولا قسم تعليقات ولا خاصية رفع ملفّات. ولا يُنقل إلينا شيء ممّا يرسمه طفلك على لوحة التلوين ولا يُخزَّن على أيّ خادم — فهو موجود في صفحة المتصفّح وحدها ويزول متى مُسحت اللوحة أو أُغلقت الصفحة.",
        "أمّا مزوّد الاستضافة Cloudflare فيعالج بيانات الطلبات المعتادة مثل عنوان IP ونوع المتصفّح والصفحة المطلوبة، لتقديم الموقع وحمايته من الإساءة. ولا نستعمل تلك البيانات لتحديد هويّة أحد ولا تصلنا في صورة تقارير.",
      ],
    },
    {
      h: "ما يخزّنه متصفّحك محلياً",
      body: [
        "يستعمل الموقع التخزين المحلي في متصفّحك ليتذكّر تفضيلاتك فيبقى الموقع كما تركته. تبقى هذه المعلومات على جهازك ولا تُرسل إلينا أبداً، ويمكنك محوها متى شئت بمسح بيانات الموقع من متصفّحك.",
      ],
      list: [
        "اللغة التي اخترتها (العربية أو الإنجليزية)",
        "تشغيل الصوت أو إيقافه، والثيم البصري المختار",
        "رمز PIN للوحة الوالدين إن أنشأته",
        "ذاكرة عامل الخدمة للصفحات والأصوات، ليعمل الموقع دون إنترنت بعد تثبيته",
      ],
    },
    {
      h: "الإعلانات وملفّات تعريف الارتباط من طرف ثالث",
      body: [
        "يعرض عرب فنجرز إعلانات تزوّدها Adsterra في صفحات القراءة الموجّهة إلى الآباء — المدوّنة وأدلّة التعلّم وأوراق العمل ومعجم الكلمات. ولا نضع نحن ملفّات تعريف ارتباط إعلانية، ولا نمرّر أيّ معلومات عنك إلى المعلنين.",
        "ولا توجد إعلانات إطلاقاً في الأنشطة التفاعلية — لعبة لوحة المفاتيح، ولوحة التلوين، ولعبة التتبّع، ولعبة النقر. فهذه هي الصفحات التي يمسكها الطفل بيده، والإعلان بجوار إصبع صغير حادثة تنتظر وقوعها.",
        "وقد تستعمل Adsterra والمعلنون الذين تعمل معهم ملفّات ارتباط أو تقنيات مشابهة، كالمعرّفات المجهولة، لعرض الإعلانات وتحديد عدد مرّات ظهورها وقياس أدائها. ويمكنك مراجعة تخصيص الإعلانات أو تقييده من إعدادات متصفّحك ومن أدوات انسحاب القطاع مثل aboutads.info/choices.",
      ],
    },
    {
      h: "خصوصية الأطفال (COPPA وGDPR-K)",
      body: [
        "كُتب هذا الموقع للآباء والمعلّمين، وأنشطته موجّهة ليستعملها الطفل بصحبة بالغ. ولا نجمع عن علم معلومات شخصية من أيّ شخص دون الثالثة عشرة، ولا توجد في الموقع وسيلة يستطيع الطفل بها تقديم شيء منها.",
        "نعامل الموقع كلّه على أنّه موجّه إلى الأطفال. وكلّ نشاط يقوده الطفل خالٍ من الإعلانات، ولا يمكن لأيّ نقرة فيه أن تُظهر إعلاناً؛ أمّا الإعلانات التي تموّل الموقع فموضعها صفحات القراءة المكتوبة للبالغين بجانبهم.",
        "وإن كنت ترى أنّ طفلاً قدّم إلينا معلومات شخصية بطريقة ما، فراسلنا على العنوان أدناه وسنحذفها فوراً.",
      ],
    },
    {
      h: "حقوقك",
      body: [
        "بموجب النظام الأوروبي العام لحماية البيانات ونظيره البريطاني وقانون CCPA، لك حقّ الاطّلاع على بياناتك الشخصية وتصحيحها وتصديرها وحذفها، وحقّ الاعتراض على معالجتها. ولأنّنا لا نحتفظ ببيانات شخصية عن زوّارنا فلا يوجد عملياً ما نعيده أو نمحوه — ومع ذلك يسعدنا أن تسألنا وسنؤكّد لك ذلك كتابةً.",
      ],
    },
    {
      h: "ملفّات أوراق العمل",
      body: [
        "أوراق العمل القابلة للطباعة ملفّات ثابتة عادية. وتنزيل أيّ منها لا يتطلّب بريداً إلكترونياً ولا ينشئ حساباً ولا يضع علامة على متصفّحك. ولا تحتوي الملفّات على بكسلات تتبّع ولا على نصوص برمجية مضمّنة.",
      ],
    },
    {
      h: "الروابط إلى مواقع أخرى",
      body: [
        "تحيل بعض الصفحات إلى مصادر خارجية نراها نافعة للأسر التي تتعلّم العربية. ولتلك المواقع سياسات خصوصية خاصّة بها لا نتحكّم فيها ولا نتحمّل مسؤوليتها. وننصح بقراءة سياسة أيّ موقع تزوره من هنا.",
      ],
    },
    {
      h: "تغييرات هذه السياسة",
      body: [
        "إن تغيّرت هذه السياسة على نحو يمسّ ما يحدث لبياناتك — كأن نضيف تحليلات يوماً ما — فسنحدّث التاريخ في أعلى الصفحة ونصف التغيير هنا. ولن نجعل أيّ تغيير رجعيّ الأثر.",
      ],
    },
    {
      h: "التواصل",
      body: [
        `يمكن إرسال الأسئلة عن هذه السياسة أو أيّ طلب يتعلّق ببياناتك إلى ${CONTACT_EMAIL} وسنردّ عليه. ويدير الموقع عيسى طراد.`,
      ],
    },
  ],
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const t = isAr ? ar : en;

  return (
    <PageLayout locale={locale}>
      <Breadcrumbs locale={locale} crumbs={[{ label: t.title }]} />

      <article className="max-w-3xl">
        <h1 className="font-display text-3xl font-extrabold text-ink">{t.title}</h1>
        <p className="mt-1 text-sm text-ink/45">{t.updated}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-ink/80">{t.intro}</p>

        <div className="mt-10 space-y-9">
          {t.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-lg font-extrabold text-ink">{s.h}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-2.5 text-sm leading-relaxed text-ink/75">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-3 space-y-1.5">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t-2 border-ink/10 pt-6 text-sm">
          <Link href={`/${locale}/terms`} className="font-bold text-ink/70 underline hover:text-qalam">
            {isAr ? "شروط الاستخدام" : "Terms of Use"}
          </Link>
          <Link href={`/${locale}/contact`} className="font-bold text-ink/70 underline hover:text-qalam">
            {isAr ? "تواصل معنا" : "Contact"}
          </Link>
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink/70 underline hover:text-qalam"
          >
            {isAr ? "خيارات الإعلانات (AboutAds)" : "Ad Choices (AboutAds)"}
          </a>
        </div>
      </article>
    </PageLayout>
  );
}
