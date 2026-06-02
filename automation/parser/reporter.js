/**
 * PAKAR-AIR Automation — Custom Runtime Reporter
 * Replaces static parser. Hooked directly into Playwright execution.
 * Flow: Playwright Execution -> Reporter -> RawActionMapper -> AST -> Universal JSON
 */

const fs = require('fs');
const path = require('path');
const { ActionExtractor } = require('./action-extractor');
const { RawActionMapper } = require('./raw-action-mapper');
const { ASTBuilder } = require('../ast/builder');
const { validateAST } = require('../ast/validator');
const { transformToUniversalJSON } = require('./transformer');

class RuntimeParserReporter {
  constructor(options = {}) {
    this.options = options;
    this.suites = new Map(); // Maps filename -> ASTBuilder (TestSuite)
  }

  onTestBegin(test, result) {
    // Initialize suite if not exists
    const file = path.basename(test.location.file);
    if (!this.suites.has(file)) {
      const suiteName = test.parent ? test.parent.title : file;
      const builder = new ASTBuilder(file);
      builder.beginSuite(suiteName);
      this.suites.set(file, builder);
    }
  }

  onTestEnd(test, result) {
    const file = path.basename(test.location.file);
    const builder = this.suites.get(file);
    
    if (!builder) return;

    // Start a new test case in AST
    builder.beginTest(test.title);

    // Extract all raw actions recursively
    const rawActions = [];
    const extractSteps = (steps) => {
      for (const step of steps) {
        if (step.category === 'pw:api' || step.category === 'expect') {
          const extracted = ActionExtractor.extract(step.title);
          const rawAction = RawActionMapper.map(extracted);
          if (rawAction) {
            rawActions.push(rawAction);
          }
        }
        if (step.steps && step.steps.length > 0) {
          extractSteps(step.steps);
        }
      }
    };

    extractSteps(result.steps);

    // Add steps to AST
    for (const rawAction of rawActions) {
      builder.addStep(rawAction.type, rawAction.target, rawAction.value);
    }
  }

  async onEnd(result) {
    console.log(`\n[Runtime Parser] Processing ${this.suites.size} test suites...`);
    const outputDir = path.resolve(__dirname, '..', 'output', 'json');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let successCount = 0;
    
    for (const [filename, builder] of this.suites.entries()) {
      try {
        const ast = builder.build();
        
        // Validate AST
        const validation = validateAST(ast);
        if (!validation.valid) {
          console.error(`[Runtime Parser] Invalid AST for ${filename}:`, validation.errors);
          continue;
        }

        // Transform to Universal JSON
        const universalJSON = transformToUniversalJSON(ast);
        
        // Ensure name is clean
        universalJSON.name = filename.replace('.spec.js', '');

        // Save JSON
        const outFile = path.join(outputDir, filename.replace('.spec.js', '.json'));
        fs.writeFileSync(outFile, JSON.stringify(universalJSON, null, 2));
        
        console.log(`[Runtime Parser] ✅ Generated: ${outFile}`);
        successCount++;
      } catch (err) {
        console.error(`[Runtime Parser] ❌ Failed processing ${filename}:`, err.message);
      }
    }
    
    console.log(`[Runtime Parser] Finished. Successfully generated ${successCount}/${this.suites.size} Universal JSON files.\n`);
  }
}

module.exports = RuntimeParserReporter;
