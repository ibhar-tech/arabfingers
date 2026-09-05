"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  Sparkles, Play, BookOpen, ShieldCheck, Volume2, Palette, Printer,
  WifiOff, Star, Lock, Heart, KeyRound, Baby, Gamepad2,
} from "lucide-react";
import { LetterBuddy, Sun, StarMascot, Crescent } from "@/components/Mascots";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import { HERO_LETTERS, type HeroLetter } from "@/lib/heroLetters";
import { StarTotal } from "@/components/StarTotal";
import { learnArticles } from "@/lib/related";
import { blogPosts } from "@/lib/blog-data";

/* Worksheets sits first in the nav because that is what people come for: in the
   three months to 18 Aug 2026, /printables took 787 of the site's 872 search
   clicks and 91% of named queries were worksheet intent. The game stays
   prominent — it is what makes the site worth returning to — but it is not what
   brings anyone here. Link order lives in SiteHeader's NAV_LINKS. */

export function WarmHome({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const [selectedLetter, setSelectedLetter] = useState<HeroLetter>(HERO_LETTERS[0]);
  const [showAllLetters, setShowAllLetters] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playLetter(l: HeroLetter) {
    setSelectedLetter(l);
    if (audioRef.current) audioRef.current.pause();
    const a = new Audio(`/sounds/letters/${l.id}-ar.mp3`);
    audioRef.current = a;
    a.play().catch(() => {});
  }

  const tt = (en: string, ar: string) => (isAr ? ar : en);

  return (
    <div className="theme-warm min-h-dvh relative overflow-x-hidden" dir={dir}>
      {/* soft ambient blobs — brighter candy wash */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -start-16 h-80 w-80 rounded-full bg-saffron/25 blur-[100px]" />
        <div className="absolute top-1/4 -end-20 h-96 w-96 rounded-full bg-violet/20 blur-[110px]" />
        <div className="absolute top-2/3 -start-10 h-80 w-80 rounded-full bg-bubblegum/20 blur-[110px]" />
        <div className="absolute bottom-0 start-1/2 h-72 w-72 rounded-full bg-qalam/15 blur-[100px]" />
      </div>

      {/* ---------- NAV ---------- */}
      <SiteHeader locale={locale} />

      {/* ---------- HERO ---------- */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-8 sm:pt-16 md:grid-cols-2">
        <Sun className="mascot-sway pointer-events-none absolute -top-2 end-2 h-14 w-14 sm:h-20 sm:w-20" />
        <StarMascot className="mascot-bob pointer-events-none absolute bottom-2 end-1/2 hidden h-10 w-10 md:block" />
        <div className="relative">
          <span className="sticker text-saffron-ink">
            <Sparkles className="h-4 w-4" /> {tt("Free forever · Ages 1–6", "مجاني للأبد · من ١ إلى ٦ سنوات")}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            {tt("Free Arabic", "أوراق عمل")}<br />
            {tt("worksheets that ", "عربية مجانية ")}
            <span className="relative whitespace-nowrap text-qalam">{tt("actually print", "جاهزة للطباعة")}
              <svg className="absolute -bottom-2 start-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7 C 50 2, 150 2, 198 7" stroke="var(--saffron)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="ms-2 inline-flex gap-1.5 align-middle">
              {["ا", "ب", "ج"].map((c, i) => (
                <span key={c} className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-ink font-arabic-display text-xl ${["bg-saffron-soft", "bg-qalam-soft", "bg-rose-soft"][i]}`}>{c}</span>
              ))}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg font-semibold leading-relaxed text-ink/70">
            {tt(
              "53 pages of printable Arabic worksheets — a tracing sheet for every one of the 28 letters, plus numbers, colours and animals. No email, no signup. And a free letter game with real pronunciation for when the pencil goes down.",
              "٥٣ صفحة من أوراق العمل العربية للطباعة — ورقة تتبّع لكلّ حرف من الحروف الـ٢٨، مع الأرقام والألوان والحيوانات. بلا بريد إلكتروني وبلا تسجيل. ولعبة حروف مجانية بنطق حقيقيّ حين يُترك القلم.",
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${locale}/printables`} className="btn-chunky"><Printer className="h-5 w-5" /> {tt("Get the worksheets", "احصل على الأوراق")}</Link>
            <Link href={`/${locale}/play`} className="btn-chunky btn-chunky-ghost"><Gamepad2 className="h-5 w-5" /> {tt("Play the letter game", "العب لعبة الحروف")}</Link>
          </div>
          <StarTotal locale={locale} />
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-ink/60">
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-saffron" /> {tt("All 28 letters, free", "الحروف الـ٢٨ كاملة، مجاناً")}</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-qalam" /> {tt("No accounts, no profiling", "بلا حسابات ولا تنميط")}</span>
            <span className="inline-flex items-center gap-1.5"><Heart className="h-4 w-4 text-rose" /> {tt("Free, no sign-up", "مجاني، بدون حساب")}</span>
          </div>
        </div>

        {/* Slate card: big tappable letter + the alphabet strip */}
        <div className="card-stock card-stock-qalam relative overflow-hidden p-5 sm:p-6 transition-all duration-300">
          <div className="relative mx-auto h-64 w-full sm:h-76">
            {/* Deliberately CSS, not WebGL. A three.js animated hero here once pulled
                867 KB into the most-landed-on page of the site to animate one letter,
                and mobile never saw it anyway (the old probe bailed under 768px) — the
                component was removed, not moved. The real 3D toy still lives on /play,
                where it IS the product. */}
            <div
              onClick={() => playLetter(selectedLetter)}
              className="flex h-full flex-col items-center justify-center cursor-pointer select-none"
            >
              <span className="breathe font-arabic-display text-[8.5rem] leading-none text-ink drop-shadow-md">
                {selectedLetter.ar}
              </span>
            </div>

            {/* Active letter badge with sound trigger */}
            <div className="absolute inset-x-0 bottom-1 mx-auto flex w-fit items-center gap-2.5 rounded-2xl border-2 border-ink bg-card/95 px-4 py-1.5 backdrop-blur-sm shadow-[3px_3px_0_0_var(--ink)]">
              <span className="font-arabic-display text-2xl font-bold text-ink">{selectedLetter.ar}</span>
              <span className="text-sm font-bold text-qalam">{isAr ? selectedLetter.nameAr : selectedLetter.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playLetter(selectedLetter);
                }}
                aria-label={isAr ? `استمع لنطق حرف ${selectedLetter.nameAr}` : `Listen to ${selectedLetter.name}`}
                className="ms-1 flex h-7 w-7 items-center justify-center rounded-full bg-saffron-soft text-ink transition hover:scale-110 active:scale-95"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs sm:text-sm font-bold text-ink/70">
              {tt("Tap any letter to hear it →", "← المس أي حرف لتسمعه")}
            </p>
            <button
              onClick={() => setShowAllLetters((v) => !v)}
              className="text-xs font-bold text-qalam underline hover:text-ink transition cursor-pointer"
            >
              {showAllLetters
                ? tt("Show 6 featured", "عرض ٦ حروف")
                : tt("All 28 letters", "كل الـ ٢٨ حرفاً")}
            </button>
          </div>

          <div
            className={`mt-3 grid gap-2 ${
              showAllLetters
                ? "grid-cols-7 max-h-48 overflow-y-auto pr-1"
                : "grid-cols-6"
            }`}
          >
            {(showAllLetters ? HERO_LETTERS : HERO_LETTERS.slice(0, 6)).map((l) => (
              <button
                key={l.id}
                onClick={() => playLetter(l)}
                aria-label={l.name}
                className={`flex aspect-square items-center justify-center rounded-2xl border-2 border-ink font-arabic-display text-xl sm:text-2xl text-ink transition active:translate-y-0.5 hover:-translate-y-0.5 ${
                  l.tint
                } ${
                  selectedLetter.id === l.id
                    ? "ring-4 ring-ink/20 shadow-inner scale-105"
                    : "hover:brightness-95"
                }`}
              >
                {l.ar}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHAT KIDS LEARN ---------- */}
      <section className="relative mt-2 border-y-[2.5px] border-ink/10 bg-violet-soft/60 py-14">
        <LetterBuddy className="mascot-bob pointer-events-none absolute -top-7 end-6 h-16 w-16 sm:h-20 sm:w-20" />
        <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-3xl font-extrabold text-ink">{tt("What your child explores", "ماذا يكتشف طفلك")}</h2>
        <p className="mt-2 max-w-xl font-semibold text-ink/60">{tt("Three playful paths, one calm and safe place.", "ثلاث مسارات ممتعة، في مكان واحد هادئ وآمن.")}</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-3">
          {[
            { icon: KeyRound, tint: "card-stock-saffron", chip: "bg-saffron-soft", t: tt("All 28 letters", "كل الحروف الـ٢٨"), d: tt("Tap or press a key to meet every Arabic letter with natural Arabic + English pronunciation.", "المس أو اضغط مفتاحاً لتلتقي بكل حرف عربي مع نطق طبيعي بالعربية والإنجليزية.") },
            { icon: Printer, tint: "card-stock-qalam", chip: "bg-qalam-soft", t: tt("Trace & color", "تتبّع ولوّن"), d: tt("Printable worksheets and tracing pages to practice letter shapes away from the screen.", "أوراق عمل قابلة للطباعة وصفحات تتبّع لممارسة أشكال الحروف بعيداً عن الشاشة.") },
            { icon: BookOpen, tint: "card-stock-rose", chip: "bg-rose-soft", t: tt("Parent guides", "أدلة الآباء"), d: tt("In-depth, honest guides on teaching Arabic at home — numbers, colors, first words and more.", "أدلة معمّقة وصادقة لتعليم العربية في البيت — الأرقام، الألوان، الكلمات الأولى والمزيد.") },
          ].map((c) => (
            <div key={c.t} className={`card-stock ${c.tint} p-6`}>
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink ${c.chip}`}><c.icon className="h-6 w-6 text-ink" /></span>
              <h3 className="mt-4 font-display text-xl font-extrabold text-ink">{c.t}</h3>
              <p className="mt-1.5 font-semibold leading-relaxed text-ink/65">{c.d}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="relative mx-auto max-w-6xl px-5 py-14">
        <StarMascot className="mascot-bob pointer-events-none absolute top-8 end-3 hidden h-12 w-12 sm:block" />
        <h2 className="font-display text-3xl font-extrabold text-ink">{tt("Built for little hands", "مصمّم للأيدي الصغيرة")}</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Volume2, shadow: "card-stock-saffron", ic: "text-saffron-ink", t: tt("Clear letter sounds", "أصوات حروف واضحة"), d: tt("Neural Arabic and English voices, checked by ear before they ship.", "أصوات عربية وإنجليزية عصبية، تُراجَع بالسمع قبل نشرها.") },
            { icon: Palette, shadow: "card-stock-violet", ic: "text-violet", t: tt("6 playful themes", "٦ ثيمات ممتعة"), d: tt("Daylight, space, desert, jungle, underwater and Ramadan.", "النهار، الفضاء، الصحراء، الغابة، تحت الماء، ورمضان.") },
            { icon: Lock, shadow: "card-stock-qalam", ic: "text-qalam", t: tt("Parent controls", "أدوات الآباء"), d: tt("Optional PIN lock and a safe, contained play area.", "قفل PIN اختياري ومنطقة لعب آمنة ومحصورة.") },
            { icon: WifiOff, shadow: "card-stock-bubblegum", ic: "text-bubblegum", t: tt("Works offline", "يعمل بدون إنترنت"), d: tt("Install it like an app — no store, no account.", "ثبّته كتطبيق — بدون متجر ولا حساب.") },
          ].map((f) => (
            <div key={f.t} className={`card-stock ${f.shadow} p-5`}>
              <f.icon className={`h-7 w-7 ${f.ic}`} />
              <h3 className="mt-3 font-display text-lg font-extrabold text-ink">{f.t}</h3>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-ink/65">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="card-stock card-stock-saffron p-7 sm:p-10">
          <h2 className="font-display text-3xl font-extrabold text-ink">{tt("How it works", "كيف يعمل")}</h2>
          <div className="mt-7 grid gap-7 sm:grid-cols-3">
            {[
              { n: "١", t: tt("Open & pin", "افتح وثبّت"), d: tt("Open the play page or install it, then pin the screen so taps stay safe.", "افتح صفحة اللعب أو ثبّت التطبيق، ثم ثبّت الشاشة لتبقى اللمسات آمنة.") },
              { n: "٢", t: tt("Tap & hear", "المس واستمع"), d: tt("Every letter shows big and bright, and says its name in Arabic and English.", "يظهر كل حرف كبيراً وواضحاً، وينطق اسمه بالعربية والإنجليزية.") },
              { n: "٣", t: tt("Learn by play", "تعلّم باللعب"), d: tt("Through repetition and joy, letter shapes and sounds become familiar.", "بالتكرار والمتعة، تصبح أشكال الحروف وأصواتها مألوفة.") },
            ].map((s) => (
              <div key={s.n}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-ink bg-card font-arabic-display text-2xl font-bold text-ink">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-extrabold text-ink">{s.t}</h3>
                <p className="mt-1 font-semibold leading-relaxed text-ink/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TRUST + CTA ---------- */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="sticker text-qalam"><Baby className="h-4 w-4" /> {tt("Why parents trust us", "لماذا يثق بنا الآباء")}</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink">{tt("Made by a parent, for the diaspora", "من والد، ولأبناء المهجر")}</h2>
            <ul className="mt-5 space-y-3">
              {[
                tt("100% free, forever — no subscriptions or in-app purchases.", "مجاني ١٠٠٪ للأبد — بدون اشتراكات أو مشتريات داخل التطبيق."),
                tt("No accounts, no profiling — your child's play stays on your device.", "بلا حسابات ولا تنميط — لعب طفلك يبقى على جهازك."),
                tt("Ads never appear on the games a child plays — only on parent reading pages.", "لا إعلانات إطلاقاً في الألعاب التي يقودها الطفل — فقط في صفحات القراءة الموجّهة إلى الآباء."),
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 font-semibold text-ink/75">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-qalam" /> {li}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-stock card-stock-bubblegum relative overflow-hidden p-8 text-center">
            <Crescent className="mascot-sway pointer-events-none absolute -top-3 start-3 h-12 w-12 opacity-90" />
            <span className="breathe inline-block font-arabic-display text-7xl text-ink">ا</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">{tt("Ready to play?", "هل أنت مستعد للعب؟")}</h3>
            <p className="mt-1.5 font-semibold text-ink/65">{tt("Jump straight into the letters — no setup needed.", "ابدأ مباشرة مع الحروف — بدون أي إعداد.")}</p>
            <Link href={`/${locale}/play`} className="btn-pop mt-5"><Play className="h-5 w-5" /> {tt("Open the letter game", "افتح لعبة الحروف")}</Link>
          </div>
        </div>
      </section>

      {/* ---------- EDITORIAL ---------- */}
      <section className="border-t-[2.5px] border-ink/10 bg-saffron-soft/30 py-14">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl font-extrabold text-ink">
            {tt("Teaching Arabic to a child who is growing up elsewhere", "تعليم العربية لطفل ينشأ في بلد آخر")}
          </h2>

          {[
            tt(
              "Most families who find this site are in the same position: Arabic is the language of the grandparents, the household speaks mainly English, and there is no Arabic school within a sensible drive. The child hears the language at family gatherings and understands more than they can say. What is missing is not motivation — it is a low-friction way to practise on an ordinary Tuesday evening.",
              "أكثر الأسر التي تصل إلى هذا الموقع في الموقف نفسه: العربية لغة الأجداد، والبيت يتكلّم الإنجليزية غالباً، ولا توجد مدرسة عربية على مسافة معقولة. يسمع الطفل اللغة في اجتماعات العائلة ويفهم أكثر ممّا يقول. والناقص ليس الدافع — بل طريقة سهلة للتدرّب في أمسية عادية.",
            ),
            tt(
              "That is what this site is for. It is built around the two things that actually move a young child forward: hearing a letter said clearly, and forming that letter with their own hand. The letter game covers the first — tap any of the 28 letters and hear it spoken. The printable worksheets cover the second, with a full page of graded tracing practice for every letter, free to download as a PDF.",
              "لهذا وُجد هذا الموقع. بُني حول الأمرين اللذين يقدّمان الطفل الصغير فعلاً: أن يسمع الحرف منطوقاً نطقاً واضحاً، وأن يخطّ ذلك الحرف بيده. لعبة الحروف تغطّي الأوّل — المس أيّ حرف من الـ٢٨ فتسمعه منطوقاً. وأوراق العمل تغطّي الثاني بصفحة كاملة من التتبّع المتدرّج لكلّ حرف، مجانية للتنزيل بصيغة PDF.",
            ),
            tt(
              "Five minutes a day beats an hour on Sunday. Children this age learn scripts through frequent, short, cheerful contact, not through long sessions — and a session that ends while the child still wants more is the one they come back to. Nothing here needs an account, and nothing keeps score, precisely so that stopping early is never a failure.",
              "خمس دقائق يومياً خير من ساعة يوم الأحد. يتعلّم الأطفال في هذه السنّ الخطوط بملامسة قصيرة متكرّرة مبهجة لا بجلسات طويلة — والجلسة التي تنتهي والطفل ما يزال يريد المزيد هي التي يعود إليها. ولا شيء هنا يحتاج حساباً، ولا شيء يحسب النقاط، حتى لا يكون التوقّف المبكّر إخفاقاً أبداً.",
            ),
            tt(
              "The guides for parents are written for adults who may not read Arabic themselves. They explain what each letter sounds like using English reference points, which mistakes learners reliably make, and what to do about them — so you can help your child even if your own Arabic stopped developing when you were their age.",
              "أمّا أدلّة الآباء فمكتوبة لبالغين قد لا يقرؤون العربية أنفسهم. تشرح صوت كلّ حرف بمرجعية إنجليزية، والأخطاء التي يقع فيها المتعلّمون عادةً، وكيف تُعالَج — لتستطيع مساعدة طفلك ولو توقّفت عربيتك أنت عند سنّه.",
            ),
          ].map((p) => (
            <p key={p} className="mt-4 leading-relaxed text-ink/75">{p}</p>
          ))}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { href: "/games", t: tt("Alphabet games", "ألعاب الحروف"), d: tt("Trace, listen and tap — earn a star per letter.", "تتبّع واستمع وانقر — نجمة لكلّ حرف.") },
              { href: "/printables", t: tt("Free worksheets (PDF)", "أوراق عمل مجانية"), d: tt("53 printable pages, no signup.", "٥٣ صفحة للطباعة، بلا تسجيل.") },
              { href: "/learn/arabic-alphabet-guide", t: tt("The alphabet guide", "دليل الأبجدية"), d: tt("All 28 letters, sound by sound.", "الحروف الـ٢٨، صوتاً صوتاً.") },
              { href: "/learn/teaching-arabic-to-kids", t: tt("Advice for parents", "نصائح للآباء"), d: tt("What works at home, and what doesn't.", "ما ينفع في البيت وما لا ينفع.") },
            ].map((c) => (
              <Link key={c.href} href={`/${locale}${c.href}`} className="card-stock p-5 transition hover:border-qalam">
                <h3 className="font-display text-base font-extrabold text-ink">{c.t}</h3>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-ink/65">{c.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LIBRARY ----------
          The homepage used to end on marketing copy, so nothing above the footer
          showed that the written guides exist in any quantity. Anyone judging the
          site from this page alone — a first-time parent or a reviewer — saw a toy
          and four link cards. Listing the library here is the honest picture: the
          reading material is the larger half of the site. */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-ink">
            {tt("Everything written for parents", "كلّ ما كُتب للآباء")}
          </h2>
          <p className="mt-3 leading-relaxed text-ink/70">
            {tt(
              "The games are for the child. These are for you — plain-language guides written for adults who may not read Arabic themselves, each one covering a single question properly rather than skimming ten.",
              "الألعاب للطفل. وهذه لك أنت — أدلّة بلغة واضحة مكتوبة لبالغين قد لا يقرؤون العربية، يعالج كلّ دليل سؤالاً واحداً معالجة وافية بدل أن يمرّ على عشرة مروراً سريعاً.",
            )}
          </p>
        </div>

        <h3 className="mt-9 font-display text-sm font-extrabold uppercase tracking-wide text-ink/55">
          {tt("Learning guides", "أدلّة التعلّم")}
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learnArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/${locale}/${a.path}/${a.slug}`}
              className="card-stock flex flex-col p-5 transition hover:border-qalam"
            >
              <h4 className="font-display text-base font-extrabold leading-snug text-ink">
                {tt(a.titleEn, a.titleAr)}
              </h4>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-ink/65">
                {tt(a.descEn, a.descAr)}
              </p>
            </Link>
          ))}
        </div>

        <h3 className="mt-10 font-display text-sm font-extrabold uppercase tracking-wide text-ink/55">
          {tt("Longer reads", "مقالات أطول")}
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {blogPosts.map((b) => (
            <Link
              key={b.slug}
              href={`/${locale}/blog/${b.slug}`}
              className="card-stock flex flex-col p-5 transition hover:border-qalam"
            >
              <div className="flex items-start gap-3">
                <span aria-hidden className="text-xl leading-none">{b.icon}</span>
                <div>
                  <h4 className="font-display text-base font-extrabold leading-snug text-ink">
                    {tt(b.titleEn, b.titleAr)}
                  </h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink/45">
                    {tt(b.readingTimeEn, b.readingTimeAr)}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-ink/65">
                {tt(b.descEn, b.descAr)}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            ["/learn", tt("All learning guides", "كلّ الأدلّة")],
            ["/blog", tt("All articles", "كلّ المقالات")],
            ["/printables", tt("Free worksheets", "أوراق العمل المجانية")],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              className="rounded-2xl border-2 border-ink bg-card px-4 py-2 text-sm font-extrabold text-ink shadow-[3px_3px_0_0_var(--ink)] transition hover:bg-saffron-soft"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <div className="mt-6">
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
