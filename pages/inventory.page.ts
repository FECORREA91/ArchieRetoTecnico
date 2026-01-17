import { Page, Locator, expect } from '@playwright/test';

export default class InventoryPage {
  readonly page: Page;
  readonly addBackpackButton: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryList: Locator;
  readonly sortDropdown: Locator;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // SELECTORES CORREGIDOS: Prioridad data-test
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // NOTE: No hay data-test para estos elementos, usar clases con comentario explicativo
    this.cartLink = page.locator('.shopping_cart_link'); // No disponible data-test
    this.cartBadge = page.locator('.shopping_cart_badge'); // No disponible data-test
    this.inventoryList = page.locator('.inventory_list'); // No disponible data-test
    
    // Nuevos elementos para mejor cobertura
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }

  async addBackpackToCart(): Promise<void> {
    await this.addBackpackButton.click();
    // Validación mejorada
    await expect(this.page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(this.cartBadge).toHaveText('1');
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/.*cart\.html/);
  }

  async getCartBadgeCount(): Promise<number> {
    const countText = await this.cartBadge.textContent();
    return countText ? parseInt(countText, 10) : 0;
  }

  // Nuevos métodos para mejor cobertura
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/.+\/?$/); // Volver al login
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator('.inventory_item').count();
  }

  async addProductByName(productName: string): Promise<void> {
    const productItem = this.page.locator('.inventory_item', { 
      has: this.page.locator('.inventory_item_name', { hasText: productName }) 
    });
    await productItem.locator('button').click();
  }
}