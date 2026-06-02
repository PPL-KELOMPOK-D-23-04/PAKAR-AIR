/**
 * PAKAR-AIR Automation — AST Node Types
 *
 * Defines the Abstract Syntax Tree structure used as the intermediate
 * representation between Playwright source code and Universal JSON.
 *
 * Pipeline: Playwright → AST (this) → Universal JSON → Exporter
 */

/**
 * AST Node type constants
 */
const NodeType = Object.freeze({
  PROGRAM: 'Program',
  TEST_SUITE: 'TestSuite',
  TEST_CASE: 'TestCase',
  TEST_STEP: 'TestStep',

  // Step categories
  NAVIGATION: 'Navigation',
  INTERACTION: 'Interaction',
  FILE_OPERATION: 'FileOperation',
  ASSERTION: 'Assertion',
  UTILITY: 'Utility',
});

/**
 * Create a Program node (root of the AST)
 */
function createProgramNode(sourceFile, suites = []) {
  return {
    type: NodeType.PROGRAM,
    sourceFile,
    suites,
    metadata: {
      parsedAt: new Date().toISOString(),
      parser: 'pakar-air-playwright-parser',
      version: '1.0.0',
    },
  };
}

/**
 * Create a TestSuite node (represents test.describe or a file)
 */
function createTestSuiteNode(name, tests = [], description = '') {
  return {
    type: NodeType.TEST_SUITE,
    name,
    description,
    tests,
  };
}

/**
 * Create a TestCase node (represents a single test())
 */
function createTestCaseNode(name, steps = [], tags = []) {
  return {
    type: NodeType.TEST_CASE,
    name,
    steps,
    tags,
  };
}

/**
 * Create a TestStep node (represents a single action or assertion)
 */
function createTestStepNode(category, action, target = null, value = null, options = {}) {
  return {
    type: NodeType.TEST_STEP,
    category,
    action,
    target,
    value,
    options,
    description: '',
  };
}

/**
 * Create a Navigation step (page.goto)
 */
function createNavigationNode(url) {
  return createTestStepNode(NodeType.NAVIGATION, 'goto', url);
}

/**
 * Create an Interaction step (click, fill, type, select, check, uncheck)
 */
function createInteractionNode(action, target, value = null, options = {}) {
  return createTestStepNode(NodeType.INTERACTION, action, target, value, options);
}

/**
 * Create a FileOperation step (upload, dragdrop)
 */
function createFileOperationNode(action, target, value, options = {}) {
  return createTestStepNode(NodeType.FILE_OPERATION, action, target, value, options);
}

/**
 * Create an Assertion step (assertText, assertVisible, assertUrl)
 */
function createAssertionNode(action, target = null, value = null, options = {}) {
  return createTestStepNode(NodeType.ASSERTION, action, target, value, options);
}

/**
 * Create a Utility step (wait, screenshot)
 */
function createUtilityNode(action, value = null, options = {}) {
  return createTestStepNode(NodeType.UTILITY, action, null, value, options);
}

module.exports = {
  NodeType,
  createProgramNode,
  createTestSuiteNode,
  createTestCaseNode,
  createTestStepNode,
  createNavigationNode,
  createInteractionNode,
  createFileOperationNode,
  createAssertionNode,
  createUtilityNode,
};
