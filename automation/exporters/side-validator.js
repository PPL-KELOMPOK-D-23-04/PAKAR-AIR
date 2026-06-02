const fs = require('fs');
const path = require('path');

const SELENIUM_DIR = path.join(__dirname, '..', 'output', 'selenium');
const MODULES_DIR = path.join(SELENIUM_DIR, 'modules');

const VALID_COMMANDS = new Set([
  'open', 'click', 'type', 'sendKeys', 'select', 'check', 'uncheck', 
  'pause', 'assertText', 'assertElementPresent', 'verifyText', 'verifyElementPresent',
  'dragAndDropToObject', 'executeScript', 'assert', 'echo'
]);

const INVALID_COMMANDS = new Set([
  'fill', 'locator', 'goto', 'waitForSelector', 'getByRole', 'getByText', 
  'locator.click', 'page.goto', 'upload'
]);

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validateTarget(command, target) {
  if (command === 'open') return target.startsWith('/');
  if (command === 'pause') return !isNaN(Number(target));
  if (command === 'executeScript' || command === 'assert') return true;
  if (command === 'echo') return true;
  
  if (target === '') return false;
  if (
    target.startsWith('css=') ||
    target.startsWith('xpath=') ||
    target.startsWith('id=') ||
    target.startsWith('linkText=') ||
    target.startsWith('name=')
  ) {
    return true;
  }
  return false;
}

function validateFile(filePath) {
  let errors = [];
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Schema Validation
    if (!data.id || !uuidRegex.test(data.id)) errors.push('Invalid or missing project UUID');
    if (data.version !== "2.0") errors.push('Version must be "2.0"');
    if (!data.name) errors.push('Missing project name');
    if (!Array.isArray(data.tests)) errors.push('Tests array missing');
    if (!Array.isArray(data.suites)) errors.push('Suites array missing');

    let testIds = new Set();
    let suiteIds = new Set();

    data.tests.forEach(test => {
      if (!test.id || !uuidRegex.test(test.id)) errors.push(`Test "${test.name}" has invalid UUID`);
      if (testIds.has(test.id)) errors.push(`Duplicate Test ID: ${test.id}`);
      testIds.add(test.id);

      test.commands.forEach(cmd => {
        if (!cmd.id || !uuidRegex.test(cmd.id)) errors.push(`Command in test "${test.name}" has invalid UUID`);
        
        if (!VALID_COMMANDS.has(cmd.command)) {
          errors.push(`Test "${test.name}" uses INVALID/UNKNOWN command: "${cmd.command}"`);
        }
        if (INVALID_COMMANDS.has(cmd.command)) {
          errors.push(`Test "${test.name}" uses PLAYWRIGHT command: "${cmd.command}"`);
        }

        if (!validateTarget(cmd.command, cmd.target)) {
          errors.push(`Test "${test.name}" has invalid target "${cmd.target}" for command "${cmd.command}"`);
        }
      });
    });

    data.suites.forEach(suite => {
      if (!suite.id || !uuidRegex.test(suite.id)) errors.push(`Suite "${suite.name}" has invalid UUID`);
      if (suiteIds.has(suite.id)) errors.push(`Duplicate Suite ID: ${suite.id}`);
      suiteIds.add(suite.id);
    });

  } catch (err) {
    errors.push(`Failed to parse JSON: ${err.message}`);
  }
  return errors;
}

function runValidation() {
  console.log('🔍 Validating Selenium IDE Exports...\n');
  
  let allFiles = [];
  if (fs.existsSync(SELENIUM_DIR)) {
    const files = fs.readdirSync(SELENIUM_DIR).filter(f => f.endsWith('.side'));
    allFiles.push(...files.map(f => path.join(SELENIUM_DIR, f)));
  }
  if (fs.existsSync(MODULES_DIR)) {
    const files = fs.readdirSync(MODULES_DIR).filter(f => f.endsWith('.side'));
    allFiles.push(...files.map(f => path.join(MODULES_DIR, f)));
  }

  if (allFiles.length === 0) {
    console.error('FAIL: No .side files found to validate.');
    process.exit(1);
  }

  let totalErrors = 0;

  allFiles.forEach(file => {
    const errors = validateFile(file);
    if (errors.length > 0) {
      console.log(`❌ FAIL: ${path.basename(file)}`);
      errors.forEach(e => console.log(`   - ${e}`));
      totalErrors += errors.length;
    } else {
      console.log(`✅ PASS: ${path.basename(file)}`);
    }
  });

  if (totalErrors > 0) {
    console.log(`\n❌ Validation FAILED with ${totalErrors} errors.`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL FILES PASSED VALIDATION.`);
  }
}

runValidation();
