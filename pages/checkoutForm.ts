import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { Locators } from './locators/locators';

export class CheckoutForm extends BasePage {

    private readonly inputFirstName: Locator;
    private readonly inputLastName: Locator;
    private readonly inputZipCode: Locator;
    private readonly buttonCancelPurchase: Locator;
    private readonly buttonContinuePurchase: Locator;

    constructor(page: Page) {
        super(page);
        this.inputFirstName = page.locator(Locators.inputFirstName);
        this.inputLastName = page.locator(Locators.inputLastName);
        this.inputZipCode = page.locator(Locators.inputZipCode);
        this.buttonCancelPurchase = page.locator(Locators.buttonCancelPurchase);
        this.buttonContinuePurchase = page.locator(Locators.buttonContinuePurchase);
    }

    async fillPersonalData() {
        await this.fillField(Locators.inputFirstName, "first name test");
        await this.fillField(Locators.inputLastName, "last name test");
        await this.fillField(Locators.inputZipCode, "zip code test");
        await this.expectVisible(Locators.buttonCancelPurchase);
        await this.expectVisible(Locators.buttonContinuePurchase);
        await this.clickOn(Locators.buttonContinuePurchase);
    }

}