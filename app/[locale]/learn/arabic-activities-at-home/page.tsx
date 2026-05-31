import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import { ArticleMeta } from "@/components/ArticleMeta";
import { isLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "10 Fun Activities to Practice Arabic Letters at Home | أنشطة لتعلم الحروف العربية",
  description:
    "Creative screen-free and digital activities to help children practice Arabic letters at home. Hands-on crafts, games, and play ideas for parents of toddlers and pre-schoolers.",
};

export default async function ArabicActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const isAr = locale === "ar";

  return (
    <PageLayout locale={locale}>
      <ArticleMeta
        locale={locale}
        title="10 Fun Activities to Practice Arabic Letters at Home"
        description="Ten creative, screen-free activities to help your child practice Arabic letters and vocabulary at home."
        slug="learn/arabic-activities-at-home"
        datePublished="2026-05-07"
        dateModified="2026-05-26"
        section="Activities"
        crumbs={[
          { label: locale === "ar" ? "تعلم" : "Learn", href: `/${locale}/learn` },
          { label: locale === "ar" ? "أنشطة منزلية" : "Home Activities" },
        ]}
      />

      {isAr ? <ContentAr /> : <ContentEn />}
      <div className="text-center py-8">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "جرب عرب فنجرز" : "Try ArabFingers"}
        </Link>
      </div>
    </PageLayout>
  );
}

