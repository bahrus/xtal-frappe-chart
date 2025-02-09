import { test, expect } from '@playwright/test';

test('basic', async ({ page }) => {
  await page.goto('./tests/basic.html');
  // wait for 1 second
  await page.waitForTimeout(4000);
  const editor = page.locator('#target2');
  await expect(editor).toHaveAttribute('mark', 'good');
});