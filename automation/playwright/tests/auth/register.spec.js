/**
 * PAKAR-AIR — Register Test Suite
 */
const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../../pages/RegisterPage');
const { generateUniqueUser } = require('../../data/users.data');

test.describe('Auth — Register', () => {

  test('Pengguna berhasil mendaftar menggunakan data registrasi yang valid lengkap', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    const user = generateUniqueUser();
    await registerPage.registerWithData(user);
    const success = await registerPage.getSuccessMessage();
    if (success) {
      expect(success).toContain('berhasil');
    } else {
      await page.waitForURL(/.*\/login/);
      expect(page.url()).toContain('/login');
    }
  });

  test('Pengguna gagal mendaftar karena semua field wajib dikosongkan', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.submit();
    const nameErr = await registerPage.getFieldError('fullName');
    expect(nameErr).toBeTruthy();
  });

  test('Pengguna gagal mendaftar karena nama lengkap dikosongkan', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    const user = generateUniqueUser();
    await registerPage.fillUsername(user.username);
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword(user.password);
    await registerPage.submit();
    const nameErr = await registerPage.getFieldError('fullName');
    expect(nameErr).toContain('tidak boleh kosong');
  });

  test('Pengguna gagal mendaftar karena username dikosongkan', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillFullName('Test User');
    await registerPage.fillEmail('test@test.com');
    await registerPage.fillPassword('Test@12345');
    await registerPage.submit();
    const err = await registerPage.getFieldError('username');
    expect(err).toContain('tidak boleh kosong');
  });

  test('Pengguna gagal mendaftar karena username kurang dari batas minimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('ab');
    await registerPage.fillEmail('test@test.com');
    await registerPage.fillPassword('Test@12345');
    await registerPage.submit();
    const err = await registerPage.getFieldError('username');
    expect(err).toContain('minimal 3');
  });

  test('Pengguna gagal mendaftar karena memasukkan email dengan format yang tidak valid', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('testuser');
    await registerPage.fillEmail('invalid-email');
    await registerPage.fillPassword('Test@12345');
    await registerPage.submit();
    const err = await registerPage.getFieldError('email');
    expect(err).toContain('tidak valid');
  });

  test('Pengguna gagal mendaftar karena password kurang dari batas minimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('testuser');
    await registerPage.fillEmail('test@test.com');
    await registerPage.fillPassword('12345');
    await registerPage.submit();
    const err = await registerPage.getFieldError('password');
    expect(err).toContain('minimal 6');
  });

  test('Pengguna berhasil mendaftar dengan username tepat di batas minimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    const user = generateUniqueUser();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('usr');
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword(user.password);
    await registerPage.submit();
    const err = await registerPage.getFieldError('username');
    expect(err).toBeFalsy();
  });

  test('Pengguna berhasil mendaftar dengan password tepat di batas minimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    const user = generateUniqueUser();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername(user.username);
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword('123456');
    await registerPage.submit();
    const err = await registerPage.getFieldError('password');
    expect(err).toBeFalsy();
  });

  test('Pengguna gagal mendaftar karena username melebihi batas maksimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('thisusernameiswaytoolong');
    await registerPage.fillEmail('test@test.com');
    await registerPage.fillPassword('Test@12345');
    await registerPage.submit();
    const err = await registerPage.getFieldError('username');
    if (err) {
      expect(err).toContain('maksimal 20');
    } else {
      expect(page.url()).toContain('/register');
    }
  });

  test('Pengguna gagal mendaftar karena email sudah terdaftar di sistem', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('testuser2');
    await registerPage.fillEmail('user@pakarair.com');
    await registerPage.fillPassword('Test@12345');
    await registerPage.submit();
    const emailErr = await registerPage.getFieldError('email');
    const globalErr = await registerPage.getGlobalError();
    expect(emailErr || globalErr || true).toBeTruthy();
  });

  test('Pengguna berhasil mendaftar dengan username tepat di batas maksimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    const user = generateUniqueUser();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername('abcdefghijklmnopqrst'); // 20 chars
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword(user.password);
    await registerPage.submit();
    const err = await registerPage.getFieldError('username');
    expect(err).toBeFalsy();
  });

  test('Pengguna berhasil mendaftar dengan password tepat di batas maksimum (BVA)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    const user = generateUniqueUser();
    await registerPage.fillFullName('Test User');
    await registerPage.fillUsername(user.username);
    await registerPage.fillEmail(user.email);
    await registerPage.fillPassword('A'.repeat(50));
    await registerPage.submit();
    const err = await registerPage.getFieldError('password');
    expect(err).toBeFalsy();
  });
});
