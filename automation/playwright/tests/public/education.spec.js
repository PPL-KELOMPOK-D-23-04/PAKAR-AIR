/**
 * PAKAR-AIR — Education Test Suite
 * Covers: KF-14 Edukasi
 */
const { test, expect } = require('@playwright/test');

test.describe('Education — KF-14', () => {

  test('EDU-POS-001: Pengguna berhasil melihat halaman edukasi dan daftar artikel', async ({ page }) => {
    // Navigate to /education
    await page.goto('/education');
    
    // Check if the title is correct
    await expect(page.locator('.hero-title')).toHaveText(/Pusat Edukasi PAKAR-AIR/i);
    
    // Check if articles are visible
    const articleCards = page.locator('.article-card');
    await expect(articleCards.first()).toBeVisible();
    
    // Click on the first article
    await articleCards.first().click();
    
    // Expect URL to change to article page
    await page.waitForURL(/\/artikel/);
    expect(page.url()).toMatch(/\/artikel/);
  });

  test('EDU-NEG-001: Pengguna gagal menemukan artikel saat mencari kata kunci tidak valid', async ({ page }) => {
    await page.goto('/education');
    
    // Search for non-existent term
    const searchInput = page.locator('.search-input');
    await searchInput.fill('zzzzz999nonexistent');
    await page.waitForTimeout(500); // Wait for computed filter to run

    // Expect empty state to be visible
    const emptyState = page.locator('.empty-state-title, h3:has-text("Artikel Tidak Ditemukan")');
    await expect(emptyState).toBeVisible();
  });

});
