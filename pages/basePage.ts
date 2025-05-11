import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async loadWeb(url: string) {
        await this.page.goto(url);
    }

    async clickOn(selector: string) {
        await this.page.locator(selector).click();
    }

    async clickOnRandom(locator: Locator) {
        await locator.getByRole('button', { name: 'Add to cart' }).click();
    }

    async fillField(selector: string, value: string) {
        await this.page.locator(selector).fill(value);
    }

    async expectVisible(selector: string) {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async expectSameText(actual: string, expected: string) {
        await expect(actual).toEqual(expected);
    }
}