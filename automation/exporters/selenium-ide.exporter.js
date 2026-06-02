/**
 * PAKAR-AIR Automation — Selenium IDE Exporter
 *
 * Converts Universal JSON → Selenium IDE .side format.
 *
 * Mapping:
 *   goto         → open
 *   click        → click
 *   fill         → type
 *   type         → type
 *   upload       → type (file path)
 *   select       → select
 *   check        → check
 *   uncheck      → uncheck
 *   assertText   → assertText
 *   assertVisible→ verifyElementPresent
 *   assertUrl    → assertLocation (custom via store + assert)
 *   wait         → pause
 *   screenshot   → //screenshot (comment)
 *   dragdrop     → dragAndDropToObject
 */

const { v4: uuidv4 } = require('uuid');
const { BaseExporter } = require('./base-exporter');

class SeleniumIDEExporter extends BaseExporter {
  constructor() {
    super('Selenium IDE', 'selenium-ide', '.side');
  }

  /**
   * Export Universal JSON to Selenium IDE .side format
   * @param {object} universalJSON
   * @param {object} options
   * @returns {string} JSON string of .side file
   */
  _doExport(universalJSON, options = {}) {
    const projectId = uuidv4();
    const baseUrl = universalJSON.baseUrl || 'http://localhost:5173';

    // Build .side structure
    const sideProject = {
      id: projectId,
      version: '2.0',
      name: universalJSON.name || 'PAKAR-AIR Tests',
      url: baseUrl,
      tests: [],
      suites: [],
      urls: [baseUrl],
      plugins: [],
    };

    // Process each suite
    for (const suite of universalJSON.suites) {
      const suitId = uuidv4();
      const testIds = [];

      for (const test of suite.tests) {
        const testId = uuidv4();
        testIds.push(testId);

        const sideTest = {
          id: testId,
          name: test.name,
          commands: this._convertSteps(test.steps, baseUrl),
        };

        sideProject.tests.push(sideTest);
      }

      // Create suite entry
      sideProject.suites.push({
        id: suitId,
        name: suite.name,
        persistSession: false,
        parallel: false,
        timeout: 300,
        tests: testIds,
      });
    }

    return JSON.stringify(sideProject, null, 2);
  }

  /**
   * Convert Universal JSON steps to Selenium IDE commands
   */
  _convertSteps(steps, baseUrl) {
    const commands = [];

    // Add implicit open command if first step isn't a goto
    if (steps.length > 0 && steps[0].action !== 'goto') {
      commands.push(this._createCommand('open', '/', ''));
    }

    for (const step of steps) {
      const converted = this._convertStep(step, baseUrl);
      if (converted) {
        if (Array.isArray(converted)) {
          commands.push(...converted);
        } else {
          commands.push(converted);
        }
      }
    }

    return commands;
  }

  /**
   * Convert a single Universal JSON step to Selenium IDE command(s)
   */
  _convertStep(step, baseUrl) {
    switch (step.action) {
      case 'goto':
        return this._createCommand(
          'open',
          this._toRelativeUrl(step.target, baseUrl),
          ''
        );

      case 'click':
        return this._createCommand(
          'click',
          this._toSeleniumTarget(step.target),
          ''
        );

      case 'fill':
      case 'type':
      case 'upload':
        return this._createCommand(
          'type',
          this._toSeleniumTarget(step.target),
          String(step.value || '')
        );

      case 'select':
        return this._createCommand(
          'select',
          this._toSeleniumTarget(step.target),
          `label=${step.value || ''}`
        );

      case 'check':
        return this._createCommand(
          'check',
          this._toSeleniumTarget(step.target),
          ''
        );

      case 'uncheck':
        return this._createCommand(
          'uncheck',
          this._toSeleniumTarget(step.target),
          ''
        );

      case 'assertText':
        return this._createCommand(
          'assertText',
          this._toSeleniumTarget(step.target),
          String(step.value || '')
        );

      case 'assertVisible':
        return this._createCommand(
          'assertElementPresent',
          this._toSeleniumTarget(step.target),
          ''
        );

      case 'assertUrl': {
        // Selenium IDE v2.0 uses executeScript to get the URL safely
        const storeCmd = this._createCommand('executeScript', 'return window.location.href', 'currentUrl');
        const assertCmd = this._createCommand(
          'assert',
          'currentUrl',
          String(step.value || '')
        );
        return [storeCmd, assertCmd];
      }

      case 'wait':
        return this._createCommand(
          'pause',
          String(step.value || 1000),
          ''
        );

      case 'screenshot':
        return this._createCommand(
          'echo',
          `Screenshot: ${step.options?.screenshotName || 'screenshot'}`,
          ''
        );

      case 'dragdrop':
        return this._createCommand(
          'dragAndDropToObject',
          this._toSeleniumTarget(step.target),
          this._toSeleniumTarget(step.value)
        );

      default:
        // Selenium IDE requires valid camelCase command names
        return this._createCommand(
          'echo',
          `Unsupported action: ${step.action}`,
          ''
        );
    }
  }

  /**
   * Create a Selenium IDE command object
   */
  _createCommand(command, target, value) {
    return {
      id: uuidv4(),
      comment: '',
      command,
      target: target || '',
      targets: [],
      value: value || '',
    };
  }

  /**
   * Convert a Playwright-style selector to Selenium IDE target format
   */
  _toSeleniumTarget(selector) {
    if (!selector) return '';

    // Convert double quotes to single quotes to prevent JSON escape issues in Selenium IDE
    selector = selector.replace(/"/g, "'");

    // Already a CSS selector or XPath
    if (selector.startsWith('css=') || selector.startsWith('xpath=') || selector.startsWith('id=')) {
      return selector;
    }

    // getByRole, getByText, etc. → XPath approximation
    if (selector.startsWith('getByRole=')) {
      const role = selector.replace('getByRole=', '');
      return `css=[role="${role}"]`;
    }
    if (selector.startsWith('getByText=')) {
      const text = selector.replace('getByText=', '');
      return `xpath=//*[contains(text(),"${text}")]`;
    }
    if (selector.startsWith('getByPlaceholder=')) {
      const placeholder = selector.replace('getByPlaceholder=', '');
      return `css=[placeholder="${placeholder}"]`;
    }
    if (selector.startsWith('getByLabel=')) {
      const label = selector.replace('getByLabel=', '');
      return `xpath=//label[contains(text(),"${label}")]/following::input[1]`;
    }
    if (selector.startsWith('getByTestId=')) {
      const testId = selector.replace('getByTestId=', '');
      return `css=[data-testid="${testId}"]`;
    }

    // If it starts with # or . or [ it's already CSS
    if (selector.startsWith('#') || selector.startsWith('.') || selector.startsWith('[')) {
      return `css=${selector}`;
    }

    // If it starts with // it's XPath
    if (selector.startsWith('//')) {
      return `xpath=${selector}`;
    }

    // Default to CSS
    return `css=${selector}`;
  }

  /**
   * Convert absolute URL to relative path for Selenium IDE
   */
  _toRelativeUrl(url, baseUrl) {
    if (!url) return '/';
    if (url.startsWith('/')) return url;
    if (url.startsWith(baseUrl)) {
      return url.slice(baseUrl.length) || '/';
    }
    return url;
  }
}

module.exports = { SeleniumIDEExporter };
