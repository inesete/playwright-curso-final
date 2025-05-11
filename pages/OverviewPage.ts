
import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";
import { Locators } from "./locators/Locators";

export class OverviewPage extends BasePage {

    private readonly buttonFinish: Locator;
    private readonly buttonBackHome: Locator;
    private readonly headerComplete: Locator;
    private readonly imagePony: Locator;

    constructor(page: Page) {
        super(page);
        this.buttonFinish = page.locator(Locators.buttonFinish);
        this.buttonBackHome = page.locator(Locators.buttonBackHome);
        this.headerComplete = page.locator(Locators.headerComplete);
        this.imagePony = page.locator(Locators.imagePony);
    }

    async continuePurchase() {
        await this.expectVisible(Locators.buttonFinish);
        await this.clickOn(Locators.buttonFinish);
        await this.expectVisible(Locators.headerComplete);
        await this.expectVisible(Locators.imagePony);
        await this.expectVisible(Locators.buttonBackHome);
    }
}
