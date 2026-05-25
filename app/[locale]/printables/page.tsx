import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { isLocale } from "@/lib/locales";
import { PrintablesClient } from "@/components/PrintablesClient";

export const metadata: Metadata = {
  title: "Free Printable Arabic Alphabet Tracing Worksheets | أوراق عمل كتابة الحروف العربية",
  description:
    "Download or print free Arabic letter tracing worksheets for kids. High-contrast practice sheets for writing and learning all 28 Arabic alphabet letters.",
};

export default async function PrintablesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;

  return (
    <PageLayout locale={locale}>
      <PrintablesClient locale={locale} />
    </PageLayout>
  );
}
