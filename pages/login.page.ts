import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com');
    await expect(this.page).toHaveURL(/.*saucedemo.com\/?$/);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectInventoryPage() {
    // inventory page URL ends with /inventory.html
    await expect(this.page).toHaveURL(/.*inventory.html/);
    // assert that the inventory container is visible
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }
}
