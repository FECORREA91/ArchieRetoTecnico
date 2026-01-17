import { test, expect } from '../fixtures/test';
import { CREDENTIALS, ERROR_MESSAGES } from '../utils/constants';

test.describe('Login Functionality', () => {
  
  test('successful login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.STANDARD_USER.username, CREDENTIALS.STANDARD_USER.password);
    await loginPage.expectInventoryPage();
    
    // Validaciones adicionales
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('failed login with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Validaciones con soft assertions
    await expect.soft(loginPage.errorMessage).toBeVisible();
    await expect.soft(loginPage.errorMessage).toContainText('Username and password');
    
    const errorText = await loginPage.getErrorMessage();
    expect.soft(errorText).toMatch(/Username and password|Epic sadface/);
    
    // Validar que sigue en login page
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('locked out user cannot login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.LOCKED_USER.username, CREDENTIALS.LOCKED_USER.password);
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('empty credentials shows error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('logout functionality works', async ({ loginPage, inventoryPage, page }) => {
    // Login
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.STANDARD_USER.username, CREDENTIALS.STANDARD_USER.password);
    await loginPage.expectInventoryPage();
    
    // Logout
    await inventoryPage.logout();
    
    // Validar que volvió al login
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});