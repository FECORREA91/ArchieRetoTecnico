# AI Code Review - Playwright + MCP

## Qué hizo bien la IA
- Usó correctamente data-test selectors en saucedemo (muy robustos).
- Generó POM limpio y reutilizable.
- Intentó assertions básicas con expect.

## Qué hizo mal
- Insertó waits fijos (waitForTimeout) → causa flakiness en CI.
- Algunos selectores por clase o texto en lugar de data-test.
- No siempre verificó URL después de acciones.
- Naming inconsistente (ej: "cartCount" vs "getCartItemCount").

## Qué NO delegar nunca a IA
- Decidir qué assertions son críticas para negocio.
- Manejar edge cases reales (locked_out_user, performance).
- Optimizaciones de paralelismo/retries.

## Decisiones humanas que mejoraron


## Limitaciones actuales de MCP (2026)

## Lecciones aprendidas
