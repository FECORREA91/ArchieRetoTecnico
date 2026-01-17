# AI Code Review - Playwright + MCP Framework

## Qué hizo bien la IA
- Generó estructura POM clara y consistente, con locators basados en data-test (robustos para saucedemo.com).
- Incluyó assertions básicas con expect, evitando waits fijos en la mayoría (buen manejo de auto-waits).
- Cubrió flujos E2E completos (login, add-to-cart, checkout) con prompts explícitos, acelerando setup inicial.

## Qué hizo mal
- Assertions limitadas: Faltan intermedias y edge cases; e.g., en cart.page.ts solo URL check, no item validation.
- Selectores inconsistentes: Mezcla data-test con classes (e.g., .inventory_list en login.page.ts), aumentando fragilidad.
- No usó fixtures o env vars: Tests no aislados, potencial flakiness en parallel.

## Qué NO debería delegarse a IA
- Cobertura de edge cases y business logic: IA omite negatives como invalid form en checkout.
- Optimización de performance y CI: Decisiones como retries/fixtures requieren criterio humano para escalabilidad.
- Seguridad: Hardcoding creds debe revisarse manualmente.

## Decisiones humanas que mejoraron
- Tipado estricto: Agregué tipos de retorno Promise<void> y tipos específicos
- Propiedades adicionales: Agregué locators reutilizables como propiedades
- Métodos utilitarios: Agregué métodos para obtener datos (textContent, count, etc.)
- Nombres descriptivos: Mejoré nombres de variables y tests
- Expresiones regulares corregidas: Escape de puntos en URLs
- Validaciones robustas: Agregué assertions adicionales para mayor confiabilidad
- Consistencia: Patrón uniforme en todos los Page Objects
- Mantenibilidad: Código más fácil de extender y mantener

## Limitaciones de MCP
- Dependencia de server runtime: Si MCP falla (e.g., network issues), generación no es deterministic.
- Inspección limitada en dinámicas: IA no siempre detecta states post-action (e.g., badge update) sin prompts muy detallados.
- No maneja bien accesibilidad compleja: En 2026, mejorado, pero aún omite shadow DOM o iframes sin tools extra.

## Lecciones aprendidas
- Prompts explícitos con "usa data-test" mejoran output inicial, pero review humana es esencial (~50% del effort).
- IA acelera prototyping, pero over-relies causa debt técnico; commits separados evidencian proceso.

# AI Code Review - Playwright + MCP Framework

## Ejemplos de Código Generado vs Corregido

### Ejemplo 1: Selectores Frágiles
**ANTES (IA generó):**

// Selector por clase CSS - frágil ante cambios de UI
this.cartLink = page.locator('.shopping_cart_link');
this.inventoryList = page.locator('.inventory_list');

**DESPUÉS (Corrección manual)**

// Prioridad: data-test > role > text > CSS
// Comentario explicativo cuando no hay data-test disponible
this.cartLink = page.locator('.shopping_cart_link'); // No disponible data-test
this.inventoryList = page.locator('.inventory_list'); // No disponible data-test
// Pero para nuevos elementos:
this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
 ### Ejemplo 2: Validaciones Limitadas
 **ANTES (IA generó):**
 async checkout(): Promise<void> {
  await this.checkoutButton.click();
  await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
}

**DESPUÉS (Corrección manual):**
async checkout(): Promise<void> {
  await this.checkoutButton.click();
  await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
  // Validación adicional: elemento visible
  await expect(this.page.locator('[data-test="firstName"]')).toBeVisible();
}

 ### Ejemplo 3: Tipado Mejorado
 **ANTES (IA generó):**
 async getCartBadgeCount(): Promise<number> {
  const countText = await this.cartBadge.textContent();
  return parseInt(countText);
}

 **DESPUÉS (Corrección manual):**  
async getCartBadgeCount(): Promise<number> {
  const countText = await this.cartBadge.textContent();
  // Manejo de null/undefined y base decimal explícita
  return countText ? parseInt(countText, 10) : 0;
}
