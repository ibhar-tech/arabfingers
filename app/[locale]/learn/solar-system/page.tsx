import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { LessonStructuredData } from "@/components/LessonStructuredData";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";
import SolarSystemInteractive from "@/components/StatesOfMatter/SolarSystemInteractive";
import { SolarSystemDiagram } from "@/components/illustrations/SolarSystemDiagram";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/solar-system", {
    titleEn: "The Solar System for Kids — Interactive Science Lesson",
    titleAr: "النظام الشمسي للأطفال — درس علمي تفاعلي",
    descriptionEn: "An immersive interactive space lesson teaching children about the solar system and gravity: Sun, Mercury, Venus, Earth, Mars, and orbital paths with gravity controls.",
    descriptionAr: "درس كرتوني تفاعلي شيق يعلم الأطفال النظام الشمسي والجاذبية: كواكب عطارد والزهرة والأرض والمريخ مع مدارات تفاعلية ومحاكي جاذبية ممتع.",
    ogType: "article",
    publishedTime: "2026-05-31",
    keywords: [
      "solar system for kids", "النظام الشمسي للأطفال",
      "gravity and orbits for kids", "الجاذبية والمدارات للأطفال",
      "mercury venus earth mars kids", "كواكب المجموعة الشمسية للأطفال",
      "interactive space simulator", "محاكي الفضاء التفاعلي",
      "astronomy for preschoolers", "علم الفلك للأطفال الصغار",
    ],
  });
}

const transcriptEn = [
  { speaker: "Narrator", text: "Fasten your seatbelts my friends! Today we will fly on a cosmic space journey among the planets to discover how gravity keeps them orbiting!" },
  { speaker: "Anas", text: "Dr. Hakim, space is so vast and scary! Why do our planets spin in perfect circles around the sun instead of flying off into the deep universe?" },
  { speaker: "Dr. Hakim", text: "A very deep question! The Sun is extremely massive and heavy, so it possesses a super invisible gravitational pull that grips planets and keeps them orbiting like a magnet!" },
  { speaker: "Dr. Hakim", text: "Look at Mercury, it's the closest planet to the sun! It is very small and speeds around like a cheetah so gravity doesn't drag it down into the burning sun!" },
  { speaker: "Anas", text: "What a gorgeous shine! Venus is the hottest and brightest planet because it is wrapped in thick clouds that trap heat like a greenhouse!" },
  { speaker: "Dr. Hakim", text: "And now our wonderful planet, Earth! It is the only planet packed with water, air, and life, and a cute little moon spins around it to light up our night!" },
  { speaker: "Anas", text: "Look at that spectacular red color! It's Mars, covered in iron rust. We send smart rover robots to explore its giant mountains and deep valleys!" },
  { speaker: "Narrator", text: "Now it's your turn to control solar gravity! Slide the bar to increase gravity and watch planets speed up, or decrease it to watch asteroids float away!" },
  { speaker: "Anas", text: "What a spectacular cosmic flight! Let's summarize our four neighboring planets with these interactive space cards!" },
  { speaker: "Dr. Hakim", text: "Outstanding job my clever astronaut friends! You were amazing on our cosmic adventure today! Keep exploring the stars and see you soon!" },
];

