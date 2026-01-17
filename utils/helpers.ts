/**
 * Utilidades para tests E2E
 */

import { Page, Locator } from '@playwright/test';

/**
 * Espera a que la red esté inactiva
 */
export const waitForNetworkIdle = async (page: Page, timeout = 10000): Promise<void> => {
  try {
    await page.waitForLoadState('networkidle', { timeout });
  } catch (error) {
    console.warn('Network idle timeout, continuing anyway...');
  }
};

/**
 * Toma screenshot con nombre descriptivo
 */
export const takeScreenshot = async (page: Page, testName: string): Promise<void> => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = `test-results/screenshots/${testName}-${timestamp}.png`;
  
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: true 
  });
};

/**
 * Valida que un elemento contenga texto (case insensitive)
 */
export const expectToContainText = async (
  locator: Locator, 
  expectedText: string
): Promise<void> => {
  const actualText = await locator.textContent();
  expect(actualText?.toLowerCase()).toContain(expectedText.toLowerCase());
};

/**
 * Obtiene datos de prueba aleatorios
 */
export const TestData = {
  getRandomFirstName(): string {
    const names = ['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah'];
    return names[Math.floor(Math.random() * names.length)];
  },
  
  getRandomLastName(): string {
    const names = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    return names[Math.floor(Math.random() * names.length)];
  },
  
  getRandomPostalCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }
};

/**
 * Retry con backoff exponencial para operaciones flaky
 */
export const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries reached');
};