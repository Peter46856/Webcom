import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: 'admin.spec.ts',
  outputDir: 'test-results/admin',
  workers: 1,
  timeout: 90000,
  expect: { timeout: 10000 },
  use: { baseURL: 'http://localhost:3100', trace: 'retain-on-failure' },
  projects: [{ name: 'admin-edge', use: { ...devices['Desktop Chrome'], channel: 'msedge' } }],
  webServer: [
    {
      command: 'node tests/fixtures/mock-supabase.mjs',
      url: 'http://127.0.0.1:54329/health',
      timeout: 30000,
    },
    {
      command: 'node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3100',
      url: 'http://localhost:3100',
      timeout: 60000,
      env: {
        NEXT_PUBLIC_SITE_URL: 'http://localhost:3100',
        SUPABASE_URL: 'http://127.0.0.1:54329',
        SUPABASE_PUBLISHABLE_KEY: 'fixture-publishable-key',
        JAVA_API_URL: 'http://127.0.0.1:1',
        JAVA_API_TOKEN: 'fixture-only-token-with-at-least-32-characters',
        RESEND_API_KEY: '',
        INQUIRY_EMAIL_FROM: '',
      },
    },
  ],
});
