/**
 * PAKAR-AIR Automation — AST Transformer
 *
 * Transforms AST → Universal JSON format.
 * Validates the AST before transformation.
 *
 * Pipeline: AST → (validate) → Universal JSON
 */

const { v4: uuidv4 } = require('uuid');
const { NodeType } = require('../ast/node-types');
const { validateAST } = require('../ast/validator');

/**
 * Transform an AST into Universal JSON format
 * @param {object} ast - The AST Program node
 * @param {object} options - Transform options
 * @param {string} options.baseUrl - Base URL for the project
 * @param {string} options.projectName - Project name
 * @returns {object} Universal JSON object
 */
function transformToUniversalJSON(ast, options = {}) {
  const {
    baseUrl = 'http://localhost:5173',
    projectName = 'PAKAR-AIR',
  } = options;

  // Validate AST first
  const validation = validateAST(ast);
  if (!validation.valid) {
    throw new Error(
      `AST validation failed:\n${validation.errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }

  // Transform
  const universalJSON = {
    id: uuidv4(),
    name: projectName,
    description: `Auto-generated from ${ast.sourceFile}`,
    baseUrl,
    version: '1.0.0',
    metadata: {
      source: 'playwright',
      sourceFile: ast.sourceFile,
      generatedAt: new Date().toISOString(),
      generator: 'pakar-air-transformer@1.0.0',
      projectName,
    },
    suites: ast.suites.map((suite) => transformSuite(suite)),
  };

  return universalJSON;
}

/**
 * Transform a TestSuite AST node
 */
function transformSuite(suiteNode) {
  return {
    id: uuidv4(),
    name: suiteNode.name,
    description: suiteNode.description || '',
    tests: suiteNode.tests.map((test) => transformTest(test)),
  };
}

/**
 * Transform a TestCase AST node
 */
function transformTest(testNode) {
  return {
    id: uuidv4(),
    name: testNode.name,
    description: '',
    tags: testNode.tags || [],
    steps: testNode.steps.map((step) => transformStep(step)),
  };
}

/**
 * Transform a TestStep AST node
 */
function transformStep(stepNode) {
  const step = {
    action: stepNode.action,
  };

  if (stepNode.target !== null && stepNode.target !== undefined) {
    step.target = stepNode.target;
  }

  if (stepNode.value !== null && stepNode.value !== undefined) {
    step.value = stepNode.value;
  }

  if (stepNode.description) {
    step.description = stepNode.description;
  }

  if (stepNode.options && Object.keys(stepNode.options).length > 0) {
    step.options = stepNode.options;
  }

  return step;
}

module.exports = {
  transformToUniversalJSON,
};
