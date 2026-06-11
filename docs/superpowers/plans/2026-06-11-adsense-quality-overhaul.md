# ArabFingers AdSense Quality Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every existing page on www.arabfingers.site deep, visually rich, fully bilingual, and visible to a no-JavaScript reviewer, so the site passes AdSense "low value content" review.

**Architecture:** Next.js 15 App Router, `app/[locale]/` routes (locales: `en`, `ar` only). Content lives inline in page server components; interactive science players are `"use client"` components in `components/StatesOfMatter/` that DO server-render their intro scene (verified via curl) — but the intro is just emoji + title. New structured bilingual letter content goes in `lib/letterGuide.ts`; new SVG illustration components go in `components/illustrations/`. No test framework exists: verification = `npm run build` + `npm run lint` + curl assertions against `next start`.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, TypeScript, lucide-react icons. SVG illustrations are hand-authored JSX components (no image files — crisp, localizable, zero asset pipeline).

**Spec:** `docs/superpowers/specs/2026-06-11-adsense-quality-overhaul-design.md`

---

## Hard constraints (apply to every task)

1. **Never edit the recorded voiceover dialogue.** The `dialogueAr`/`dialogueEn` strings in the `STORYBOARD` arrays of the 4 player components, and the `transcriptEn`/`transcriptAr` arrays in the 4 science pages, are synced to premium generated audio in `public/audio/`. Read them, never change them.
2. **`components/AdSlot.tsx` stays as-is** (renders nothing until a slot ID — deliberate pre-approval decision).
3. **No new URLs.** Do not add routes or sitemap entries.
4. **`/play`, `/coloring`, `/printables` toys untouched** (content sections around them may be improved if a task says so).
5. **Readability floor for article text:** body text minimum `text-sm` (`text-base` for lead paragraphs), color minimum `text-white/75`. Tiny `text-xs text-white/40-55` is allowed only for UI chrome (player controls, badges, footnotes), never for teaching content.
6. **Arabic pages teach in Arabic.** Arabic fields are NOT literal translations of the English — they are native pedagogy for Arabic-speaking parents (مخرج الحرف، أخطاء الأطفال الشائعة، نصائح للوالدين). No English sentences in `/ar` teaching content (Latin transliterations of Arabic words are allowed where pedagogically useful, e.g. for letter names).
7. Run `npm run build` before every commit; commit after every task.

---

### Task 1: `lib/letterGuide.ts` — deep bilingual letter data

**Files:**
- Create: `lib/letterGuide.ts`

- [ ] **Step 1: Create the module with this exact schema and 28 complete entries**

```ts
// lib/letterGuide.ts
// Deep teaching content for all 28 Arabic letters, used by
// app/[locale]/learn/arabic-alphabet-guide. English fields teach Arabic
// to English-speaking families; Arabic fields are native pedagogy for
// Arabic-speaking parents (NOT translations of the English).

export type LetterExample = {
  word: string;       // Arabic script, e.g. "باب"
  translit: string;   // simple transliteration, e.g. "baab"
  meaningEn: string;  // e.g. "door"
  meaningAr: string;  // kid-friendly gloss, e.g. "مدخل البيت"
  emoji: string;      // single pictorial emoji for the word, e.g. "🚪"
};

export type LetterGuideEntry = {
  ar: string;           // isolated glyph, e.g. "ب"
  enName: string;       // "Ba"
  arName: string;       // "باء"
  translit: string;     // "bāʾ"
  difficulty: "easy" | "medium" | "hard"; // for English-speaking learners
  soundHowToEn: string; // physical instructions: lips/tongue/throat
  soundHowToAr: string; // مخرج الحرف وكيفية نطقه، موجه للوالدين
  comparisonEn: string; // nearest English sound AND how it differs
  comparisonAr: string; // تمييز الحرف عن الحروف المشابهة له صوتاً أو شكلاً
  examples: LetterExample[]; // exactly 2 or 3 entries
  mistakeEn: string;    // the most common learner mistake + how to fix it
  mistakeAr: string;    // الخطأ الشائع عند الأطفال وكيفية تصحيحه
  parentTipEn: string;  // one concrete activity/tip for parents
  parentTipAr: string;  // نصيحة عملية للوالدين
};

export const letterGuide: LetterGuideEntry[] = [
  // ... 28 entries, see worked examples and checklist below
];
```

Three fully worked entries that set the quality bar — include these verbatim as entries 1 (ا), 2 (ب), and 18 (ع):

