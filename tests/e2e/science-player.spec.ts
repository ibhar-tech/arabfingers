import { expect, test } from "@playwright/test";

const lessons = ["states-of-matter", "water-cycle", "gravity", "solar-system"];

for (const locale of ["en", "ar"] as const) {
  for (const lesson of lessons) {
    test(`${locale} ${lesson}: controls stay attached to the screen before narration`, async ({ page }) => {
      await page.goto(`/${locale}/learn/${lesson}`);
      const controls = page.getByRole("group", { name: locale === "ar" ? "أدوات تشغيل الدرس" : "Lesson playback controls" });
      await expect(controls).toBeVisible();
      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 900 });
        const screen = await page.locator("[data-science-screen]").boundingBox();
        const toolbar = await controls.boundingBox();
        const narration = await page.locator("[data-science-narration]").boundingBox();
        expect(Math.abs(toolbar!.y - (screen!.y + screen!.height))).toBeLessThanOrEqual(1);
        expect(narration!.y).toBeGreaterThanOrEqual(toolbar!.y + toolbar!.height);
      }
      await controls.getByRole("button", { name: locale === "ar" ? "تشغيل" : "Play", exact: true }).click();
      await expect(controls.getByRole("button", { name: locale === "ar" ? "إيقاف مؤقت" : "Pause", exact: true })).toBeVisible();
      await controls.getByRole("button", { name: locale === "ar" ? "إيقاف مؤقت" : "Pause", exact: true }).click();
      await controls.getByRole("button", { name: locale === "ar" ? "التالي" : "Next Scene", exact: true }).click();
      await expect(controls.getByRole("button", { name: locale === "ar" ? "السابق" : "Prev Scene", exact: true })).toBeEnabled();
    });
  }
}