const transcriptAr = [
  { speaker: "الراوي", text: "اربطوا أحزمة الأمان يا أصدقائي! سننطلق اليوم في رحلة فضائية خارقة بين الكواكب لنكتشف كيف تحافظ الجاذبية عليها تدور بسعادة!" },
  { speaker: "أنس", text: "يا دكتور حكيم، الفضاء واسع ومخيف جداً! لماذا تدور كواكبنا في دوائر منتظمة حول الشمس ولا تطير متباعدة في الكون الفسيح؟" },
  { speaker: "د. حكيم", text: "سؤال عميق جداً! الشمس ضخمة وثقيلة للغاية، لذا تمتلك قوة جذب خارقة غير مرئية تسحب الكواكب نحوها وتجعلها تدور حولها كالمغناطيس!" },
  { speaker: "د. حكيم", text: "انظروا إلى عطارد، إنه الكوكب الأقرب للشمس! حجمه صغير جداً وهو سريع كالفهد في دورانه لكي لا تسحبه الجاذبية وتسقطه في الشمس الساخنة!" },
  { speaker: "أنس", text: "يا لها من لمعان! كوكب الزهرة هو الأكثر سخونة وتوهجاً في مجموعتنا لأنه محاط بغيوم سميكة تحبس الحرارة كصوبة دافئة!" },
  { speaker: "د. حكيم", text: "والآن كوكبنا الرائع الأرض! إنه الكوكب الوحيد المليء بالماء والهواء والحياة، ويدور حوله قمر صغير ينير ليلنا الجميل بسعادة!" },
  { speaker: "أنس", text: "انظروا للون الأحمر الرائع! إنه كوكب المريخ المغطى بالحديد والصدأ، ونحن نرسل مركبات فضاء ذكية لتستكشف جباله الشاهقة ووديانه العميقة!" },
  { speaker: "الراوي", text: "والآن حان دوركم للتحكم في جاذبية الشمس! حركوا الشريط لزيادة الجاذبية وشاهدوا كيف تسرع الكواكب، أو خفضوها لتطير الكويكبات بعيداً!" },
  { speaker: "أنس", text: "يا له من طيران فضائي مذهل! دعونا نلخص خصائص كواكبنا القريبة الأربعة ببطاقات الفضاء التفاعلية!" },
  { speaker: "د. حكيم", text: "أحسنتم يا أصدقائي رواد الفضاء الأذكياء! لقد كنتم رائعين في مغامرتنا الكونية اليوم! استمروا في استكشاف النجوم ونراكم قريباً!" },
];

