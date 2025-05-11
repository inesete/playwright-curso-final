
import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";
import { Locators } from "./locators/Locators";

export class FinishPage extends BasePage {

    private readonly badgeIconPrincipalPage: Locator;
    private readonly buttonBackHome: Locator;


    constructor(page: Page) {
        super(page);
        this.buttonBackHome = page.locator(Locators.buttonBackHome);
        this.badgeIconPrincipalPage = page.locator(Locators.badgeIconPrincipalPage);
    }

    async finishOK() {
        await this.clickOn(Locators.buttonBackHome);
        await this.expectVisible(Locators.badgeIconPrincipalPage);
    }
}