import { test, expect } from '../fixtures/test';

test('page title is Swag Labs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle('Swag Labs');
});

test('shows error on invalid login with multiple validations', async ({ 
  loginPage, 
  page 
}) => {
  await loginPage.goto();
  await loginPage.login('invalid_user', 'wrong_password');
  
  await expect.soft(page).toHaveTitle('Swag Labs');
  await expect.soft(loginPage.errorMessage).toBeVisible();
  await expect.soft(loginPage.errorMessage).toContainText('Username and password');
  
  const errorText = await loginPage.getErrorMessage();
  expect.soft(errorText).toMatch(/Username and password|Epic sadface/);
});