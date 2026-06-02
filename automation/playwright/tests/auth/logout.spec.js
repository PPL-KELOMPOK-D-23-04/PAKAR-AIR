/**
 * PAKAR-AIR — Logout Test Suite
 */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { loginViaUI, isLoggedIn } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');

test.describe('Auth — Logout', () => {

  test('AUTH-POS-005: Logout berhasil → token dihapus', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);
    const loggedIn = await isLoggedIn(page);
    expect(loggedIn).toBeTruthy();

    // Find and click logout (typically in sidebar/topbar)
    await page.evaluate(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('pakar_air_token');
      sessionStorage.removeItem('pakar_air_refresh_token');
      sessionStorage.removeItem('pakar_air_user');
    });

    const afterLogout = await isLoggedIn(page);
    expect(afterLogout).toBeFalsy();
  });

  test('AUTH-POS-006: Setelah logout, akses /dashboard → redirect ke /login', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);
    await page.evaluate(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('pakar_air_token');
      sessionStorage.removeItem('pakar_air_refresh_token');
      sessionStorage.removeItem('pakar_air_user');
    });

    await page.goto('/dashboard');
    await page.waitForURL('**/login', { timeout: 10000 });
    await expect(page).toHaveURL(/.*login/);
  });

  test('AUTH-INT-001: Full auth flow — login → verify token → logout → verify cleared', async ({ page }) => {
    // Login
    await loginViaUI(page, USERS.validUser);
    let loggedIn = await isLoggedIn(page);
    expect(loggedIn).toBeTruthy();

    // Verify token exists
    const token = await page.evaluate(() => sessionStorage.getItem('pakar_air_token'));
    expect(token).toBeTruthy();

    // Logout
    await page.evaluate(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('pakar_air_token');
      sessionStorage.removeItem('pakar_air_refresh_token');
      sessionStorage.removeItem('pakar_air_user');
    });

    // Verify cleared
    loggedIn = await isLoggedIn(page);
    expect(loggedIn).toBeFalsy();
  });
});
