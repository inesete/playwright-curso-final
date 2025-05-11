
import { Locator, Page } from "playwright";
import { BasePage } from "./basePage";
import { Locators } from "./locators/locators";

export class FinishPage extends BasePage {

    private readonly headerComplete: Locator;
    private readonly imagePony: Locator;
    private readonly buttonBackHome: Locator;
    private readonly inventoryContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryContainer = page.locator(Locators.inventoryContainer);
        this.headerComplete = page.locator(Locators.headerComplete);
        this.imagePony = page.locator(Locators.imagePony);
        this.buttonBackHome = page.locator(Locators.buttonBackHome);
    }

    async finishOK() {
        await this.clickOn(Locators.buttonBackHome);
        await this.expectVisible(Locators.badgeIconPrincipalPage);
    }
}