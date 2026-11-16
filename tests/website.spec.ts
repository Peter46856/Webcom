import { test, expect } from '@playwright/test';

test('home architecture explorer changes with user selection', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Complex systems.');
  const networks = page.getByRole('button', { name: 'Networks', exact: true });
  await networks.click();
  await expect(networks).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Network orchestration', { exact: true })).toBeVisible();
});
test('all published pages load and have one main heading', async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of [
    '/',
    '/services',
    '/services/software-engineering',
    '/services/logistics-systems',
    '/services/network-infrastructure',
    '/services/cloud-devops',
    '/projects',
    '/projects/ecoroute',
    '/projects/fleet-command',
    '/projects/isp-billing',
    '/blog',
    '/blog/designing-reliable-event-pipelines',
    '/blog/payment-to-provisioning',
    '/blog/clear-system-boundaries',
    '/about',
    '/contact',
    '/privacy',
    '/industries',
    '/industries/logistics-and-transport',
    '/industries/internet-service-providers',
    '/industries/saas-and-enterprise',
    '/how-we-work',
    '/engagements',
    '/engineering',
    '/faq',
  ]) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    if (route.startsWith('/blog/')) {
      await expect(page.getByRole('navigation', { name: 'Article chapters' })).toBeVisible();
    } else {
      await expect(page.locator('.page-guide')).toHaveCount(1);
      expect(await page.locator('.guide-body p').count(), route).toBeGreaterThanOrEqual(8);
    }
  }
});
test('blog filters, searches, and recovers from empty results', async ({ page }) => {
  await page.goto('/blog');
  await page.getByRole('button', { name: 'Network Infrastructure', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'From payment callback to network access.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Real-time is a system, not a socket.' }),
  ).toHaveCount(0);
  await page.getByRole('searchbox').fill('no-matching-article');
  await expect(page.getByRole('heading', { name: 'No matching articles' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(
    page.getByRole('heading', { name: 'Real-time is a system, not a socket.' }),
  ).toBeVisible();
});
test('case study architecture exposes component details', async ({ page }) => {
  await page.goto('/projects/ecoroute');
  await page.getByRole('button', { name: /Geospatial data/ }).click();
  await expect(
    page.getByText('Stores transit graph data and observations behind controlled database access.'),
  ).toBeVisible();
});
async function fillInquiry(page: import('@playwright/test').Page) {
  await page.getByLabel('Your name').fill('Alex Example');
  await page.getByLabel('Work email').fill('alex@example.com');
  await page.getByLabel('Company', { exact: true }).fill('Example Logistics');
  await page.getByLabel('Project focus').selectOption('Software engineering');
  await page.getByLabel('Estimated budget').selectOption('$15,000–$50,000');
  await page
    .getByLabel('What would you like to build?')
    .fill('We need a fleet operations dashboard with a dispatch integration and reporting.');
  await page.getByRole('checkbox').check();
}
test('inquiry failures preserve input and do not show false success', async ({ page }) => {
  await page.route('**/api/inquiries', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'The inquiry service is temporarily unavailable.' }),
    }),
  );
  await page.goto('/contact');
  await fillInquiry(page);
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await expect(page.locator('.contact-form').getByRole('alert')).toContainText(
    'temporarily unavailable',
  );
  await expect(page.getByLabel('Work email')).toHaveValue('alex@example.com');
  await expect(page.getByRole('heading', { name: 'Your inquiry is in.' })).toHaveCount(0);
});
test('inquiry success is shown after the API confirms storage (mocked response)', async ({
  page,
}) => {
  await page.route('**/api/inquiries', (route) =>
    route.fulfill({ status: 201, contentType: 'application/json', body: '{"message":"Received"}' }),
  );
  await page.goto('/contact');
  await fillInquiry(page);
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await expect(page.getByRole('heading', { name: 'Your inquiry is in.' })).toBeVisible();
});
test('API rejects cross-origin and invalid submissions', async ({ request }) => {
  const foreign = await request.post('/api/inquiries', {
    headers: { origin: 'https://example.invalid' },
    data: {},
  });
  expect(foreign.status()).toBe(403);
  const invalid = await request.post('/api/inquiries', {
    headers: { origin: 'http://localhost:3000' },
    data: { email: 'invalid' },
  });
  expect(invalid.status()).toBe(400);
});
test('mobile navigation and layout work without horizontal overflow', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    '/',
    '/projects/ecoroute',
    '/blog',
    '/industries/logistics-and-transport',
    '/how-we-work',
    '/engagements',
    '/engineering',
    '/faq',
    '/contact',
  ]) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      route,
    ).toBe(true);
  }
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Projects' })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});
test('unknown routes return 404', async ({ page }) => {
  const response = await page.goto('/projects/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This path doesn’t connect.' })).toBeVisible();
});
