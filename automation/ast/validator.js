/**
 * PAKAR-AIR Automation — AST Validator
 *
 * Validates AST trees before transformation to Universal JSON.
 * Ensures structural integrity and action type correctness.
 */

const { NodeType } = require('./node-types');
const { isValidAction, getActionMeta } = require('../schemas/action-types');

class ValidationError extends Error {
  constructor(path, message) {
    super(`[${path}] ${message}`);
    this.path = path;
    this.name = 'ValidationError';
  }
}

/**
 * Validate an entire AST Program node
 * @param {object} ast - The AST tree to validate
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateAST(ast) {
  const errors = [];

  // Root node validation
  if (!ast || typeof ast !== 'object') {
    errors.push('AST root must be an object');
    return { valid: false, errors };
  }

  if (ast.type !== NodeType.PROGRAM) {
    errors.push(`Root node must be of type "${NodeType.PROGRAM}", got "${ast.type}"`);
  }

  if (!ast.sourceFile) {
    errors.push('Program node must have a sourceFile');
  }

  if (!Array.isArray(ast.suites)) {
    errors.push('Program node must have a suites array');
    return { valid: false, errors };
  }

  if (ast.suites.length === 0) {
    errors.push('Program must contain at least one test suite');
  }

  // Validate each suite
  ast.suites.forEach((suite, si) => {
    validateSuite(suite, `suites[${si}]`, errors);
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a TestSuite node
 */
function validateSuite(suite, path, errors) {
  if (suite.type !== NodeType.TEST_SUITE) {
    errors.push(new ValidationError(path, `Expected type "${NodeType.TEST_SUITE}", got "${suite.type}"`).message);
  }

  if (!suite.name || typeof suite.name !== 'string') {
    errors.push(new ValidationError(path, 'Suite must have a non-empty name').message);
  }

  if (!Array.isArray(suite.tests)) {
    errors.push(new ValidationError(path, 'Suite must have a tests array').message);
    return;
  }

  if (suite.tests.length === 0) {
    errors.push(new ValidationError(path, 'Suite must contain at least one test').message);
  }

  suite.tests.forEach((test, ti) => {
    validateTest(test, `${path}.tests[${ti}]`, errors);
  });
}

/**
 * Validate a TestCase node
 */
function validateTest(test, path, errors) {
  if (test.type !== NodeType.TEST_CASE) {
    errors.push(new ValidationError(path, `Expected type "${NodeType.TEST_CASE}", got "${test.type}"`).message);
  }

  if (!test.name || typeof test.name !== 'string') {
    errors.push(new ValidationError(path, 'Test must have a non-empty name').message);
  }

  if (!Array.isArray(test.steps)) {
    errors.push(new ValidationError(path, 'Test must have a steps array').message);
    return;
  }

  if (test.steps.length === 0) {
    errors.push(new ValidationError(path, 'Test must contain at least one step').message);
  }

  test.steps.forEach((step, si) => {
    validateStep(step, `${path}.steps[${si}]`, errors);
  });
}

/**
 * Validate a TestStep node
 */
function validateStep(step, path, errors) {
  if (step.type !== NodeType.TEST_STEP) {
    errors.push(new ValidationError(path, `Expected type "${NodeType.TEST_STEP}", got "${step.type}"`).message);
  }

  if (!step.action) {
    errors.push(new ValidationError(path, 'Step must have an action').message);
    return;
  }

  if (!isValidAction(step.action)) {
    errors.push(new ValidationError(path, `Invalid action type: "${step.action}"`).message);
    return;
  }

  const meta = getActionMeta(step.action);
  if (meta) {
    if (meta.requiresTarget && !step.target) {
      errors.push(new ValidationError(path, `Action "${step.action}" requires a target`).message);
    }

    if (meta.requiresValue && step.value === null && step.value === undefined) {
      errors.push(new ValidationError(path, `Action "${step.action}" requires a value`).message);
    }
  }
}

module.exports = {
  validateAST,
  ValidationError,
};
