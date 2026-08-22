import { describe, expect, it } from "vitest";
import { generatePageMetadata } from "@/lib/seo";

const SITE = "https://www.arabfingers.site";

describe("generatePageMetadata", () => {
  it("builds self-canonical URLs with reciprocal hreflang for a page path", () => {
    const md = generatePageMetadata("en", "/play", {
      titleEn: "Play",
      titleAr: "العب",
      descriptionEn: "d",
      descriptionAr: "d",
    });
    expect(md.alternates?.canonical).toBe(`${SITE}/en/play`);
    expect(md.alternates?.languages).toEqual({
      en: `${SITE}/en/play`,
      ar: `${SITE}/ar/play`,
      "x-default": `${SITE}/en/play`,
    });
  });

  it("treats the homepage as /{locale} without a trailing double slash", () => {
    const md = generatePageMetadata("ar", "", {
      titleEn: "t",
      titleAr: "t",
      descriptionEn: "d",
      descriptionAr: "d",
    });
    expect(md.alternates?.canonical).toBe(`${SITE}/ar`);
    expect(md.alternates?.languages).toEqual({
      en: `${SITE}/en`,
      ar: `${SITE}/ar`,
      "x-default": `${SITE}/en`,
    });
  });

  it("localizes title/description and OG locale per language", () => {
    const ar = generatePageMetadata("ar", "/learn/arabic-numbers", {
      titleEn: "Numbers",
      titleAr: "الأرقام",
      descriptionEn: "EN desc",
      descriptionAr: "وصف عربي",
    });
    expect(ar.title).toBe("الأرقام");
    expect(ar.description).toBe("وصف عربي");
    expect(ar.openGraph?.locale).toBe("ar_SA");
    expect(ar.openGraph?.alternateLocale).toEqual(["en_US"]);
  });

  it("carries article metadata only when provided", () => {
    const plain = generatePageMetadata("en", "/a", { titleEn: "t", titleAr: "t", descriptionEn: "d", descriptionAr: "d" });
    expect(plain.openGraph).not.toHaveProperty("publishedTime");

    const article = generatePageMetadata("en", "/a", {
      titleEn: "t", titleAr: "t", descriptionEn: "d", descriptionAr: "d",
      publishedTime: "2026-06-12T00:00:00.000Z", ogType: "article",
    });
    // Next types openGraph as a union; article variant carries the fields we set.
    expect(article.openGraph && "type" in article.openGraph && article.openGraph.type).toBe("article");
    expect(article.openGraph).toHaveProperty("publishedTime", "2026-06-12T00:00:00.000Z");
  });
});
