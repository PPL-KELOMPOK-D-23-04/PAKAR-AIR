/**
 * PAKAR-AIR — LoginPage POM
 */
const { BasePage } = require('./BasePage');
const { LoginLocators: L } = require('../locators/auth.locators');

class LoginPage extends BasePage {
  async navigate() {
    await this.goto('/login');
    await this.waitForElement(L.card);
  }

  async fillEmail(email) {
    await this.fillInput(L.emailInput, email);
  }

  async fillPassword(password) {
    await this.fillInput(L.passwordInput, password);
  }

  async submit() {
    await this.clickElement(L.submitButton);
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async loginAndWaitForDashboard(email, password) {
    await this.login(email, password);
    await this.waitForURL(/\/(dashboard|admin)/);
  }

  async getGlobalError() {
    try {
      await this.waitForElement(L.globalError, 'visible', 5000);
      return this.getText(L.globalError);
    } catch {
      return null;
    }
  }

  async getEmailError() {
    try {
      await this.waitForElement(L.emailError, 'visible', 3000);
      return await this.getText(L.emailError);
    } catch {
      return null;
    }
  }

  async getPasswordError() {
    try {
      await this.waitForElement(L.passwordError, 'visible', 3000);
      return await this.getText(L.passwordError);
    } catch {
      return null;
    }
  }

  async isSubmitDisabled() {
    return this.page.locator(L.submitButton).isDisabled();
  }

  async clickRegisterLink() {
    await this.clickElement(L.registerLink);
  }

  async clickBackLink() {
    await this.clickElement(L.backLink);
  }
}

module.exports = { LoginPage };
