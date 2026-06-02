/**
 * PAKAR-AIR — Login Test Suite
 */
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { USERS } = require('../../data/users.data');

test.describe('Auth — Login', () => {

  test('Pengguna berhasil login menggunakan kredensial valid hingga diarahkan ke dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.validUser.email, USERS.validUser.password);
    await page.waitForURL(/\/(dashboard|admin)/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/(dashboard|admin)/);
  });

  test('Pengguna berhasil login menggunakan akun admin hingga diarahkan ke dasbor admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.adminUser.email, USERS.adminUser.password);
    await page.waitForURL('**/admin', { timeout: 15000 });
    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('Pengguna gagal login karena email dan password kosong', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.submit();
    const emailErr = await loginPage.getEmailError();
    expect(emailErr).toBeTruthy();
  });

  test('Pengguna gagal login karena email tidak terdaftar di sistem', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.invalidUser.email, USERS.invalidUser.password);
    const error = await loginPage.getGlobalError();
    expect(error).toBeTruthy();
  });

  test('Pengguna gagal login karena memasukkan password yang salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.validUser.email, 'WrongPassword!');
    const error = await loginPage.getGlobalError();
    expect(error).toBeTruthy();
    expect(error).toMatch(/Gagal login|Email atau password salah|Login failed/i);
  });

  test('Pengguna gagal login karena format email tidak sesuai standar (EP)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillEmail('no-at-sign');
    await loginPage.fillPassword('Test@12345');
    await loginPage.submit();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('Pengguna berhasil memasukkan email yang valid (EP)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillEmail('valid@email.com');
    await loginPage.fillPassword('Test@12345');
    await loginPage.submit();
    await page.waitForTimeout(2000);
  });

  test('Pengguna gagal login karena email null (EP)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillPassword('Test@12345');
    await loginPage.submit();
    const emailErr = await loginPage.getEmailError();
    expect(emailErr).toBeTruthy();
  });

  test('Pengguna gagal login karena email tidak memiliki domain (EP)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillEmail('invalidemailaddress');
    await loginPage.fillPassword('Test@12345');
    await loginPage.submit();
    const emailErr = await loginPage.getEmailError();
    expect(emailErr || page.url().includes('/login')).toBeTruthy();
  });
});