```ts
  {
    ar: "ا", enName: "Alef", arName: "ألف", translit: "alif", difficulty: "easy",
    soundHowToEn:
      "Open your mouth gently and let a long, relaxed 'aaa' flow out — like the doctor asking you to say 'aah'. No tongue movement, no lip rounding: alif is the simplest sound in the alphabet, which is why children always learn it first.",
    soundHowToAr:
      "مخرج الألف من الجوف: يخرج الصوت ممدوداً من وسط الفم دون أي حركة من اللسان أو الشفتين. اطلب من طفلك أن يفتح فمه ويقول «آآآ» كأنه عند الطبيب — هذا هو صوت الألف الممدود.",
    comparisonEn:
      "Like the long 'a' in 'father', never the short 'a' in 'cat'. When alif carries the hamza (أ / إ) it becomes a glottal stop — the tiny catch in the middle of 'uh-oh'. English has this sound; it just never writes it down.",
    comparisonAr:
      "يخلط الصغار بين الألف اللينة (ا) والهمزة (أ). درّب طفلك على الفرق بين «آآآ» الممدودة الهادئة وبين القطع المفاجئ في «أَ» كما في كلمة «أَسَد» — الأولى نَفَس طويل والثانية نقرة قصيرة.",
    examples: [
      { word: "أسد", translit: "asad", meaningEn: "lion", meaningAr: "ملك الغابة", emoji: "🦁" },
      { word: "أرنب", translit: "arnab", meaningEn: "rabbit", meaningAr: "حيوان قافز طويل الأذنين", emoji: "🐰" },
      { word: "باب", translit: "baab", meaningEn: "door (alif in the middle)", meaningAr: "الألف في وسط الكلمة", emoji: "🚪" },
    ],
    mistakeEn:
      "Learners often cut the long alif short, saying 'bab' instead of 'baab'. Arabic vowel length changes meaning, so stretch the sound: count two beats on every alif.",
    mistakeAr:
      "كثير من الأطفال يقصّرون المدّ فيقولون «بَب» بدل «باب». علّم طفلك أن يَعُدّ حركتين بأصابعه كلما رأى ألف المد حتى يعتاد إطالة الصوت.",
    parentTipEn:
      "Play 'stretch the sound': say a word with alif and have your child pull an imaginary piece of elastic while the 'aaa' lasts. Body movement locks in vowel length better than repetition alone.",
    parentTipAr:
      "العبا لعبة «مدّ الصوت»: انطقا كلمة فيها ألف واطلب من طفلك أن يشدّ خيطاً خيالياً بيديه طوال مدة الصوت. ربط الحركة بالصوت يثبّت المدّ أسرع من التكرار وحده.",
  },
  {
    ar: "ب", enName: "Ba", arName: "باء", translit: "bāʾ", difficulty: "easy",
    soundHowToEn:
      "Press your lips together, then pop them open with your voice on — exactly like the English 'b' in 'ball'. It is one of the first sounds babies babble, so it makes a perfect early win for young learners.",
    soundHowToAr:
      "مخرج الباء من الشفتين: تنطبق الشفتان ثم تنفتحان مع خروج الصوت، كما في «بابا». وهو من أوائل الأصوات التي ينطقها الرضّع، لذلك يكتسبه الطفل بسرعة وثقة.",
    comparisonEn:
      "Identical to English 'b'. The trap is the other direction: Arabic has no 'p' sound at all, so don't let a final ba fade into a whispered 'p' — keep your voice humming right to the end of words like 'baab'.",
    comparisonAr:
      "شكل الباء بنقطة واحدة تحتها هو ما يميزها عن أختيها التاء (نقطتان فوق) والثاء (ثلاث نقاط فوق). درّب طفلك على قاعدة بسيطة: «النقطة تحت السطر = باء».",
    examples: [
      { word: "باب", translit: "baab", meaningEn: "door", meaningAr: "مدخل البيت", emoji: "🚪" },
      { word: "بطة", translit: "baTTa", meaningEn: "duck", meaningAr: "طائر يسبح في الماء", emoji: "🦆" },
      { word: "برتقال", translit: "burtuqaal", meaningEn: "orange (fruit)", meaningAr: "فاكهة لذيذة لونها برتقالي", emoji: "🍊" },
    ],
    mistakeEn:
      "Mixing up ب, ت and ث — three identical shapes that differ only by dots. Teach the dots first: one dot BELOW is ba; the sound 'b' lives in the basement.",
    mistakeAr:
      "الخلط بين ب وت وث بسبب تشابه الشكل. اجعل طفلك يرسم الحرف بإصبعه في الهواء وينطق اسمه مع عدّ النقاط بصوت عالٍ: «نقطة واحدة تحت — باء!».",
    parentTipEn:
      "Go on a 'B hunt' around the house: door (baab), and any toy duck (baTTa). Saying the Arabic word while touching the real object builds vocabulary twice as fast as flashcards.",
    parentTipAr:
      "قوما بجولة «صيد الباء» في البيت: الباب، البطانية، البرتقال. لمس الشيء الحقيقي أثناء نطق الكلمة يثبّت المفردات أسرع بكثير من البطاقات.",
  },
  {
    ar: "ع", enName: "Ain", arName: "عين", translit: "ʿayn", difficulty: "hard",
    soundHowToEn:
      "Squeeze the very back of your throat — the muscles you feel when you gently start a swallow — and let your voice buzz through that squeeze. It feels strange at first because English never uses this muscle group for speech. Go slowly: whisper 'ah', then repeat it while tightening the throat until the sound turns deep and pressed.",
    soundHowToAr:
      "مخرج العين من وسط الحلق: ينقبض الحلق قليلاً ويخرج الصوت مجهوراً وعميقاً. اطلب من طفلك أن يضع يده برفق على رقبته ليشعر بالاهتزاز عندما يقول «عَين» — الاهتزاز العميق علامة النطق الصحيح.",
    comparisonEn:
      "There is no English equivalent — this is the famous sound that gives Arabic its depth. The closest description: an 'ah' pronounced while flexing the throat. Do NOT replace it with a plain 'a' — 'ʿain' (eye) and 'ain' would become different words.",
    comparisonAr:
      "يخلط الأطفال بين العين (ع) والهمزة (ء) فيقولون «أَين» بدل «عَين». الفرق أن العين صوت عميق متصل من الحلق، بينما الهمزة نقرة قصيرة مقطوعة. كرّرا الثنائيات: «عَلَم/أَلَم» و«عَين/أَين» حتى يسمع الفرق.",
    examples: [
      { word: "عين", translit: "ʿayn", meaningEn: "eye", meaningAr: "نرى بها العالم", emoji: "👁️" },
      { word: "عسل", translit: "ʿasal", meaningEn: "honey", meaningAr: "غذاء حلو تصنعه النحلة", emoji: "🍯" },
      { word: "عنب", translit: "ʿinab", meaningEn: "grapes", meaningAr: "فاكهة صغيرة في عناقيد", emoji: "🍇" },
    ],
    mistakeEn:
      "Substituting a plain glottal stop or 'a' sound. Don't worry if your child needs months for ʿain — even heritage speakers refine it over years. Praise attempts, model often, never drill to frustration.",
    mistakeAr:
      "نطق العين همزةً هو أشهر خطأ عند الصغار، وهو طبيعي في بداية تعلم الكلام. لا تُكثرا من التصحيح المباشر؛ يكفي أن يسمع طفلك النطق الصحيح منكما مراراً في كلمات محببة مثل «عسل» و«عصير».",
    parentTipEn:
      "Make it physical and funny: pretend to be 'sleepy lions' — yawn wide and let the deep throat sound out as you stretch. The yawning posture naturally opens the throat where ʿain is made.",
    parentTipAr:
      "حوّلا التدريب إلى لعبة «الأسد النعسان»: تثاءبا بعمق مع إخراج صوت من الحلق. وضعية التثاؤب تفتح الحلق طبيعياً من نفس مخرج العين، فيتقن الطفل الصوت وهو يضحك.",
  },
```

