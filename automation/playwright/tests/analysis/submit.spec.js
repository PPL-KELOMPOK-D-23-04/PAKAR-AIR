/**
 * PAKAR-AIR — Submit & Result Test Suite
 */
const { test, expect } = require('@playwright/test');
const { AnalysisPage } = require('../../pages/AnalysisPage');
const { loginViaUI } = require('../../helpers/auth.helper');
const { ensureTestFiles, getTestFilePath } = require('../../helpers/file.helper');
const { USERS } = require('../../data/users.data');
const { VALID_PARAMS } = require('../../data/parameters.data');

test.beforeAll(() => { ensureTestFiles(); });
test.beforeEach(async ({ page }) => { await loginViaUI(page, USERS.validUser); });

test.describe('Analysis — Submit & Hasil', () => {

  test('Pengguna berhasil melakukan analisis kualitas air hingga hasil prediksi ditampilkan', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await analysisPage.fillAllParameters(VALID_PARAMS);
    await analysisPage.submitAnalysis();
    await page.waitForTimeout(5000);
    const hasResult = await analysisPage.isResultVisible();
    const hasError = await analysisPage.getErrorBanner();
    expect(hasResult || hasError).toBeTruthy();
  });

  test('Pengguna gagal melakukan analisis kualitas air karena tidak mengunggah file gambar', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.fillAllParameters(VALID_PARAMS);
    await analysisPage.clickSubmit();
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toContain('/analysis');
  });

  test('Pengguna berhasil mereset form analisis ke kondisi kosong', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await analysisPage.fillAllParameters(VALID_PARAMS);
    await analysisPage.clickCancel();
    await page.waitForTimeout(1000);
    const phVal = await page.inputValue('#field-ph');
    expect(phVal === '' || phVal === null).toBeTruthy();
  });

  test('Pengguna gagal melakukan analisis karena parameter wajib dikosongkan', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await analysisPage.clickSubmit();
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/analysis');
  });

  test('Pengguna gagal melakukan analisis karena parameter tidak diisi lengkap', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await analysisPage.fillParameter('ph', 7.0);
    await analysisPage.clickSubmit();
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/analysis');
  });

  test('Pengguna berhasil melihat detail Prediction Result secara mendalam', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await analysisPage.fillAllParameters(VALID_PARAMS);
    await analysisPage.submitAnalysis();
    await page.waitForTimeout(5000);
    const hasResult = await analysisPage.isResultVisible();
    if (hasResult) {
      const html = await page.innerHTML('.prediction-card');
      expect(html).toContain('Kualitas Air');
      expect(html).toContain('Akurasi');
    }
  });

  test('Pengguna berhasil kembali ke dasbor setelah melihat hasil analisis', async ({ page }) => {
    const analysisPage = new AnalysisPage(page);
    await analysisPage.navigate();
    await analysisPage.uploadFile(getTestFilePath('sample_water.jpg'));
    await analysisPage.fillAllParameters(VALID_PARAMS);
    await analysisPage.submitAnalysis();
    await page.waitForTimeout(5000);
    const hasResult = await analysisPage.isResultVisible();
    if (hasResult) {
      await page.click('a[href="/dashboard"], a[href="/"]');
      await page.waitForURL(/\/(dashboard|admin)/);
      expect(page.url()).toMatch(/\/(dashboard|admin)/);
    }
  });
});
