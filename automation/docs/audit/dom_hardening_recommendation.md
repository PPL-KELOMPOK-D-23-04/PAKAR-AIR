# Zero Defect DOM Hardening

## Objective
Identify unstable Grade D or C locators in the frontend and inject robust Grade A (IDs) selectively to achieve ZERO defects.

## Hardening Decisions

### 1. `LoginPage.vue`
- **Issue**: Input fields were selected using `.form-group:has(input[type="email"])`. This is fragile to DOM reordering.
- **Action**: Injected `id="email"` and `id="password"`.
- **Status**: Executed & Playwright Updated.

### 2. `ProfileView.vue`
- **Issue**: Inputs were targeted via `input[type="text"]` and `[placeholder="..."]`, which breaks immediately upon localization or placeholder changes.
- **Action**: Injected `#profile-name`, `#profile-email`, `#profile-old-password`, `#profile-new-password`, `#profile-confirm-password`.
- **Status**: Executed & Playwright Updated.

### 3. `HistoryView.vue`
- **Issue**: Search and date filters targeted using chained CSS `.toolbar-input`.
- **Action**: Injected `#history-search` and `#history-date`.
- **Status**: Executed & Playwright Updated.

### 4. `AnalysisView.vue`
- **Issue**: Previously stable (`#field-ph`, etc.).
- **Action**: None required.
- **Status**: Verified.

### 5. `RegisterPage.vue`
- **Issue**: Previously stable (`#full_name`, `#username`, `#email`, `#password`).
- **Action**: None required.
- **Status**: Verified.

## Conclusion
We have completed the targeted DOM hardening. The DOM structure is now mathematically synchronized with the Playwright locators. No blind mass-injection occurred; only proven fragile locators were replaced.