- [ ] **Step 2: Author the remaining 25 entries to the same quality bar**

Letter order and base data (glyph/names) come from `lib/arabicMap.ts:12-41`. Per-entry checklist — every entry MUST have:
- `soundHowToEn`/`soundHowToAr`: physical articulation (lips/tongue/throat position), 25–45 words each. The Arabic field names the مخرج (makhraj).
- `comparisonEn`: nearest English sound AND at least one concrete way it differs (or "no equivalent" + description). `comparisonAr`: distinguish from the most-confused sibling letter (shape-siblings like ج/ح/خ، د/ذ، ر/ز، س/ش، ص/ض، ط/ظ or sound-siblings like ت/ط، س/ص، ه/ح، ك/ق، ذ/ظ).
- `examples`: 2–3 real kid-relevant words, each with accurate translit, meanings, and one emoji.
- `mistakeEn`/`mistakeAr`: the genuinely most common error for that letter (emphatics → plain substitution; خ → 'k'; ق → 'k'; ح → 'h'; غ → 'g'; rolled ر → English r; dot-count confusion for shape siblings).
- `parentTipEn`/`parentTipAr`: one concrete playable activity, not generic encouragement.
- Difficulty tags: easy = ب ت د ز س ف ك ل م ن ه و ي ا; medium = ث ج ذ ش؛ hard = ح خ ر ص ض ط ظ ع غ ق.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/letterGuide.ts
git commit -m "feat(content): add deep bilingual teaching data for all 28 letters"
```

---

### Task 2: `components/illustrations/LetterCard.tsx` — SVG letter card

**Files:**
- Create: `components/illustrations/LetterCard.tsx`

One data-driven SVG component renders all 28 cards (no per-letter files).

- [ ] **Step 1: Create the component**

```tsx
// components/illustrations/LetterCard.tsx
// Server component — pure SVG, no hooks. Renders a kid-friendly
// illustrated card for one Arabic letter. Used in the alphabet guide.

import type { LetterGuideEntry } from "@/lib/letterGuide";

// Soft card palettes cycled by index — rounded, friendly, consistent
// with the Dr. Hakim / Anas cartoon world.
const PALETTES = [
  { bg: "#0f2e2a", ring: "#34d399", glow: "#34d39922" }, // emerald
  { bg: "#172554", ring: "#60a5fa", glow: "#60a5fa22" }, // blue
  { bg: "#3b1d4f", ring: "#c084fc", glow: "#c084fc22" }, // purple
  { bg: "#42210b", ring: "#fbbf24", glow: "#fbbf2422" }, // amber
  { bg: "#431a2d", ring: "#fb7185", glow: "#fb718522" }, // rose
  { bg: "#0c3245", ring: "#22d3ee", glow: "#22d3ee22" }, // cyan
];

export function LetterCard({
  entry,
  index,
  locale,
}: {
  entry: LetterGuideEntry;
  index: number;
  locale: string;
}) {
  const p = PALETTES[index % PALETTES.length];
  const isAr = locale === "ar";
  const firstExample = entry.examples[0];

  return (
    <svg
      viewBox="0 0 200 230"
      role="img"
      aria-label={`${isAr ? entry.arName : entry.enName} — ${firstExample.word}`}
      className="w-full h-auto select-none"
    >
      {/* Card body */}
      <rect x="4" y="4" width="192" height="222" rx="24" fill={p.bg} stroke={p.ring} strokeWidth="2.5" />
      <rect x="4" y="4" width="192" height="222" rx="24" fill={p.glow} />
      {/* Letter number badge */}
      <circle cx="32" cy="32" r="16" fill={p.ring} />
      <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="800" fill={p.bg}>
        {index + 1}
      </text>
      {/* Big letter glyph */}
      <text
        x="100"
        y="105"
        textAnchor="middle"
        fontSize="84"
        fontWeight="700"
        fill="#ffffff"
        style={{ fontFamily: "var(--font-noto-naskh), serif" }}
      >
        {entry.ar}
      </text>
      {/* Letter name */}
      <text x="100" y="142" textAnchor="middle" fontSize="17" fontWeight="700" fill={p.ring}>
        {isAr ? entry.arName : `${entry.enName} · ${entry.arName}`}
      </text>
      {/* Example word pill */}
      <rect x="25" y="160" width="150" height="48" rx="16" fill="#ffffff10" stroke="#ffffff20" />
      <text x="100" y="181" textAnchor="middle" fontSize="17" fontWeight="700" fill="#ffffff" style={{ fontFamily: "var(--font-noto-naskh), serif" }}>
        {firstExample.emoji} {firstExample.word}
      </text>
      <text x="100" y="200" textAnchor="middle" fontSize="11" fill="#ffffffaa">
        {isAr ? firstExample.meaningAr : `${firstExample.translit} — ${firstExample.meaningEn}`}
      </text>
    </svg>
  );
}
```

- [ ] **Step 2: Type-check** — Run: `npx tsc --noEmit`. Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add components/illustrations/LetterCard.tsx
git commit -m "feat(graphics): add SVG letter card illustration component"
```

---

### Task 3: Rewrite the alphabet guide page from `letterGuide`

**Files:**
- Modify: `app/[locale]/learn/arabic-alphabet-guide/page.tsx`

