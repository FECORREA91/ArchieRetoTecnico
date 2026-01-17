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