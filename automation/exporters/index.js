/**
 * PAKAR-AIR Automation — Exporter Entry Point (CLI)
 *
 * Usage:
 *   node exporters/index.js --format=selenium-ide --input=<universal.json> [--output=<output.side>]
 *   node exporters/index.js --all
 *
 * Pipeline: Universal JSON → Exporter → Target Format
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { SeleniumIDEExporter } = require('./selenium-ide.exporter');

// ─── Exporter Registry ───
const EXPORTERS = {
  'selenium-ide': new SeleniumIDEExporter(),
  // Future: 'cypress': new CypressExporter(),
  // Future: 'robot-framework': new RobotFrameworkExporter(),
};

// ─── CLI Arguments ───
const args = process.argv.slice(2);
const argMap = {};
args.forEach((arg) => {
  if (arg.startsWith('--')) {
    const [key, ...valueParts] = arg.slice(2).split('=');
    argMap[key] = valueParts.join('=') || true;
  }
});

const JSON_DIR = path.resolve(__dirname, '..', 'output', 'json');
const SELENIUM_DIR = path.resolve(__dirname, '..', 'output', 'selenium');

/**
 * Export a single Universal JSON file
 */
function exportSingleFile(inputPath, outputPath, format = 'selenium-ide') {
  console.log(`\n📤 Exporting: ${inputPath}`);
  console.log(`   Format: ${format}`);

  const exporter = EXPORTERS[format];
  if (!exporter) {
    console.error(`❌ Unknown format: ${format}`);
    console.log(`   Available formats: ${Object.keys(EXPORTERS).join(', ')}`);
    process.exit(1);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ File not found: ${inputPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, 'utf-8');
  const universalJSON = JSON.parse(raw);

  // Export
  const output = exporter.export(universalJSON);

  // Write
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, output, 'utf-8');
  console.log(`   ✅ Output: ${outputPath}`);

  return output;
}

/**
 * Export all Universal JSON files in output/json/ into a SINGLE merged file
 */
function exportAllFiles(format = 'selenium-ide') {
  console.log(`\n🔍 Scanning for Universal JSON files in ${JSON_DIR}...`);

  if (!fs.existsSync(JSON_DIR)) {
    console.error(`❌ JSON output directory not found: ${JSON_DIR}`);
    console.log('   Run "npm run parse:all" first to generate Universal JSON files.');
    process.exit(1);
  }

  const jsonFiles = findJsonFiles(JSON_DIR);
  console.log(`   Found ${jsonFiles.length} JSON file(s)\n`);

  if (jsonFiles.length === 0) {
    console.log('   No JSON files found. Run "npm run parse:all" first.');
    return;
  }

  const exporter = EXPORTERS[format];
  if (!exporter) {
    console.error(`❌ Unknown format: ${format}`);
    process.exit(1);
  }

  // Phase 4: Single Selenium Export (Merge all suites)
  const masterJSON = {
    id: uuidv4(),
    name: 'PAKAR-AIR Master Test Suite',
    baseUrl: 'http://localhost:5173',
    suites: []
  };

  const results = [];
  
  // 1. Baca seluruh Universal JSON
  // 5. Menjaga urutan suite (Auth -> Analysis -> History -> Profile -> Notification -> Admin -> E2E)
  const order = ['auth', 'analysis', 'history', 'profile', 'notification', 'admin', 'e2e'];
  
  jsonFiles.sort((a, b) => {
    const nameA = path.basename(a, '.json').toLowerCase();
    const nameB = path.basename(b, '.json').toLowerCase();
    let indexA = order.findIndex(o => nameA.includes(o));
    let indexB = order.findIndex(o => nameB.includes(o));
    if (indexA === -1) indexA = 99;
    if (indexB === -1) indexB = 99;
    return indexA - indexB;
  });

  for (const jsonFile of jsonFiles) {
    try {
      const raw = fs.readFileSync(jsonFile, 'utf-8');
      const universalJSON = JSON.parse(raw);
      // 2. Merge seluruh suite & 3. merge seluruh test
      if (universalJSON.suites && Array.isArray(universalJSON.suites)) {
        masterJSON.suites.push(...universalJSON.suites);
      }
      results.push({ file: jsonFile, success: true });
    } catch (err) {
      console.error(`   ❌ Error reading ${jsonFile}: ${err.message}`);
      results.push({ file: jsonFile, error: err.message, success: false });
    }
  }

  // 6. Menghasilkan 1 file Selenium IDE
  const outputPath = path.join(SELENIUM_DIR, 'speedplay-runtime-engine' + exporter.extension);
  
  console.log(`\n📤 Exporting Merged Project...`);
  console.log(`   Format: ${format}`);
  
  // Exporter's _doExport naturally deduplicates IDs because it generates new UUIDs
  // 4. Deduplicate ID logic is handled safely by UUID generation inside the exporter.
  const outputStr = exporter.export(masterJSON);

  if (!fs.existsSync(SELENIUM_DIR)) {
    fs.mkdirSync(SELENIUM_DIR, { recursive: true });
  }
  fs.writeFileSync(outputPath, outputStr, 'utf-8');
  console.log(`   ✅ Output: ${outputPath}`);

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Export Summary (Merged)');
  console.log('═'.repeat(60));
  console.log(`  Format:  ${format}`);
  console.log(`  Merged:  ${jsonFiles.length} files`);
  console.log(`  Output:  ${outputPath}`);
  console.log('═'.repeat(60));

  return results;
}

