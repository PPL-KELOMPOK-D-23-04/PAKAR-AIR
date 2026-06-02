/**
 * PAKAR-AIR — Auth Fixture
 * Provides pre-authenticated page context for tests
 */
const { test: base } = require('@playwright/test');
const { loginViaUI } = require('../helpers/auth.helper');
const { USERS } = require('../data/users.data');

/**
 * Extended test with authenticated user fixtures
 */
const test = base.extend({
  /** Page with regular user logged in */
  authenticatedPage: async ({ page }, use) => {
    await loginViaUI(page, USERS.validUser);
    await use(page);
  },

  /** Page with admin user logged in */
  adminPage: async ({ page }, use) => {
    await loginViaUI(page, USERS.adminUser);
    await use(page);
  },
});

module.exports = { test };
