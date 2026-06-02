const fs = require('fs');
const path = require('path');

const SELENIUM_DIR = path.resolve(__dirname, 'output', 'selenium');
const MODULES_DIR = path.join(SELENIUM_DIR, 'modules');

function validateSideFile(filePath) {
  let raw, data;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(raw);
  } catch (e) {
    return { valid: false, error: `Invalid JSON: ${e.message}` };
  }

  if (!data.id) return { valid: false, error: 'Missing root id' };
  if (!data.name) return { valid: false, error: 'Missing root name' };
  if (!data.tests || !Array.isArray(data.tests)) return { valid: false, error: 'Missing or invalid tests array' };
  if (!data.suites || !Array.isArray(data.suites)) return { valid: false, error: 'Missing or invalid suites array' };

  // Check duplicate test IDs
  const testIds = new Set();
  for (const t of data.tests) {
    if (!t.id) return { valid: false, error: `Test "${t.name}" missing id` };
    if (testIds.has(t.id)) return { valid: false, error: `Duplicate test ID: ${t.id}` };
    testIds.add(t.id);
  }

  // Check duplicate suite IDs
  const suiteIds = new Set();
  for (const s of data.suites) {
    if (!s.id) return { valid: false, error: `Suite "${s.name}" missing id` };
    if (suiteIds.has(s.id)) return { valid: false, error: `Duplicate suite ID: ${s.id}` };
    suiteIds.add(s.id);
  }

  return { valid: true };
}

function runValidation() {
  console.log('--- SELENIUM IMPORT VALIDATION ---');
  let failed = 0;
  
  // Check Master
  const masterFile = path.join(SELENIUM_DIR, 'speedplay-runtime-engine.side');
  if (fs.existsSync(masterFile)) {
    const res = validateSideFile(masterFile);
    console.log(`[Master] speedplay-runtime-engine.side: ${res.valid ? '✅ VALID' : '❌ FAILED - ' + res.error}`);
    if (!res.valid) failed++;
  } else {
    console.log('[Master] Missing speedplay-runtime-engine.side');
    failed++;
  }

  // Check Modules
  if (fs.existsSync(MODULES_DIR)) {
    const files = fs.readdirSync(MODULES_DIR).filter(f => f.endsWith('.side'));
    for (const f of files) {
      const res = validateSideFile(path.join(MODULES_DIR, f));
      console.log(`[Module] ${f}: ${res.valid ? '✅ VALID' : '❌ FAILED - ' + res.error}`);
      if (!res.valid) failed++;
    }
  }

  console.log('--- END VALIDATION ---');
  if (failed > 0) process.exit(1);
}

runValidation();
