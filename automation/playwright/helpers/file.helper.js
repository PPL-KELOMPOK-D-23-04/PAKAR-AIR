/**
 * PAKAR-AIR — File Helper
 * Utilities for file upload testing
 */

const path = require('path');
const fs = require('fs');

const TEST_DATA_DIR = path.resolve(__dirname, '..', '..', 'test-data', 'images');

/**
 * Get the absolute path to a test file
 */
function getTestFilePath(filename) {
  return path.join(TEST_DATA_DIR, filename);
}

/**
 * Create a test file of specified size (for boundary testing)
 */
function createTestFile(filename, sizeInBytes) {
  const dir = TEST_DATA_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, filename);

  // Create a minimal valid JPEG header then pad
  const jpegHeader = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46,
    0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01,
    0x00, 0x01, 0x00, 0x00, 0xFF, 0xD9,
  ]);

  const remaining = Math.max(0, sizeInBytes - jpegHeader.length);
  const padding = Buffer.alloc(remaining, 0x00);
  const content = Buffer.concat([jpegHeader, padding]);

  fs.writeFileSync(filePath, content);
  return filePath;
}

/**
 * Create a corrupt image file for negative testing
 */
function createCorruptImage(filename = 'corrupt_image.jpg') {
  const filePath = path.join(TEST_DATA_DIR, filename);
  if (!fs.existsSync(TEST_DATA_DIR)) {
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  }
  // Write random bytes that look like a JPEG but are corrupt
  const data = Buffer.from([0xFF, 0xD8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xD9]);
  fs.writeFileSync(filePath, data);
  return filePath;
}

/**
 * Create an invalid format file (txt)
 */
function createInvalidFile(filename = 'invalid_file.txt') {
  const filePath = path.join(TEST_DATA_DIR, filename);
  if (!fs.existsSync(TEST_DATA_DIR)) {
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(filePath, 'This is not an image file.', 'utf-8');
  return filePath;
}

/**
 * Ensure test data directory and basic test files exist
 */
function ensureTestFiles() {
  if (!fs.existsSync(TEST_DATA_DIR)) {
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  }

  // Create invalid file
  createInvalidFile();

  // Create corrupt image
  createCorruptImage();

  // Create a "large" file (~6MB) for boundary testing
  createTestFile('large_file.jpg', 6 * 1024 * 1024);

  // Create a tiny image
  createTestFile('tiny_image.jpg', 100);

  // Create a valid-sized sample (if doesn't exist)
  const samplePath = path.join(TEST_DATA_DIR, 'sample_water.jpg');
  if (!fs.existsSync(samplePath)) {
    createTestFile('sample_water.jpg', 500 * 1024); // 500KB
  }
}

module.exports = {
  getTestFilePath,
  createTestFile,
  createCorruptImage,
  createInvalidFile,
  ensureTestFiles,
  TEST_DATA_DIR,
};