Current problems (verified): hardcoded English-only `letters` array at lines 13–42 rendered identically to both locales (`{l.desc}` at line 115, `text-xs text-white/55`); static non-localized `metadata` export at lines 8–11.

- [ ] **Step 1: Replace static metadata with localized metadata**

Delete the `export const metadata` block (lines 8–11) and add (matching the pattern of `app/[locale]/learn/gravity/page.tsx:10-27`):

```tsx
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/learn/arabic-alphabet-guide", {
    titleEn: "Arabic Alphabet for Kids: Complete Guide to All 28 Letters",
    titleAr: "دليل الأبجدية العربية الكامل للأطفال — الحروف الـ٢٨ بالنطق والأمثلة",
    descriptionEn:
      "Every Arabic letter explained for parents: how to make each sound, example words, the most common mistakes, and a parent tip — with audio and illustrated letter cards.",
    descriptionAr:
      "شرح كامل لكل حرف عربي: مخرج الحرف وطريقة نطقه، كلمات للأمثلة، أشهر أخطاء الأطفال، ونصيحة عملية للوالدين — مع الصوت وبطاقات مصورة.",
    ogType: "article",
    publishedTime: "2026-03-05",
    keywords: [
      "arabic alphabet for kids", "الحروف العربية للأطفال",
      "arabic letters pronunciation", "نطق الحروف العربية",
      "teach arabic alphabet", "تعليم الحروف للأطفال",
    ],
  });
}
```

- [ ] **Step 2: Replace the shallow `letters` array and detail section**

Delete the local `letters` array (lines 13–42). Import the new data and card:

```tsx
import { letterGuide } from "@/lib/letterGuide";
import { LetterCard } from "@/components/illustrations/LetterCard";
```

Replace the "Every Letter in Detail" map (lines 104–119) with one rich block per letter — card on one side, structured teaching fields on the other. All labels and content fully locale-switched:

```tsx
<div className="space-y-6 mb-10">
  {letterGuide.map((l, i) => (
    <article key={l.ar} id={`letter-${l.enName.toLowerCase()}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-5">
      <div className="mx-auto w-44 sm:w-full">
        <LetterCard entry={l} index={i} locale={locale} />
      </div>
      <div className="min-w-0 space-y-3">
        <h3 className="text-lg font-bold text-white">
          {isAr ? `حرف ال${l.arName}` : `${l.enName} (${l.arName})`}{" "}
          <span className="text-sm font-normal text-white/60">
            {isAr
              ? l.difficulty === "easy" ? "— سهل النطق" : l.difficulty === "medium" ? "— متوسط" : "— يحتاج تدريباً"
              : l.difficulty === "easy" ? "— easy" : l.difficulty === "medium" ? "— medium" : "— challenging"}
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-white/80">
          <strong className="text-accent">{isAr ? "كيف ننطقه: " : "How to say it: "}</strong>
          {isAr ? l.soundHowToAr : l.soundHowToEn}
        </p>
        <p className="text-sm leading-relaxed text-white/80">
          <strong className="text-accent">{isAr ? "لا تخلط بينه وبين: " : "Compared to English: "}</strong>
          {isAr ? l.comparisonAr : l.comparisonEn}
        </p>
        <div className="flex flex-wrap gap-2">
          {l.examples.map((ex) => (
            <span key={ex.word} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/85">
              {ex.emoji} <span style={{ fontFamily: "var(--font-noto-naskh), serif" }}>{ex.word}</span>{" "}
              <span className="text-white/60">{isAr ? `— ${ex.meaningAr}` : `(${ex.translit} — ${ex.meaningEn})`}</span>
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-white/80">
          <strong className="text-rose-300">{isAr ? "الخطأ الشائع: " : "Common mistake: "}</strong>
          {isAr ? l.mistakeAr : l.mistakeEn}
        </p>
        <p className="text-sm leading-relaxed text-white/80">
          <strong className="text-emerald-300">{isAr ? "نصيحة للوالدين: " : "Parent tip: "}</strong>
          {isAr ? l.parentTipAr : l.parentTipEn}
        </p>
      </div>
    </article>
  ))}
</div>
```

- [ ] **Step 3: Upgrade the page lead** — change `text-sm text-white/50` (line 68) to `text-base text-white/75`, and the intro block `text-sm ... text-white/70` (line 72) to `text-base ... text-white/80`. Add one new intro paragraph per locale (60–90 words) explaining how to use the guide: listen first (interactive grid), then the per-letter deep dives, then practice in the game/printables.

- [ ] **Step 4: Build and verify both locales**

```bash
npm run build && (npm run start &) && sleep 4
curl -s http://localhost:3000/ar/learn/arabic-alphabet-guide -o /tmp/ar.html
curl -s http://localhost:3000/en/learn/arabic-alphabet-guide -o /tmp/en.html
grep -c "نصيحة للوالدين" /tmp/ar.html   # Expected: 28
grep -c "Parent tip" /tmp/en.html        # Expected: 28
grep -c "Pronounced like the English" /tmp/ar.html  # Expected: 0 (old English desc gone from /ar)
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/learn/arabic-alphabet-guide/page.tsx
git commit -m "feat(content): rebuild alphabet guide with deep bilingual letter teaching + SVG cards"
```

---

### Task 4: Science diagram components (4 SVG illustrations)

**Files:**
- Create: `components/illustrations/GravityDiagram.tsx`
- Create: `components/illustrations/WaterCycleDiagram.tsx`
- Create: `components/illustrations/SolarSystemDiagram.tsx`
- Create: `components/illustrations/StatesOfMatterDiagram.tsx`

All four are **server-renderable** (no hooks, no `"use client"`), take `{ locale: string }`, render bilingual labels, `viewBox="0 0 640 360"`, rounded kid-friendly shapes consistent with the existing Dr. Hakim/Anas style (see `components/StatesOfMatter/DrHakim.tsx` for the palette feel). Each exports a named function component. CSS-only animation (`<animateTransform>`/`<animate>` SVG elements) is allowed — it works without JS.

- [ ] **Step 1: GravityDiagram — complete reference implementation**

```tsx
// components/illustrations/GravityDiagram.tsx
// Static SVG: Earth pulling an apple, an astronaut floating in space,
// and heavy Jupiter — the three gravity scenarios from the lesson.

