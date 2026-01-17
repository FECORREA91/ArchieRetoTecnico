import { Page, Locator, expect } from '@playwright/test';

export default class InventoryPage {
  readonly page: Page;
  readonly addBackpackButton: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
    // assert the button changed to "Remove" or the cart badge increased
    const removeButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeButton).toBeVisible();
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/.*cart.html/);
  }
}