/**
 * Export all Universal JSON files as individual modular files
 */
function exportModularFiles(format = 'selenium-ide') {
  console.log(`\n🔍 Scanning for Universal JSON files in ${JSON_DIR}...`);

  if (!fs.existsSync(JSON_DIR)) {
    console.error(`❌ JSON output directory not found: ${JSON_DIR}`);
    process.exit(1);
  }

  const jsonFiles = findJsonFiles(JSON_DIR);
  if (jsonFiles.length === 0) {
    console.log('   No JSON files found.');
    return;
  }

  const moduleDir = path.join(SELENIUM_DIR, 'modules');
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }

  const exporter = EXPORTERS[format];
  if (!exporter) {
    console.error(`❌ Unknown format: ${format}`);
    process.exit(1);
  }

  console.log(`\n📤 Exporting Modular Project...`);
  
  for (const jsonFile of jsonFiles) {
    const filename = path.basename(jsonFile, '.json');
    const outputPath = path.join(moduleDir, filename + exporter.extension);
    exportSingleFile(jsonFile, outputPath, format);
  }

  console.log('\n' + '═'.repeat(60));
  console.log('📊 Export Summary (Modular)');
  console.log('═'.repeat(60));
  console.log(`  Format:  ${format}`);
  console.log(`  Exported:  ${jsonFiles.length} files`);
  console.log(`  Directory: ${moduleDir}`);
  console.log('═'.repeat(60));
}

/**
 * Recursively find all .json files
 */
function findJsonFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findJsonFiles(fullPath));
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * List available exporters
 */
function listExporters() {
  console.log('\nAvailable Exporters:');
  for (const [key, exporter] of Object.entries(EXPORTERS)) {
    const info = exporter.getInfo();
    console.log(`  - ${key}: ${info.name} (${info.extension})`);
  }
}

// ─── Main ───
if (require.main === module) {
  const format = argMap.format || 'selenium-ide';

  if (argMap.all) {
    exportAllFiles(format);
  } else if (argMap.modular) {
    exportModularFiles(format);
  } else if (argMap.input) {
    const inputPath = path.resolve(argMap.input);
    const exporter = EXPORTERS[format];
    const ext = exporter ? exporter.extension : '.side';
    const outputPath = argMap.output
      ? path.resolve(argMap.output)
      : path.join(SELENIUM_DIR, path.basename(inputPath).replace('.json', ext));
    exportSingleFile(inputPath, outputPath, format);
  } else if (argMap.list) {
    listExporters();
  } else {
    console.log(`
PAKAR-AIR Automation Exporter
================================
Usage:
  node exporters/index.js --format=selenium-ide --input=<universal.json> [--output=<file.side>]
  node exporters/index.js --format=selenium-ide --all
  node exporters/index.js --list

Options:
  --format  Export format (default: selenium-ide)
  --input   Path to a Universal JSON file
  --output  Path for the output file (optional)
  --all     Export all JSON files into a single master file
  --modular Export all JSON files into individual module files
  --list    List available exporters
`);
  }
}

module.exports = {
  EXPORTERS,
  exportSingleFile,
  exportAllFiles,
  exportModularFiles,
};
