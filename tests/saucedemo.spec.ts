import { test, expect } from '@playwright/test';
import { equal } from 'assert';

test('purchase an item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    //Funciona exactamente igual con Xpath o con getByRole
    //await page.locator('#user-name').fill("standard_user");
    await page.getByRole('textbox', { name: 'Username' }).fill("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();
    await expect(page).toHaveTitle(/Swag Labs/);
    //await page.locator("//div[@class='inventory_item']").first().click();
    //Misma forma con css
    await page.locator("#inventory_container .inventory_item").first().click();

    const items = await page.locator("#inventory_container .inventory_item").all();
    const randomIndex = Math.floor(Math.random() * items.length)
    const randomItem = items[randomIndex];

    const expectedName = await randomItem.locator(" .inventory_item_name").innerText();
    const expectedDescription = await randomItem.locator(" .inventory_item_desc").innerText();
    const expectedPrice = await randomItem.locator(" .inventory_item_price").innerText();


    //console.log("El elemento es: ", expectedName, " con Description: ", expectedDescription, " y precio: ", expectedPrice);
    console.log(`Price: ${expectedPrice} - Name: ${expectedName} - Description: ${expectedDescription}`);
    await randomItem.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator("//span[@data-test='shopping-cart-badge']")).toBeVisible();
    await page.locator("//span[@data-test='shopping-cart-badge']").click();

    const cartElementName = await page.locator("#cart_contents_container .cart_list .cart_item .cart_item_label .inventory_item_name").innerText();
    const cartElementDescription = await page.locator("#cart_contents_container .cart_list .cart_item .cart_item_label .inventory_item_desc").innerText();
    const cartElementPrice = await page.locator("#cart_contents_container .cart_list .cart_item .cart_item_label .inventory_item_price").innerText();


    expect(cartElementName).toEqual(expectedName);
    expect(cartElementDescription).toEqual(expectedDescription);
    expect(cartElementPrice).toEqual(expectedPrice);


    await page.screenshot({ path: "./captures/" + Date.now() + ".png" });
});