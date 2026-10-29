import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const locale of ["en", "ar"] as const) {
  const ar = locale === "ar";

  test(`${locale} dots game: a wrong tap can be retried, the right one moves on`, async ({ page }) => {
    await page.goto(`/${locale}/games/dots`);
    const choices = page.getByRole("group", { name: ar ? "اختر الحرف" : "Choose the letter" });
    await expect(choices).toBeVisible({ timeout: 20_000 });
    const wrong = choices.locator("button:not([data-target])").first();
    await wrong.click();
    await expect(page.getByRole("status")).toContainText(ar ? "عُدّ النقاط" : "Count the dots");
    await choices.locator("button[data-target]").click();
    await expect(page.getByRole("status")).toContainText(ar ? "أحسنت" : "Yes!");
    await page.getByRole("button", { name: ar ? "السؤال التالي" : "Next question" }).click();
    await expect(page.getByText(ar ? "السؤال 2 من 10" : "Question 2 of 10")).toBeVisible();
  });

  test(`${locale} memory game: a matching pair stays face up`, async ({ page }) => {
    await page.goto(`/${locale}/games/memory`);
    const cards = page.locator(".memory-grid button");
    await expect(cards).toHaveCount(8, { timeout: 20_000 });
    const pair = await cards.first().getAttribute("data-pair");
    const both = page.locator(`.memory-grid button[data-pair="${pair}"]`);
    await both.nth(0).click();
    await both.nth(1).click();
    await expect(both.nth(0)).toHaveAttribute("data-matched", "true");
    await expect(both.nth(1)).toHaveAttribute("data-matched", "true");
    await expect(page.getByText(ar ? "المحاولات: 1" : "Moves: 1")).toBeVisible();
  });

  for (const game of ["dots", "memory"]) {
    test(`${locale} /games/${game} is accessible on a phone`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/${locale}/games/${game}`);
      await expect(page.locator(".counting-game button").first()).toBeVisible({ timeout: 20_000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      const scan = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(scan.violations).toEqual([]);
    });
  }
}
