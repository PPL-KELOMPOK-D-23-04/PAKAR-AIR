/**
 * PAKAR-AIR — ProfilePage POM
 */
const { BasePage } = require('./BasePage');
const { ProfileLocators: L } = require('../locators/profile.locators');

class ProfilePage extends BasePage {
  async navigate() {
    await this.goto('/profile');
    await this.waitForElement(L.view);
  }

  // Tab Navigation
  async switchToProfile() { await this.clickElement(L.navProfile); }
  async switchToSecurity() { await this.clickElement(L.navSecurity); }
  async switchToNotifications() { await this.clickElement(L.navNotifications); }

  // Profile Tab
  async updateName(name) {
    await this.page.locator(L.nameInput).clear();
    await this.fillInput(L.nameInput, name);
  }

  async uploadAvatar(filePath) {
    const path = require('path');
    await this.page.setInputFiles(L.avatarUploadInput, path.resolve(filePath));
  }

  async clickSaveProfile() {
    await this.clickElement(L.saveProfileButton);
  }

  // Security Tab
  async changePassword(oldPass, newPass, confirmPass) {
    await this.switchToSecurity();
    await this.page.waitForTimeout(300);
    await this.fillInput(L.oldPasswordInput, oldPass);
    await this.fillInput(L.newPasswordInput, newPass);
    await this.fillInput(L.confirmPasswordInput, confirmPass);
    await this.clickElement(L.updatePasswordButton);
  }

  // Toast messages
  async getToastMessage() {
    try {
      await this.waitForElement(L.toast, 'visible', 5000);
      return this.getText(L.toastText);
    } catch { return null; }
  }

  async isToastSuccess() {
    return this.isVisible(L.toastSuccess);
  }

  async isToastError() {
    return this.isVisible(L.toastError);
  }
}

module.exports = { ProfilePage };
