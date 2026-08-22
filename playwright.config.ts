import { defineConfig, devices } from "@playwright/test";

/**
 * Browser smoke suite. Runs against a production build served by `next start`
 * (the webServer below starts it; `npm run build` must have completed first —
 * the CI workflow orders these correctly).
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  // Cap workers: several simultaneous pages each spinning a three.js WebGL
  // context contend for GPU/CPU and can time out waiting to mount. Four keeps
  // the run fast without that contention; CI also retries transient failures.
  workers: process.env.CI ? 4 : 4,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3777",
    trace: "retain-on-failure",
  },
  projects: [
    // Chromium is the primary gate. WebKit guards the iOS/Safari half of the
    // audience — the site is touch-first, so Safari behaviour matters as much
    // as Chrome's.
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npx next start -p 3777",
    url: "http://127.0.0.1:3777/en",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
