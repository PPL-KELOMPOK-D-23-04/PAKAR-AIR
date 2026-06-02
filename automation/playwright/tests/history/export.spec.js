/**
 * PAKAR-AIR — Export PDF Test Suite
 * Covers: KF-16 Ekspor PDF
 */
const { test, expect } = require('@playwright/test');
const { HistoryPage } = require('../../pages/HistoryPage');
const { loginViaUI } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');

test.beforeEach(async ({ page }) => {
  await loginViaUI(page, USERS.validUser);
});

test.describe('Export PDF — KF-16', () => {

  test('HIS-POS-009: Pengguna berhasil mengekspor riwayat analisis ke format PDF', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    await page.waitForTimeout(1000);
    
    const totalCount = await historyPage.getHistoryCount();
    if (totalCount > 0) {
      await historyPage.clickExport();
      
      // Wait for modal box
      const modal = page.locator('.modal-box');
      await expect(modal).toBeVisible();
      
      // Click PDF format
      const pdfFormatBtn = page.locator('.format-card').nth(1); // Second card is PDF
      await pdfFormatBtn.click();
      
      // Setup a promise to catch the new popup window
      const popupPromise = page.waitForEvent('popup');
      
      // Click Export button in modal
      const exportBtn = page.locator('.modal-footer .btn--primary');
      await exportBtn.click();
      
      // Wait for the new window to open
      const popup = await popupPromise;
      await popup.waitForLoadState();
      
      // Check if the title of the PDF print window is correct
      expect(await popup.title()).toContain('Riwayat Analisis - PAKAR-AIR');
      
      // Check if table rows exist in the popup
      const rows = popup.locator('tbody tr');
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(0);
      
    } else {
      test.skip();
    }
  });

  test('HIS-NEG-003: Pengguna gagal mengekspor PDF saat data tidak tersedia', async ({ page }) => {
    const historyPage = new HistoryPage(page);
    await historyPage.navigate();
    
    // Force empty state by searching for gibberish
    await historyPage.search('zzzzzzzzz_empty_data_123');
    await page.waitForTimeout(1000);
    
    // Check if export button is disabled
    const exportBtn = page.locator('.btn-export');
    await expect(exportBtn).toBeDisabled();
  });

});
