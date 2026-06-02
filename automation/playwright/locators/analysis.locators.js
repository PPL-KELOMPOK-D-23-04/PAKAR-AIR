/**
 * PAKAR-AIR — Analysis Locators
 *
 * Source: AnalysisView.vue, UploadCard.vue, ManualDataForm.vue, ImageUploader.vue
 */

const AnalysisLocators = {
  // Page
  view: '.analysis-view',

  // Header
  title: '.workspace-title',
  description: '.workspace-desc',
  cancelButton: 'button.btn--secondary',
  submitButton: '.btn-process',
  newAnalysisButton: 'button:has-text("Analisis Baru")',
  dashboardLink: 'a:has-text("Ke Dashboard")',

  // Error
  errorBanner: '.alert--danger',

  // Upload Card
  uploadCard: '.col-upload',
  uploaderArea: '.uploader',
  uploaderInput: '.uploader__input',
  uploaderLabel: '.uploader__label',
  uploaderHint: '.uploader__hint',
  previewContainer: '.preview-container',
  previewImage: '.preview-image',
  previewFilename: '.preview-filename',
  changeButton: '.btn-change',
  uploadError: '.error-alert',

  // Manual Data Form
  formGrid: '.form-grid',
  phInput: '#field-ph',
  hardnessInput: '#field-hardness',
  solidsInput: '#field-solids',
  chloraminesInput: '#field-chloramines',
  sulfateInput: '#field-sulfate',
  conductivityInput: '#field-conductivity',
  organicCarbonInput: '#field-organic_carbon',
  trihalomethanesInput: '#field-trihalomethanes',
  turbidityInput: '#field-turbidity',

  // Result
  resultContainer: '.result-container',
};

/**
 * Helper: get all parameter input selectors as an ordered array
 */
const PARAMETER_INPUTS = [
  { key: 'ph', selector: '#field-ph', label: 'pH' },
  { key: 'hardness', selector: '#field-hardness', label: 'Hardness' },
  { key: 'solids', selector: '#field-solids', label: 'Solids' },
  { key: 'chloramines', selector: '#field-chloramines', label: 'Chloramines' },
  { key: 'sulfate', selector: '#field-sulfate', label: 'Sulfate' },
  { key: 'conductivity', selector: '#field-conductivity', label: 'Conductivity' },
  { key: 'organic_carbon', selector: '#field-organic_carbon', label: 'Organic Carbon' },
  { key: 'trihalomethanes', selector: '#field-trihalomethanes', label: 'Trihalomethanes' },
  { key: 'turbidity', selector: '#field-turbidity', label: 'Turbidity' },
];

module.exports = {
  AnalysisLocators,
  PARAMETER_INPUTS,
};
