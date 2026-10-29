import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "ar"] as const) {
  const ar = locale === "ar";

  test(`${locale} printable hub offers a working workbook without hiding individual packs`, async ({ page, request }) => {
    await page.goto(`/${locale}/printables`);
    const workbook = page.getByRole("link", { name: ar ? "تحميل الكرّاسة مجاناً" : "Download free workbook", exact: true });
    await expect(workbook).toHaveAttribute("download", "");
    const href = await workbook.getAttribute("href");
    const response = await request.get(href!);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
    await expect(page.locator("#downloads")).toBeAttached();
    await expect(page.locator('.activity-grid a[href="/printables/arabic-numbers-tracing.pdf"]')).toHaveAttribute("download", "");
  });

  test(`${locale} learning guides connect practice to downloads and the counting game`, async ({ page }) => {
    await page.goto(`/${locale}/learn/first-arabic-words`);
    await page.locator('nav a[href="#word-practice"]').click();
    const wordsPractice = page.locator("#word-practice details");
    await wordsPractice.locator("summary").click();
    await expect(wordsPractice.locator("p")).toContainText("شكراً");
    await expect(wordsPractice.locator("p")).toBeVisible();
    await page.goto(`/${locale}/learn/arabic-colors`);
    await page.locator('nav a[href="#color-practice"]').click();
    const colorsPractice = page.locator("#color-practice details");
    await colorsPractice.locator("summary").click();
    await expect(colorsPractice.locator("p")).toContainText("تفاحة حمراء");
    await expect(page.locator('#color-practice a[href="/printables/arabic-colors.pdf"]')).toHaveAttribute("download", "");
    await page.goto(`/${locale}/learn/arabic-numbers`);
    await page.locator(`main a[href="/${locale}/games/count"]`).first().click();
    await expect(page).toHaveURL(`/${locale}/games/count`);
    await expect(page.getByRole("group", { name: ar ? "تفّاح للعدّ" : "Apples to count" })).toBeVisible();
  });

  test(`${locale} story discovery preserves Arabic and English reading direction`, async ({ page }) => {
    await page.goto(`/${locale}/stories`);
    await page.locator(`main a[href="/${locale}/stories/al-arnab-al-saeed"]`).first().click();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.arabfingers.site/${locale}/stories/al-arnab-al-saeed`);
    await expect(page.locator('main li p[lang="ar"]').first()).toHaveAttribute("dir", "rtl");
    await expect(page.locator('main li p[lang="en"]').first()).toHaveAttribute("dir", "ltr");
    await expect(page.locator('main a[href="/stories/al-arnab-al-saeed.pdf"]').first()).toHaveAttribute("download", "");
  });

  test(`${locale} updated learning pages are accessible on a phone`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of ["learn/first-arabic-words", "learn/arabic-colors", "learn/arabic-numbers", "stories", "stories/al-arnab-al-saeed"]) {
      await page.goto(`/${locale}/${route}`);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBeTruthy();
      const scan = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(scan.violations, route).toEqual([]);
    }
  });
}
