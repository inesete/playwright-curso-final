import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginForm } from '../pages/loginForm';

//test bien estructurado

test.describe("Test Suite: Buy some items in Saucedemo page", async () => {
    test('User goes shopping', async ({ page }) => {

        page.on("request", req => {
            console.log(req.url());
        })


        //lo podemos hacer una por una:

        await page.route("https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg",
            route => route.abort()
        )
        await page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg",
            route => route.abort()
        )



        //o con expresiones regulares:
        await page.route("**/*.{png,svg,jpg,jpeg}",
            (route) => route.abort()
        );


        const base = new BasePage(page);
        const login = new LoginForm(page);
        await test.step("User logins", async ({ }) => {
            await base.loadWeb("https://www.saucedemo.com/");
            await login.login();
            await page.screenshot({ path: "./captures/" + Date.now() + ".png", fullPage: true });
        })
    });
});