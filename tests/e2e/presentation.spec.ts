import { expect, test } from "@playwright/test";

// Network fixtures must not be bypassed by the application service worker.
test.use({ serviceWorkers: "block" });

test("footer stays compact on desktop and Arabic UI uses 0–9 digits", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/ar");
  await page.evaluate(() => document.fonts.ready);
  const footer = page.locator("footer");
  const bounds = await footer.boundingBox();
  expect(bounds!.height).toBeLessThan(350);
  await expect(footer.getByRole("link", { name: "الخصوصية", exact: true })).toHaveCount(1);
  expect(await page.locator("main").innerText()).not.toMatch(/[٠-٩]/);
  await page.goto("/ar/games/count");
  await expect(page.getByRole("button", { name: "اختر 3", exact: true })).toBeVisible();
  expect(await page.locator("main").innerText()).not.toMatch(/[٠-٩]/);
});

test("external printables credit their publishers and open original resource pages", async ({ page }) => {
  await page.goto("/en/printables");
  const library = page.locator("#other-publishers");
  await expect(library.locator("article")).toHaveCount(5);
  await expect(library).toContainText("Korkortoon");
  await expect(library).toContainText("Zara Ilyas");
  const destinations = await library.getByRole("link").evaluateAll(links => links.map(link => ({ href: (link as HTMLAnchorElement).href, target: (link as HTMLAnchorElement).target })));
  expect(destinations.every(link => link.href.startsWith("https://") && !link.href.endsWith(".pdf") && link.target === "_blank")).toBe(true);
});

test("reading page loads the mobile ad tag directly and excludes it from colouring", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  // The publisher network is the boundary: tests must not generate paid impressions.
  await page.route(/^https:\/\/(bauval\.org|fortunateambiguous\.com|abscloud\.org)\//, route => route.fulfill({
    contentType: "application/javascript",
    body: "document.currentScript.parentElement.dataset.vendorLoaded = String(window.atOptions?.width);",
  }));
  await page.goto("/en/printables");
  const ad = page.locator(".reading-ad-top");
  await expect(ad.locator(".reading-ad-content")).toHaveAttribute("data-vendor-loaded", "320");
  await expect(ad.locator('script[src="https://bauval.org/22/3c908dfc062a31ebcf0682182915df0c"]')).toHaveCount(1);
  await expect(ad.locator("iframe[srcdoc]")).toHaveCount(0);
  const pageTags = page.locator('script[src*="abscloud.org/1/"], script[src*="bauval.org/14/"]');
  await expect(pageTags).toHaveCount(2);
  // Client-side hop to a game must drop the popunder/social bar listeners.
  await page.locator('a[href="/en/games"]:visible').first().click();
  await expect(page).toHaveURL(/\/en\/games$/);
  await expect(pageTags).toHaveCount(0);
  await page.goto("/en/coloring");
  await expect(page.locator(".reading-ad-slot")).toHaveCount(0);
  await expect(pageTags).toHaveCount(0);
});
