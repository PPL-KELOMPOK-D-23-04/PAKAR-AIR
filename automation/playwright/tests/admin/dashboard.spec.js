/**
 * PAKAR-AIR — Admin Tests
 */
const { test, expect } = require('@playwright/test');
const { AdminDashboardPage } = require('../../pages/AdminDashboardPage');
const { loginViaUI } = require('../../helpers/auth.helper');
const { USERS } = require('../../data/users.data');

test.describe('Admin — Dashboard', () => {

  test('Pengguna admin berhasil memuat halaman dashboard utama dengan sukses', async ({ page }) => {
    await loginViaUI(page, USERS.adminUser);
    const adminPage = new AdminDashboardPage(page);
    await adminPage.navigate();
    await page.waitForTimeout(2000);
    const title = await adminPage.getPageTitle();
    expect(title).toContain('Dashboard Admin');
  });

  test('Pengguna admin berhasil melakukan navigasi ke halaman Kelola Pengguna', async ({ page }) => {
    await loginViaUI(page, USERS.adminUser);
    const adminPage = new AdminDashboardPage(page);
    await adminPage.navigate();
    await adminPage.clickManageUsers();
    await page.waitForURL('**/admin/users', { timeout: 10000 });
    expect(page.url()).toContain('/admin/users');
  });

  test('Pengguna biasa gagal mengakses dashboard admin dan dialihkan ke dashboard utama', async ({ page }) => {
    await loginViaUI(page, USERS.validUser);
    await page.goto('/admin');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('Pengguna gagal mengakses dashboard admin tanpa autentikasi login', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL('**/login', { timeout: 10000 });
    expect(page.url()).toContain('/login');
  });

  test('Pengguna admin berhasil melihat daftar pengguna terdaftar pada halaman Kelola Pengguna', async ({ page }) => {
    await loginViaUI(page, USERS.adminUser);
    await page.goto('/admin/users');
    await page.waitForSelector('.users-table, .empty-state', { timeout: 15000 });
    const html = await page.innerHTML('.admin-users');
    expect(html.includes('<table') || html.includes('empty-state')).toBeTruthy();
  });

  test('Pengguna admin berhasil memuat halaman Laporan Analisis tanpa kendala', async ({ page }) => {
    await loginViaUI(page, USERS.adminUser);
    await page.goto('/admin/reports');
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/admin/reports');
    const html = await page.innerHTML('.admin-reports');
    expect(html).toContain('Laporan');
  });

  test('Pengguna admin berhasil memuat antarmuka Chatbot Analytics', async ({ page }) => {
    await loginViaUI(page, USERS.adminUser);
    await page.goto('/admin/chatbot');
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/admin/chatbot');
    const html = await page.innerHTML('.chatbot-page');
    expect(html).toContain('Chatbot');
  });

  test('Pengguna admin berhasil menavigasi ke halaman laporan melalui pintasan aksi cepat', async ({ page }) => {
    await loginViaUI(page, USERS.adminUser);
    const adminPage = new AdminDashboardPage(page);
    await adminPage.navigate();
    await page.waitForTimeout(1000);
    await page.click('a[href="/admin/reports"]');
    await page.waitForURL('**/admin/reports', { timeout: 5000 });
    expect(page.url()).toContain('/admin/reports');
  });
});
