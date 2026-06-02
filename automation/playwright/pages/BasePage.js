/**
 * PAKAR-AIR — BasePage (POM Base Class)
 * All Page Objects extend this class.
 */

class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path) {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async getCurrentURL() {
    return this.page.url();
  }

  async waitForURL(urlPattern, options = {}) {
    await this.page.waitForURL(urlPattern, { timeout: 15000, ...options });
  }

  async screenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.page.screenshot({
      path: `screenshots/${name || 'screenshot'}_${timestamp}.png`,
      fullPage: true,
    });
  }

  async isVisible(selector) {
    return this.page.locator(selector).isVisible();
  }

  async getText(selector) {
    return this.page.locator(selector).textContent();
  }

  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector, value) {
    await this.page.locator(selector).fill(String(value));
  }

  async waitForElement(selector, state = 'visible', timeout = 10000) {
    await this.page.waitForSelector(selector, { state, timeout });
  }
}

module.exports = { BasePage };
