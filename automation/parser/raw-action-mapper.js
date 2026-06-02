/**
 * PAKAR-AIR Automation — Raw Action Mapper
 * Maps raw extracted data into standardized Raw Action objects.
 */

const { isValidAction } = require('../schemas/action-types');

class RawActionMapper {
  /**
   * Map raw components to standard Raw Action
   * @param {object} extracted - { rawAction, rawValue, rawTarget }
   * @returns {object|null} - Standardized Raw Action or null if ignored
   */
  static map({ rawAction, rawValue, rawTarget }) {
    if (!rawAction) return null;

    // Filter out internal/irrelevant actions
    const ignoredActions = ['fixture', 'hook', 'route', 'unroute', 'browser', 'context', 'page', 'evaluate', 'launch', 'create', 'close', 'tracing', 'set', 'expect', 'assert'];
    if (ignoredActions.includes(rawAction)) {
      return null;
    }

    // Strict validation against ActionTypes
    if (!isValidAction(rawAction)) {
      return null;
    }

    // Standardize Target
    let target = rawTarget || '';
    
    // Clean up typical Playwright selector wrapper artifacts if they leak
    if (target.startsWith('css=')) {
      // Keep css= prefix as it's useful for exporters
    } else if (target && !target.startsWith('css=') && !target.startsWith('xpath=')) {
      // Playwright native locators like 'getByRole("button")' etc might be present,
      // The extractor gets whatever is inside locator('...').
      // If it's a CSS selector, we pass it as is.
    }

    // Map to normalized structure
    const rawActionObj = {
      type: rawAction,
      target: target,
      value: rawValue || '',
    };

    // Special mappings
    if (rawAction === 'goto') {
      rawActionObj.target = rawValue; // For goto, the URL is usually the target
      rawActionObj.value = '';
    }

    return rawActionObj;
  }
}

module.exports = { RawActionMapper };
