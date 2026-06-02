/**
 * PAKAR-AIR — Wait Helper
 * Custom wait utilities beyond Playwright's built-in waits
 */

/**
 * Wait for navigation to complete after action
 */
async function waitForNavigation(page, urlPattern, timeout = 15000) {
  await page.waitForURL(urlPattern, { timeout });
}

/**
 * Wait for API response
 */
async function waitForAPIResponse(page, urlPattern, method = 'GET') {
  return page.waitForResponse(
    (response) =>
      response.url().includes(urlPattern) &&
      response.request().method() === method,
    { timeout: 30000 }
  );
}

/**
 * Wait for loading state to finish
 */
async function waitForLoadingToFinish(page, spinnerSelector = '.spinner') {
  try {
    // Wait for spinner to appear then disappear
    await page.waitForSelector(spinnerSelector, { state: 'visible', timeout: 5000 });
    await page.waitForSelector(spinnerSelector, { state: 'hidden', timeout: 30000 });
  } catch {
    // Spinner might not appear if response is fast — that's ok
  }
}

/**
 * Wait for toast message to appear
 */
async function waitForToast(page, type = 'success') {
  const selector = type === 'success' ? '.toast-success' : '.toast-error';
  await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  const text = await page.textContent(`${selector} .toast-text`);
  return text;
}

module.exports = {
  waitForNavigation,
  waitForAPIResponse,
  waitForLoadingToFinish,
  waitForToast,
};
