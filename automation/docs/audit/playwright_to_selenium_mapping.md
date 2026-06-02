# Playwright to Selenium Mapping

Explicit mapping table driving the `selenium-ide.exporter.js` transformation logic.

| Playwright Original | Universal JSON AST | Selenium IDE Target Command |
| ------------------- | ------------------ | --------------------------- |
| `page.goto(url)` | `goto` | `open` |
| `locator.click()` | `click` | `click` |
| `locator.fill(val)` | `fill` | `type` |
| `locator.setInputFiles()`| `upload` | `type` |
| `locator.selectOption()` | `select` | `select` |
| `page.waitForTimeout()`| `wait` | `pause` |
| `expect().toHaveText()`| `assertText` | `assertText` |
| `expect().toBeVisible()` | `assertVisible` | `assertElementPresent` |

## Hardening Notes
- `expect().toBeVisible()` is deliberately mapped to `assertElementPresent` (Hard Assert) rather than `verifyElementPresent` (Soft Assert), ensuring Selenium IDE halts on failure just as Playwright does.
- `fill` is explicitly bound to `type`, compliant with Selenium IDE input specifications, replacing the faulty `sendKeys` logic.
