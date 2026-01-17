import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';

test('page title is Swag Labs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle('Swag Labs');
});

test('shows error on invalid login (soft assertions)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();

  // Attempt login with invalid credentials
  await login.login('invalid_user', 'wrong_password');

  const error = page.locator('[data-test="error"]');

  // Use soft assertions so we can report multiple failures together
  await expect.soft(page).toHaveTitle('Swag Labs');
  await expect.soft(error).toBeVisible();
  await expect.soft(error).toContainText('Username and password');
});
