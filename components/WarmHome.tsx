"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles, Play, BookOpen, ShieldCheck, Volume2, Palette, Printer,
  WifiOff, Menu, X, Star, Lock, Heart, KeyRound, Baby,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { LetterBuddy, Sun, StarMascot, Crescent } from "@/components/Mascots";

const HeroGlyph = dynamic(() => import("@/components/HeroGlyph"), { ssr: false });

const NAV = [
  { href: "", en: "Home", ar: "الرئيسية" },
  { href: "/play", en: "Play", ar: "العب" },
  { href: "/learn", en: "Learn", ar: "تعلّم" },
  { href: "/printables", en: "Worksheets", ar: "أوراق عمل" },
  { href: "/blog", en: "Blog", ar: "المدونة" },
  { href: "/about", en: "About", ar: "عن الموقع" },
];

type Letter = { ar: string; en: string; name: string; nameAr: string; id: string; tint: string };
const LETTERS: Letter[] = [
  { ar: "أ", en: "A", name: "Alef", nameAr: "ألف", id: "alef", tint: "bg-saffron-soft" },
  { ar: "ب", en: "B", name: "Ba", nameAr: "باء", id: "ba", tint: "bg-qalam-soft" },
  { ar: "ت", en: "T", name: "Ta", nameAr: "تاء", id: "ta", tint: "bg-rose-soft" },
  { ar: "ج", en: "J", name: "Jeem", nameAr: "جيم", id: "jeem", tint: "bg-saffron-soft" },
  { ar: "د", en: "D", name: "Daal", nameAr: "دال", id: "dal", tint: "bg-qalam-soft" },
  { ar: "س", en: "S", name: "Seen", nameAr: "سين", id: "seen", tint: "bg-rose-soft" },
];

