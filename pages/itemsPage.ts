import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";
import { Locators } from "./locators/Locators";

export class ItemsPage extends BasePage {

    private readonly inventoryContainer: Locator;
    private readonly itemName: Locator;
    private readonly itemDescription: Locator;
    private readonly itemPrice: Locator;
    private readonly badgeIcon: Locator;
    private readonly badgeIconPrincipalPage: Locator;
    private readonly buttonContinueShopping: Locator;
    private readonly buttonCheckout: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryContainer = page.locator(Locators.inventoryContainer);
        this.itemName = page.locator(Locators.itemName);
        this.itemDescription = page.locator(Locators.itemDescription);
        this.itemPrice = page.locator(Locators.itemPrice);
        this.badgeIcon = page.locator(Locators.badgeIcon);
        this.badgeIconPrincipalPage = page.locator(Locators.badgeIconPrincipalPage);
        this.buttonContinueShopping = page.locator(Locators.buttonContinueShopping);
        this.buttonCheckout = page.locator(Locators.buttonCheckout);
    }

    async selectRandomItem() {
        const items = await this.page.locator("#inventory_container .inventory_item").all();
        const randomIndex = Math.floor(Math.random() * items.length)
        const randomItem = items[randomIndex];
        const expectedName = await randomItem.locator(Locators.itemName).innerText();
        const expectedDescription = await randomItem.locator(Locators.itemDescription).innerText();
        const expectedPrice = await randomItem.locator(Locators.itemPrice).innerText();

        console.log(`Price: ${expectedPrice} - Name: ${expectedName} - Description: ${expectedDescription}`);

        await this.clickOnRandom(randomItem);
        await this.expectVisible(Locators.badgeIcon);
        await this.clickOn(Locators.badgeIcon);

        const cartElementName = await this.page.locator(Locators.itemName).innerText();
        const cartElementDescription = await this.page.locator(Locators.itemDescription).innerText();
        const cartElementPrice = await this.page.locator(Locators.itemPrice).innerText();

        this.expectSameText(cartElementName, expectedName);
        this.expectSameText(cartElementDescription, expectedDescription);
        this.expectSameText(cartElementPrice, expectedPrice);

        await this.expectVisible(Locators.buttonContinueShopping);
        await this.expectVisible(Locators.buttonCheckout);

        this.clickOn(Locators.buttonCheckout);
    }
}