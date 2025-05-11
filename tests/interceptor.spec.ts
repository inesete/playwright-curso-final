import { test } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginForm } from '../pages/loginForm';

//test bien estructurado

test.describe("Test Suite: Interceptor Scenarios", async () => {
    test('Interceptor para evitar cargar imagenes', async ({ page }) => {

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


    test('Interceptor Test mas refinado', async ({ page }) => {

        //Aqui en vez de decir a lo burro que no se me muestren imagenes, vamos a acceder a una request y la vams a modificar
        //para que solo me muestre un libro en vez de la lista de libros , cojo su request: https://demoqa.com/BookStore/v1/Books

        await page.route(
            "https://demoqa.com/BookStore/v1/Books",
            (route) => route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `
                {
                    "books": [
                        {
                            "isbn": "9781449325862",
                            "title": "El I Ching de Ines",
                            "subTitle": "A Working Introduction",
                            "author": "Richard E. Silverman",
                            "publish_date": "2020-06-04T08:48:39.000Z",
                            "publisher": "O'Reilly Media",
                            "pages": 156,
                            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                        }
                    ]
                }
                `
            })
        );

        await page.goto("https://demoqa.com/books");
    });
});