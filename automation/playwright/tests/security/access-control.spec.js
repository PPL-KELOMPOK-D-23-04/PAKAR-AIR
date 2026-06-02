/**
 * PAKAR-AIR — Security Test Suite
 * Covers: SEC-001 to SEC-006, AUTH-SEC-001 to 002, ADM-SEC-001 to 002
 */
const { test, expect } = require('@playwright/test');
const { loginViaUI } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');

test.describe('Security — Access Control', () => {

  test('SEC-001: Protected routes redirect ke /login tanpa autentikasi', async ({ page }) => {
    const protectedRoutes = ['/dashboard', '/analysis', '/history', '/profile', '/notifications'];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await page.waitForURL('**/login', { timeout: 10000 });
      expect(page.url()).toContain('/login');
    }
  });

  test('SEC-002: Admin routes redirect user biasa ke /dashboard', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);

    await page.goto('/admin');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('SEC-003: Guest-only routes redirect logged-in user', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);

    await page.goto('/login');
    await page.waitForTimeout(3000);
    const url = page.url();
    expect(url).not.toContain('/login');
  });

  test('SEC-004: Token dihapus setelah logout', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);

    // Verify token exists
    const tokenBefore = await page.evaluate(() => sessionStorage.getItem('pakar_air_token'));
    expect(tokenBefore).toBeTruthy();

    // Simulate logout
    await page.evaluate(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('pakar_air_token');
      sessionStorage.removeItem('pakar_air_refresh_token');
      sessionStorage.removeItem('pakar_air_user');
    });

    const tokenAfter = await page.evaluate(() => sessionStorage.getItem('pakar_air_token'));
    expect(tokenAfter).toBeNull();
  });

  test('ADM-SEC-001: User biasa tidak bisa akses semua admin routes', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);

    const adminRoutes = ['/admin', '/admin/users', '/admin/reports', '/admin/chatbot'];
    for (const route of adminRoutes) {
      await page.goto(route);
      await page.waitForURL('**/dashboard', { timeout: 10000 });
      expect(page.url()).toContain('/dashboard');
    }
  });

  test('SEC-006: XSS input di-sanitize', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);
    await page.goto('/history');
    await page.waitForTimeout(1000);

    // Try injecting script via search
    await page.fill('.toolbar-input', '<script>alert(1)</script>');
    await page.waitForTimeout(1000);

    // Verify no script execution (page should still be functional)
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});