export function WarmHome({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const dir = isAr ? "rtl" : "ltr";
  const pathname = usePathname();
  const router = useRouter();
  const setLocale = useAppStore((s) => s.setLocale);

  const [menuOpen, setMenuOpen] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [active, setActive] = useState<Letter | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only mount the 3D alef on desktop widths AND when WebGL actually works —
    // otherwise the breathing-alef fallback shows (no blank slate card).
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    try {
      const gl = document.createElement("canvas").getContext("webgl") ||
        document.createElement("canvas").getContext("experimental-webgl");
      if (gl) setShow3D(true);
    } catch {
      /* keep fallback */
    }
  }, []);

  function switchLocale(next: "ar" | "en") {
    const nextPath = pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${next}`);
    setLocale(next);
    router.replace(nextPath);
  }

  function playLetter(l: Letter) {
    setActive(l);
    if (audioRef.current) audioRef.current.pause();
    const a = new Audio(`/sounds/letters/${l.id}-ar.mp3`);
    audioRef.current = a;
    a.play().catch(() => {});
    window.clearTimeout((playLetter as unknown as { _t?: number })._t);
    (playLetter as unknown as { _t?: number })._t = window.setTimeout(() => setActive(null), 1800);
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
      <header className="sticky top-3 z-30 px-3">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-[2.5px] border-ink bg-card/90 px-4 py-2.5 backdrop-blur-md shadow-[0_4px_0_0_var(--ink)]">
          <Link href={`/${locale}`} className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-arabic-display text-saffron">ا</span>
            Arab Fingers
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={`/${locale}${n.href}`}
                className="rounded-full px-3 py-1.5 text-sm font-bold text-ink/70 transition hover:bg-saffron-soft hover:text-ink"
              >
                {isAr ? n.ar : n.en}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-0.5 rounded-full border-2 border-ink p-0.5 text-xs font-bold sm:flex">
              <button onClick={() => switchLocale("ar")} className={`rounded-full px-2 py-0.5 transition ${isAr ? "bg-ink text-card" : "text-ink/60"}`}>ع</button>
              <button onClick={() => switchLocale("en")} className={`rounded-full px-2 py-0.5 transition ${!isAr ? "bg-ink text-card" : "text-ink/60"}`}>EN</button>
            </div>
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink text-ink md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-3xl border-[2.5px] border-ink bg-card p-3 shadow-[4px_4px_0_0_var(--ink)] md:hidden">
            {NAV.map((n) => (
              <Link key={n.href} href={`/${locale}${n.href}`} onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-bold text-ink/80 hover:bg-saffron-soft">
                {isAr ? n.ar : n.en}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t-2 border-ink/10 px-3 pt-3">
              <button onClick={() => { switchLocale("ar"); setMenuOpen(false); }} className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-bold ${isAr ? "bg-ink text-card" : "text-ink"}`}>العربية</button>
              <button onClick={() => { switchLocale("en"); setMenuOpen(false); }} className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-bold ${!isAr ? "bg-ink text-card" : "text-ink"}`}>English</button>
            </div>
          </div>
        )}
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-8 sm:pt-16 md:grid-cols-2">
        <Sun className="mascot-sway pointer-events-none absolute -top-2 end-2 h-14 w-14 sm:h-20 sm:w-20" />
        <StarMascot className="mascot-bob pointer-events-none absolute bottom-2 end-1/2 hidden h-10 w-10 md:block" />
        <div className="relative">
          <span className="sticker text-saffron-ink">
            <Sparkles className="h-4 w-4" /> {tt("Free forever · Ages 1–6", "مجاني للأبد · من ١ إلى ٦ سنوات")}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            {tt("Learn the Arabic", "تعلّم الحروف")}<br />
            {tt("alphabet by ", "العربية ")}
            <span className="relative whitespace-nowrap text-qalam">{tt("playing", "باللعب")}
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
              "A free, ad-free bilingual letter game for toddlers. Tap any of the 28 Arabic letters, hear natural pronunciation, and grow into guides built for parents.",
              "لعبة حروف مجانية ثنائية اللغة وبدون إعلانات للأطفال. المس أي حرف من الحروف العربية الـ٢٨، استمع إلى النطق الطبيعي، واستكشف أدلة مصممة للآباء.",
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/${locale}/play`} className="btn-chunky"><Play className="h-5 w-5" /> {tt("Start playing", "ابدأ اللعب")}</Link>
            <Link href={`/${locale}/learn`} className="btn-chunky btn-chunky-ghost"><BookOpen className="h-5 w-5" /> {tt("Learning guides", "أدلة التعلّم")}</Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-ink/60">
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-saffron" /> {tt("4.3M+ letters tapped", "أكثر من ٤ مليون لمسة")}</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-qalam" /> {tt("Zero data collected", "بدون جمع بيانات")}</span>
            <span className="inline-flex items-center gap-1.5"><Heart className="h-4 w-4 text-rose" /> {tt("No ads, no sign-up", "بدون إعلانات أو حساب")}</span>
          </div>
        </div>

        {/* Slate card: 3D alef + tappable letters */}
        <div className="card-stock card-stock-qalam relative overflow-hidden p-5 sm:p-6">
          <div className="relative mx-auto h-60 w-full sm:h-72">
            {show3D ? (
              <HeroGlyph />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="breathe font-arabic-display text-[9rem] leading-none text-ink">ا</span>
              </div>
            )}
            {active && (
              <div className="absolute inset-x-0 bottom-0 mx-auto w-fit rounded-2xl border-2 border-ink bg-card px-4 py-1.5 text-center shadow-[3px_3px_0_0_var(--ink)]">
                <span className="font-arabic-display text-2xl text-ink">{active.ar}</span>
                <span className="ms-2 text-sm font-bold text-qalam">{isAr ? active.nameAr : active.name}</span>
              </div>
            )}
          </div>
          <p className="mt-3 text-center text-sm font-bold text-ink/60">
            {tt("Tap a letter to hear it →", "← المس حرفاً لتسمعه")}
          </p>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {LETTERS.map((l) => (
              <button
                key={l.id}
                onClick={() => playLetter(l)}
                aria-label={l.name}
                className={`flex aspect-square items-center justify-center rounded-2xl border-2 border-ink font-arabic-display text-2xl text-ink transition active:translate-y-0.5 hover:-translate-y-0.5 ${l.tint} ${active?.id === l.id ? "ring-4 ring-ink/15" : ""}`}
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
        <p className="mt-2 max-w-xl font-semibold text-ink/60">{tt("Three playful paths, one calm and ad-free place.", "ثلاث مسارات ممتعة، في مكان واحد هادئ وبدون إعلانات.")}</p>
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
            { icon: Volume2, shadow: "card-stock-saffron", ic: "text-saffron-ink", t: tt("Natural pronunciation", "نطق طبيعي"), d: tt("Real bilingual letter sounds, not robotic text-to-speech.", "أصوات حروف ثنائية اللغة حقيقية، وليست آلية.") },
            { icon: Palette, shadow: "card-stock-violet", ic: "text-violet", t: tt("5 playful themes", "٥ ثيمات ممتعة"), d: tt("Space, desert, jungle, underwater and Ramadan.", "الفضاء، الصحراء، الغابة، تحت الماء، ورمضان.") },
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
                tt("Zero data collection, no accounts, no tracking.", "بدون أي جمع للبيانات، ولا حسابات، ولا تتبّع."),
                tt("No ads inside the child play area — ever.", "بدون إعلانات داخل منطقة لعب الطفل — أبداً."),
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

      {/* ---------- FOOTER ---------- */}
      <footer className="mt-6 border-t-[2.5px] border-ink bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-extrabold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-arabic-display text-saffron">ا</span>
              Arab Fingers
            </div>
            <p className="mt-3 max-w-xs text-sm font-semibold text-ink/55">
              {tt("Free bilingual Arabic letters for kids aged 1–6.", "حروف عربية مجانية ثنائية اللغة للأطفال من ١ إلى ٦ سنوات.")}
            </p>
          </div>
          {[
            { h: tt("Play", "العب"), links: [["/play", tt("Letter game", "لعبة الحروف")], ["/coloring", tt("Coloring", "التلوين")], ["/printables", tt("Worksheets", "أوراق عمل")]] },
            { h: tt("Learn", "تعلّم"), links: [["/learn/arabic-alphabet-guide", tt("Alphabet guide", "دليل الأبجدية")], ["/learn/arabic-numbers", tt("Numbers", "الأرقام")], ["/learn", tt("All guides", "كل الأدلة")]] },
            { h: tt("More", "المزيد"), links: [["/blog", tt("Blog", "المدونة")], ["/about", tt("About", "عن الموقع")], ["/privacy", tt("Privacy", "الخصوصية")]] },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">{col.h}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={`/${locale}${href}`} className="text-sm font-semibold text-ink/60 transition hover:text-qalam">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-ink/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-sm font-semibold text-ink/50 sm:flex-row">
            <p>© 2026 Arab Fingers. {tt("All rights reserved.", "جميع الحقوق محفوظة.")}</p>
            <p>{tt("Made with ", "صُنع بـ ")}<Heart className="inline h-3.5 w-3.5 text-rose" />{tt(" by ", " بواسطة ")}
              <Link href={`/${locale}/author`} className="text-ink/70 underline hover:text-qalam">Aissa Trad</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
