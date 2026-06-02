/**
 * PAKAR-AIR Automation — Supported Action Types
 *
 * These action types are the universal vocabulary shared between
 * the AST, Universal JSON, and all exporters.
 *
 * IMPORTANT: No framework-specific actions allowed here.
 * This is the Single Source of Truth for action definitions.
 */

const ActionTypes = Object.freeze({
  // Navigation
  GOTO: 'goto',

  // Interactions
  CLICK: 'click',
  FILL: 'fill',
  TYPE: 'type',
  SELECT: 'select',
  UPLOAD: 'upload',
  DRAGDROP: 'dragdrop',
  CHECK: 'check',
  UNCHECK: 'uncheck',

  // Wait
  WAIT: 'wait',

  // Assertions
  ASSERT_TEXT: 'assertText',
  ASSERT_VISIBLE: 'assertVisible',
  ASSERT_URL: 'assertUrl',

  // Utility
  SCREENSHOT: 'screenshot',
});

/**
 * Action metadata — defines required/optional fields for each action
 */
const ActionMeta = Object.freeze({
  [ActionTypes.GOTO]: {
    requiresTarget: true,
    requiresValue: false,
    description: 'Navigate to a URL',
    targetDescription: 'URL or path',
  },
  [ActionTypes.CLICK]: {
    requiresTarget: true,
    requiresValue: false,
    description: 'Click an element',
    targetDescription: 'CSS selector or text locator',
  },
  [ActionTypes.FILL]: {
    requiresTarget: true,
    requiresValue: true,
    description: 'Clear and fill an input field',
    targetDescription: 'Input selector',
    valueDescription: 'Text to fill',
  },
  [ActionTypes.TYPE]: {
    requiresTarget: true,
    requiresValue: true,
    description: 'Type text character by character (with optional delay)',
    targetDescription: 'Input selector',
    valueDescription: 'Text to type',
  },
  [ActionTypes.SELECT]: {
    requiresTarget: true,
    requiresValue: true,
    description: 'Select an option from a dropdown',
    targetDescription: 'Select element selector',
    valueDescription: 'Option value or label',
  },
  [ActionTypes.UPLOAD]: {
    requiresTarget: true,
    requiresValue: true,
    description: 'Upload a file to a file input',
    targetDescription: 'File input selector',
    valueDescription: 'File path(s)',
  },
  [ActionTypes.DRAGDROP]: {
    requiresTarget: true,
    requiresValue: true,
    description: 'Drag from source to target',
    targetDescription: 'Source element selector',
    valueDescription: 'Target element selector',
  },
  [ActionTypes.CHECK]: {
    requiresTarget: true,
    requiresValue: false,
    description: 'Check a checkbox',
    targetDescription: 'Checkbox selector',
  },
  [ActionTypes.UNCHECK]: {
    requiresTarget: true,
    requiresValue: false,
    description: 'Uncheck a checkbox',
    targetDescription: 'Checkbox selector',
  },
  [ActionTypes.WAIT]: {
    requiresTarget: false,
    requiresValue: true,
    description: 'Wait for a specified duration',
    valueDescription: 'Duration in milliseconds',
  },
  [ActionTypes.ASSERT_TEXT]: {
    requiresTarget: true,
    requiresValue: true,
    description: 'Assert that an element contains specified text',
    targetDescription: 'Element selector',
    valueDescription: 'Expected text',
  },
  [ActionTypes.ASSERT_VISIBLE]: {
    requiresTarget: true,
    requiresValue: false,
    description: 'Assert that an element is visible',
    targetDescription: 'Element selector',
  },
  [ActionTypes.ASSERT_URL]: {
    requiresTarget: false,
    requiresValue: true,
    description: 'Assert the current page URL',
    valueDescription: 'Expected URL or pattern',
  },
  [ActionTypes.SCREENSHOT]: {
    requiresTarget: false,
    requiresValue: false,
    description: 'Take a screenshot of the current page',
  },
});

/**
 * Get all valid action type strings
 */
function getValidActions() {
  return Object.values(ActionTypes);
}

/**
 * Check if an action type is valid
 */
function isValidAction(action) {
  return getValidActions().includes(action);
}

/**
 * Get metadata for an action type
 */
function getActionMeta(action) {
  return ActionMeta[action] || null;
}

module.exports = {
  ActionTypes,
  ActionMeta,
  getValidActions,
  isValidAction,
  getActionMeta,
};
