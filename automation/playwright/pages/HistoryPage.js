/**
 * PAKAR-AIR — HistoryPage POM
 */
const { BasePage } = require('./BasePage');
const { HistoryLocators: L } = require('../locators/history.locators');

class HistoryPage extends BasePage {
  async navigate() {
    await this.goto('/history');
    await this.waitForElement(L.view);
  }

  async search(keyword) {
    await this.fillInput(L.searchInput, keyword);
    await this.page.waitForTimeout(500);
  }

  async filterByCategory(value) {
    await this.page.locator(L.categorySelect).selectOption(value);
    await this.page.waitForTimeout(500);
  }

  async filterByDate(date) {
    await this.fillInput(L.dateInput, date);
    await this.page.waitForTimeout(500);
  }

  async clearFilters() {
    await this.clickElement(L.clearFilterButton);
  }

  async getHistoryCount() {
    return this.page.locator(L.historyRow).count();
  }

  async getTotalBadgeText() {
    return this.getText(L.badgeTotal);
  }

  async clickHistoryRow(index = 0) {
    await this.page.locator(L.historyRow).nth(index).click();
  }

  async getRowTitle(index = 0) {
    return this.page.locator(L.historyRow).nth(index).locator(L.rowTitle).textContent();
  }

  // Pagination
  async getCurrentPage() {
    return this.getText(L.pageNumberActive);
  }

  async goToPage(pageNum) {
    await this.page.locator(L.pageNumber).filter({ hasText: String(pageNum) }).click();
    await this.page.waitForTimeout(500);
  }

  async isPaginationVisible() {
    return this.isVisible(L.pagination);
  }

  // Export
  async clickExport() {
    await this.clickElement(L.exportButton);
  }

  // States
  async isLoading() {
    return this.isVisible(L.loadingSpinner);
  }

  async isEmptyState() {
    return this.isVisible(L.emptyState);
  }
}

module.exports = { HistoryPage };