export function GravityDiagram({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const L = {
    earth: isAr ? "الأرض تسحب التفاحة" : "Earth pulls the apple",
    space: isAr ? "في الفضاء: انعدام الوزن" : "Deep space: weightless",
    jupiter: isAr ? "المشتري: جاذبية قوية" : "Jupiter: heavy gravity",
    title: isAr ? "ثلاثة عوالم للجاذبية" : "Three worlds of gravity",
  };
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={L.title} className="w-full h-auto">
      <rect width="640" height="360" rx="24" fill="#0b1020" />
      {/* stars */}
      {[[60, 40], [180, 25], [320, 50], [470, 30], [590, 55], [540, 130], [80, 140]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#ffffff66" />
      ))}
      <text x="320" y="34" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ffffff">{L.title}</text>

      {/* Panel 1 — Earth + falling apple */}
      <circle cx="110" cy="330" r="120" fill="#1d4ed8" />
      <circle cx="80" cy="300" r="22" fill="#16a34a" />
      <circle cx="150" cy="320" r="16" fill="#16a34a" />
      <circle cx="110" cy="180" r="14" fill="#ef4444" />
      <rect x="108" y="162" width="4" height="10" rx="2" fill="#854d0e" />
      {/* pull arrows */}
      <path d="M110 205 L110 245" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <path d="M98 233 L110 250 L122 233" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="110" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fbbf24">{L.earth}</text>

      {/* Panel 2 — floating astronaut */}
      <g transform="translate(320 190)">
        <circle r="26" fill="#e2e8f0" />
        <circle r="18" fill="#0ea5e9" />
        <rect x="-16" y="22" width="32" height="36" rx="12" fill="#e2e8f0" />
        <rect x="-34" y="26" width="16" height="10" rx="5" fill="#e2e8f0" transform="rotate(-25)" />
        <rect x="18" y="20" width="16" height="10" rx="5" fill="#e2e8f0" transform="rotate(20)" />
        <animateTransform attributeName="transform" type="translate" values="320 190; 320 178; 320 190" dur="4s" repeatCount="indefinite" additive="replace" />
      </g>
      <text x="320" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7dd3fc">{L.space}</text>

      {/* Panel 3 — Jupiter squashing weight */}
      <circle cx="530" cy="350" r="130" fill="#b45309" />
      <ellipse cx="530" cy="300" rx="118" ry="14" fill="#92400e" />
      <ellipse cx="530" cy="330" rx="126" ry="12" fill="#d97706" />
      <ellipse cx="530" cy="225" rx="26" ry="14" fill="#94a3b8" />
      <path d="M505 215 L515 195 M555 215 L545 195" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
      <path d="M495 240 L495 260 M565 240 L565 260" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <text x="530" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fcd34d">{L.jupiter}</text>
    </svg>
  );
}
```

- [ ] **Step 2: WaterCycleDiagram** — same conventions. Required elements: sun (top-right, warm yellow with rays), sea (bottom, blue waves), rising vapor (3 dashed wavy arrows up, label: evaporation/"التبخر"), cloud (top-left, label: condensation/"التكاثف"), rain drops falling from cloud (label: precipitation/"الهطول"), mountain + river arrow returning to sea (label: collection/"التجمع"), circular flow arrows connecting all four stages, bilingual title "رحلة قطرة الماء"/"A water drop's journey". Use `<animate>` on rain drops (opacity cycle) for life.

- [ ] **Step 3: SolarSystemDiagram** — required elements: sun at left edge (quarter visible, radial glow), 8 planets in a row to scale-ish (Mercury→Neptune) with distinct correct-feel colors (Mercury gray, Venus cream, Earth blue+green, Mars red, Jupiter banded orange, Saturn with ring, Uranus pale cyan, Neptune deep blue), orbit arcs, bilingual name label under each planet (e.g. "عطارد"/"Mercury"), title "عائلة الشمس"/"The Sun's family".

- [ ] **Step 4: StatesOfMatterDiagram** — three labeled jars side by side: solid (tight grid of 9 touching circles, label "صلب"/"Solid — particles hold hands"), liquid (loose circles in bottom half, label "سائل"/"Liquid — particles slide"), gas (5 scattered circles with motion ticks, label "غاز"/"Gas — particles fly free"), arrows between jars labeled melting/"الانصهار" and evaporation/"التبخر", title "حالات المادة الثلاث"/"The three states of matter".

- [ ] **Step 5: Type-check** — `npx tsc --noEmit`. Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add components/illustrations/
git commit -m "feat(graphics): add 4 bilingual SVG science diagrams"
```

---

### Task 5: Rich illustrated intro posters in the 4 players

**Files:**
- Modify: `components/StatesOfMatter/GravityInteractive.tsx:483-502` (`customGraphic === "intro"` block)
- Modify: `components/StatesOfMatter/WaterCycleInteractive.tsx:495` (same pattern)
- Modify: `components/StatesOfMatter/SolarSystemInteractive.tsx:493` (same pattern)
- Modify: `components/StatesOfMatter/StatesOfMatterInteractive.tsx:561` (same pattern)

The intro scene IS server-rendered (verified via curl) but shows only an emoji row + gradient title. Upgrade each player's intro block: replace the emoji `<div className="text-5xl ...">🍎🌎🪐</div>` row with the matching diagram component rendered small, plus the existing characters waving.

- [ ] **Step 1: For each player, modify ONLY the intro JSX block**

Pattern (shown for GravityInteractive; adapt diagram import per player — `WaterCycleDiagram`, `SolarSystemDiagram`, `StatesOfMatterDiagram`):

