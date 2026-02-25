import { devices, type Config } from "@playwright/test";
import { config } from "dotenv";

config({ path: "../../.env.e2e" });

const CI = process.env["CI"];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const baseConfig = (port: number): Config => ({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!CI,
  /* Retry on CI only */
  retries: CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://localhost:${port}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: CI ? `E2E=true yarn preview` : `E2E=true yarn dev`,
      port,
      reuseExistingServer: !CI,
      stdout: "pipe",
    },
    {
      command: `yarn db:serve`,
      // cwd: "",
      reuseExistingServer: !CI,
      stdout: "pipe",
    },
  ],

  globalSetup: "./scripts/e2e.setup.ts",

  /* Configure projects for major browsers */
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
