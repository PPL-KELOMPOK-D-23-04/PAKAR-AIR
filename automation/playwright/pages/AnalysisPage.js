/**
 * PAKAR-AIR — AnalysisPage POM
 */
const { BasePage } = require('./BasePage');
const { AnalysisLocators: L, PARAMETER_INPUTS } = require('../locators/analysis.locators');
const path = require('path');

class AnalysisPage extends BasePage {
  async navigate() {
    await this.goto('/analysis');
    await this.waitForElement(L.view);
  }

  // ─── Upload ───
  async uploadFile(filePath) {
    const absolutePath = path.resolve(filePath);
    await this.page.setInputFiles(L.uploaderInput, absolutePath);
  }

  async isPreviewVisible() {
    return this.isVisible(L.previewContainer);
  }

  async getPreviewFilename() {
    return this.getText(L.previewFilename);
  }

  async clickChangePhoto() {
    await this.clickElement(L.changeButton);
  }

  async getUploadError() {
    try {
      await this.waitForElement(L.uploadError, 'visible', 3000);
      return this.getText(L.uploadError);
    } catch { return null; }
  }

  // ─── Drag and Drop ───
  async dragDropFile(filePath) {
    const absolutePath = path.resolve(filePath);
    const buffer = require('fs').readFileSync(absolutePath);
    const dataTransfer = await this.page.evaluateHandle((data) => {
      const dt = new DataTransfer();
      const file = new File([new Uint8Array(data)], 'sample_water.jpg', { type: 'image/jpeg' });
      dt.items.add(file);
      return dt;
    }, [...buffer]);

    await this.page.locator(L.uploaderArea).dispatchEvent('drop', { dataTransfer });
  }

  // ─── Parameters ───
  async fillParameter(key, value) {
    const input = PARAMETER_INPUTS.find((p) => p.key === key);
    if (!input) throw new Error(`Unknown parameter: ${key}`);
    await this.fillInput(input.selector, String(value));
  }

  async fillAllParameters(params) {
    for (const input of PARAMETER_INPUTS) {
      const value = params[input.key];
      if (value !== undefined && value !== null) {
        await this.fillParameter(input.key, value);
      }
    }
  }

  // ─── Submit ───
  async clickSubmit() {
    await this.clickElement(L.submitButton);
  }

  async isSubmitDisabled() {
    return this.page.locator(L.submitButton).isDisabled();
  }

  async submitAnalysis() {
    await this.clickSubmit();
    try {
      await Promise.race([
        this.page.waitForSelector(L.resultContainer, { state: 'visible', timeout: 15000 }),
        this.page.waitForSelector(L.errorBanner, { state: 'visible', timeout: 15000 })
      ]);
    } catch {
      // Timeout exceeded, we will let the assertions fail instead of blocking for 60s
    }
  }

  // ─── Result ───
  async isResultVisible() {
    return this.isVisible(L.resultContainer);
  }

  async clickNewAnalysis() {
    await this.clickElement(L.newAnalysisButton);
  }

  async clickDashboardLink() {
    await this.clickElement(L.dashboardLink);
  }

  async getErrorBanner() {
    try {
      await this.waitForElement(L.errorBanner, 'visible', 3000);
      return this.getText(L.errorBanner);
    } catch { return null; }
  }

  async clickCancel() {
    await this.clickElement(L.cancelButton);
  }
}

module.exports = { AnalysisPage };
