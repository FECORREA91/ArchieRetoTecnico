import { test as base } from '@playwright/test';
import LoginPage from '../pages/login.page';
import InventoryPage from '../pages/inventory.page';
import CartPage from '../pages/cart.page';
import CheckoutPage from '../pages/checkout.page';

// Tipado de fixtures personalizados
export type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

// Extender los fixtures base de Playwright
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

// Re-exportar expect para mantener consistencia
export { expect } from '@playwright/test';