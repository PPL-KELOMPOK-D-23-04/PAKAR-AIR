/**
 * PAKAR-AIR — NotificationPage POM
 */
const { BasePage } = require('./BasePage');
const { NotificationLocators: L } = require('../locators/notification.locators');

class NotificationPage extends BasePage {
  async navigate() {
    await this.goto('/notifications');
    await this.waitForElement(L.page);
  }

  async getNotificationCount() {
    return this.page.locator(L.card).count();
  }

  async getUnreadCount() {
    return this.page.locator(L.cardUnread).count();
  }

  async markAsRead(index = 0) {
    await this.page.locator(L.cardUnread).nth(index).locator(L.markReadButton).click();
  }

  async getNotificationTitle(index = 0) {
    return this.page.locator(L.card).nth(index).locator(L.notifTitle).textContent();
  }

  async isEmptyState() {
    return this.isVisible(L.emptyState);
  }

  async hasUnreadDot(index = 0) {
    return this.page.locator(L.card).nth(index).locator(L.unreadDot).isVisible();
  }
}

module.exports = { NotificationPage };
