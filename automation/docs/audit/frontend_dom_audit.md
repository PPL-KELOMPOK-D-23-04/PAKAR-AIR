# Frontend DOM Forensic Audit

## Objective
Discover actual frontend structure and identify fragile locators that need hardening.

## Scope
Scanned `frontend/src/views` and component files.

## Audit Matrix

| Page/View | Element | Existing Selector | Existing ID | Stable | Grade | Fix Required | Action Taken |
|-----------|---------|-------------------|-------------|--------|-------|--------------|--------------|
| `LoginPage.vue` | Email Input | `.form-group:has(input[type="email"])` | `None` -> `#email` | Yes (now) | A | Yes | Injected `#email` |
| `LoginPage.vue` | Password Input | `.form-group:has(input[type="password"])` | `None` -> `#password` | Yes (now) | A | Yes | Injected `#password` |
| `RegisterPage.vue` | Full Name Input | `input[type="text"]` | `#full_name` | Yes | A | No | Already stable |
| `RegisterPage.vue` | Username Input | `input[type="text"]` | `#username` | Yes | A | No | Already stable |
| `AnalysisView.vue` | Prediction Form | `#field-ph`, etc. | Dynamic `#field-*` | Yes | A | No | Already stable |
| `ProfileView.vue` | Name Input | `input[type="text"]` | `None` -> `#profile-name` | Yes (now) | A | Yes | Injected `#profile-name` |
| `ProfileView.vue` | Email Input | `input[type="email"]` | `None` -> `#profile-email` | Yes (now) | A | Yes | Injected `#profile-email` |
| `ProfileView.vue` | Old Pwd Input | `.security-form input` | `None` -> `#profile-old-password` | Yes (now) | A | Yes | Injected `#profile-old-password` |
| `HistoryView.vue` | Search Input | `input.toolbar-input` | `None` -> `#history-search` | Yes (now) | A | Yes | Injected `#history-search` |
| `HistoryView.vue` | Date Input | `input.date-input` | `None` -> `#history-date` | Yes (now) | A | Yes | Injected `#history-date` |

## Conclusion
The frontend has been successfully hardened. All actionable form inputs now utilize Grade A stable IDs, entirely eliminating reliance on structural CSS combinations.
