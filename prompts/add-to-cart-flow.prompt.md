# Prompt para generar flujo "Add to Cart" en saucedemo.com usando Playwright MCP

**Objetivo**: Genera código TypeScript para automatizar el flujo de agregar uno o más productos al carrito en https://www.saucedemo.com, siguiendo el patrón Page Object Model (POM).

**Instrucciones obligatorias para la IA (usa MCP activamente)**:
1. **Primero inicia sesión** automáticamente usando credenciales válidas:
   - Username: standard_user
   - Password: secret_sauce
   (puedes reutilizar o copiar lógica de LoginPage si ya existe en el proyecto)

2. **Usa MCP para inspeccionar la página real**:
   - Navega a https://www.saucedemo.com/inventory.html (después del login)
   - Inspecciona visualmente y con accesibilidad los elementos clave:
     - Botones "Add to cart" → deben usar selectores data-test exactos, por ejemplo:
       - data-test="add-to-cart-sauce-labs-backpack"
       - data-test="add-to-cart-sauce-labs-bike-light"
       - data-test="add-to-cart-sauce-labs-bolt-t-shirt"
       - etc. (elige al menos 2–3 productos representativos)
     - Ícono del carrito (shopping cart) → usualmente data-test="shopping-cart-link"
     - Badge del carrito (número de items) → data-test="shopping-cart-badge" o similar
   - Confirma que después de agregar un item:
     - El botón cambia a "Remove" (data-test="remove-...")
     - El badge del carrito muestra "1" (o el conteo correcto)

3. **Genera los siguientes archivos/componentes**:
   - **pages/inventory.page.ts** (o home.page.ts) — Page Object para la página de productos (inventory)
     Métodos sugeridos:
     - addProductToCart(productName: string)  // o por data-test específico
     - addSpecificProduct(dataTest: string)
     - getCartBadgeCount() → retorna el número visible en el badge
     - navigateToCart()
     - assertProductAdded(productName: string)  // verifica que el botón cambió a Remove

   - **pages/cart.page.ts** (opcional pero recomendado si vas a extender después)
     - Métodos básicos: assertItemInCart(productName: string)

   - **tests/add-to-cart.spec.ts** — Test E2E completo
     - Inicia sesión
     - Agrega al menos 2 productos (ej: Backpack y Bike Light)
     - Verifica que el badge del carrito muestre "2"
     - Opcional: navega al carrito y verifica que los items estén allí
     - Usa expect() para assertions fuertes
     - Evita waits fijos (waitForTimeout); usa auto-waits y expect.toBeVisible()

**Reglas de buenas prácticas que DEBES seguir**:
- Usa selectores data-test SIEMPRE que existan (son los más robustos en esta app)
- No uses selectores frágiles como por texto completo o XPath largo
- Maneja timeouts razonables (ej: expect timeout 5–10s)
- Código limpio, tipado en TypeScript
- Usa test.describe() si generas múltiples tests
- Importa { test, expect } from '@playwright/test'
- Si reutilizas LoginPage, impórtalo correctamente desde '../pages/login.page'

**Salida esperada**:
- Código completo para los archivos mencionados
- Comentarios explicando cada parte importante
- Sugerencia de cómo ejecutarlo: npx playwright test tests/add-to-cart.spec.ts

¡Ejecuta MCP ahora para inspeccionar la página inventory y generar localizadores precisos!