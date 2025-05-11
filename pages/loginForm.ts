import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Locators } from './locators/Locators';

export class LoginForm extends BasePage {

    private readonly inputLogin: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonLogin: Locator;

    constructor(page: Page) {
        super(page);
        this.inputLogin = page.locator(Locators.inputLogin);
        this.inputPassword = page.locator(Locators.inputPassword);
        this.buttonLogin = page.locator(Locators.buttonLogin);
    }

    async login() {
        await this.fillField(Locators.inputLogin, "standard_user");
        await this.fillField(Locators.inputPassword, "secret_sauce");
        await this.clickOn(Locators.buttonLogin);
        await this.expectVisible(Locators.badgeIconPrincipalPage);
    }

}