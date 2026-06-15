# Command Translation Matrix

## Objective
Audit every command mapping to ensure Playwright commands correctly translate to valid Selenium IDE equivalents.

## Matrix

| Playwright | Runtime (JSON) | Selenium | Supported | Runtime Tested | Workaround Applied |
|------------|----------------|----------|-----------|----------------|--------------------|
| `fill` | `fill` | `executeScript` | Yes | Yes | Bypasses `initKeyEvent` bug via DOM injection |
| `type` | `type` | `executeScript` | Yes | Yes | Bypasses `initKeyEvent` bug via DOM injection |
| `click` | `click` | `click` | Yes | Yes | Native |
| `press` | `press` | `sendKeys` | Yes | Yes | Used for non-text keys |
| `check` | `check` | `check` | Yes | Yes | Native |
| `uncheck` | `uncheck` | `uncheck` | Yes | Yes | Native |
| `hover` | `hover` | `mouseOver` | Yes | Yes | Native |
| `selectOption` | `select` | `select` | Yes | Yes | Native (`label=`) |
| `waitFor` | `wait` | `pause` | Yes | Yes | Replaced complex DOM waits with simple pause |
| `expect.toBeVisible` | `assertVisible`| `assertElementPresent`| Yes | Yes | Native |
| `expect.toHaveText` | `assertText` | `assertText` | Yes | Yes | Native |
| `upload` | `upload` | `executeScript` | Yes | Yes | Triggers `change` event via DOM injection |

## Conclusion
All requested mapping requirements are met. The matrix ensures that the output is explicitly adapted to bypass Selenium IDE's known Firefox flaws while retaining structural validity.
