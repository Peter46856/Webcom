import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testIgnore: 'admin.spec.ts',
  outputDir: 'test-results/public',
  fullyParallel: true,
  retries: 0,
  use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: 'msedge' } }],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
