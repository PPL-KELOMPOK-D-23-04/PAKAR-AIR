/**
 * PAKAR-AIR Automation — AST Builder
 *
 * High-level API for constructing AST trees from parsed Playwright code.
 * Uses the factory functions from node-types.js.
 */

const {
  createProgramNode,
  createTestSuiteNode,
  createTestCaseNode,
  createNavigationNode,
  createInteractionNode,
  createFileOperationNode,
  createAssertionNode,
  createUtilityNode,
} = require('./node-types');

class ASTBuilder {
  constructor(sourceFile) {
    this._sourceFile = sourceFile;
    this._suites = [];
    this._currentSuite = null;
    this._currentTest = null;
  }

  /**
   * Start a new test suite (test.describe block)
   */
  beginSuite(name, description = '') {
    this._currentSuite = createTestSuiteNode(name, [], description);
    this._suites.push(this._currentSuite);
    return this;
  }

  /**
   * Start a new test case (test() block)
   */
  beginTest(name, tags = []) {
    if (!this._currentSuite) {
      // Auto-create a default suite if none exists
      this.beginSuite('Default Suite');
    }
    this._currentTest = createTestCaseNode(name, [], tags);
    this._currentSuite.tests.push(this._currentTest);
    return this;
  }

  /**
   * Add a navigation step
   */
  addGoto(url) {
    this._ensureTest();
    this._currentTest.steps.push(createNavigationNode(url));
    return this;
  }

  /**
   * Add a click step
   */
  addClick(target, options = {}) {
    this._ensureTest();
    this._currentTest.steps.push(createInteractionNode('click', target, null, options));
    return this;
  }

  /**
   * Add a fill step (clear + type)
   */
  addFill(target, value, options = {}) {
    this._ensureTest();
    this._currentTest.steps.push(createInteractionNode('fill', target, value, options));
    return this;
  }

  /**
   * Add a type step (character by character)
   */
  addType(target, value, options = {}) {
    this._ensureTest();
    this._currentTest.steps.push(createInteractionNode('type', target, value, options));
    return this;
  }

  /**
   * Add a select step
   */
  addSelect(target, value, options = {}) {
    this._ensureTest();
    this._currentTest.steps.push(createInteractionNode('select', target, value, options));
    return this;
  }

  /**
   * Add a check step
   */
  addCheck(target) {
    this._ensureTest();
    this._currentTest.steps.push(createInteractionNode('check', target));
    return this;
  }

  /**
   * Add an uncheck step
   */
  addUncheck(target) {
    this._ensureTest();
    this._currentTest.steps.push(createInteractionNode('uncheck', target));
    return this;
  }

  /**
   * Add a file upload step
   */
  addUpload(target, filePath) {
    this._ensureTest();
    this._currentTest.steps.push(createFileOperationNode('upload', target, filePath));
    return this;
  }

  /**
   * Add a drag and drop step
   */
  addDragDrop(sourceSelector, targetSelector) {
    this._ensureTest();
    this._currentTest.steps.push(createFileOperationNode('dragdrop', sourceSelector, targetSelector));
    return this;
  }

  /**
   * Add an assertText step
   */
  addAssertText(target, expectedText, options = {}) {
    this._ensureTest();
    this._currentTest.steps.push(createAssertionNode('assertText', target, expectedText, options));
    return this;
  }

  /**
   * Add an assertVisible step
   */
  addAssertVisible(target) {
    this._ensureTest();
    this._currentTest.steps.push(createAssertionNode('assertVisible', target));
    return this;
  }

  /**
   * Add an assertUrl step
   */
  addAssertUrl(expectedUrl) {
    this._ensureTest();
    this._currentTest.steps.push(createAssertionNode('assertUrl', null, expectedUrl));
    return this;
  }

  /**
   * Add a wait step
   */
  addWait(durationMs) {
    this._ensureTest();
    this._currentTest.steps.push(createUtilityNode('wait', durationMs));
    return this;
  }

  /**
   * Add a screenshot step
   */
  addScreenshot(name = null) {
    this._ensureTest();
    this._currentTest.steps.push(
      createUtilityNode('screenshot', null, name ? { screenshotName: name } : {})
    );
    return this;
  }

  /**
   * Generic add step method (Useful for Reporter / Raw Actions)
   */
  addStep(type, target, value, options = {}) {
    this._ensureTest();
    switch (type) {
      case 'goto': return this.addGoto(target || value);
      case 'click': return this.addClick(target, options);
      case 'fill': return this.addFill(target, value, options);
      case 'type': return this.addType(target, value, options);
      case 'select': return this.addSelect(target, value, options);
      case 'check': return this.addCheck(target);
      case 'uncheck': return this.addUncheck(target);
      case 'upload': return this.addUpload(target, value);
      case 'dragdrop': return this.addDragDrop(target, value);
      case 'assertText': return this.addAssertText(target, value, options);
      case 'assertVisible': return this.addAssertVisible(target);
      case 'assertUrl': return this.addAssertUrl(target || value);
      case 'wait': return this.addWait(value);
      case 'screenshot': return this.addScreenshot(value);
      default:
        // For unmapped/unknown types, we can fallback to generic interaction
        this._currentTest.steps.push(createInteractionNode(type, target, value, options));
        return this;
    }
  }

  /**
   * Build the final AST Program node
   */
  build() {
    return createProgramNode(this._sourceFile, this._suites);
  }

  /**
   * Ensure there's an active test case
   * @private
   */
  _ensureTest() {
    if (!this._currentTest) {
      throw new Error('ASTBuilder: No active test case. Call beginTest() first.');
    }
  }
}

module.exports = { ASTBuilder };
