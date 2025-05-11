import { test } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { CheckoutForm } from '../pages/checkoutForm';
import { LoginForm } from '../pages/loginForm';
import { ItemsPage } from '../pages/itemsPage';
import { FinishPage } from '../pages/finishPage';
import { OverviewPage } from '../pages/overviewPage';

//test bien estructurado

test.describe("Test Suite: Buy some items in Saucedemo page", async () => {
    test('User goes shopping', async ({ page }) => {
        const base = new BasePage(page);
        const login = new LoginForm(page);
        await test.step("User logins", async ({ }) => {
            await base.loadWeb("https://www.saucedemo.com/");
            await login.login();
        })
        await test.step("User selects item", async ({ }) => {
            const items = new ItemsPage(page);
            await items.selectRandomItem();
        })
        await test.step("User fills personal information", async ({ }) => {
            const checkoutForm = new CheckoutForm(page);
            await checkoutForm.fillPersonalData();
        })
        await test.step("User checks overview info", async ({ }) => {
            const overview = new OverviewPage(page);
            await overview.continuePurchase();
        })
        await test.step("User finish purchase OK", async ({ }) => {
            const finish = new FinishPage(page);
            await finish.finishOK();
        })
    });
})


//test sin estructura


test('User buy some items in Saucedemo page no report', async ({ page }) => {
    const base = new BasePage(page);
    const login = new LoginForm(page);
    const items = new ItemsPage(page);
    const overview = new OverviewPage(page);
    const finish = new FinishPage(page);
    const checkoutForm = new CheckoutForm(page);
    await base.loadWeb("https://www.saucedemo.com/");
    await login.login();
    await items.selectRandomItem();
    await checkoutForm.fillPersonalData();
    await overview.continuePurchase();
    await finish.finishOK();
});