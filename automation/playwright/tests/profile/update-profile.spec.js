/**
 * PAKAR-AIR — Profile Tests
 * Covers: PRO-POS-001 to 006, PRO-NEG-001 to 007, PRO-BVA-001 to 004
 */
const { test, expect } = require('@playwright/test');
const { ProfilePage } = require('../../pages/ProfilePage');
const { loginViaUI } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');
const { ensureTestFiles, getTestFilePath } = require('../../helpers/file.helper');

test.beforeAll(() => { ensureTestFiles(); });
test.beforeEach(async ({ page }) => { await loginViaUI(page, USERS.validUser); });

test.describe('Profile — Update & Security', () => {

  test('PRO-POS-001: View profile page', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    expect(page.url()).toContain('/profile');
  });

  test('PRO-POS-002: Update nama berhasil', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.updateName('Updated Name Test');
    await profilePage.clickSaveProfile();
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('berhasil');
  });

  test('PRO-NEG-001: Nama kurang dari 3 karakter', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.updateName('ab');
    await profilePage.clickSaveProfile();
    // Validasi frontend harus mencegah form submit atau menampilkan toast/pesan error
    const html = await page.innerHTML('.form-grid');
    expect(html).toContain('minimal 3 karakter');
  });

  test('PRO-POS-005: Tab navigation', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.switchToSecurity();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('/profile');
    const isSecurity = await page.isVisible('text=Ubah Kata Sandi');
    expect(isSecurity).toBeTruthy();
  });

  test('PRO-NEG-004: Password lama kosong', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.changePassword('', 'NewPass@123', 'NewPass@123');
    await page.waitForTimeout(1000);
    const html = await page.innerHTML('.security-form');
    expect(html).toContain('wajib diisi');
  });

  test('PRO-NEG-006: Konfirmasi password tidak cocok', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.changePassword(USERS.validUser.password, 'NewPass@123', 'DifferentPass');
    await page.waitForTimeout(1000);
    const html = await page.innerHTML('.security-form');
    expect(html).toContain('tidak cocok');
  });

  // NEW TESTS
  test('PRO-POS-003: Upload Avatar valid (PNG) → berhasil', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    const { createTestFile } = require('../../helpers/file.helper');
    const filePath = createTestFile('avatar_valid.png', 50 * 1024);
    await profilePage.uploadAvatar(filePath);
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('berhasil');
  });

  test('PRO-POS-004: Update Password valid → berhasil', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.changePassword(USERS.validUser.password, 'NewValidPass!23', 'NewValidPass!23');
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('berhasil');
    
    // Revert password back to original so subsequent tests don't fail
    await profilePage.changePassword('NewValidPass!23', USERS.validUser.password, USERS.validUser.password);
    await page.waitForTimeout(1000); // give time for the revert to complete
  });

  test('PRO-POS-006: Update preferensi notifikasi → berhasil', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.switchToNotifications();
    await page.waitForTimeout(500);
    // Click toggle slider pertama
    await page.click('.notification-item:nth-child(1) .slider');
    await page.click('text=Simpan Preferensi');
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('berhasil');
  });

  test('PRO-NEG-002: Avatar > 2MB → gagal', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    const { createTestFile } = require('../../helpers/file.helper');
    const filePath = createTestFile('avatar_large.jpg', 3 * 1024 * 1024);
    await profilePage.uploadAvatar(filePath);
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('maksimal 2MB');
  });

  test('PRO-NEG-003: Invalid Avatar format → gagal', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    const { createInvalidFile } = require('../../helpers/file.helper');
    const filePath = createInvalidFile('avatar_invalid.txt');
    await profilePage.uploadAvatar(filePath);
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('Format gambar');
  });

  test('PRO-NEG-005: Password baru kurang dari 8 karakter', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.changePassword(USERS.validUser.password, '1234567', '1234567');
    await page.waitForTimeout(500);
    const html = await page.innerHTML('.security-form');
    expect(html).toContain('minimal 8 karakter');
  });

  test('PRO-NEG-007: Nama kosong saat update', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.updateName('');
    await profilePage.clickSaveProfile();
    await page.waitForTimeout(500);
    // Validasi HTML default required / custom logic
    const html = await page.innerHTML('.form-grid');
    expect(html).toContain('minimal 3 karakter'); // or wajib diisi based on logic
  });

  test('PRO-BVA-001: Nama tepat 3 karakter (minimal) → berhasil', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.updateName('Ani');
    await profilePage.clickSaveProfile();
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('berhasil');
  });

  test('PRO-BVA-003: Password baru tepat 8 karakter (minimal) → berhasil', async ({ page }) => {
    const profilePage = new ProfilePage(page);
    await profilePage.navigate();
    await profilePage.changePassword(USERS.validUser.password, '12345678', '12345678');
    const toast = await profilePage.getToastMessage();
    expect(toast).toContain('berhasil');

    // Revert password back to original
    await profilePage.changePassword('12345678', USERS.validUser.password, USERS.validUser.password);
    await page.waitForTimeout(1000);
  });
});