export default async function SolarSystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";
  const transcript = isAr ? transcriptAr : transcriptEn;
  const plainTranscript = transcript.map((t) => `${t.speaker}: ${t.text}`).join(" ");

  const faq = isAr
    ? [
        {
          q: "لماذا لا تسقط الأرض في الشمس؟",
          a: "الأرض تسقط فعلاً نحو الشمس طوال الوقت، لكنها تسقط حولها وليس فيها! فهي تندفع إلى الجانب بسرعة كبيرة جداً في الوقت نفسه، فتتوازن سرعتها مع جذب الشمس، وتظل تدور في حلقة دائمة لا تنتهي دون أن تقترب وتحترق أبداً.",
        },
        {
          q: "لماذا لم يعد بلوتو كوكباً؟",
          a: "أعاد العلماء ترتيب الأجرام السماوية، فوجدوا أن بلوتو صغير جداً ولا يستطيع تنظيف مساره من الصخور والأجسام المجاورة كما تفعل الكواكب الكبيرة. لذلك صنّفوه «كوكباً قزماً»، وهو اسم خاص بالأجرام الصغيرة التي تشبه الكواكب لكنها أصغر منها.",
        },
        {
          q: "كم يستغرق الوصول إلى القمر بالسيارة؟",
          a: "لو استطعنا أن نقود سيارة نحو القمر دون توقف، وبسرعة الطريق السريع، فسنحتاج إلى نحو ستة أشهر كاملة لنصل إليه! القمر بعيد جداً عنا، لكنه أقرب جيراننا في الفضاء، والمسافة إليه تبدو هائلة بالسيارة.",
        },
        {
          q: "لماذا يكون المريخ أحمر اللون؟",
          a: "تربة المريخ مليئة بالحديد الذي تأكسد وصدئ مع مرور الزمن الطويل، تماماً كما يصدأ المسمار القديم ويصبح لونه أحمر برتقالياً. لذلك يبدو المريخ كله مغطى بغبار الصدأ الأحمر، ومن هنا جاء اسمه «الكوكب الأحمر».",
        },
        {
          q: "هل الشمس مشتعلة بالنار؟",
          a: "لا، الشمس ليست مشتعلة كنار الحطب، فالنار تحتاج إلى الأكسجين لتشتعل ولا يوجد أكسجين في الفضاء. الشمس تتوهج وتضيء بسبب الاندماج النووي، حيث تضغط ذرات الهيدروجين معاً بقوة هائلة فتتحول إلى هيليوم وتطلق ضوءاً وحرارة عظيمة.",
        },
      ]
    : [
        {
          q: "Why doesn't the Earth fall into the Sun?",
          a: "The Earth is always falling toward the Sun — but it falls AROUND it, not into it! At the same time, it rushes sideways very fast. Its sideways speed balances the Sun's pull, so it keeps circling in an endless loop, never getting close enough to burn.",
        },
        {
          q: "Why is Pluto not a planet anymore?",
          a: "Scientists re-sorted the objects in space and found that Pluto is too small to clear its own path of nearby rocks, the way big planets do. So they gave it a new name — a 'dwarf planet.' That word means a small body that looks like a planet but is much tinier.",
        },
        {
          q: "How long would it take to drive a car to the Moon?",
          a: "If you could drive a car all the way to the Moon without stopping, at normal highway speed, the trip would take about six whole months! The Moon is our closest space neighbor, yet the distance is so huge that a car ride would feel almost endless.",
        },
        {
          q: "Why is Mars red?",
          a: "The soil on Mars is full of iron that has rusted over a very long time, exactly the way an old nail turns reddish-orange when it rusts. That rust dust covers the entire planet, which is why Mars looks red and earns its nickname, 'the Red Planet.'",
        },
        {
          q: "Is the Sun on fire?",
          a: "No — the Sun is not burning like a campfire, because fire needs oxygen and there is no oxygen in space. The Sun GLOWS because of nuclear fusion: hydrogen atoms are squeezed together with enormous force, turning into helium and releasing huge amounts of light and heat.",
        },
      ];

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title={isAr ? "رحلة النظام الشمسي للأطفال - كرتون تفاعلي" : "The Solar System for Kids - Interactive Cartoon"}
        description={
          isAr
            ? "درس تفاعلي مشوق يستكشف كواكب المجموعة الشمسية القريبة وكيف تحافظ الجاذبية الكونية على توازن المدارات."
            : "An immersive interactive cartoon lesson exploring neighboring planets and how gravity keeps orbits balanced in space."
        }
        slug="learn/solar-system"
        datePublished="2026-05-31"
        dateModified="2026-06-11"
        section="Science Education"
        crumbs={[
          { label: isAr ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: isAr ? "النظام الشمسي" : "Solar System" },
        ]}
      />

      <LessonStructuredData
        locale={locale}
        titleEn="The Solar System for Kids — Interactive Science Lesson"
        titleAr="النظام الشمسي للأطفال — درس علمي تفاعلي"
        descriptionEn="Learn about neighboring planets and solar gravity through an interactive cartoon."
        descriptionAr="تعلم عن كواكب المجموعة الشمسية وجاذبية الشمس من خلال كرتون تفاعلي شيق."
        slug="solar-system"
        durationMinutes={5}
        datePublished="2026-05-31"
        transcriptText={plainTranscript}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }) }} />

      {/* Title & Description Headers */}
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "النظام الشمسي وكواكبه للأطفال 🚀✨" : "Our Spectacular Solar System 🚀✨"}
        </h1>
        <p className="text-base text-white/75">
          {isAr
            ? "حلق في مغامرة فضائية مذهلة! استكشف أسرار كواكبنا الأربعة القريبة وتحكم في جاذبية الشمس لتغيير سرعة المدارات وتفادي كويكباتك الخاصة!"
            : "Fly on a spectacular space adventure! Explore our neighboring planets and adjust solar gravity to control orbital speeds and launch custom asteroids!"}
        </p>
      </div>

      {/* Main Flagship Interactive Animation Player */}
      <div className="mb-10 w-full">
        <SolarSystemInteractive locale={locale} />
      </div>

      {/* Immersive Educational Summary details below the video */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "💡 ملخص كواكب مجموعتنا الشمسية" : "💡 Neighbors of Our Solar System"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-white/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-slate-400 mb-1">
              {isAr ? "١. كوكب عطارد" : "1. Mercury"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "الكوكب الأقرب للشمس وسريع الدوران جداً لئلا تسحبه جاذبيتها. صخري وحجمه صغير للغاية ولا يمتلك أي قمر."
                : "The closest planet to the sun. It orbits at lightning speeds to resist solar pull. Small, rocky, and moonless."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-300 mb-1">
              {isAr ? "٢. كوكب الزهرة" : "2. Venus"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "الكوكب الأكثر حرارة وسخونة في نظامنا؛ غيومه السميكة والغازية تحبس حرارة الشمس كصوبة دافئة لا تحتمل."
                : "The hottest planet in our system, wrapped in thick atmosphere that traps solar rays like a greenhouse."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">
              {isAr ? "٣. كوكب الأرض" : "3. Earth"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "موطننا الجميل المليء بالماء والهواء والبحار والغابات والحياة، ويمتلك قمراً لطيفاً واحداً ينير ليلنا السعيد."
                : "Our spectacular blue home, overflowing with oceans, oxygen, and life, orbited by a single glowing moon."}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-red-400 mb-1">
              {isAr ? "٤. كوكب المريخ" : "4. Mars"}
            </h3>
            <p className="text-white/80">
              {isAr
                ? "الكوكب الأحمر المليء بالصدأ والحديد، ونرسل إليه روبوتات ومركبات فضاء ذكية تبحث عن آثار مياه قديمة."
                : "The rusty red planet covered in iron dust, actively explored by smart robotic rovers seeking water hints."}
            </p>
          </div>
        </div>
      </section>

      {/* Diagram figure: the Sun's family of planets */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🪐 رسم توضيحي: عائلة الشمس" : "🪐 Diagram: The Sun's Family"}
        </h2>
        <figure className="m-0">
          <SolarSystemDiagram locale={locale} />
          <figcaption className="text-sm text-white/75 mt-3 text-center">
            {isAr
              ? "عائلة الشمس: ثمانية كواكب في رحلة دائمة"
              : "The Sun's family: eight planets on an endless journey"}
          </figcaption>
        </figure>
      </section>

      {/* The solar system from your window */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🔭 النظام الشمسي من نافذتك" : "🔭 The Solar System From Your Window"}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
          <p className="text-base text-white/80">
            {isAr
              ? "لست بحاجة إلى صاروخ لترى النظام الشمسي، فبعض أعضائه يطلّون عليك من نافذتك كل يوم. تأمل السماء بهدوء وستكتشف أربعة أشياء رائعة بنفسك:"
              : "You do not need a rocket to meet the solar system — some of its members greet you from your own window every day. Look up calmly and you will discover four wonderful things for yourself:"}
          </p>
          <p>
            <strong className="text-white">{isAr ? "الشمس نجمٌ حقيقي: " : "The Sun is a real star: "}</strong>
            {isAr
              ? "الشمس ليست مجرد قرص لامع، بل هي نجمنا الذي يضيء في النهار. إنها قريبة منا كثيراً مقارنة ببقية النجوم، ولهذا تضيء كل شيء حولنا وتدفئ كوكبنا بالكامل."
              : "The Sun is not just a shiny disk — it is our very own star, the one that shines in the daytime. It is so much closer to us than the other stars, which is why it lights up everything around us and warms our whole planet."}
          </p>
          <p>
            <strong className="text-white">{isAr ? "القمر يغيّر شكله: " : "The Moon changes shape: "}</strong>
            {isAr
              ? "القمر يدور حول الأرض، ويمكنك أن تراقب شكله وهو «يتغير» ليلة بعد ليلة، فيصبح هلالاً رفيعاً ثم نصف دائرة ثم بدراً كاملاً مستديراً. هذه التغيرات تُسمى أطوار القمر."
              : "The Moon orbits the Earth, and you can watch its shape seem to 'change' night after night — a thin crescent, then a half circle, then a full round disk. These changes are called the phases of the Moon."}
          </p>
          <p>
            <strong className="text-white">{isAr ? "الزهرة نجمة المساء: " : "Venus, the evening star: "}</strong>
            {isAr
              ? "بعد غروب الشمس مباشرة، كثيراً ما يلمع كوكب الزهرة في الأفق كأنه نجمة براقة كبيرة. لمعانه القوي جعل الناس قديماً يسمّونه «نجمة المساء»، رغم أنه كوكب وليس نجماً."
              : "Just after the Sun sets, Venus often shines on the horizon like a big, brilliant jewel. Its strong glow led people long ago to call it the 'evening star,' even though it is really a planet, not a star at all."}
          </p>
          <p>
            <strong className="text-white">{isAr ? "درب التبانة مجرّتنا: " : "The Milky Way is our galaxy: "}</strong>
            {isAr
              ? "في ليلة صافية بعيدة عن أضواء المدينة، قد ترى شريطاً باهتاً من الضوء يمتد عبر السماء. هذا الشريط هو مجرّتنا «درب التبانة»، ونحن نراها من الداخل لأننا نعيش بين نجومها."
              : "On a clear, dark night far from city lights, you might see a faint band of light stretching across the sky. That band is our own galaxy, the Milky Way, and we see it from the inside because we live among its stars."}
          </p>
        </div>
      </section>

      {/* Try it at home: orbit in the living room */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "🧪 جرّبها في البيت: مدار في غرفة الجلوس" : "🧪 Try It at Home: Orbit in the Living Room"}
        </h2>
        <ol className="list-decimal ms-5 space-y-3 text-sm sm:text-base text-white/80 leading-relaxed marker:text-accent marker:font-bold">
          <li>
            {isAr
              ? "ضع مصباحاً مضيئاً في منتصف الغرفة، وتخيّل أنه الشمس التي تقف ثابتة في مركز نظامنا الشمسي بينما تدور الكواكب حولها."
              : "Place a lamp in the middle of the room and imagine it is the Sun, standing still at the center of our solar system while the planets travel around it."}
          </li>
          <li>
            {isAr
              ? "امشِ في دائرة كبيرة وبطيئة حول المصباح. هذه الدورة الكاملة الواحدة حول الشمس تساوي سنة واحدة كاملة على كوكب الأرض."
              : "Walk in one big, slow circle around the lamp. That single full lap around the Sun is exactly one whole year on planet Earth."}
          </li>
          <li>
            {isAr
              ? "وأنت تمشي في الدائرة، لُفّ حول نفسك ببطء. كل دورة حول نفسك تساوي يوماً وليلة: عندما يكون وجهك نحو المصباح يكون نهاراً، وعندما يبتعد عنه يكون ليلاً."
              : "While you circle, spin slowly on the spot. Each spin equals one day and one night: when your face is toward the lamp it is daytime, and when it turns away it is nighttime."}
          </li>
          <li>
            {isAr
              ? "الآن أمسك برتقالة (هي القمر) وسلّط عليها ضوء مصباح يدوي (هو الشمس). ستلاحظ أن النصف المضاء فقط هو الذي يظهر، فحرّك البرتقالة حول رأسك لترى «أطوار» القمر تتغير."
              : "Now hold an orange (that is the Moon) and shine a flashlight (the Sun) on it. Only the lit half shows. Move the orange around your head to watch the Moon's 'phases' change before your eyes."}
          </li>
          <li className="text-sm text-white/75">
            {isAr
              ? "🛡️ ملاحظة أمان: تأكد أن مسار مشيك حول المصباح خالٍ من الأثاث والألعاب قبل أن تبدأ الدوران حتى لا تتعثر."
              : "🛡️ Safety note: make sure the path you walk around the lamp is clear of furniture and toys before you start spinning, so you do not trip."}
          </li>
        </ol>
      </section>

      {/* FAQ — kids' questions, rendered from faq[] for JSON-LD parity */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "❓ أسئلة يطرحها الأطفال" : "❓ Questions Kids Ask"}
        </h2>
        <div className="space-y-4">
          {faq.map((f, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5">
              <h3 className="font-bold text-accent mb-1 text-sm sm:text-base">{f.q}</h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini-glossary */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "📚 قاموس الكلمات العلمية" : "📚 Mini Science Glossary"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-white/80 leading-relaxed">
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-emerald-400 mb-1">{isAr ? "الكوكب" : "Planet"}</h3>
            <p className="text-white/80">
              {isAr
                ? "جرم كبير مستدير يدور حول الشمس في مدار ثابت، مثل الأرض التي نعيش عليها وكوكب المريخ الأحمر."
                : "A large round world that travels around the Sun in a steady path, like our own Earth or the red planet Mars."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-yellow-400 mb-1">{isAr ? "المدار" : "Orbit"}</h3>
            <p className="text-white/80">
              {isAr
                ? "المسار الدائري الذي يسلكه جسم وهو يدور حول جسم آخر، مثل دوران الأرض حول الشمس دون توقف."
                : "The curved path an object follows as it circles another, like the way the Earth keeps looping around the Sun."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-orange-400 mb-1">{isAr ? "النجم" : "Star"}</h3>
            <p className="text-white/80">
              {isAr
                ? "كرة ضخمة من الغاز المتوهج تضيء وتدفئ بنفسها، وشمسنا هي أقرب نجم إلينا في الكون الواسع."
                : "A giant ball of glowing gas that shines and gives out its own heat. Our Sun is the closest star to us."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-sky-400 mb-1">{isAr ? "القمر" : "Moon"}</h3>
            <p className="text-white/80">
              {isAr
                ? "جرم يدور حول كوكب وليس حول الشمس مباشرة، وقمر الأرض هو الذي ينير سماءنا في الليل."
                : "A world that circles a planet instead of the Sun. Earth's Moon is the bright light in our night sky."}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/5">
            <h3 className="font-bold text-purple-400 mb-1">{isAr ? "التلسكوب" : "Telescope"}</h3>
            <p className="text-white/80">
              {isAr
                ? "أداة خاصة تقرّب الأجرام البعيدة فتبدو أكبر وأوضح، فنرى بها الكواكب والنجوم البعيدة عنا جداً."
                : "A special tool that makes far-away objects look bigger and clearer, so we can study distant planets and stars."}
            </p>
          </div>
        </div>
      </section>

      {/* Full Lesson Transcript — crawlable by Google for SEO */}
      <section className="mb-10 p-6 rounded-2xl border border-white/8 bg-white/5">
        <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
          {isAr ? "📝 نص الدرس الكامل" : "📝 Full Lesson Transcript"}
        </h2>
        <p className="text-xs text-white/40 mb-4">
          {isAr
            ? "النص الكامل للحوار التعليمي بين الدكتور حكيم وأنس حول النظام الشمسي والكواكب."
            : "The complete educational dialogue between Dr. Hakim and Anas about the solar system and its planets."}
        </p>
        <div className="space-y-3 text-sm text-white/80 leading-relaxed">
          {transcript.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 font-bold text-white/80 min-w-[70px]">{line.speaker}:</span>
              <p>{line.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Science Lessons — cross-linking */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-3">
          {isAr ? "🔬 دروس علمية أخرى" : "🔬 More Science Lessons"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href={`/${locale}/learn/states-of-matter`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🧪</span>
            <span className="font-semibold text-white">{isAr ? "حالات المادة" : "States of Matter"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "استكشف الحالات الأربع للمادة" : "Explore solid, liquid, gas, and plasma"}</p>
          </Link>
          <Link href={`/${locale}/learn/water-cycle`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">💧</span>
            <span className="font-semibold text-white">{isAr ? "دورة المياه" : "Water Cycle"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "رحلة قطرة الماء في الطبيعة" : "Follow a water drop's journey"}</p>
          </Link>
          <Link href={`/${locale}/learn/gravity`} className="rounded-xl border border-white/8 bg-white/5 p-4 text-sm hover:bg-white/10 hover:text-accent transition">
            <span className="text-2xl block mb-1">🍎</span>
            <span className="font-semibold text-white">{isAr ? "الجاذبية" : "Gravity"}</span>
            <p className="text-xs text-white/50 mt-1">{isAr ? "القوة الخفية للكون" : "The invisible force of the cosmos"}</p>
          </Link>
        </div>
      </section>

      {/* Nav links */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href={`/${locale}/learn`} className="text-xs text-accent underline">
          {isAr ? "← العودة إلى قائمة الدروس" : "← Back to Learn Menu"}
        </Link>
      </div>
    </PageLayout>
  );
}

