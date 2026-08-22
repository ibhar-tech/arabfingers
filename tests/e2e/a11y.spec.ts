import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Automated WCAG 2.x A/AA scans over the load-bearing public pages.
 *
 * Gate: zero CRITICAL violations. Serious issues are surfaced in the failure
 * output when they appear but do not block CI yet — the site has a long tail of
 * third-party ad iframe content that reports noise outside our control.
 */
const ROUTES = [
  { path: "", name: "home" },
  { path: "/printables", name: "worksheets" },
  { path: "/games", name: "games-hub" },
  { path: "/learn/arabic-alphabet-guide", name: "alphabet-guide" },
];

for (const locale of ["en", "ar"] as const) {
  for (const route of ROUTES) {
    test(`a11y ${locale} ${route.name}`, async ({ page }) => {
      await page.goto(`/${locale}${route.path}`);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const summary = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        sample: v.nodes[0]?.target?.[0],
      }));

       
      if (summary.length) console.log(`${locale}${route.path}:`, JSON.stringify(summary));

      const critical = results.violations.filter((v) => v.impact === "critical");
      expect(critical, `critical a11y violations on ${locale}${route.path}`).toEqual([]);
    });
  }
}

test("a11y play stage (interactive canvas)", async ({ page }) => {
  await page.goto("/en/play");
  await page.waitForTimeout(1_500); // allow the lazy 3D layer + letter bar to mount
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a"])
    .disableRules(["color-contrast"]) // decorative candy stage; contrast handled by design tokens
    .analyze();
  const critical = results.violations.filter((v) => v.impact === "critical");
   
  if (results.violations.length) console.log("play:", JSON.stringify(results.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }))));
  expect(critical).toEqual([]);
});
