/**
 * PAKAR-AIR — RegisterPage POM
 */
const { BasePage } = require('./BasePage');
const { RegisterLocators: L } = require('../locators/auth.locators');

class RegisterPage extends BasePage {
  async navigate() {
    await this.goto('/register');
    await this.waitForElement(L.card);
  }

  async fillFullName(name) { await this.fillInput(L.fullNameInput, name); }
  async fillUsername(username) { await this.fillInput(L.usernameInput, username); }
  async fillEmail(email) { await this.fillInput(L.emailInput, email); }
  async fillPassword(password) { await this.fillInput(L.passwordInput, password); }

  async submit() {
    await this.clickElement(L.submitButton);
  }

  async register(fullName, username, email, password) {
    await this.fillFullName(fullName);
    await this.fillUsername(username);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }

  async registerWithData(data) {
    await this.register(data.fullName, data.username, data.email, data.password);
  }

  async getFieldError(field) {
    const selectors = {
      fullName: L.fullNameError,
      username: L.usernameError,
      email: L.emailError,
      password: L.passwordError,
    };
    try {
      await this.waitForElement(selectors[field], 'visible', 3000);
      return this.getText(selectors[field]);
    } catch { return null; }
  }

  async getGlobalError() {
    try {
      await this.waitForElement(L.globalError, 'visible', 5000);
      return this.getText(L.globalError);
    } catch { return null; }
  }

  async getSuccessMessage() {
    try {
      await this.waitForElement(L.successMessage, 'visible', 5000);
      return this.getText(L.successMessage);
    } catch { return null; }
  }

  async clickLoginLink() { await this.clickElement(L.loginLink); }
}

module.exports = { RegisterPage };
