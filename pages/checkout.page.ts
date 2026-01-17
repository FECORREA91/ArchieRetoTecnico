import { Page, Locator, expect } from '@playwright/test';

export default class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async fillAndContinue(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  async finish() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
  }
}
