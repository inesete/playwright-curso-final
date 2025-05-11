import { test, expect } from '@playwright/test';

test('environment test', async ({ page }) => {
    await page.goto(process.env.URL ?? '');
    await page.pause();
});