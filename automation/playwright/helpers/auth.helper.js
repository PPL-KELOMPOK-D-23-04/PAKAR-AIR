/**
 * PAKAR-AIR — Auth Helper
 * Reusable login/register functions for test setup
 */

const { USERS } = require('../data/users.data');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:8000';
const AUTH_CACHE_DIR = path.join(__dirname, '..', '.auth');

/**
 * Login via UI and return the page in authenticated state
 */
async function loginViaUI(page, user = USERS.validUser) {
  if (!fs.existsSync(AUTH_CACHE_DIR)) {
    fs.mkdirSync(AUTH_CACHE_DIR, { recursive: true });
  }
  
  const cacheFile = path.join(AUTH_CACHE_DIR, `${user.email}.json`);
  
  // Reuse session if exists
  if (fs.existsSync(cacheFile)) {
    const sessionData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    await page.goto('/');
    await page.evaluate((data) => {
      for (const [key, value] of Object.entries(data)) {
        sessionStorage.setItem(key, value);
      }
    }, sessionData);
    
    // Force navigation to trigger router auth guard properly
    await page.goto('/dashboard');
    await page.waitForURL(/\/(dashboard|admin)/, { timeout: 5000 });
    return;
  }

  // Perform Real UI Login
  await page.goto('/login');
  await page.fill('input[type="email"]', user.email);
  await page.fill('input[type="password"]', user.password);
  await page.click('.btn-login');
  await page.waitForURL(/\/(dashboard|admin)/, { timeout: 15000 });

  // Save session state
  const sessionData = await page.evaluate(() => {
    const data = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      data[key] = sessionStorage.getItem(key);
    }
    return data;
  });
  
  fs.writeFileSync(cacheFile, JSON.stringify(sessionData, null, 2), 'utf8');
}

/**
 * Login via API and set session storage tokens directly (faster)
 */
async function loginViaAPI(page, user = USERS.validUser) {
  const response = await page.request.post(`${API_BASE}/api/auth/login`, {
    data: {
      email: user.email,
      password: user.password,
    },
  });

  if (response.ok()) {
    const data = await response.json();

    await page.goto('/');
    await page.evaluate((authData) => {
      sessionStorage.setItem('token', authData.access_token);
      sessionStorage.setItem('pakar_air_token', authData.access_token);
      if (authData.refresh_token) {
        sessionStorage.setItem('pakar_air_refresh_token', authData.refresh_token);
      }
      const userObj = {
        id: authData.user_id,
        email: authData.email,
        full_name: authData.full_name,
        is_admin: authData.is_admin || false,
      };
      sessionStorage.setItem('pakar_air_user', JSON.stringify(userObj));
    }, data);

    return data;
  }

  throw new Error(`Login via API failed: ${response.status()}`);
}

/**
 * Logout by clearing session storage
 */
async function logout(page) {
  await page.evaluate(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('pakar_air_token');
    sessionStorage.removeItem('pakar_air_refresh_token');
    sessionStorage.removeItem('pakar_air_user');
  });
}

/**
 * Check if currently logged in
 */
async function isLoggedIn(page) {
  return page.evaluate(() => {
    return !!(sessionStorage.getItem('token') || sessionStorage.getItem('pakar_air_token'));
  });
}

module.exports = {
  loginViaUI,
  loginViaAPI,
  logout,
  isLoggedIn,
};
