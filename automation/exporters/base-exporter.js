/**
 * PAKAR-AIR Automation — Base Exporter
 *
 * Abstract base class for all exporters.
 * Enforces the Universal JSON → Target Format contract.
 */

class BaseExporter {
  /**
   * @param {string} name - Exporter name (e.g., 'Selenium IDE')
   * @param {string} format - Output format identifier (e.g., 'selenium-ide')
   * @param {string} extension - File extension (e.g., '.side')
   */
  constructor(name, format, extension) {
    if (new.target === BaseExporter) {
      throw new Error('BaseExporter is abstract and cannot be instantiated directly.');
    }
    this.name = name;
    this.format = format;
    this.extension = extension;
  }

  /**
   * Export Universal JSON to target format
   * @param {object} universalJSON - The Universal JSON object
   * @param {object} options - Export options
   * @returns {string} Serialized output string
   */
  export(universalJSON, options = {}) {
    this._validateInput(universalJSON);
    return this._doExport(universalJSON, options);
  }

  /**
   * Implement in subclass — the actual export logic
   * @abstract
   */
  _doExport(universalJSON, options) {
    throw new Error(`${this.name}: _doExport() must be implemented by subclass.`);
  }

  /**
   * Validate the Universal JSON input
   * @private
   */
  _validateInput(universalJSON) {
    if (!universalJSON || typeof universalJSON !== 'object') {
      throw new Error(`${this.name}: Input must be a Universal JSON object.`);
    }

    if (!universalJSON.id) {
      throw new Error(`${this.name}: Universal JSON must have an 'id' field.`);
    }

    if (!universalJSON.suites || !Array.isArray(universalJSON.suites)) {
      throw new Error(`${this.name}: Universal JSON must have a 'suites' array.`);
    }

    if (universalJSON.suites.length === 0) {
      throw new Error(`${this.name}: Universal JSON must contain at least one suite.`);
    }
  }

  /**
   * Get exporter info
   */
  getInfo() {
    return {
      name: this.name,
      format: this.format,
      extension: this.extension,
    };
  }
}

module.exports = { BaseExporter };
