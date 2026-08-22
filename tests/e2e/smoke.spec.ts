import { expect, test } from "@playwright/test";

/**
 * Route smoke for the site's load-bearing paths, in both locales. These are the
 * checks unit tests cannot give: that pages actually render, the games mount,
 * 404s localize correctly, and security headers survive to the browser.
 */

const CORE_PAGES = [
  { path: "", h1: "Free Arabic" },
  { path: "/printables", h1: "Free Printable Arabic Alphabet Tracing Worksheets (PDF)" },
  { path: "/games", h1: "Games" },
  { path: "/learn", h1: "Learn Arabic" },
  { path: "/learn/arabic-alphabet-guide", h1: "The Arabic Alphabet" },
  { path: "/blog", h1: "Blog" },
];

test.describe("core routes (en + ar)", () => {
  for (const page of CORE_PAGES) {
    test(`en${page.path || "/"} renders`, async ({ page: p }) => {
      const res = await p.goto(`/en${page.path}`);
      expect(res?.status()).toBe(200);
      await expect(p.getByRole("heading", { level: 1 }).first()).toContainText(page.h1);
    });

    test(`ar${page.path || "/"} renders RTL with an h1`, async ({ page: p }) => {
      const res = await p.goto(`/ar${page.path}`);
      expect(res?.status()).toBe(200);
      await expect(p.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(p.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("play stage mounts", () => {
  test("letter grid is interactive and a tap shows a letter", async ({ page }) => {
    await page.goto("/en/play");
    // Tiles carry their letter's English name as the accessible label. Do NOT
    // match "any single Arabic character button" here — the nav's ع language
    // switcher matches that too, and clicking it navigates away instead of
    // playing a letter.
    const tile = page.getByRole("button", { name: "Alef" });
    await expect(tile).toBeVisible({ timeout: 15_000 });
    await tile.click();
    await expect(page.getByText("Keys smashed")).toBeVisible();
  });
});

test.describe("404 flows", () => {
  test("unknown en route returns 404 with localized UI", async ({ page }) => {
    const res = await page.goto("/en/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /doesn't exist/i })).toBeVisible();
  });

  test("unknown ar route returns 404 in Arabic", async ({ page }) => {
    const res = await page.goto("/ar/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "هذه الصفحة غير موجودة" })).toBeVisible();
  });

  test("invalid locale gets the bilingual root 404", async ({ page }) => {
    const res = await page.goto("/xx/unknown");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: "العربية" })).toBeVisible();
  });
});

test.describe("security & seo endpoints", () => {
  test("page responses carry security headers", async ({ request }) => {
    const res = await request.get("/en");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-security-policy"]).toContain("default-src 'self'");
    expect(res.headers()["x-frame-options"]).toBe("DENY");
    expect(res.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("sitemap and feed resolve", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
    expect((await request.get("/feed.xml")).status()).toBe(200);
  });
});
