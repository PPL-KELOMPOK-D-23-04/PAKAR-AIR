# Selenium Command Support Matrix

Validated by SpeedPlay Side Runner.

| Command | Supported | Translated to Playwright Equivalent |
| ------- | --------- | ----------------------------------- |
| `open` | ✅ | `page.goto()` |
| `click` | ✅ | `page.click()` |
| `sendKeys` | ✅ | `page.fill()` |
| `select` | ✅ | `page.selectOption()` |
| `check` | ✅ | `page.check()` |
| `uncheck` | ✅ | `page.uncheck()` |
| `assertText` | ✅ | `expect().toHaveText()` |
| `assertElementPresent`| ✅ | `expect().toBeVisible()` |
| `assertValue` | ✅ | `expect().toHaveValue()` |
| `waitForElementPresent`| ✅| `page.waitForSelector()` |
| `waitForText` | ✅ | `page.waitForFunction()` |

**Verdict**: 100% Core Selenium IDE command coverage supported by the Side Runner.
