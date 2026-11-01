import { expect, test as base } from "@playwright/test";

/**
 * Every e2e test runs with the ad network blocked. Real ad tags in CI would
 * count as bot impressions on the publisher account, inject untitled iframes
 * that fail the axe scans, and lay overlays over the page that swallow clicks
 * (the flaky WebKit timeouts of 1 Nov 2026). A test that needs the tags, like
 * presentation.spec.ts, routes the same hosts on its page, and page routes
 * take precedence over this context route.
 */
export const AD_HOSTS = /^https:\/\/(bauval\.org|fortunateambiguous\.com|abscloud\.org)\//;

export const test = base.extend<{ blockAds: void }>({
  blockAds: [
    async ({ context }, use) => {
      await context.route(AD_HOSTS, (route) => route.abort());
      await use();
    },
    { auto: true },
  ],
});

export { expect };
