/**
 * PAKAR-AIR — E2E Admin Journey
 * Covers: E2E-002
 *
 * Login Admin → Dashboard → User Management → Reports → Chatbot → Logout
 */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AdminDashboardPage } = require('../../pages/AdminDashboardPage');
const { USERS } = require('../../data/users.data');

test.describe('E2E — Admin Journey', () => {

  test('E2E-002: Complete admin journey', async ({ page }) => {
    // Step 1: Login as Admin
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.adminUser.email, USERS.adminUser.password);
    await page.waitForURL('**/admin', { timeout: 15000 });

    // Step 2: Verify Dashboard
    const adminPage = new AdminDashboardPage(page);
    const title = await adminPage.getPageTitle();
    expect(title).toContain('Dashboard');
    await page.screenshot({ path: 'screenshots/e2e-admin-dashboard.png' });

    // Step 3: Navigate to User Management
    await page.goto('/admin/users');
    await page.waitForTimeout(2000);
    expect(page.url()).toContain('/admin/users');
    await page.screenshot({ path: 'screenshots/e2e-admin-users.png' });

    // Step 4: Navigate to Reports
    await page.goto('/admin/reports');
    await page.waitForTimeout(2000);
    expect(page.url()).toContain('/admin/reports');
    await page.screenshot({ path: 'screenshots/e2e-admin-reports.png' });

    // Step 5: Navigate to Chatbot
    await page.goto('/admin/chatbot');
    await page.waitForTimeout(2000);
    expect(page.url()).toContain('/admin/chatbot');
    await page.screenshot({ path: 'screenshots/e2e-admin-chatbot.png' });

    // Step 6: Logout
    await page.evaluate(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('pakar_air_token');
      sessionStorage.removeItem('pakar_air_refresh_token');
      sessionStorage.removeItem('pakar_air_user');
    });

    await page.goto('/admin');
    await page.waitForURL('**/login', { timeout: 10000 });
    expect(page.url()).toContain('/login');

    await page.screenshot({ path: 'screenshots/e2e-admin-journey-complete.png' });
  });
});
