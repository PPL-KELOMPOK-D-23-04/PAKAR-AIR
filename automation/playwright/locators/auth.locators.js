/**
 * PAKAR-AIR — Auth Locators
 *
 * Centralized locator definitions for Login and Register pages.
 * Source: LoginPage.vue, RegisterPage.vue
 */

const LoginLocators = {
  // Page
  page: '.login-page',
  card: '.login-card',

  // Header
  title: '.title',
  subtitle: '.subtitle',
  logoIcon: '.logo-icon',

  // Form
  form: '.login-form',
  emailInput: '#email',
  passwordInput: '#password',
  emailError: '.form-group:has(input[type="email"]) .error-text',
  passwordError: '.form-group:has(input[type="password"]) .error-text',
  globalError: '.error-box',
  submitButton: '.btn-login',

  // Footer
  registerLink: '.login-footer a[href="/register"]',
  backLink: '.back-link',
};

const RegisterLocators = {
  // Page
  page: '.register-root',
  card: '.register-card',

  // Header
  title: '.register-title',
  subtitle: '.register-subtitle',
  logoLink: '.logo-link',

  // Form fields
  form: '.register-form',
  fullNameInput: '#full_name',
  usernameInput: '#username',
  emailInput: '#email',
  passwordInput: '#password',
  passwordToggle: '.password-toggle',

  // Field errors
  fullNameError: '.form-group:nth-child(1) .field-error',
  usernameError: '.form-group:nth-child(2) .field-error',
  emailError: '.form-group:nth-child(3) .field-error',
  passwordError: '.form-group:nth-child(4) .field-error',

  // Global messages
  globalError: '.global-error',
  successMessage: '.global-success',
  submitButton: '.btn-submit',

  // Footer
  loginLink: '.login-link',
  backLink: '.back-link',
};

module.exports = {
  LoginLocators,
  RegisterLocators,
};
