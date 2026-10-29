import { expect, test } from "@playwright/test";

for (const locale of ["en", "ar"] as const) {
  test(`colouring ${locale}: fill stays inside the picture, undo restores it, and artwork downloads`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/coloring`);
    await page.getByRole("button", { name: locale === "ar" ? /الأشكال/ : /Shapes/ }).click();
    const circle = page.getByRole("button", { name: locale === "ar" ? "دائرة" : "Circle", exact: true });
    await circle.focus();
    await circle.press("Enter");

    const paint = page.locator("canvas").first();
    const outline = page.locator("canvas").nth(1);
    await expect.poll(() => outline.evaluate((canvas: HTMLCanvasElement) => {
      const pixels = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data;
      return pixels.some((channel, offset) => offset % 4 === 3 && channel > 0);
    })).toBe(true);

    await page.getByRole("button", { name: locale === "ar" ? "تعبئة" : "Fill", exact: true }).click();
    await paint.click();
    const paintedPixels = await paint.evaluate((canvas: HTMLCanvasElement) => {
      const context = canvas.getContext("2d")!;
      return {
        inside: Array.from(context.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data),
        outside: Array.from(context.getImageData(3, 3, 1, 1).data),
      };
    });
    expect(paintedPixels.inside).toEqual([226, 61, 61, 255]);
    expect(paintedPixels.outside[3]).toBe(0);

    await page.getByRole("button", { name: locale === "ar" ? "تراجع" : "Undo", exact: true }).click();
    await expect.poll(() => paint.evaluate((canvas: HTMLCanvasElement) => canvas.getContext("2d")!.getImageData(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1).data[3])).toBe(0);

    await paint.click();
    const downloadEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: locale === "ar" ? "حفظ" : "Save", exact: true }).click();
    expect((await downloadEvent).suggestedFilename()).toBe("arabfingers-circle.png");
    await page.getByRole("button", { name: locale === "ar" ? "الرسمة التالية" : "Next picture", exact: true }).click();
    await expect(page.getByRole("heading", { name: locale === "ar" ? "معيّن" : "Diamond", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