function ContentEn() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">10 Fun Activities to Practice Arabic Letters at Home</h1>
      <p className="text-sm text-white/50 mb-8">Creative ideas to reinforce Arabic letter learning for toddlers and pre-schoolers</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <p className="mb-4">Learning Arabic letters doesn&apos;t have to be limited to workbooks and flashcards. The most effective learning for young children happens through hands-on, multi-sensory activities that feel like play. Here are ten creative ways to practice Arabic letters at home, combining screen-free activities with digital tools like ArabFingers.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">1. Salt Tray Letter Tracing</h2>
            <p className="text-white/60 mb-2">Pour a thin layer of salt, sand, or sugar into a flat tray or baking sheet. Show your child an Arabic letter and let them trace it with their finger in the salt. The tactile sensation of drawing in salt creates a multi-sensory experience that helps children remember letter shapes. Shake the tray to &quot;erase&quot; and start again.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 2-5. Start with simple letters like ا (Alef), ل (Lam), and و (Waw) before moving to more complex shapes.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">2. Playdough Letters</h2>
            <p className="text-white/60 mb-2">Roll playdough into thin snakes and shape them into Arabic letters. This activity builds fine motor skills while reinforcing letter recognition. You can make it more engaging by using different colors for different letter groups — green for letters with dots below, blue for letters with dots above, and red for letters without dots.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 3-6. Challenge older children to form complete words.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">3. ArabFingers + Real-World Letter Hunt</h2>
            <p className="text-white/60 mb-2">Play ArabFingers for a few minutes, then go on a &quot;letter hunt&quot; around the house or neighborhood. Look for Arabic letters on food packaging (like hummus containers or tea boxes), signs, books, or decorations. When you find one, celebrate: &quot;We found a ب just like in ArabFingers!&quot;</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 2-6. This connects screen learning to the real world.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">4. Arabic Letter Stamps</h2>
            <p className="text-white/60 mb-2">Create simple stamps by cutting Arabic letter shapes from sponges or foam sheets. Dip them in paint and stamp onto paper. Children love the stamping action, and the resulting art can be displayed on the fridge as a proud reminder of their Arabic learning progress.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 2-5. Focus on a few letters at a time rather than overwhelming with all 28.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">5. Magnetic Letter Matching</h2>
            <p className="text-white/60 mb-2">Purchase a set of magnetic Arabic letters (available online and in Arabic bookstores). Place them on the fridge and play matching games: hold up a letter card and ask your child to find the matching magnetic letter. For older children, try spelling simple Arabic words like ماما (mama) or بابا (baba).</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 3-6. Great for daily passive exposure — kids will play with fridge magnets on their own.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">6. Arabic Letter Songs and Chants</h2>
            <p className="text-white/60 mb-2">Music is one of the most powerful tools for language learning. Sing the Arabic alphabet song (أ ب ت ث) together, making it a daily ritual — perhaps at bath time or before bed. You can find Arabic alphabet songs on YouTube or create your own simple chant pairing each letter with a word: &quot;أ for أسد (lion), ب for بقرة (cow)!&quot;</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> All ages. Songs stick in memory long after the singing stops.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">7. Letter-of-the-Week Focus</h2>
            <p className="text-white/60 mb-2">Choose one Arabic letter per week and make it the &quot;star.&quot; Put it on the fridge, find it in books, practice writing it, find objects that start with its sound, and play ArabFingers looking specifically for that letter. This focused approach prevents overwhelm and creates deep familiarity with each letter.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 3-6. At one letter per week, you&apos;ll cover all 28 letters in about 7 months.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">8. Arabic Story Time</h2>
            <p className="text-white/60 mb-2">Read Arabic children&apos;s books together. Even if your child can&apos;t read yet, point to letters and words as you read. Ask questions like &quot;Can you find the ب on this page?&quot; Bilingual books are especially useful because children can follow along in both languages and see how the same story looks in Arabic script.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> All ages. Build a small library of Arabic children&apos;s books for daily reading.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">9. Watercolor Letter Painting</h2>
            <p className="text-white/60 mb-2">Write large Arabic letters on paper with white crayon (invisible). Give your child watercolors and a brush, and let them paint over the paper. The letters magically appear as the watercolor reveals the crayon resist. Children are delighted by the &quot;magic&quot; and associate Arabic letters with a positive, creative experience.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> Ages 3-6. Prepare several sheets in advance for longer play sessions.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">10. ArabFingers Family Challenge</h2>
            <p className="text-white/60 mb-2">Make ArabFingers a family activity. Take turns pressing keys and naming the Arabic letters that appear. Older siblings can help younger ones. Parents can model enthusiasm: &quot;I love that letter! That&apos;s شين — Sheen!&quot; The social aspect of learning together is far more motivating than solitary practice.</p>
            <p className="text-white/60"><strong className="text-white/80">Best for:</strong> All ages. Family learning creates positive associations with Arabic.</p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Tips for Success</h2>
          <ul className="list-disc list-inside space-y-2 text-white/60">
            <li><strong className="text-white/80">Keep it short</strong> — 5-10 minutes per activity is plenty for toddlers. Stop before they lose interest.</li>
            <li><strong className="text-white/80">Follow their lead</strong> — If your child gravitates toward one activity, do more of it. Enjoyment drives learning.</li>
            <li><strong className="text-white/80">Mix digital and physical</strong> — Combine ArabFingers with hands-on activities for the best results.</li>
            <li><strong className="text-white/80">Be consistent</strong> — A few minutes every day is better than a long session once a week.</li>
            <li><strong className="text-white/80">Celebrate everything</strong> — Every letter recognized is progress worth celebrating.</li>
          </ul>
        </section>
      </div>
    </>
  );
}

