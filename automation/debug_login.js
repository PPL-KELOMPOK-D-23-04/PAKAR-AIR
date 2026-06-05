const { chromium } = require('playwright');
const { USERS } = require('./playwright/data/users.data');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    const user = USERS.adminUser;
    await page.goto('http://localhost:5173/login');
    await page.fill('input[type="email"]', user.email);
    await page.fill('input[type="password"]', user.password);
    await page.click('.btn-login');
    
    // Wait a bit to see what happens
    await page.waitForTimeout(3000);
    
    console.log("Current URL:", page.url());
    const errorText = await page.locator('.error-text, .error-box').allTextContents();
    console.log("Errors on page:", errorText);
    
    await page.screenshot({ path: 'login-error.png' });
    console.log("Screenshot saved to login-error.png");
  } catch(e) {
    console.error(e);
  }
  
  await browser.close();
})();
