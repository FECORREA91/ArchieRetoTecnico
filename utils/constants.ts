/**
 * Constantes para los tests
 */

export const CREDENTIALS = {
  STANDARD_USER: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  LOCKED_USER: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  PROBLEM_USER: {
    username: 'problem_user',
    password: 'secret_sauce'
  },
  PERFORMANCE_USER: {
    username: 'performance_glitch_user',
    password: 'secret_sauce'
  }
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  LOCKED_USER: 'Epic sadface: Sorry, this user has been locked out',
  REQUIRED_FIELD: (field: string) => `${field} is required`
};

export const URLs = {
  BASE: 'https://www.saucedemo.com',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html'
};

export const PRODUCTS = {
  BACKPACK: {
    name: 'Sauce Labs Backpack',
    dataTest: 'sauce-labs-backpack',
    price: '$29.99'
  },
  BIKE_LIGHT: {
    name: 'Sauce Labs Bike Light',
    dataTest: 'sauce-labs-bike-light',
    price: '$9.99'
  }
};