```tsx
import { GravityDiagram } from "@/components/illustrations/GravityDiagram";
// ...
{activeScene.customGraphic === "intro" && (
  <div className="w-full h-full flex items-center justify-center gap-4 animate-fade-in px-2">
    <div className="hidden sm:block w-40 shrink-0"><DrHakim mood="waving" /></div>
    <div className="text-center flex flex-col items-center justify-center min-w-0">
      <div className="w-full max-w-[300px] mb-2"><GravityDiagram locale={locale} /></div>
      <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-accent via-emerald-300 to-teal-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
        {isAr ? "كيف تعمل الجاذبية؟" : "How Gravity Works"}
      </h1>
      <p className="text-xs sm:text-sm text-white/70 font-medium max-w-md">
        {isAr ? activeScene.subTextAr : activeScene.subTextEn}
      </p>
      {!isPlaying && (
        <button type="button" onClick={() => setIsPlaying(true)}
          className="mt-3 px-6 py-2 bg-accent hover:scale-105 transition rounded-2xl text-[#050816] font-bold text-sm cursor-pointer">
          {isAr ? "ابدأ التجربة 🍎" : "Start Experiment 🍎"}
        </button>
      )}
    </div>
    <div className="hidden sm:block w-32 shrink-0"><AnasChild mood="waving" /></div>
  </div>
)}
```

Check each player's actual character-component props first (`grep -n "DrHakim\|AnasChild" <player>.tsx`) — pass whatever mood/size props the dialogue scenes already use; keep the existing h1 text and start-button label of each player unchanged. Do NOT touch `STORYBOARD` data.

- [ ] **Step 2: Verify SSR poster in no-JS HTML for all 4 pages × 2 locales**

```bash
npm run build && (npm run start &) && sleep 4
for p in gravity water-cycle solar-system states-of-matter; do
  for l in en ar; do
    c=$(curl -s "http://localhost:3000/$l/learn/$p" | grep -c "<svg")
    echo "$l/$p svg count: $c"   # Expected: noticeably higher than before (>12), diagram present
  done
done
kill %1
```

Also visually check `http://localhost:3000/en/learn/gravity` in a browser: poster shows characters + diagram + title + start button, nothing overlaps on mobile width (375px).

- [ ] **Step 3: Commit**

```bash
git add components/StatesOfMatter/
git commit -m "feat(graphics): illustrated SSR intro posters for all 4 science players"
```

---

### Task 6: Deepen the Gravity lesson page (reference for Tasks 7–9)

**Files:**
- Modify: `app/[locale]/learn/gravity/page.tsx`

Current state: ~450 words/locale (4 fact cards + 9-line transcript). Target: 900–1,200 words/locale. The transcript arrays (lines 29–51) are untouchable.

- [ ] **Step 1: Add the diagram + 4 new article sections between the fact-cards section and the transcript section**

Insert after the "Cool Gravity Facts Summary" section (ends line 159), all bilingual, body text `text-sm`/`text-base` `text-white/80`:

1. **`<GravityDiagram locale={locale} />`** in a captioned `<figure>` (caption: "ثلاثة عوالم للجاذبية: الأرض والفضاء والمشتري" / "Three worlds of gravity: Earth, deep space, and Jupiter").
2. **"Gravity in your home" (`الجاذبية في بيتك`)** — 150–200 words/locale: 4 everyday observations a child can verify (dropped spoon always falls; juice pours downward; ball thrown up slows, stops, returns; we slide DOWN slides, never up). Each as a short paragraph with a bold lead phrase.
3. **"Try it at home: the great drop race" (`جرّبها في البيت: سباق السقوط الكبير`)** — 150–200 words/locale, numbered steps: take a coin and a flat sheet of paper, drop together (paper floats — air resistance); crumple the paper into a ball, drop again (they land together!); explain: gravity pulls all objects equally, air was the only difference. Safety note: nothing breakable.
4. **FAQ (`أسئلة يطرحها الأطفال`)** — 5 Q&As, 40–70 words each: Why don't people in Australia fall off? (gravity pulls toward the CENTER — "down" means "toward the middle" everywhere); Why doesn't the Moon fall on us? (it IS falling — around us; its speed keeps it circling); Does gravity work on air? (yes — that's why Earth keeps its atmosphere); Who discovered gravity? (Newton described it; Einstein explained it deeper); Can we switch gravity off? (no — but astronauts in orbit feel weightless because they're in constant free-fall).
5. **Mini-glossary (`قاموس الكلمات العلمية`)** — 5 terms as definition cards: gravity/الجاذبية, mass/الكتلة, weight/الوزن, weightlessness/انعدام الوزن, orbit/المدار. One kid-level sentence each.

- [ ] **Step 2: Add FAQPage JSON-LD**

After `<LessonStructuredData ... />`, add a `<script type="application/ld+json">` with schema.org `FAQPage` containing the 5 locale-appropriate Q&As (same text as rendered — Google requires JSON-LD to match visible content).

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}) }} />
```

(Define `faq` as a locale-switched array above the return, used by both the rendered section and the JSON-LD.)

- [ ] **Step 3: Readability fixes on existing sections** — fact-card text `text-xs sm:text-sm text-white/70`→`text-sm sm:text-base text-white/80` and inner `text-white/60`→`text-white/80`; transcript `text-xs sm:text-sm text-white/65`→`text-sm text-white/80`; page subtitle `text-sm text-white/50`→`text-base text-white/75`. Remove the parenthetical English in Arabic fact-card headings (e.g. line 117 `"1. ما هي الجاذبية؟ (What is Gravity?)"` → `"١. ما هي الجاذبية؟"`).

- [ ] **Step 4: Verify**

```bash
npm run build && (npm run start &) && sleep 4
for l in en ar; do
  curl -s "http://localhost:3000/$l/learn/gravity" | python3 -c "
