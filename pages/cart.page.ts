import { Page, Locator, expect } from '@playwright/test';

export default class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
  }

  async assertCartHasItems(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}