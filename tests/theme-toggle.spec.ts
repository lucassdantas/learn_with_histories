import { test, expect } from '@playwright/test';

// Run against a running server: `npm run dev` (or BASE_URL=http://localhost:3123 for `next start`).
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

const bg = (page: import('@playwright/test').Page) =>
  page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor);

test('theme toggle switches and persists without a light flash', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto(BASE);
  const html = page.locator('html');
  const toggle = page.getByRole('button', { name: /tema escuro|dark theme|thème sombre/i });

  await toggle.click();
  await expect(html).toHaveClass(/dark/);
  expect(await bg(page)).toBe('rgb(15, 23, 42)'); // #0F172A

  // Reload: the inline theme script applies .dark before hydration.
  await page.reload();
  await expect(html).toHaveClass(/dark/);

  await page.getByRole('button', { name: /tema claro|light theme|thème clair/i }).click();
  await expect(html).not.toHaveClass(/dark/);
  expect(await bg(page)).toBe('rgb(244, 235, 221)'); // #F4EBDD
});

test('a segment reveals and hides its translation', async ({ page }) => {
  await page.goto(`${BASE}/stories/the-night-train`);
  const first = page.getByRole('button', { name: /mostrar tradução|show translation/i }).first();

  await first.click();
  await expect(page.getByText('Hugo comprou a passagem no último minuto.', { exact: false })).toBeVisible();

  await page.getByRole('button', { name: /ocultar tradução|hide translation/i }).first().click();
  await expect(page.getByText('Hugo comprou a passagem no último minuto.', { exact: false })).toBeHidden();
});

test('native and learning languages never end up equal', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE);
  const header = page.locator('header');
  const native = header.getByLabel(/falo|i speak|je parle/i);
  const learning = header.getByLabel(/aprendo|learning|j’apprends/i);

  await expect(native).toHaveValue('pt');
  await expect(learning).toHaveValue('en');

  // Picking the learning language as native swaps the two.
  await native.selectOption('en');
  await expect(native).toHaveValue('en');
  await expect(learning).toHaveValue('pt');
});