import sys,re,html
t=re.sub(r'<script[^>]*>.*?</script>','',sys.stdin.read(),flags=re.S)
t=html.unescape(re.sub(r'<[^>]+>',' ',t))
print('$l words:', len(t.split()))"
done   # Expected: en ≥ 900; ar ≥ 800 (Arabic counts lower per word)
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/learn/gravity/page.tsx
git commit -m "feat(content): expand gravity lesson into full bilingual article with diagram, experiment, FAQ"
```

---

### Task 7: Deepen the Water Cycle lesson page

**Files:** Modify: `app/[locale]/learn/water-cycle/page.tsx`

Same 5-part structure, verification, and readability rules as Task 6. Page-specific content requirements:
- Diagram: `WaterCycleDiagram`, caption "رحلة قطرة الماء التي لا تنتهي" / "The never-ending journey of a water drop".
- "In your home": steam from a kettle = evaporation; fogged bathroom mirror = condensation; cold drink bottle "sweating"; puddles disappearing after rain.
- Experiment: "make a cloud in a jar" — hot water in a clear jar, plate with ice cubes on top, watch mist form and "rain" drip. Safety: adult handles hot water.
- FAQ (5): Where does rain come from? Why is the sea salty but rain is not? (evaporation leaves salt behind); Can water disappear forever? (no — it cycles, same water dinosaurs drank!); Why are clouds white/grey? What is snow? (frozen precipitation).
- Glossary (5): evaporation/التبخر, condensation/التكاثف, precipitation/الهطول, water vapor/بخار الماء, cloud/السحابة.
- FAQPage JSON-LD identical pattern to Task 6.
- Commit: `feat(content): expand water cycle lesson into full bilingual article`

---

### Task 8: Deepen the Solar System lesson page

**Files:** Modify: `app/[locale]/learn/solar-system/page.tsx`

Same structure as Task 6. Page-specific:
- Diagram: `SolarSystemDiagram`, caption "عائلة الشمس: ثمانية كواكب في رحلة دائمة" / "The Sun's family: eight planets on an endless journey".
- "From your window": the Sun is a star; the Moon orbits Earth; Venus as the bright "evening star"; why we see phases of the Moon.
- Experiment: "orbit in the living room" — lamp as the Sun in the room's center, child walks a circle (Earth's year) while spinning (day/night); orange + flashlight to show Moon phases.
- FAQ (5): Why doesn't Earth fall into the Sun? Why is Pluto not a planet anymore? How long to drive to the Moon by car? (~6 months at highway speed — kids love this); Why is Mars red? Is the Sun on fire? (no — it glows from fusion, not burning).
- Glossary (5): planet/الكوكب, orbit/المدار, star/النجم, moon/القمر, telescope/التلسكوب.
- Commit: `feat(content): expand solar system lesson into full bilingual article`

---

### Task 9: Deepen the States of Matter lesson page

**Files:** Modify: `app/[locale]/learn/states-of-matter/page.tsx`

Same structure as Task 6. Page-specific:
- Diagram: `StatesOfMatterDiagram`, caption "الجليد والماء والبخار: نفس الجزيئات بثلاث شخصيات" / "Ice, water, and steam: the same particles with three personalities".
- "In your kitchen": ice cubes melting in juice; chocolate melting in your hand; steam from soup; butter in a hot pan; freezing juice into popsicles.
- Experiment: "the three faces of water" — ice cube in a bowl (solid → liquid over an hour, mark the time!), adult boils a little water (liquid → gas), breathe on a cold window (gas → liquid). Safety: only adults near the stove.
- FAQ (5): Is sand a liquid? (it pours but each grain is solid); Why does ice float? (water is weird — solid water is lighter); What is plasma? (the 4th state — lightning and the Sun); Why does chocolate melt but a biscuit doesn't? Can air become liquid? (yes — when extremely cold).
- Glossary (5): solid/الصلب, liquid/السائل, gas/الغاز, melting/الانصهار, freezing/التجمد.
- Commit: `feat(content): expand states of matter lesson into full bilingual article`

---

### Task 10: Learn hub — fix the thin index

**Files:** Modify: `app/[locale]/learn/page.tsx`

The live audit flagged this page as a thin link directory. Keep the card grid; add editorial substance:

- [ ] **Step 1: Add a "start here" learning-path intro** (200–280 words/locale) above the card grid: which guide to read first by child age (1–3: alphabet sounds + colors; 3–5: alphabet guide + numbers + first words; 5+: letter forms + science lessons), and how guides pair with the game/printables. Write it as 3 short titled subsections, body `text-base text-white/80`.
- [ ] **Step 2: Per-card descriptions to 2 full sentences** — each card's description must state what the reader will learn AND who it's for (currently 1 thin sentence). Locale-switched, `text-sm text-white/75`.
- [ ] **Step 3: Replace emoji-as-illustration on the hub cards with SVG category icons.** Create `components/illustrations/HubIcons.tsx` (server component, no hooks) exporting one small component per category following the Task 4 SVG conventions at `viewBox="0 0 48 48"`: `AlphabetIcon` (rounded square with the letter ب), `NumbersIcon` (rounded square with ٣), `ColorsIcon` (3 overlapping color circles), `WordsIcon` (speech bubble with three dots), `ScienceIcon` (round flask with bubbles), `ParentingIcon` (large+small heart). Each takes `{ className?: string }`, uses the Task 2 palette ring colors, and replaces the emoji glyph currently rendered on the matching hub card (small emoji accents inside text may stay).
- [ ] **Step 4: Readability sweep of this page** per the global floor (no `text-xs`/`white/50` body text).
- [ ] **Step 5: Verify** — build + curl both locales; en word count ≥ 500 (was ~250). Visual check at 375px.
- [ ] **Step 6: Commit** — `feat(content): add learning-path editorial content and SVG category icons to learn hub`

---

### Task 11: Audit & deepen the 9 remaining learn guides

**Files (modify each):**
- `app/[locale]/learn/arabic-numbers/page.tsx`
- `app/[locale]/learn/arabic-colors/page.tsx`
- `app/[locale]/learn/first-arabic-words/page.tsx`
- `app/[locale]/learn/arabic-letter-forms/page.tsx`
- `app/[locale]/learn/arabic-vs-english/page.tsx`
- `app/[locale]/learn/best-age-to-learn-arabic/page.tsx`
- `app/[locale]/learn/bilingual-children-benefits/page.tsx`
- `app/[locale]/learn/teaching-arabic-to-kids/page.tsx`
- `app/[locale]/learn/arabic-activities-at-home/page.tsx`

- [ ] **Step 1: Audit each page against this checklist** (read the full file; record findings in the task notes):
  1. Word count per locale ≥ 600 (measure with the curl+python word counter from Task 6 Step 4).
  2. Zero English teaching sentences rendered on `/ar` (locale-unswitched strings).
  3. No body text below the readability floor.
  4. Static `export const metadata` → must use `generatePageMetadata` (same change as Task 3 Step 1).
  5. Has at least one structured element beyond paragraphs: table, numbered steps, FAQ, or examples grid.
- [ ] **Step 2: Fix every failing item.** Where word count is short, extend with genuinely useful material in the page's own topic (numbers page: counting games, number forms ٠-٩ vs 0-9 table; colors page: color-hunt game, colors in nature examples; letter-forms: position table for 3 sample letters with all 4 forms; etc.). Bilingual, native-quality Arabic.
- [ ] **Step 3: Verify** — build; run the word counter on all 9 pages × 2 locales; all ≥ 600 (en) / ≥ 500 (ar). Grep each `/ar` page HTML for leaked English teaching strings found in Step 1: count must be 0.
- [ ] **Step 4: Commit** — `feat(content): deepen and fully localize all 9 learn guides`
  (Commit per-page or in 2–3 batches if the diff grows large.)

---

### Task 12: Audit & polish the 5 blog posts

**Files (modify as needed):**
- `app/[locale]/blog/how-we-built-arabfingers/page.tsx`
- `app/[locale]/blog/screen-time-guidelines-arabic-learning/page.tsx`
- `app/[locale]/blog/arabic-alphabet-vs-latin-deep-dive/page.tsx`
- `app/[locale]/blog/arabic-calligraphy-for-kids/page.tsx`
- `app/[locale]/blog/ramadan-activities-arabic-learning/page.tsx`
- `app/[locale]/blog/page.tsx` (index: same 2-sentence card treatment as Task 10 Step 2)

- [ ] **Step 1: Audit each post** with the Task 11 checklist (same 5 items; word target ≥ 800/locale for posts).
- [ ] **Step 2: Fix failures only** — these were the strongest pages in the May round; expect mostly readability-floor and `/ar` leakage fixes, not rewrites.
- [ ] **Step 3: Verify** — build + word counts + zero `/ar` leakage, as in Task 11.
- [ ] **Step 4: Commit** — `feat(content): polish blog posts for readability and full localization`

---### Task 13: Global readability + `/ar` leakage sweep (catch-all)

**Files:** any remaining offenders in `app/[locale]/` and `components/` (homepage, about, author, resources, contact, printables/coloring/play content sections, PageLayout, footer).

- [ ] **Step 1: Find remaining floor violations**

```bash
grep -rn "text-xs text-white/[345]" app/\[locale\] components --include="*.tsx" | grep -v StatesOfMatter
grep -rn "text-sm text-white/[345]" app/\[locale\] components --include="*.tsx" | grep -v StatesOfMatter
```

For each hit, decide: UI chrome (badges, captions, footer legal) → leave; teaching/body content → upgrade to the floor.

- [ ] **Step 2: `/ar` leakage sweep of remaining pages** — curl `/ar`, `/ar/about`, `/ar/author`, `/ar/resources`, `/ar/play`, `/ar/coloring`, `/ar/printables` from a local build; scan rendered text for English sentences outside proper nouns/brand name; fix by locale-switching strings.
- [ ] **Step 3: Verify** — `npm run build && npm run lint`. Expected: both exit 0.
- [ ] **Step 4: Commit** — `fix(i18n): readability floor and arabic localization sweep across remaining pages`

---

### Task 14: Final verification & ship

- [ ] **Step 1: Full no-JS audit of every changed page**

```bash
npm run build && (npm run start &) && sleep 4
for path in learn/arabic-alphabet-guide learn/gravity learn/water-cycle learn/solar-system learn/states-of-matter learn; do
  for l in en ar; do
    curl -s "http://localhost:3000/$l/$path" | python3 -c "
