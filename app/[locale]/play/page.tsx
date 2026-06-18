import type { Metadata } from "next";
import Link from "next/link";
import PlayLoader from "./PlayLoader";
import { isLocale } from "@/lib/locales";
import { generatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/play", {
    titleEn: "Play — Arabic Letters Game for Kids",
    titleAr: "العب وتعلّم الحروف العربية",
    descriptionEn:
      "Tap a letter or press any key to see animated Arabic letters with natural pronunciation. A free, interactive game for toddlers aged 1–6 — all 28 Arabic letters, bilingual display.",
    descriptionAr:
      "المس أي حرف أو اضغط أي مفتاح لترى الحروف العربية المتحركة مع النطق الطبيعي. لعبة مجانية تفاعلية للأطفال من ١ إلى ٦ سنوات — كل الحروف الـ٢٨ بعرض ثنائي اللغة.",
  });
}

const arabicLetterList =
  "Alef (ا), Ba (ب), Ta (ت), Tha (ث), Jeem (ج), Hha (ح), Kha (خ), Dal (د), Thal (ذ), Ra (ر), Zay (ز), Seen (س), Sheen (ش), Sad (ص), Dad (ض), Tah (ط), Zah (ظ), Ain (ع), Ghain (غ), Fa (ف), Qaf (ق), Kaf (ك), Lam (ل), Meem (م), Noon (ن), Ha (ه), Waw (و), Ya (ي)";

export default async function PlayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = isLocale(locale) && locale === "ar";

  return (
    <>
      <PlayLoader />

      {/* Visible content section below the interactive toy (reachable by scrolling). */}
      <section
        dir={isAr ? "rtl" : "ltr"}
        className="bg-canvas text-ink/85 border-t border-ink/10 print:hidden"
      >
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6">
          {isAr ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-4">
                لعبة تعلم الحروف العربية التفاعلية
              </h1>
              <p className="text-sm leading-relaxed text-ink/80 mb-6">
                عرب فنجرز هو لعبة لوحة مفاتيح مجانية ثنائية اللغة مصممة للأطفال الصغار من عمر سنة
                إلى ٦ سنوات. اضغط أي مفتاح على لوحة المفاتيح أو المس الشاشة لترى حرفاً عربياً كبيراً
                وجميلاً يظهر مع مقابله الإنجليزي ونطقه الصوتي.
              </p>

              <h2 className="text-lg font-semibold text-ink mb-2">كيف تلعب</h2>
              <p className="text-sm leading-relaxed text-ink/80 mb-6">
                ببساطة اضغط أي مفتاح على لوحة المفاتيح أو المس الشاشة. كل ضغطة تكشف أحد الحروف
                العربية الـ ٢٨ مع نطق طبيعي بالعربية والإنجليزية. يتعلم الأطفال من خلال التكرار —
                كلما لعبوا أكثر، أصبحوا أكثر إلماماً بأشكال الحروف العربية وأصواتها.
              </p>

              <h2 className="text-lg font-semibold text-ink mb-2">المميزات</h2>
              <ul className="list-disc ms-5 space-y-1.5 text-sm text-ink/80 mb-6">
                <li>الأبجدية العربية كاملة (٢٨ حرفاً) مع نطق طبيعي</li>
                <li>عرض ثنائي اللغة يظهر الحرف العربي والإنجليزي جنباً إلى جنب</li>
                <li>٦ ثيمات بصرية: النهار المشرق، الفضاء، الصحراء، الغابة، تحت الماء، ورمضان</li>
                <li>دعم لوحة المفاتيح واللمس على جميع الأجهزة</li>
                <li>لوحة تحكم أبوية مع قفل PIN اختياري</li>
                <li>يعمل بدون إنترنت كتطبيق ويب قابل للتثبيت</li>
                <li>آمن للأطفال مع صفر جمع بيانات ولا إعلانات في منطقة اللعب</li>
              </ul>

              <h2 className="text-lg font-semibold text-ink mb-2">الأبجدية العربية</h2>
              <p className="text-sm leading-relaxed text-ink/80 mb-8">
                تتكون الأبجدية العربية من ٢٨ حرفاً تُكتب من اليمين إلى اليسار. يُعرض كل حرف بشكله
                المنفصل — الشكل الأساسي الذي يتعلمه الأطفال أولاً. الحروف هي: {arabicLetterList}.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={`/${locale}`} className="rounded-lg bg-saffron-soft px-4 py-2 font-medium text-ink hover:bg-saffron-soft transition">
                  ← الصفحة الرئيسية
                </Link>
                <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="rounded-lg bg-saffron px-4 py-2 font-medium text-ink hover:bg-accent transition">
                  دليل الأبجدية العربية الكامل
                </Link>
                <Link href={`/${locale}/coloring`} className="rounded-lg bg-saffron-soft px-4 py-2 font-medium text-ink hover:bg-saffron-soft transition">
                  🎨 لعبة التلوين والتتبع
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-4">
                Interactive Arabic Letter Learning Game
              </h1>
              <p className="text-sm leading-relaxed text-ink/80 mb-6">
                ArabFingers is a free, bilingual keyboard smash toy designed for toddlers and
                pre-schoolers aged 1 to 6. Press any key or tap the screen to see a beautiful,
                large Arabic letter appear with its English equivalent and spoken pronunciation.
              </p>

              <h2 className="text-lg font-semibold text-ink mb-2">How to Play</h2>
              <p className="text-sm leading-relaxed text-ink/80 mb-6">
                Simply press any key on your keyboard or tap the screen. Each keypress reveals one
                of the 28 Arabic letters with natural-sounding pronunciation in both Arabic and
                English. Children learn through repetition — the more they play, the more familiar
                they become with Arabic letter shapes and sounds.
              </p>

              <h2 className="text-lg font-semibold text-ink mb-2">Features</h2>
              <ul className="list-disc ms-5 space-y-1.5 text-sm text-ink/80 mb-6">
                <li>Full 28-letter Arabic alphabet with natural pronunciation</li>
                <li>Bilingual display showing Arabic and English letters side by side</li>
                <li>6 visual themes: Daylight, Space, Desert, Jungle, Underwater, and Ramadan</li>
                <li>Keyboard and touch screen support for all devices</li>
                <li>Parent control panel with optional PIN lock</li>
                <li>Works offline as an installable Progressive Web App</li>
                <li>Child-safe — zero data collection and no ads in the play area</li>
              </ul>

              <h2 className="text-lg font-semibold text-ink mb-2">The Arabic Alphabet</h2>
              <p className="text-sm leading-relaxed text-ink/80 mb-8">
                The Arabic alphabet consists of 28 letters written from right to left. Each letter
                is displayed in its isolated form — the foundational shape children learn first.
                The letters are: {arabicLetterList}.
              </p>

              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={`/${locale}`} className="rounded-lg bg-saffron-soft px-4 py-2 font-medium text-ink hover:bg-saffron-soft transition">
                  ← Home
                </Link>
                <Link href={`/${locale}/learn/arabic-alphabet-guide`} className="rounded-lg bg-saffron px-4 py-2 font-medium text-ink hover:bg-accent transition">
                  Complete Arabic Alphabet Guide
                </Link>
                <Link href={`/${locale}/coloring`} className="rounded-lg bg-saffron-soft px-4 py-2 font-medium text-ink hover:bg-saffron-soft transition">
                  🎨 Coloring &amp; Tracing Game
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
