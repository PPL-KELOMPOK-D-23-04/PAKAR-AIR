# Locator Validation Report

Validates that no Playwright-specific locator formats leak into the Selenium IDE exports.

## Bad Examples Eradicated
- ❌ `locator("button")` -> Handled by AST Regex
- ❌ `getByRole('button')` -> Handled by XPath conversion mapper
- ❌ `getByText('Login')` -> Handled by XPath conversion mapper

## Target Formats Exported
The exporter forces all targets into strict Selenium IDE syntax:
- `css=...`
- `xpath=...`
- `id=...`

## Single Quotes Enforcement
Selenium IDE has known bugs parsing JSON with escaped double quotes (`css=input[type=\"email\"]`). 
The exporter now actively sanitizes all targets into **single quotes**:
- ✅ `css=input[type='email']`

## Conclusion
**PASS**. Targets are 100% compliant with Selenium IDE locating strategies.
