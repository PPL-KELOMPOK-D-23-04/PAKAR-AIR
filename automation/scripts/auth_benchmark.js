const { chromium } = require('playwright');
const USERS = require('./playwright/data/users.data.js');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- STARTING PERFORMANCE BENCHMARK ---');
  
  const startTotal = Date.now();
  
  // 1. Navigate to login
  await page.goto('http://localhost:5173/login');
  
  // 2. Submit Login
  const loginStart = Date.now();
  await page.fill('input[type="email"]', 'userpakarair@gmail.com');
  await page.fill('input[type="password"]', 'password123');
  
  const [response] = await Promise.all([
    page.waitForResponse(res => res.url().includes('/api/auth/login') && res.status() === 200),
    page.click('.btn-login')
  ]);
  const loginEnd = Date.now();
  console.log(`Login API Response: ${loginEnd - loginStart} ms`);
  
  // 3. Wait for redirect and Dashboard Render
  await page.waitForURL(/\/(dashboard|admin)/);
  const redirectEnd = Date.now();
  console.log(`Redirect / Dashboard Initial Render: ${redirectEnd - loginEnd} ms`);
  
  // 4. Wait for Post Login Fetch (e.g. history, profile)
  // Let's wait until network is idle or specific requests finish
  const profileResponse = await page.waitForResponse(res => res.url().includes('/api/users/profile'), { timeout: 10000 }).catch(() => null);
  const profileEnd = Date.now();
  console.log(`Profile Fetch: ${profileEnd - redirectEnd} ms`);
  
  const historyResponse = await page.waitForResponse(res => res.url().includes('/api/history'), { timeout: 10000 }).catch(() => null);
  const historyEnd = Date.now();
  console.log(`History Fetch: ${historyEnd - profileEnd} ms`);
  
  const totalEnd = Date.now();
  console.log(`Full Login Journey: ${totalEnd - startTotal} ms`);
  
  console.log('--- END BENCHMARK ---');
  
  await browser.close();
})();
