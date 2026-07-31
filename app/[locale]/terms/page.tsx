import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

const CONTACT_EMAIL = "ibhartech39@gmail.com";
const UPDATED_EN = "31 July 2026";
const UPDATED_AR = "٣١ يوليو ٢٠٢٦";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/terms", {
    titleEn: "Terms of Use | Arab Fingers",
    titleAr: "شروط الاستخدام | عرب فنجرز",
    descriptionEn:
      "Terms of use for Arab Fingers, including what you may do with the free printable worksheets, classroom use, and the limits of what a free educational site can promise.",
    descriptionAr:
      "شروط استخدام عرب فنجرز، بما فيها ما يجوز لك فعله بأوراق العمل المجانية، والاستعمال الصفّي، وحدود ما يمكن لموقع تعليمي مجاني أن يعد به.",
  });
}

type Section = { h: string; body: string[]; list?: string[] };

const en: { title: string; updated: string; intro: string; sections: Section[] } = {
  title: "Terms of Use",
  updated: `Last updated: ${UPDATED_EN}`,
  intro:
    "These terms cover your use of arabfingers.site, including the interactive activities and the downloadable worksheet PDFs. They are written to be readable rather than impressive. Using the site means you accept them; if you do not, the remedy is simply to stop using it.",
  sections: [
    {
      h: "What the service is",
      body: [
        "Arab Fingers is a free educational website for children aged roughly one to seven and the adults teaching them. It provides an interactive letter game, a colouring and tracing canvas, written guides for parents, and printable worksheets in PDF form.",
        "It is a supplement to teaching, not a curriculum and not a substitute for a teacher. No claim is made that using it will produce a particular level of literacy in a particular period of time.",
      ],
    },
    {
      h: "Cost and accounts",
      body: [
        "Everything on the site is free to use. There is no account to create, no subscription, no trial that converts to a payment, and no feature reserved for paying users. The site is funded by advertising, which is described in the privacy policy.",
      ],
    },
    {
      h: "What you may do with the worksheets",
      body: [
        "The worksheet PDFs are offered for personal, family and classroom use, and you do not need to ask permission for any of the following:",
      ],
      list: [
        "Print them at home, as many copies as you like",
        "Photocopy them for a class, a homeschool group, a madrasah or a weekend school",
        "Use them in a paid tutoring session, provided the sheets themselves are given to students at no charge",
        "Link to this site or to a worksheet page from your own site, blog or newsletter",
      ],
    },
    {
      h: "What you may not do with them",
      body: [
        "Please do not sell the files, bundle them into a paid product, or upload them to another site, a file locker or a marketplace — including free ones. This is not about control for its own sake: mirrored copies go stale, and a family that downloads a two-year-old version of a sheet with a mistake in it has no way of knowing. Link here instead and everyone gets the current file.",
        "Please also do not remove the attribution from a sheet, present the material as your own work, or use it to train a model or generate a derivative worksheet product for sale.",
      ],
    },
    {
      h: "Acceptable use of the site",
      body: [
        "Use the site as intended. Do not attempt to break, overload or gain unauthorised access to it, scrape it at a volume that degrades it for others, or use it to distribute anything unlawful. Because there are no accounts, comments or uploads, there is very little scope for misuse — but the expectation stands.",
      ],
    },
    {
      h: "Intellectual property",
      body: [
        "The site's text, illustrations, generated worksheets, audio and code are the property of the site's operator except where stated otherwise, and are protected by copyright. The Arabic language and its alphabet are, obviously, nobody's property — these terms cover this particular presentation of them, not the letters themselves.",
      ],
    },
    {
      h: "Accuracy, and the limits of a free site",
      body: [
        "Considerable care goes into the language content, but the site is provided \"as is\" and without warranty of any kind. It may contain errors, it may be unavailable at times, and the audio is produced with synthetic Arabic voices rather than a human voice actor, as the author page explains.",
        "To the fullest extent permitted by law, the operator is not liable for any indirect or consequential loss arising from use of the site or the worksheets. If you find a mistake, reporting it at the address below is the fastest way to have it fixed.",
      ],
    },
    {
      h: "Third-party links and advertising",
      body: [
        "Some pages link to external resources, and the site displays advertising supplied by Google. We do not control the content of external sites or of individual advertisements, and a link or an ad is not an endorsement. Concerns about a specific advertisement can be sent to us and can also be reported to Google directly.",
      ],
    },
    {
      h: "Changes and contact",
      body: [
        `These terms may be updated; the date at the top of the page will change when they are. Questions, permission requests beyond what is granted above, and copyright concerns can be sent to ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

const ar: { title: string; updated: string; intro: string; sections: Section[] } = {
  title: "شروط الاستخدام",
  updated: `آخر تحديث: ${UPDATED_AR}`,
  intro:
    "تغطّي هذه الشروط استعمالك موقع arabfingers.site، بما فيه الأنشطة التفاعلية وملفّات أوراق العمل القابلة للتنزيل. وهي مكتوبة لتُقرأ لا لتُبهر. واستعمالك الموقع يعني قبولك بها؛ وإن لم تقبل فالحلّ ببساطة أن تتوقّف عن استعماله.",
  sections: [
    {
      h: "ما هي هذه الخدمة",
      body: [
        "عرب فنجرز موقع تعليمي مجاني للأطفال من نحو سنة إلى سبع سنوات ولمن يعلّمهم من البالغين. يقدّم لعبة حروف تفاعلية، ولوحة تلوين وتتبّع، وأدلّة مكتوبة للآباء، وأوراق عمل للطباعة بصيغة PDF.",
        "وهو مكمّل للتعليم لا منهج ولا بديل عن معلّم. ولا يُدّعى أنّ استعماله سيبلغ بالطفل مستوى معيّناً من القراءة والكتابة في مدّة معيّنة.",
      ],
    },
    {
      h: "الكلفة والحسابات",
      body: [
        "كلّ ما في الموقع مجاني. لا حساب يُنشأ، ولا اشتراك، ولا تجربة تتحوّل إلى دفع، ولا ميزة محجوزة للمشتركين. ويموّل الموقع بالإعلانات، وهي موصوفة في سياسة الخصوصية.",
      ],
    },
    {
      h: "ما يجوز لك بأوراق العمل",
      body: [
        "تُقدَّم ملفّات أوراق العمل للاستعمال الشخصي والعائلي والصفّي، ولا تحتاج إلى إذن لأيّ ممّا يلي:",
      ],
      list: [
        "طباعتها في البيت بأيّ عدد من النسخ",
        "تصويرها لصفّ أو لمجموعة تعليم منزلي أو لمدرسة قرآنية أو لمدرسة نهاية الأسبوع",
        "استعمالها في درس خصوصي مدفوع، ما دامت الأوراق نفسها تُعطى للطلاب بلا مقابل",
        "وضع رابط لهذا الموقع أو لصفحة أوراق العمل من موقعك أو مدوّنتك أو نشرتك",
      ],
    },
    {
      h: "ما لا يجوز بها",
      body: [
        "نرجو ألّا تبيع الملفّات، وألّا تضمّها إلى منتج مدفوع، وألّا ترفعها على موقع آخر أو خزانة ملفّات أو سوق إلكتروني — ولو كان مجانياً. وليس هذا تحكّماً لذاته: فالنسخ المرآة تتقادم، والأسرة التي تنزّل نسخة عمرها سنتان فيها خطأ لا سبيل لها إلى معرفة ذلك. ضع رابطاً إلى هنا فيحصل الجميع على الملفّ الحالي.",
        "ونرجو كذلك ألّا تحذف الإسناد من ورقة، وألّا تقدّم المادّة على أنّها من عملك، وألّا تستعملها لتدريب نموذج أو لتوليد منتج أوراق عمل مشتقّ يُباع.",
      ],
    },
    {
      h: "الاستعمال المقبول للموقع",
      body: [
        "استعمل الموقع على وجهه. لا تحاول تعطيله أو إثقاله أو الوصول إليه بلا تصريح، ولا تجمع بياناته بحجم يُفسده على غيرك، ولا تستعمله لنشر ما يخالف القانون. ولأنّه لا حسابات فيه ولا تعليقات ولا رفع ملفّات فمجال الإساءة ضيّق جدّاً — لكنّ التوقّع قائم.",
      ],
    },
    {
      h: "الملكية الفكرية",
      body: [
        "نصوص الموقع ورسومه وأوراق العمل المولَّدة وأصواته وشيفرته ملك لمشغّل الموقع إلّا ما نُصّ على خلافه، وهي محميّة بحقّ المؤلّف. أمّا اللغة العربية وحروفها فليست بداهةً ملكاً لأحد — وهذه الشروط تغطّي هذا العرض الخاصّ لها لا الحروف نفسها.",
      ],
    },
    {
      h: "الدقّة وحدود موقع مجاني",
      body: [
        "يُبذل جهد كبير في المحتوى اللغوي، لكنّ الموقع يُقدَّم «كما هو» بلا ضمان من أيّ نوع. وقد يتضمّن أخطاء، وقد لا يتوفّر أحياناً، والصوت مُنتَج بأصوات عربية اصطناعية لا بممثّل صوتي بشري، كما تبيّن صفحة المؤلّف.",
        "وإلى أقصى ما يسمح به القانون، لا يتحمّل المشغّل مسؤولية أيّ خسارة غير مباشرة أو تبعية ناشئة عن استعمال الموقع أو أوراق العمل. وإن وجدت خطأً فالإبلاغ عنه على العنوان أدناه أسرع طريق لإصلاحه.",
      ],
    },
    {
      h: "الروابط الخارجية والإعلانات",
      body: [
        "تحيل بعض الصفحات إلى مصادر خارجية، ويعرض الموقع إعلانات تزوّدها Google. ولا نتحكّم في محتوى المواقع الخارجية ولا في فرادى الإعلانات، ووجود رابط أو إعلان ليس تزكية له. ويمكن إرسال أيّ تحفّظ على إعلان بعينه إلينا، كما يمكن الإبلاغ عنه إلى Google مباشرةً.",
      ],
    },
    {
      h: "التغييرات والتواصل",
      body: [
        `قد تُحدَّث هذه الشروط، وسيتغيّر التاريخ في أعلى الصفحة عند تحديثها. وتُرسَل الأسئلة وطلبات الإذن بما يتجاوز ما مُنح أعلاه ومسائل حقوق النشر إلى ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
          <Link href={`/${locale}/privacy`} className="font-bold text-ink/70 underline hover:text-qalam">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </Link>
          <Link href={`/${locale}/contact`} className="font-bold text-ink/70 underline hover:text-qalam">
            {isAr ? "تواصل معنا" : "Contact"}
          </Link>
          <Link href={`/${locale}/printables`} className="font-bold text-ink/70 underline hover:text-qalam">
            {isAr ? "أوراق العمل" : "The worksheets"}
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}
