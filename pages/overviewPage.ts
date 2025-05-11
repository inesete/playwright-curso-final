
import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";
import { Locators } from "./locators/Locators";

export class OverviewPage extends BasePage {

    private readonly buttonCancel: Locator;
    private readonly buttonFinish: Locator;
    private readonly buttonBackHome: Locator;

    constructor(page: Page) {
        super(page);
        this.buttonCancel = page.locator(Locators.buttonCancel);
        this.buttonFinish = page.locator(Locators.buttonFinish);
        this.buttonFinish = page.locator(Locators.buttonBackHome);
    }

    async continuePurchase() {
        await this.expectVisible(Locators.buttonCancel);
        await this.expectVisible(Locators.buttonFinish);
        await this.clickOn(Locators.buttonFinish);
        await this.expectVisible(Locators.headerComplete);
        await this.expectVisible(Locators.imagePony);
        await this.expectVisible(Locators.buttonBackHome);
    }
}