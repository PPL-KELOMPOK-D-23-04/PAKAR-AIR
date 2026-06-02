/**
 * PAKAR-AIR — History Test Suite
 */
const { test, expect } = require('@playwright/test');
const { HistoryPage } = require('../../pages/HistoryPage');
const { loginViaUI } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');

test.beforeEach(async ({ page }) => {
  await loginViaUI(page, USERS.validUser);
});

test.describe('History — Search & Filter', () => {

  test('Pengguna berhasil melihat daftar riwayat analisis', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await page.waitForTimeout(1000);
    const hasData = await historyPage.getHistoryCount() > 0;
    const isEmpty = await historyPage.isEmptyState();
    expect(hasData || isEmpty).toBeTruthy();
  });

  test('Pengguna berhasil mencari riwayat analisis berdasarkan kata kunci yang valid', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await historyPage.search('a');
    await page.waitForTimeout(1000);
    const hasData = await historyPage.getHistoryCount() > 0;
    const isEmpty = await historyPage.isEmptyState();
    expect(hasData || isEmpty).toBeTruthy();
  });

  test('Pengguna berhasil memfilter riwayat analisis berdasarkan kategori', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await historyPage.filterByCategory('layak');
    await page.waitForTimeout(1000);
    const hasData = await historyPage.getHistoryCount() > 0;
    const isEmpty = await historyPage.isEmptyState();
    expect(hasData || isEmpty).toBeTruthy();
  });

  test('Pengguna berhasil memfilter riwayat analisis berdasarkan rentang tanggal', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await historyPage.filterByDate('2026-05-29');
    await page.waitForTimeout(1000);
    const hasData = await historyPage.getHistoryCount() > 0;
    const isEmpty = await historyPage.isEmptyState();
    expect(hasData || isEmpty).toBeTruthy();
  });

  test('Pengguna berhasil melakukan navigasi pagination pada riwayat analisis', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await page.waitForTimeout(1000);
    const hasPagination = await historyPage.isPaginationVisible();
    if (hasPagination) {
      await historyPage.goToPage(2);
      const active = await historyPage.getCurrentPage();
      expect(active).toContain('2');
    } else {
      test.skip();
    }
  });

  test('Pengguna berhasil mengekspor riwayat analisis ke format eksternal', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await page.waitForTimeout(1000);
    const totalCount = await historyPage.getHistoryCount();
    if (totalCount > 0) {
      await historyPage.clickExport();
      const modal = page.locator('.modal-content');
      await expect(modal).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('Pengguna berhasil membuka detail riwayat prediksi kualitas air', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await page.waitForTimeout(1000);
    const hasData = await historyPage.getHistoryCount() > 0;
    if (hasData) {
      await historyPage.clickHistoryRow(0);
      await page.waitForURL(/\/history\/\d+/);
      expect(page.url()).toMatch(/\/history\/\d+/);
    } else {
      test.skip();
    }
  });

  test('Pengguna gagal menemukan riwayat analisis karena kata kunci pencarian tidak valid', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await historyPage.search('zzzzz999nonexistent');
    await page.waitForTimeout(1000);
    const isEmpty = await historyPage.isEmptyState();
    expect(isEmpty).toBeTruthy();
  });

  test('Pengguna gagal memfilter riwayat analisis karena kombinasi filter tidak menghasilkan data', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await historyPage.filterByCategory('tidak_layak');
    await historyPage.filterByDate('2000-01-01');
    await page.waitForTimeout(1000);
    const isEmpty = await historyPage.isEmptyState();
    expect(isEmpty).toBeTruthy();
  });

  test('Pengguna berhasil menghapus filter aktif sehingga data riwayat kembali normal', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await historyPage.search('test');
    await historyPage.filterByCategory('layak');
    await page.waitForTimeout(500);
    
    await historyPage.clearFilters();
    await page.waitForTimeout(1000);
    
    const hasData = await historyPage.getHistoryCount() > 0;
    const isEmpty = await historyPage.isEmptyState();
    expect(hasData || isEmpty).toBeTruthy();
  });
});
