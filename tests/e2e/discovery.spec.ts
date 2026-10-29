import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Arabic search ignores vowel marks and combines with age filters", async ({ page }) => {
  await page.goto("/ar");
  await page.getByRole("searchbox", { name: "ابحث عن نشاط" }).fill("الْأَرْنَبُ");
  await expect(page.locator(".activity-grid article")).toHaveCount(1);
  await expect(page.locator(".activity-grid")).toContainText("الأَرْنَبُ السَّعِيد");
  await page.getByRole("combobox", { name: "عمر الطفل" }).selectOption("8");
  await expect(page.locator(".activity-grid article")).toHaveCount(0);
  await page.getByRole("button", { name: "مسح الفلاتر" }).click();
  await expect(page.locator(".activity-grid article")).toHaveCount(6);
});

test("saved activities survive reload and remain saved across worksheet browsing", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "Save Count & discover", exact: true }).click();
  await page.getByRole("button", { name: "Saved 1", exact: true }).click();
  await expect(page.locator(".activity-grid article")).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole("button", { name: "Unsave Count & discover", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.goto("/en/printables");
  await page.getByRole("button", { name: "Save Arabic Alphabet Tracing Worksheets", exact: true }).click();
  await page.goto("/en");
  await page.getByRole("button", { name: "Saved 2", exact: true }).click();
  await expect(page.locator(".activity-grid article")).toHaveCount(2);
});

test("counting allows retry, counts each apple once and completes both ranges", async ({ page }) => {
  await page.goto("/en/games/count");
  for (const range of ["1–5", "6–10"]) {
    await page.getByRole("button", { name: range, exact: true }).click();
    for (let round = 0; round < 5; round++) {
      const apples = page.getByRole("group", { name: "Apples to count" }).getByRole("button");
      const count = await apples.count();
      await expect(page.getByRole("button", { name: `Choose ${count}`, exact: true }).locator("strong")).toHaveText(String(count));
      await apples.first().click();
      await apples.first().click();
      await expect(page.locator(".counted-total")).toHaveText("You've counted: 1");
      await page.getByRole("group", { name: "Choose the number" }).getByRole("button", { name: new RegExp(`^Choose (?!${count}$)\\d+$`) }).first().click();
      await expect(page.locator(".counting-feedback")).toContainText("try again");
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", String(round));
      await page.getByRole("button", { name: `Choose ${count}`, exact: true }).click();
      await expect(page.locator(".counting-feedback")).toContainText("That's right");
      await page.getByRole("button", { name: round === 4 ? "Finish activity" : "Next discovery", exact: true }).click();
    }
    await expect(page.getByRole("heading", { name: "Five lovely discoveries!" })).toBeVisible();
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
  }
});

for (const locale of ["en", "ar"]) {
  test(`mobile ${locale} discovery is accessible and does not overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}`);
    await expect(page.locator(".save-activity").first()).toBeEnabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    const scan = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(scan.violations).toEqual([]);
    const menu = page.getByRole("button", { name: locale === "ar" ? "قائمة التنقل" : "Navigation menu", exact: true });
    await menu.click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  });
}
