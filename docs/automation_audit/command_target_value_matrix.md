# Command, Target, & Value Validation Matrix

Every command generated conforms to the exact parameter constraints of Selenium IDE v3.17.4.

### 1. `click`
- **Command**: `click`
- **Target**: `css=.btn-login` (Valid locator)
- **Value**: *(Empty)*

### 2. `type`
- **Command**: `type`
- **Target**: `css=input[type='email']` (Valid locator)
- **Value**: `userpakarair@gmail.com` (Input value)

### 3. `open`
- **Command**: `open`
- **Target**: `/login` (Relative URL)
- **Value**: *(Empty)*

### 4. `assertText`
- **Command**: `assertText`
- **Target**: `css=.error-text` (Valid locator)
- **Value**: `Email invalid` (Expected text)

### 5. `pause`
- **Command**: `pause`
- **Target**: `1000` (Milliseconds)
- **Value**: *(Empty)*

## Conclusion
**PASS**. All commands strictly follow the required `target` vs `value` placement logic.
