import { test, expect, Page } from '@playwright/test';
test.describe.configure({ mode: 'serial' });
// Isolated server and actual browser origin are both localhost:3100.
async function login(page: Page) {
  await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Email', { exact: true }).fill('admin@example.test');
  await page.getByLabel('Password', { exact: true }).fill('Fixture-password-2026');
  const pending = page.waitForResponse((response) => response.url().includes('/api/admin/login'));
  await page.getByRole('button', { name: 'Sign in securely' }).click();
  const response = await pending;
  expect(response.status(), await response.text()).toBe(200);
  await expect(page).toHaveURL(/\/admin$/);
}
test('anonymous and ordinary users cannot access administration', async ({
  page,
  request,
  context,
}) => {
  for (const url of [
    '/api/admin/inquiries',
    '/api/admin/posts',
    '/api/admin/projects',
    '/api/admin/pricing',
    '/api/admin/notification-settings',
  ])
    expect((await request.get(url)).status()).toBe(401);
  await page.goto('/admin/inquiries');
  await expect(page).toHaveURL(/\/admin\/login$/);
  await context.addCookies([
    { name: 'webcom-admin', value: 'ordinary-user-token', domain: 'localhost', path: '/' },
  ]);
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login$/);
  expect((await page.request.get('/api/admin/inquiries')).status()).toBe(401);
});
test('mutations reject a foreign origin before processing data', async ({ request }) => {
  const result = await request.post('/api/admin/posts', {
    headers: { origin: 'https://other.invalid' },
    data: {},
  });
  expect(result.status()).toBe(403);
});
test('login, inquiry review, and status changes work with mocked Supabase', async ({ page }) => {
  await login(page);
  await page
    .getByRole('navigation', { name: 'Administration' })
    .getByRole('link', { name: 'Inquiries' })
    .click();
  await page.getByRole('button', { name: /Fixture Logistics/ }).click();
  await expect(page.getByRole('heading', { name: 'Fixture Logistics' })).toBeVisible();
  await expect(
    page.getByText('We need an operations platform with dispatch and reporting for our team.'),
  ).toBeVisible();
  await page.getByLabel('Conversation status').selectOption('qualified');
  await expect(page.getByRole('button', { name: /Fixture Logistics/ })).toContainText('qualified');
  await page.getByLabel('Filter by status').selectOption('new');
  await expect(page.getByText('No inquiries match this filter.')).toBeVisible();
});
test('create, preview, publish, unpublish, and delete a managed article', async ({ page }) => {
  await login(page);
  await page.goto('/admin/blog/new');
  await page.getByLabel('Article title').fill('A private architecture field note');
  await page.getByLabel('URL slug').fill('integration-field-note');
  await page
    .getByLabel('Summary', { exact: true })
    .fill(
      'An engineering field note describing how to reason about operational boundaries and reliable integrations.',
    );
  await page
    .getByLabel('Article body Markdown')
    .fill(
      '## A meaningful boundary\n\nThis article explains the tradeoffs involved in connecting a user workflow to an operational system. Validate inputs, record state, and design recovery paths before deployment.\n\n<script>alert("unsafe")</script>',
    );
  await page.getByRole('button', { name: 'Preview', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'A meaningful boundary' })).toBeVisible();
  await expect(page.locator('.editor-preview script')).toHaveCount(0);
  await page.getByRole('button', { name: 'Save draft', exact: true }).click();
  await expect(page).toHaveURL(/\/admin\/blog\/[a-f0-9-]+$/);
  const editUrl = page.url();
  const draftResponse = await page.request.get('/blog/integration-field-note');
  expect(draftResponse.status()).toBe(404);
  await page.getByRole('button', { name: 'Publish article', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Published.');
  await page.goto('/blog/integration-field-note');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A private architecture field note',
  );
  await expect(page.locator('article script')).toHaveCount(0);
  await page.goto('/blog');
  await expect(
    page.getByRole('heading', { name: 'A private architecture field note' }),
  ).toBeVisible();
  await page.goto(editUrl);
  await page.getByRole('button', { name: 'Unpublish & save draft' }).click();
  await expect(page.getByRole('status')).toContainText('Draft saved');
  expect((await page.request.get('/blog/integration-field-note')).status()).toBe(404);
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Delete article' }).click();
  await expect(page).toHaveURL(/\/admin\/blog$/);
  await expect(page.getByText('No articles here yet.')).toBeVisible();
});
test('sign-out removes access', async ({ page }) => {
  await login(page);
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page).toHaveURL(/\/admin\/login$/);
  expect((await page.request.get('/api/admin/posts')).status()).toBe(401);
});
test('admin mobile navigation does not overflow', async ({ page }) => {
  await login(page);
  await page.screenshot({ path: 'work/admin-overview-desktop.png', fullPage: true });
  await page.goto('/admin/blog/new', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'work/admin-editor-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/admin', { waitUntil: 'domcontentloaded' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/admin/blog/new');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'work/admin-editor-mobile.png', fullPage: true });
});

test('admin can add and remove projects across public pages', async ({ page }) => {
  await login(page);
  await page.goto('/admin/projects');
  await page.getByLabel('Project name', { exact: true }).fill('Warehouse Platform');
  await page.getByLabel('URL slug').fill('warehouse-platform');
  await page.getByLabel('Category', { exact: true }).fill('Enterprise software');
  await page.getByLabel('Case study headline').fill('Coordinating warehouse operations');
  await page
    .getByLabel('Summary')
    .fill('A platform connecting stock movements, operators, and warehouse workflows.');
  await page
    .getByLabel('The challenge')
    .fill('Warehouse teams need a reliable shared view of inventory and outstanding work.');
  await page
    .getByLabel('The approach')
    .fill('Separate inventory records from operational events with clear service boundaries.');
  await page.getByLabel('Technologies').fill('React\nJava\nPostgreSQL');
  await page.getByLabel('Capabilities').fill('Inventory history\nWork assignment');
  await page
    .getByLabel('Architecture components')
    .fill('Operations console | React | Coordinates warehouse work');
  await page.getByRole('button', { name: 'Add project', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Project added');
  await page.goto('/projects/warehouse-platform');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Coordinating warehouse operations',
  );
  await page.goto('/projects');
  await expect(page.getByRole('link', { name: /Warehouse Platform/ })).toBeVisible();
  await page.goto('/admin/projects');
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Remove Warehouse Platform' }).click();
  await expect(page.getByRole('status')).toHaveText('Project removed.');
  await page.goto('/projects/warehouse-platform');
  await expect(page.getByRole('heading', { name: /This path doesn/ })).toBeVisible();
});

test('theme switch persists across navigation and reloads', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/contact');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.screenshot({ path: 'work/theme-light-contact.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 390);
  await page.screenshot({ path: 'work/theme-light-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('packages can be drafted, edited, published, selected, hidden, and deleted', async ({
  page,
}) => {
  await login(page);
  await page.goto('/admin/pricing');
  await page.getByLabel('Package ID', { exact: true }).fill('fixture-web-package');
  await page.getByLabel('Package name', { exact: true }).fill('Fixture website package');
  await page.getByLabel('Category / customer goal').fill('Launch your presence');
  await page.getByLabel('Estimated timeline').fill('3–5 weeks');
  await page
    .getByLabel('Description', { exact: true })
    .fill('A scoped website package for a small business with publishing and inquiries.');
  await page.getByLabel('Lower price').fill('1500');
  await page.getByLabel('Upper price').fill('4000');
  await page
    .getByLabel('Included features')
    .fill('Up to 8 pages\nProtected blog admin\nContact inquiry form');
  await page.getByLabel('Exclusions').fill('Cloud and email subscription charges');
  await page.getByRole('button', { name: 'Save package', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Package saved as a draft.');
  await page.goto('/pricing');
  await expect(
    page.getByRole('heading', { name: 'Fixture website package', exact: true }),
  ).toHaveCount(0);
  await page.goto('/admin/pricing');
  await page.getByRole('button', { name: 'Edit Fixture website package' }).click();
  await page.getByLabel('Upper price').fill('4500');
  await page
    .getByLabel('Included features')
    .fill('Up to 8 pages\nProtected blog admin\nContact inquiry form\nOwner email notifications');
  await page.getByLabel('Publish on the website').check();
  await page.getByRole('button', { name: 'Save package', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Package saved and published.');
  await page.goto('/pricing');
  await expect(page.getByText('$1,500 – $4,500', { exact: true })).toBeVisible();
  await expect(page.getByText('Owner email notifications', { exact: true })).toBeVisible();
  await page.screenshot({ path: 'work/pricing-dark-desktop.png', fullPage: true });
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('body')).toHaveJSProperty('scrollWidth', 390);
  await page.screenshot({ path: 'work/pricing-light-mobile.png', fullPage: true });
  await page.getByRole('link', { name: 'Discuss Fixture website package' }).click();
  await expect(page.getByRole('textbox', { name: 'What would you like to build?' })).toHaveValue(
    /Fixture website package/,
  );
  await page.goto('/admin/pricing');
  await page.getByRole('button', { name: 'Edit Fixture website package' }).click();
  await page.getByLabel('Publish on the website').uncheck();
  await page.getByRole('button', { name: 'Save package', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Package saved as a draft.');
  await page.goto('/pricing');
  await expect(
    page.getByRole('heading', { name: 'Fixture website package', exact: true }),
  ).toHaveCount(0);
  await page.goto('/admin/pricing');
  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Delete Fixture website package' }).click();
  await expect(page.getByRole('status')).toHaveText('Package deleted.');
});

test('admin can privately change notification recipient and gets actionable email setup feedback', async ({
  page,
}) => {
  await login(page);
  await page.goto('/admin/notifications');
  await expect(page.getByLabel('Inquiry notification recipient')).toHaveValue('owner@example.test');
  await page.getByLabel('Inquiry notification recipient').fill('new-owner@example.test');
  await page.getByRole('button', { name: 'Save recipient' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Recipient saved. Future notifications use this address.',
  );
  await page.reload();
  await expect(page.getByLabel('Inquiry notification recipient')).toHaveValue(
    'new-owner@example.test',
  );
  await page.goto('/admin/inquiries');
  await page.getByRole('button', { name: /Fixture Logistics/ }).click();
  await page.getByRole('button', { name: 'Send email notification' }).click();
  await expect(page.getByRole('status')).toContainText('Set RESEND_API_KEY and INQUIRY_EMAIL_FROM');
});

test('pricing and notification mutations enforce origin and range validation', async ({
  page,
  request,
}) => {
  for (const url of [
    '/api/admin/pricing',
    '/api/admin/notification-settings',
    '/api/admin/inquiries/email',
  ]) {
    expect(
      (
        await request.post(url, { headers: { origin: 'https://other.invalid' }, data: {} })
      ).status(),
    ).toBe(url.includes('notification-settings') ? 405 : 403);
  }
  await login(page);
  const bad = await page.request.post('/api/admin/pricing', {
    headers: { origin: 'http://localhost:3100' },
    data: {
      slug: 'bad-range',
      name: 'Invalid package',
      category: 'Test category',
      description: 'A scoped package with a deliberately invalid price range.',
      currency: 'USD',
      price_min: 5000,
      price_max: 100,
      billing: 'project',
      timeline: '3 weeks',
      features: ['One feature'],
      exclusions: ['Hosting'],
      published: true,
      sort_order: 1,
    },
  });
  expect(bad.status()).toBe(400);
  expect(await bad.text()).toContain('upper price');
  expect(
    (
      await page.request.patch('/api/admin/notification-settings', {
        headers: { origin: 'https://other.invalid' },
        data: { recipient: 'bad@example.test' },
      })
    ).status(),
  ).toBe(403);
});
