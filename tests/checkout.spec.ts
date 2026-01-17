import { test } from '@playwright/test';
import LoginPage from '../pages/login.page';
import InventoryPage from '../pages/inventory.page';
import CartPage from '../pages/cart.page';
import CheckoutPage from '../pages/checkout.page';

test('checkout flow - standard user', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await inventory.addBackpackToCart();
  await inventory.goToCart();

  await cart.checkout();

  await checkout.fillAndContinue('John', 'Doe', '12345');
  await checkout.finish();
});
