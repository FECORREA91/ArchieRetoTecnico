import { test, expect } from '../fixtures/test';
import { CREDENTIALS, PRODUCTS } from '../utils/constants';
import { takeScreenshot } from '../utils/helpers';

test.describe('Checkout Flow - E2E', () => {
  
  test('complete checkout flow for standard user', async ({ 
    loginPage, 
    inventoryPage, 
    cartPage, 
    checkoutPage,
    page 
  }) => {
    // Arrange
    const user = CREDENTIALS.STANDARD_USER;
    const product = PRODUCTS.BACKPACK;
    
    // Act & Assert - Paso a paso con validaciones
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await loginPage.expectInventoryPage();
    
    // Validar que estamos en inventory
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    // Agregar producto
    await inventoryPage.addBackpackToCart();
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
    
    // Ir al carrito
    await inventoryPage.goToCart();
    await cartPage.assertCartHasItems(1);
    
    // Checkout
    await cartPage.checkout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    
    // Llenar formulario
    await checkoutPage.fillAndContinue('John', 'Doe', '12345');
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    
    // Validar resumen antes de finalizar
    const summaryText = await checkoutPage.getSummaryInfo();
    expect(summaryText).toContain('SauceCard');
    expect(summaryText).toContain('Shipping');
    
    // Finalizar compra
    await checkoutPage.finish();
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    
    // Screenshot de evidencia
    await takeScreenshot(page, 'checkout-complete');
  });

  test('checkout with empty fields should show error', async ({ 
    loginPage, 
    inventoryPage, 
    cartPage,
    page 
  }) => {
    // Setup
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.STANDARD_USER.username, CREDENTIALS.STANDARD_USER.password);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    await cartPage.checkout();
    
    // Intentar continuar sin datos
    await page.locator('[data-test="continue"]').click();
    
    // Validar error
    const errorElement = page.locator('[data-test="error"]');
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText('First Name is required');
    
    await takeScreenshot(page, 'checkout-error-empty-fields');
  });

  test('checkout with multiple products', async ({ 
    loginPage, 
    inventoryPage, 
    cartPage,
    checkoutPage,
    page 
  }) => {
    // Setup
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.STANDARD_USER.username, CREDENTIALS.STANDARD_USER.password);
    
    // Agregar múltiples productos
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addProductByName('Sauce Labs Bike Light');
    
    // Verificar badge
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe(2);
    
    // Continuar flujo
    await inventoryPage.goToCart();
    await cartPage.assertCartHasItems(2);
    await cartPage.checkout();
    
    // Completar checkout
    await checkoutPage.fillAndContinue('Test', 'User', '54321');
    await checkoutPage.finish();
    
    await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
  });
});