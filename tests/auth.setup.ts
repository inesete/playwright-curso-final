import { test as setup, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginForm } from '../pages/loginForm';


const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    const base = new BasePage(page);
    const login = new LoginForm(page);
    await base.loadWeb("https://www.saucedemo.com/");
    await login.login();

    await page.context().storageState({ path: authFile })
});