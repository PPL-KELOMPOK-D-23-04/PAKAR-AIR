const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', exception => console.log('BROWSER EXCEPTION:', exception));
  
  try {
    await page.goto('http://localhost:5173/login');
    await page.fill('input[type="email"]', 'userpakarair@gmail.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('.btn-login');
    await page.waitForURL(/\/(dashboard|admin)/, { timeout: 15000 });
    
    await page.goto('http://localhost:5173/analysis');
    await page.waitForTimeout(2000);
    
    console.log("Current URL:", page.url());
    const body = await page.innerHTML('body');
    console.log("Has col-form?", body.includes('col-form'));
  } catch(e) {
    console.error(e);
  }
  
  await browser.close();
})();
