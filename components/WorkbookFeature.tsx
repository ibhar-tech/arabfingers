import Image from "next/image";
import Link from "next/link";
import { worksheetSets } from "@/lib/worksheets";
import fileSizes from "@/lib/worksheet-files.json";

const workbook = worksheetSets.find((pack) => pack.id === "arabic-complete-workbook")!;
const workbookSize = (fileSizes["arabic-complete-workbook"] / 1024 / 1024).toFixed(1);

export function WorkbookFeature({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const pageCount = workbook.pages.toLocaleString(isAr ? "ar-u-nu-latn" : "en");

  return (
    <section aria-labelledby="complete-workbook" className="mt-6 grid gap-5 rounded-2xl border border-[#cbd8c5] bg-[#edf1e6] p-5 sm:grid-cols-[130px_1fr] sm:gap-7 sm:p-6">
      <div className="order-2 w-24 justify-self-center self-center sm:order-none sm:w-full">
        <Image
          src={`/printables/previews/${workbook.id}.png`}
          alt={isAr ? "الصفحة الأولى من الكرّاسة: لوحة الحروف العربية" : "First workbook page: the Arabic alphabet chart"}
          width={349}
          height={494}
          unoptimized
          className="h-auto w-full rounded-md border border-[#d6decf] bg-white shadow-sm"
        />
      </div>
      <div>
        <p className="text-xs font-bold tracking-wide text-[#315b41]">{isAr ? "كل المجموعات في ملف واحد" : "All the packs, one easy download"}</p>
        <h2 id="complete-workbook" className="mt-2 font-display text-xl font-extrabold text-ink sm:text-2xl">
          {isAr ? "الكرّاسة العربية الكاملة" : "Complete Arabic Workbook"}
        </h2>
        <p className="mt-2 text-sm font-bold leading-relaxed text-[#315b41]">
          {pageCount} {isAr ? "صفحة" : "pages"} · <bdi>PDF · {workbookSize} MB · A4</bdi> · {isAr ? workbook.ageAr : workbook.ageEn}
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/80">
          {isAr
            ? "الحروف والحركات والأرقام والتلوين في ملف واحد. حمّل الكرّاسة مرة، ثم اختر الصفحات التي يحتاجها طفلك اليوم."
            : "Letters, harakat, numbers and colouring in one file. Download once, then print just the pages your child is ready for today."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href={`/printables/${workbook.id}.pdf`} download className="discovery-button">
            {isAr ? "تحميل الكرّاسة مجاناً" : "Download free workbook"}<span aria-hidden>↓</span>
          </a>
          <Link href={`/${locale}/printables/${workbook.id}`} className="inline-flex min-h-11 items-center text-sm font-bold text-[#315b41] underline decoration-[#9baF96] underline-offset-4 hover:decoration-current">
            {isAr ? "تصفّح محتويات الكرّاسة" : "See what's in the workbook"}
          </Link>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/70">{isAr ? "بلا تسجيل أو بريد إلكتروني. الأعمار إرشادية؛ اختر ما يناسب مهارة طفلك." : "No sign-up or email needed. Ages are a guide; choose pages to match your child's skills."}</p>
      </div>
    </section>
  );
}
