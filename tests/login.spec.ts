import { test } from '@playwright/test';
import LoginPage from '../pages/login.page';

test('login flow - valid user', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
  await login.expectInventoryPage();
});
