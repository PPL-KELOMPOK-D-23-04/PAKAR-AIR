/**
 * PAKAR-AIR — AdminDashboardPage POM
 */
const { BasePage } = require('./BasePage');
const { AdminLocators: L } = require('../locators/admin.locators');

class AdminDashboardPage extends BasePage {
  async navigate() {
    await this.goto('/admin');
    await this.waitForElement(L.dashboard);
  }

  async getPageTitle() { return this.getText(L.pageTitle); }

  async getStatCardCount() { return this.page.locator(L.statCard).count(); }

  async getStatValue(index = 0) {
    return this.page.locator(L.statCard).nth(index).locator(L.statValue).textContent();
  }

  async isLoading() { return this.isVisible(L.statSkeleton); }

  async clickManageUsers() { await this.clickElement(L.manageUsersButton); }

  async clickQuickAction(index = 0) {
    await this.page.locator(L.actionCard).nth(index).click();
  }

  async navigateToUsers() {
    await this.clickElement(L.navUsers);
    await this.page.waitForURL('**/admin/users');
  }

  async navigateToReports() {
    await this.clickElement(L.navReports);
    await this.page.waitForURL('**/admin/reports');
  }

  async navigateToChatbot() {
    await this.clickElement(L.navChatbot);
    await this.page.waitForURL('**/admin/chatbot');
  }

  async hasError() { return this.isVisible(L.errorBanner); }
}

module.exports = { AdminDashboardPage };
