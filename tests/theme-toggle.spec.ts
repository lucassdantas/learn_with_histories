import { test, expect } from '@playwright/test';

test('theme toggle works', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Wait for hydration
  await page.waitForTimeout(1000);

  // Check initial state (default light)
  const body = page.locator('body');
  const html = page.locator('html');

  // Find theme toggle button (it has sun/moon icon)
  const themeToggle = page.locator('button').filter({ has: page.locator('svg') }).first();

  // Click to toggle to dark
  await themeToggle.click();
  await expect(html).toHaveClass(/dark/);

  // Check background color (should be dark)
  const darkBg = await body.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  console.log('Dark Mode Background:', darkBg);

  // Click to toggle back to light
  await themeToggle.click();
  await expect(html).not.toHaveClass(/dark/);

  const lightBg = await body.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  console.log('Light Mode Background:', lightBg);

  await page.screenshot({ path: 'theme_test.png' });
});