function ContentAr() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white mb-2">١٠ أنشطة ممتعة لممارسة الحروف العربية في المنزل</h1>
      <p className="text-sm text-white/50 mb-8">أفكار إبداعية لتعزيز تعلم الحروف العربية للأطفال الصغار</p>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <p className="mb-4">تعلم الحروف العربية لا يجب أن يقتصر على كتب التمارين والبطاقات التعليمية. أكثر التعلم فعالية للأطفال الصغار يحدث من خلال أنشطة عملية متعددة الحواس تبدو وكأنها لعب.</p>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">١. تتبع الحروف في صينية الملح</h2>
            <p className="text-white/60 mb-2">اسكب طبقة رقيقة من الملح أو الرمل في صينية مسطحة. أرِ طفلك حرفاً عربياً ودعه يتتبعه بإصبعه في الملح. الإحساس اللمسي يُنشئ تجربة متعددة الحواس تساعد الأطفال على تذكر أشكال الحروف.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٢-٥ سنوات.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٢. حروف من المعجون</h2>
            <p className="text-white/60 mb-2">لف المعجون إلى أشكال رفيعة وشكّلها على هيئة حروف عربية. هذا النشاط يبني المهارات الحركية الدقيقة مع تعزيز التعرف على الحروف.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٣-٦ سنوات.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٣. عرب فنجرز + البحث عن الحروف</h2>
            <p className="text-white/60 mb-2">العب بعرب فنجرز لبضع دقائق، ثم انطلق في &quot;رحلة بحث عن الحروف&quot; حول المنزل أو الحي. ابحث عن حروف عربية على عبوات الطعام واللافتات والكتب.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٢-٦ سنوات.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٤. أختام الحروف العربية</h2>
            <p className="text-white/60 mb-2">اصنع أختاماً بسيطة بقص أشكال الحروف العربية من الإسفنج. اغمسها في الطلاء واطبعها على الورق. الأطفال يحبون عملية الطباعة.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٢-٥ سنوات.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٥. مطابقة الحروف المغناطيسية</h2>
            <p className="text-white/60 mb-2">اشترِ مجموعة حروف عربية مغناطيسية. ضعها على الثلاجة والعب ألعاب المطابقة. للأطفال الأكبر، جرب تهجئة كلمات بسيطة مثل ماما أو بابا.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٣-٦ سنوات.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٦. أغاني وأناشيد الحروف</h2>
            <p className="text-white/60 mb-2">غنّوا أغنية الأبجدية العربية (أ ب ت ث) معاً، واجعلها طقساً يومياً. الموسيقى من أقوى أدوات تعلم اللغة.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> جميع الأعمار.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٧. حرف الأسبوع</h2>
            <p className="text-white/60 mb-2">اختر حرفاً عربياً واحداً في الأسبوع واجعله &quot;النجم&quot;. ضعه على الثلاجة وابحث عنه في الكتب وتدرب على كتابته. هذا النهج المركّز يمنع الإرهاق ويخلق ألفة عميقة.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٣-٦ سنوات. بحرف واحد في الأسبوع، ستغطي جميع الـ ٢٨ حرفاً في حوالي ٧ أشهر.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٨. وقت القصة العربية</h2>
            <p className="text-white/60 mb-2">اقرأ كتب أطفال عربية معاً. حتى لو كان طفلك لا يستطيع القراءة بعد، أشر إلى الحروف والكلمات أثناء القراءة.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> جميع الأعمار.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">٩. رسم الحروف بالألوان المائية</h2>
            <p className="text-white/60 mb-2">اكتب حروفاً عربية كبيرة على ورق بالشمع الأبيض (غير مرئي). أعطِ طفلك ألواناً مائية ودعه يرسم فوق الورق. تظهر الحروف بشكل سحري!</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> عمر ٣-٦ سنوات.</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">١٠. تحدي عرب فنجرز العائلي</h2>
            <p className="text-white/60 mb-2">اجعل عرب فنجرز نشاطاً عائلياً. تناوبوا في الضغط على المفاتيح وتسمية الحروف العربية. الإخوة الأكبر يمكنهم مساعدة الأصغر. الجانب الاجتماعي للتعلم معاً أكثر تحفيزاً بكثير.</p>
            <p className="text-white/60"><strong className="text-white/80">الأفضل لـ:</strong> جميع الأعمار.</p>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">نصائح للنجاح</h2>
          <ul className="list-disc list-inside space-y-2 text-white/60">
            <li><strong className="text-white/80">اجعلها قصيرة</strong> — ٥-١٠ دقائق لكل نشاط كافية للأطفال الصغار.</li>
            <li><strong className="text-white/80">اتبع قيادتهم</strong> — إذا أحب طفلك نشاطاً معيناً، افعل المزيد منه.</li>
            <li><strong className="text-white/80">امزج الرقمي والمادي</strong> — اجمع بين عرب فنجرز والأنشطة العملية.</li>
            <li><strong className="text-white/80">كن مستمراً</strong> — بضع دقائق كل يوم أفضل من جلسة طويلة مرة في الأسبوع.</li>
            <li><strong className="text-white/80">احتفل بكل شيء</strong> — كل حرف يتم التعرف عليه هو تقدم يستحق الاحتفال.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
