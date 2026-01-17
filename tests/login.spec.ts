import { test } from '@playwright/test';
import LoginPage from '../pages/login.page';

test('successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectInventoryPage();
});