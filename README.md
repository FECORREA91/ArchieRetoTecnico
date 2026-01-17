# 🧪 Playwright E2E Framework — Senior QA Test

Framework de automatización **End-to-End (E2E)** diseñado para demostrar **criterio Senior QA**, buenas prácticas en **Playwright + TypeScript** y un **uso responsable de IA** (colaboración Humano–IA), con evidencia clara de revisión y mejora humana.

---

## 🎯 Objetivo

Construir un framework E2E profesional que evidencie:

* ✅ Automatización moderna con **Playwright + TypeScript**
* ✅ Uso de **MCP (Model Context Protocol)** para generación asistida
* ✅ **GitHub Copilot** como copiloto técnico
* ✅ **Revisión crítica** del código generado por IA
* ✅ **Arquitectura mantenible** alineada a estándares Senior QA

Este proyecto **no busca reemplazar al QA**, sino demostrar cómo la IA **acelera** el trabajo cuando existe criterio técnico y validación humana.

---

## 🚀 Setup Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Instalar browsers
npx playwright install

# 3. Ejecutar tests (headless)
npm test

# 4. Ejecutar tests con UI
npm run test:headed
```

---

## 📁 Estructura del Proyecto

```text
├── tests/            # Especificaciones de test (E2E)
├── pages/            # Page Object Model (POM)
├── fixtures/         # Fixtures personalizados y reutilizables
├── utils/            # Helpers, constantes y utilidades
├── prompts/          # Prompts utilizados por IA (MCP)
├── docs/             # Documentación técnica y evidencia
└── playwright.config.ts
```

La estructura está pensada para **escalabilidad, mantenibilidad y lectura clara**, evitando lógica duplicada y favoreciendo la reutilización.

---

## 🤖 Integración con IA (Humano + IA)

### Evidencia de Uso

* **Editor:** VS Code + GitHub Copilot
* **MCP:** Playwright Model Context Protocol (`npm run mcp`)
* **Prompts:** 3 prompts explícitos y versionados en `/prompts/`

### Proceso Documentado

1. **Generación asistida por IA**

   * Page Objects base
   * Tests iniciales

2. **Revisión manual (humana)**

   * Corrección de selectores
   * Mejora de tipado TypeScript
   * Aserciones más robustas

3. **Mejoras Senior QA**

   * Fixtures reutilizables
   * Utils compartidos
   * Manejo de edge cases
   * Documentación técnica

📄 Ver proceso completo en: `docs/DEVELOPMENT_PROCESS.md`

---

## 🧪 Flujos Automatizados

### 1️⃣ Login

* Credenciales válidas
* Credenciales inválidas
* Usuario bloqueado
* Campos vacíos
* Logout

### 2️⃣ Checkout E2E

* Agregar producto → Carrito → Checkout → Confirmación
* Validación de formulario
* Múltiples productos

### 3️⃣ Validaciones Específicas

* Títulos y mensajes de error
* Soft assertions
* Validaciones de UI críticas

---

## ⚙️ Configuración Técnica

### 🌐 Multi-Browser Testing

```ts
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

### ⏱️ Timeouts Profesionales

* **Global:** 30s
* **Assertions:** 5s
* **Actions:** 10s

Configuración alineada a entornos reales de CI/CD.

---

## 📊 Code Review Crítico (IA vs Humano)

📄 Documentado en: `docs/ai-review.md`

### ✅ Buenas prácticas generadas por IA

* Estructura inicial POM
* Uso correcto de auto-waits de Playwright
* Selectores básicos con `data-test`

### ❌ Problemas detectados en código IA

* Selectores inconsistentes
* Aserciones débiles o incompletas
* Falta de tipado estricto

### 🔧 Correcciones Humanas

* Tipado estricto en Page Objects
* Fixtures reutilizables
* Manejo de edge cases
* Comentarios técnicos con contexto

#### Ejemplo

```ts
// ANTES (IA) – Selector frágil
this.cartLink = page.locator('.shopping_cart_link');

// DESPUÉS (Humano) – Decisión documentada
this.cartLink = page.locator('.shopping_cart_link'); // No existe data-test disponible
```

---

## 📈 Criterios Cumplidos

| Criterio           | Estado | Evidencia                            |
| ------------------ | ------ | ------------------------------------ |
| Arquitectura       | ✅      | Fixtures, utils, separación clara    |
| Playwright         | ✅      | Config multi-browser, best practices |
| MCP                | ✅      | Scripts, prompts, evidencia de uso   |
| Prompt Engineering | ✅      | 3 prompts explícitos y versionados   |
| Code Review        | ✅      | Análisis crítico con ejemplos        |
| Documentación      | ✅      | README, ai-review.md, process doc    |

---

## 🚫 Errores Eliminatorios Evitados

* ✅ Tests **NO** generados 100% por IA sin revisión
* ✅ Uso de **MCP claramente evidenciado**
* ✅ Documentación de errores y límites de la IA
* ✅ Framework con estructura profesional
* ✅ Prompts **específicos** (no genéricos)

---

## 🧠 Conclusión

Este proyecto demuestra que la **IA es una herramienta**, no un reemplazo.
El valor real está en el **criterio del QA**, la **revisión técnica** y la **capacidad de decisión**.

> *Automatizar no es escribir tests: es diseñar calidad.*
