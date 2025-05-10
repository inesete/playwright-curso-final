import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test 3', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  //con css selector input con id ese
  //await page.locator("input#cb1-edit").fill("iphone");
  //con Xpath
  await page.locator("//input[@id='cb1-edit']").fill("iphone");
  await page.locator("//button[@class='nav-search-btn']").click();
  await expect(page.locator("//ol[contains(@class,'ui-search-layout')]")).toBeVisible();

  const titles = await page.locator("//ol[contains(@class,'ui-search-layout')]/li[contains(@class,'ui-search-layout__item')]/div/div/div/div/h3").allInnerTexts();
  for (let title of titles) {
    console.log("The title is: ", title);
  }
  console.log("The total number of results is: ", titles.length);
  await page.getByRole('link', { name: 'iPhone XR 256 Gb - Negro' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
  await expect(page.locator("//span[@class='andes-button__content'][contains(text(),'Crear cuenta')]")).toBeVisible();
  await page.screenshot({ path: "./captures/" + Date.now() + ".png" });
});