import sys,re,html
raw=sys.stdin.read()
t=re.sub(r'<script[^>]*>.*?</script>','',raw,flags=re.S)
t=html.unescape(re.sub(r'<[^>]+>',' ',t))
print('$l/$path', 'words:', len(t.split()), 'svgs:', raw.count('<svg'))"
  done
done
kill %1
```

Expected: alphabet-guide ≥ 2,500 words (en); science pages ≥ 900 (en) / ≥ 800 (ar); every science page svg count > 12.

- [ ] **Step 2: Lint + visual spot-check** — `npm run lint` (exit 0); open gravity + alphabet guide in a browser at 375px and 1280px: posters render, cards align, Arabic pages are RTL-correct.
- [ ] **Step 3: Push** — `git push` (deploy is wired to main).
- [ ] **Step 4: Manual post-deploy steps (tell the user; not automatable):**
  1. Search Console → URL Inspection → "Request indexing" for the homepage, learn hub, alphabet guide, and 4 science pages (both locales' canonical URLs).
  2. Wait 1–2 weeks for re-crawl (watch Search Console → Pages for refreshed last-crawl dates).
  3. Then re-request the AdSense review.
  4. After approval: create ad units and pass slot IDs to `<AdSlot slot="..."/>` on content pages only — never `/play`, `/coloring`, `/printables`.
