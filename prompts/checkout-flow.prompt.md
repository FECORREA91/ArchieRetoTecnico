Genera un test E2E para checkout en saucedemo.com.
- Login con standard_user / secret_sauce.
- Agrega un item al cart (usa data-test="add-to-cart-sauce-labs-backpack").
- Ve al cart y checkout.
- Llena form y finaliza.
- Assert éxito.
Evita waits fijos, usa expect.