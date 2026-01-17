import { test } from '@playwright/test';
import LoginPage from '../pages/login.page';
import InventoryPage from '../pages/inventory.page';
import CartPage from '../pages/cart.page';
import CheckoutPage from '../pages/checkout.page';

test('complete checkout flow for standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectInventoryPage();

  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();
  
  await cartPage.assertCartHasItems(1);
  await cartPage.checkout();
  
  await checkoutPage.fillAndContinue('John', 'Doe', '12345');
  await checkoutPage.finish();
});