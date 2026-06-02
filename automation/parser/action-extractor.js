/**
 * PAKAR-AIR Automation — Action Extractor
 * Extracts raw data from Playwright test step titles.
 */

class ActionExtractor {
  /**
   * Extract action type, value, and target from a step title
   * @param {string} title - Playwright step title (e.g., "Fill \"value\" locator('#id')")
   * @returns {object} { rawAction, rawValue, rawTarget }
   */
  static extract(title) {
    let rawAction = '';
    let rawValue = '';
    let rawTarget = '';

    // Handle standard Playwright step formats
    if (title.startsWith('Navigate to')) {
      rawAction = 'goto';
      const match = title.match(/Navigate to "([^"]+)"/);
      if (match) rawValue = match[1];
    } 
    else if (title.startsWith('Fill')) {
      rawAction = 'fill';
      const match = title.match(/Fill "([^"]*)" locator\('(.+)'\)/);
      if (match) {
        rawValue = match[1];
        rawTarget = match[2];
      }
    } 
    else if (title.startsWith('Click')) {
      rawAction = 'click';
      const match = title.match(/Click locator\('(.+)'\)/);
      if (match) rawTarget = match[1];
    }
    else if (title.startsWith('Check')) {
      rawAction = 'check';
      const match = title.match(/Check locator\('(.+)'\)/);
      if (match) rawTarget = match[1];
    }
    else if (title.startsWith('Uncheck')) {
      rawAction = 'uncheck';
      const match = title.match(/Uncheck locator\('(.+)'\)/);
      if (match) rawTarget = match[1];
    }
    else if (title.startsWith('Select')) {
      rawAction = 'select';
      const match = title.match(/Select "([^"]*)" locator\('(.+)'\)/);
      if (match) {
        rawValue = match[1];
        rawTarget = match[2];
      } else {
        const locatorMatch = title.match(/locator\('(.+)'\)/);
        if (locatorMatch) rawTarget = locatorMatch[1];
      }
    }
    else if (title.startsWith('setInputFiles') || title.includes('.setInputFiles')) {
      rawAction = 'upload';
      const match = title.match(/setInputFiles(?: "([^"]+)")? locator\('(.+)'\)/);
      if (match) {
        rawValue = match[1] || '';
        rawTarget = match[2];
      } else {
        // Fallback for different Playwright versions
        const fallbackMatch = title.match(/locator\('(.+)'\)\.setInputFiles\("([^"]+)"\)/);
        if (fallbackMatch) {
          rawTarget = fallbackMatch[1];
          rawValue = fallbackMatch[2];
        } else {
          const fallbackMatch2 = title.match(/locator\('(.+)'\)\.setInputFiles/);
          if (fallbackMatch2) rawTarget = fallbackMatch2[1];
        }
      }
    }
    else if (title.startsWith('expect.toBeVisible')) {
      rawAction = 'assertVisible';
      const match = title.match(/expect\.toBeVisible locator\('(.+)'\)/);
      if (match) rawTarget = match[1];
    }
    else if (title.startsWith('expect.toHaveText') || title.startsWith('expect.toContainText')) {
      rawAction = 'assertText';
      const match = title.match(/expect\.(?:toHaveText|toContainText) "([^"]*)" locator\('(.+)'\)/);
      if (match) {
        rawValue = match[1];
        rawTarget = match[2];
      } else {
        // Kadang string tidak ada kutipnya atau format berbeda, coba fallback regex
        const fallback = title.match(/locator\('(.+)'\)/);
        if (fallback) rawTarget = fallback[1];
      }
    }
    else if (title.startsWith('expect.toHaveURL')) {
      rawAction = 'assertUrl';
      const match = title.match(/expect\.toHaveURL (.+)/);
      if (match) {
        rawValue = match[1].replace(/['"/]/g, ''); // bersihkan regex marks if any
      }
    }
    else {
      // Fallback for unmapped actions
      const firstWord = title.split(' ')[0];
      // Jika fallback berasal dari expect, tetap ubah menjadi nama aman
      if (firstWord.startsWith('expect')) {
          rawAction = 'assert'; 
      } else {
          rawAction = firstWord.toLowerCase();
      }
      
      // Try to extract a locator if present
      const locatorMatch = title.match(/locator\('(.+)'\)/);
      if (locatorMatch) rawTarget = locatorMatch[1];
    }

    return { rawAction, rawValue, rawTarget };
  }
}

module.exports = { ActionExtractor };
