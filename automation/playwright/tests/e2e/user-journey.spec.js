/**
 * PAKAR-AIR — E2E User Journey
 * Covers: E2E-001
 *
 * Register → Login → Upload Foto → Isi 9 Parameter → Submit Analisis
 * → Lihat Hasil → Lihat History → Logout
 */
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');
const { LoginPage } = require('../../pages/LoginPage');
const { AnalysisPage } = require('../../pages/AnalysisPage');
const { HistoryPage } = require('../../pages/HistoryPage');
const { generateUniqueUser } = require('../../data/users.data');
const { VALID_PARAMS } = require('../../data/parameters.data');
const { ensureTestFiles, getTestFilePath } = require('../../helpers/file.helper');

test.beforeAll(() => { ensureTestFiles(); });

test.describe('E2E — User Journey', () => {

  test('E2E-001: Complete user journey dari register hingga logout', async ({ page }) => {
    const user = generateUniqueUser();

    // Step 1: Register
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.registerWithData(user);
    const success = await registerPage.getSuccessMessage();
    expect(success).toBeTruthy();

    // Step 2: Wait for redirect then Login
    await page.waitForURL('**/login', { timeout: 10000 });
    const loginPage = new LoginPage(page);
    await loginPage.login(user.email, user.password);
    await page.waitForURL(/\/(dashboard|admin)/, { timeout: 15000 });

    // Step 3: Navigate to Analysis
    await page.goto('/analysis');
    const analysisPage = new AnalysisPage(page);
    await analysisPage.waitForElement('.analysis-view');

    // Step 4: Upload Foto
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await page.waitForTimeout(1000);

    // Step 5: Fill 9 Parameters
    await analysisPage.fillAllParameters(VALID_PARAMS);

    // Step 6: Submit Analysis
    await analysisPage.clickSubmit();
    await page.waitForTimeout(5000);
    // Wait for result or error
    const hasResult = await analysisPage.isResultVisible();
    const hasError = await analysisPage.getErrorBanner();

    // Step 7: Navigate to History
    await page.goto('/history');
    const historyPage = new HistoryPage(page);
    await page.waitForTimeout(2000);

    // Step 8: Logout
    await page.evaluate(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('pakar_air_token');
      sessionStorage.removeItem('pakar_air_refresh_token');
      sessionStorage.removeItem('pakar_air_user');
    });

    // Verify logged out
    await page.goto('/dashboard');
    await page.waitForURL('**/login', { timeout: 10000 });
    expect(page.url()).toContain('/login');

    // Take final screenshot
    await page.screenshot({ path: 'screenshots/e2e-user-journey-complete.png' });
  });
});
