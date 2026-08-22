import { expect, test } from "@playwright/test";

/**
 * The trace game's core loop, exercised in a real browser: the canvas accepts
 * pointer input and painting over the glyph moves the coverage bar. This is the
 * interaction unit tests cannot reach — it guards the canvas wiring end to end.
 */
test.describe("trace game", () => {
  test("drawing over the glyph fills the progress bar", async ({ page }) => {
    await page.goto("/en/games/trace");

    // The paint surface is the first (bottom) of the two stacked canvases.
    const canvas = page.locator("canvas").first();
    await expect(canvas).toBeVisible({ timeout: 15_000 });

    const fill = page.getByTestId("trace-progress-fill");
    const before = await fill.evaluate((el) => el.style.width);
    expect(before).toBe("0%");

    // Scribble tightly around the glyph centre — enough coverage to move the
    // bar while keeping background spill (which is subtracted) small.
    const box = await canvas.boundingBox();
    if (!box) throw new Error("canvas not measurable");
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const rx = box.width * 0.12;
    const ry = box.height * 0.18;

    await page.mouse.move(cx + rx, cy - ry);
    await page.mouse.down();
    for (let i = 0; i <= 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      await page.mouse.move(
        cx + Math.cos(angle) * rx,
        cy + Math.sin(angle) * ry,
      );
    }
    for (let i = 0; i <= 12; i++) {
      await page.mouse.move(cx - rx + ((2 * rx) / 12) * i, cy);
    }
    await page.mouse.up();

    await expect
      .poll(() => fill.evaluate((el) => parseFloat(el.style.width) || 0), { timeout: 5_000 })
      .toBeGreaterThan(0);

    // The letter chip shows the current glyph's name — the deck starts at Alef.
    await expect(page.getByText(/Alef|ألف/)).toBeVisible();
  });
});
