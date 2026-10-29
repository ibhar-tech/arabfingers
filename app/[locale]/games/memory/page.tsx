import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { generatePageMetadata } from "@/lib/seo";
import { isLocale } from "@/lib/locales";
import { arabicLetters } from "@/lib/arabicMap";
import { letterGuide } from "@/lib/letterGuide";
import { MemoryLoader } from "./MemoryLoader";
import type { MemoryPair } from "./MemoryGame";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/games/memory", {
    titleEn: "Arabic Alphabet Memory Game for Kids — Match Letters & Words",
    titleAr: "لعبة الذاكرة للحروف العربية — طابق الحرف مع كلمته",
    descriptionEn:
      "A free Arabic memory game: turn over cards to match each letter with a picture word that starts with it (ب — باب, door). Letters say their sound. 4 or 6 pairs, no timer. Ages 3–7.",
    descriptionAr:
      "لعبة ذاكرة مجانية للحروف العربية: اقلب البطاقات وطابق كلّ حرف مع كلمة مصوّرة تبدأ به (ب — باب). الحروف تُنطق حين تُقلب. 4 أو 6 أزواج بلا توقيت. لعمر 3–7 سنوات.",
    keywords: [
      "arabic alphabet memory game", "arabic letters matching game", "arabic alphabet games for kids",
      "لعبة الذاكرة بالحروف العربية", "لعبة مطابقة الحروف",
    ],
  });
}

const faqEn = [
  { q: "How does the Arabic memory game work?", a: "Every letter has a partner card with a picture word that starts with it. Turn over two cards; if they are a letter and its word, they stay up. Letter cards say their sound when they turn over." },
  { q: "Does my child need to read Arabic?", a: "No. The word cards have a picture, and the letter cards speak, so children who cannot read yet can still play and win." },
  { q: "How many letters are in the game?", a: "All 28 — each game deals 4 or 6 of them at random, so every round brings different letters." },
];
const faqAr = [
  { q: "كيف تعمل لعبة الذاكرة العربية؟", a: "لكلّ حرف بطاقة شريكة عليها كلمة مصوّرة تبدأ به. اقلب بطاقتين، فإن كانتا الحرف وكلمته بقيتا مكشوفتين. وبطاقات الحروف تُنطق حين تُقلب." },
  { q: "هل يحتاج طفلي إلى قراءة العربية؟", a: "لا. بطاقات الكلمات مصوّرة، وبطاقات الحروف ناطقة، فيلعب الطفل ويفوز قبل أن يقرأ." },
  { q: "كم حرفاً في اللعبة؟", a: "الحروف الـ28 كلّها — وكلّ لعبة توزّع 4 أو 6 منها عشوائياً، فتأتي كلّ جولة بحروف مختلفة." },
];

export default async function MemoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const ar = locale === "ar";
  // Only the few fields the cards show go to the browser, not the full guide.
  const pairs: MemoryPair[] = letterGuide.map((e, i) => {
    const ex = e.examples[0];
    return { ar: e.ar, soundId: arabicLetters[i].soundId, word: ex.word, emoji: ex.emoji, meaningEn: ex.meaningEn, meaningAr: ex.meaningAr };
  });
  return (
    <PageLayout locale={locale}>
      <Breadcrumbs locale={locale} crumbs={[{ label: ar ? "الألعاب" : "Games", href: `/${locale}/games` }, { label: ar ? "لعبة الذاكرة" : "Memory match" }]} />
      <div className="counting-page-heading">
        <span className="discovery-eyebrow">{ar ? "عمر 3–7 · حرف وكلمة" : "AGES 3–7 · LETTER & WORD"}</span>
        <h1>{ar ? "لعبة الذاكرة بالحروف" : "Arabic memory match"}</h1>
        <p>{ar ? "اقلب البطاقات وطابق كلّ حرف مع كلمة تبدأ به." : "Turn over the cards and match each letter with a word that starts with it."}</p>
      </div>
      <MemoryLoader locale={locale} pairs={pairs} />
      <section className="counting-parent-guide">
        <h2>{ar ? "كيف نلعب معاً؟" : "How do we play together?"}</h2>
        <p>
          {ar
            ? "ابدؤوا بأربعة أزواج. حين يقلب الطفل حرفاً، ردّدا صوته معاً، وحين يقلب كلمة، قولا اسمها: «باب — تبدأ بالباء». بعد أن يجد الأزواج كلّها، انتقلوا إلى ستّة أزواج، أو اطبعوا بطاقات الحروف والعبوا على الطاولة."
            : "Start with four pairs. When your child turns a letter, say its sound together; when they turn a word, name it: “baab — starts with ba”. Once every pair is found, try six pairs, or print the flashcards and play on the table."}
        </p>
        <div className="hero-actions">
          <Link className="discovery-button secondary" href={`/${locale}/printables/arabic-alphabet-flashcards`}>{ar ? "بطاقات الحروف للطباعة" : "Printable letter flashcards"}</Link>
          <Link className="discovery-button secondary" href={`/${locale}/games/tap`}>{ar ? "لعبة انقر الحرف" : "Tap-the-letter game"}</Link>
        </div>
      </section>
      <div className="mx-auto max-w-[760px]">
        <FaqSection locale={locale} title={ar ? "أسئلة عن لعبة الذاكرة" : "Questions about the memory game"} items={ar ? faqAr : faqEn} />
      </div>
    </PageLayout>
  );
}
