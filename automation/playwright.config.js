// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * PAKAR-AIR Automation — Playwright Configuration
 *
 * Environment:
 *   Frontend: http://localhost:5173
 *   Backend:  http://localhost:8000
 */
module.exports = defineConfig({
  /* ─── Test Discovery ─── */
  testDir: './playwright/tests',
  testMatch: '**/*.spec.js',

  /* ─── Execution ─── */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  /* ─── Reporters ─── */
  reporter: [
    ['list'],
    ['html', { outputFolder: './output/reports/html', open: 'never' }],
    ['json', { outputFile: './output/reports/json/results.json' }],
    ['./parser/reporter.js'] // PAKAR-AIR Runtime Parser Reporter
  ],

  /* ─── Shared Settings ─── */
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Viewport */
    viewport: { width: 1440, height: 900 },

    /* Navigation */
    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    /* Extra HTTP Headers */
    extraHTTPHeaders: {
      'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
    },
  },

  /* ─── Output Directories ─── */
  outputDir: './output/reports/traces',

  /* ─── Projects ─── */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    // Uncomment for cross-browser testing:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],

  /* ─── Global Setup ─── */
  globalSetup: undefined,
  globalTeardown: undefined,
});
