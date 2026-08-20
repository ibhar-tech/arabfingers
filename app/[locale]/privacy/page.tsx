import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

const CONTACT_EMAIL = "ibhartech39@gmail.com";
const UPDATED_EN = "6 August 2026";
const UPDATED_AR = "٦ أغسطس ٢٠٢٦";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/privacy", {
    titleEn: "Privacy Policy | Arab Fingers",
    titleAr: "سياسة الخصوصية | عرب فنجرز",
    descriptionEn:
      "How Arab Fingers handles data: no accounts, no personal data collection, what your browser stores locally, and exactly which third-party advertising cookies may be set.",
    descriptionAr:
      "كيف يتعامل عرب فنجرز مع البيانات: بلا حسابات وبلا جمع بيانات شخصية، وما يخزّنه متصفّحك محلياً، وما ملفّات تعريف الارتباط الإعلانية التي قد تُوضَع.",
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
        "The one exception is advertising. This site is supported by ads served through Google AdSense, and Google — not us — may set cookies in your browser to do that. That is described in full below, including how to turn it off.",
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
        "Arab Fingers displays advertising supplied by Google AdSense. We do not set advertising cookies ourselves, and we do not pass any information about you to advertisers.",
        "Because this site is made for young children, every ad request it sends is marked non-personalised. Google is instructed not to use any profile of you or your child to choose the ads, and not to add this visit to one. That applies to every visitor, in every country, on every page — not only where the law demands it.",
        "Google may still set a cookie for purposes that do not depend on a profile, such as counting how often an ad has been shown and detecting fraudulent clicks. Google's own explanation of how it uses data from sites that use its services is published at policies.google.com/technologies/partner-sites, and you can review your ad settings at any time in Google's Ads Settings.",
        "There are no ads at all on the interactive activities — the keyboard toy, the colouring canvas, the tracing game and the tapping game. Those are the pages a child actually holds, and an ad beside a small finger is an accident waiting to happen.",
        "Where advertising is served in the European Economic Area, the United Kingdom or Switzerland, a consent notice from Google's certified consent management platform is shown before any non-essential advertising cookie is set, and you can change or withdraw your answer at any time from the link in that notice.",
      ],
    },
    {
      h: "Children's privacy (COPPA and GDPR-K)",
      body: [
        "This site is written for parents and teachers, and its activities are intended to be used by a child alongside an adult. We do not knowingly collect personal information from anyone under the age of 13, and there is no mechanism on the site through which a child could supply any.",
        "We treat the whole site as directed to children. Ad requests are tagged accordingly, personalised advertising and remarketing are switched off site-wide rather than only where a regulator insists, and the interactive activities carry no advertising at all.",
        "If you believe a child has somehow provided personal information to us, please write to us at the address below and we will delete it immediately.",
      ],
    },
    {
      h: "Your rights",
      body: [
        "Under the GDPR, the UK GDPR and the CCPA you have the right to access, correct, export or delete the personal data an operator holds about you, and to object to its processing. Because we hold no personal data about our visitors, there is in practice nothing for us to return or erase — but you are welcome to write and ask, and we will confirm that in writing.",
        "Rights relating to data held by Google as an advertising vendor should be exercised through Google directly, using the opt-out links in the advertising section above.",
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
        "الاستثناء الوحيد هو الإعلانات. يُموَّل هذا الموقع بإعلانات تُعرض عبر Google AdSense، وقد تضع Google — لا نحن — ملفّات تعريف ارتباط في متصفّحك لهذا الغرض. وهذا موضّح بالتفصيل أدناه مع طريقة إيقافه.",
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
        "يعرض عرب فنجرز إعلانات تزوّدها Google AdSense. ولا نضع نحن ملفّات تعريف ارتباط إعلانية، ولا نمرّر أيّ معلومات عنك إلى المعلنين.",
        "ولأنّ هذا الموقع مصنوع للأطفال الصغار، فكلّ طلب إعلان يرسله موسوم بأنّه غير مخصّص. أي أنّ Google مأمورة بألّا تستعمل أيّ ملفّ عنك أو عن طفلك لاختيار الإعلانات، وبألّا تضيف هذه الزيارة إلى ملفّ. وهذا يسري على كلّ زائر، في كلّ بلد، وفي كلّ صفحة — لا حيث يوجب القانون وحده.",
        "وقد تظلّ Google تضع ملفّ ارتباط لأغراض لا تعتمد على ملفّ شخصي، مثل إحصاء عدد مرّات عرض الإعلان وكشف النقرات الاحتيالية. وتنشر Google شرحها لكيفية استعمالها بيانات المواقع التي تستخدم خدماتها على policies.google.com/technologies/partner-sites، ويمكنك مراجعة إعداداتك الإعلانية متى شئت من إعدادات إعلانات Google.",
        "ولا توجد إعلانات إطلاقاً في الأنشطة التفاعلية — لعبة لوحة المفاتيح، ولوحة التلوين، ولعبة التتبّع، ولعبة النقر. فهذه هي الصفحات التي يمسكها الطفل بيده، والإعلان بجوار إصبع صغير حادثة تنتظر وقوعها.",
        "وحيثما تُعرض الإعلانات في المنطقة الاقتصادية الأوروبية أو المملكة المتحدة أو سويسرا، يظهر إشعار موافقة من منصّة إدارة الموافقة المعتمدة من Google قبل وضع أيّ ملفّ ارتباط إعلاني غير ضروري، ويمكنك تغيير إجابتك أو سحبها متى شئت من الرابط في ذلك الإشعار.",
      ],
    },
    {
      h: "خصوصية الأطفال (COPPA وGDPR-K)",
      body: [
        "كُتب هذا الموقع للآباء والمعلّمين، وأنشطته موجّهة ليستعملها الطفل بصحبة بالغ. ولا نجمع عن علم معلومات شخصية من أيّ شخص دون الثالثة عشرة، ولا توجد في الموقع وسيلة يستطيع الطفل بها تقديم شيء منها.",
        "نعامل الموقع كلّه على أنّه موجّه إلى الأطفال. فطلبات الإعلانات موسومة بذلك، والإعلانات المخصّصة وإعادة الاستهداف موقوفة في الموقع كلّه لا حيث تشترط جهة تنظيمية ذلك وحسب، والأنشطة التفاعلية لا تحمل أيّ إعلان.",
        "وإن كنت ترى أنّ طفلاً قدّم إلينا معلومات شخصية بطريقة ما، فراسلنا على العنوان أدناه وسنحذفها فوراً.",
      ],
    },
    {
      h: "حقوقك",
      body: [
        "بموجب النظام الأوروبي العام لحماية البيانات ونظيره البريطاني وقانون CCPA، لك حقّ الاطّلاع على بياناتك الشخصية وتصحيحها وتصديرها وحذفها، وحقّ الاعتراض على معالجتها. ولأنّنا لا نحتفظ ببيانات شخصية عن زوّارنا فلا يوجد عملياً ما نعيده أو نمحوه — ومع ذلك يسعدنا أن تسألنا وسنؤكّد لك ذلك كتابةً.",
        "أمّا الحقوق المتعلّقة بالبيانات التي تحتفظ بها Google بصفتها مورّد إعلانات فتُمارَس عبر Google مباشرةً، من روابط إلغاء التفعيل المذكورة في قسم الإعلانات أعلاه.",
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
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink/70 underline hover:text-qalam"
          >
            {isAr ? "كيف تستعمل Google البيانات" : "How Google uses data"}
          </a>
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink/70 underline hover:text-qalam"
          >
            {isAr ? "إعدادات إعلانات Google" : "Google Ads Settings"}
          </a>
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
