import { ArrowUpRight, BookOpen } from "lucide-react";

const sources = [
  { publisher: "Korkortoon", titleEn: "Arabic learning & colouring books", titleAr: "كتب تعلّم وتلوين بالعربية", descEn: "Explore alphabet, animal, transport and space colouring books from Korkortoon.", descAr: "كتب للحروف والحيوانات والمواصلات والفضاء من كركرتون.", url: "https://korkortoon.com/ar/free-printables-ar/coloring-books/arabic-learning-coloring-books/", noteEn: "Free printables on the publisher's website", noteAr: "مطبوعات مجانية على موقع الناشر" },
  { publisher: "Arabic Seeds", titleEn: "My pet animal worksheets", titleAr: "أوراق عمل حيواني الأليف", descEn: "Two animal worksheets, available in Arabic-only and Arabic–English versions.", descAr: "ورقتا عمل عن الحيوانات، بنسخة عربية ونسخة بالعربية والإنجليزية.", url: "https://www.arabicseeds.com/my-pet-animal-free-arabic-printable-worksheets/", noteEn: "For home or classroom use; see publisher terms", noteAr: "للبيت أو الصف؛ راجع شروط الناشر" },
  { publisher: "Arabic Playground", titleEn: "Free Arabic teaching resources", titleAr: "مصادر مجانية لتعليم العربية", descEn: "Browse printable letters, flashcards and colouring activities from independent creators.", descAr: "تصفّح أوراق الحروف والبطاقات وأنشطة التلوين من صنّاع محتوى مستقلّين.", url: "https://www.arabicplayground.com/free-products", noteEn: "A free publisher account may be required", noteAr: "قد يتطلّب التحميل حساباً مجانياً لدى الناشر" },
  { publisher: "Arriqaaq", titleEn: "My Arabic Alphabets", titleAr: "كتاب حروفي العربية", descEn: "A preschool alphabet activity book. Illustrated by Zara Ilyas and curated by Zahra Venkat.", descAr: "كتاب أنشطة للحروف قبل المدرسة. الرسوم لـ Zara Ilyas وإعداد Zahra Venkat.", url: "https://arriqaaq.com/my-arabic-alphabets/", noteEn: "The publisher may request newsletter signup", noteAr: "قد يطلب الناشر الاشتراك في نشرته" },
  { publisher: "Sesame Workshop", titleEn: "Kindness Saves the Day", titleAr: "قصة اللطف ينقذ الموقف", descEn: "An Arabic storybook to read together and talk about kindness, from Sesame Workshop.", descAr: "قصة بالعربية للقراءة معاً والحديث عن اللطف، من Sesame Workshop.", url: "https://sesameworkshop.org/resources/kindness-saves-the-day-ar/", noteEn: "Open the publisher's Arabic resource page", noteAr: "افتح صفحة المصدر العربي لدى الناشر" },
];

export function ExternalPrintables({ locale }: { locale: string }) {
  const ar = locale === "ar";
  return <section id="other-publishers" aria-labelledby="other-publishers-heading" className="external-library">
    <div className="external-library-heading"><BookOpen size={24} aria-hidden /><div><p>{ar ? "من صنّاع محتوى آخرين" : "FROM OTHER CREATORS"}</p><h2 id="other-publishers-heading">{ar ? "مكتبة أوسع، بأسماء أصحابها" : "More to discover, with credit to the creators"}</h2></div></div>
    <p className="external-library-intro">{ar ? "اختر من هذه المصادر الخارجية إلى جانب أوراق عرب فنجرز. تفتح الروابط موقع الناشر الأصلي للتحميل وفق شروطه." : "Explore these independent resources alongside Arab Fingers worksheets. Each link opens the original publisher, where you can download under their terms."}</p>
    <div className="external-resource-grid">{sources.map((source) => <article key={source.publisher}>
      <p className="external-publisher">{source.publisher}</p>
      <h3>{ar ? source.titleAr : source.titleEn}</h3>
      <p>{ar ? source.descAr : source.descEn}</p>
      <p className="external-resource-note">{ar ? source.noteAr : source.noteEn}</p>
      <a href={source.url} target="_blank" rel="noopener noreferrer">{ar ? "افتح موقع الناشر" : "Open publisher"}<ArrowUpRight size={17} aria-hidden /><span className="sr-only">{ar ? " — يفتح في نافذة جديدة" : " — opens in a new tab"}</span></a>
    </article>)}</div>
  </section>;
}
