// Axe-core configuration for accessibility scan
// Reference: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter

export const axeConfig = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa'] // WCAG 2.0/2.1 A & AA level rules
  },
  rules: {
    'color-contrast': { enabled: true },       // Ensure text has good contrast
    'image-alt': { enabled: true },            // Ensure <img> has meaningful alt
    'label': { enabled: true },                // Ensure form inputs have labels
    'landmark-one-main': { enabled: false },   // Disable noisy rule (optional)
    'document-title': { enabled: true },       // Check for <title> tag in <head>
    'html-has-lang': { enabled: true },        // Ensure <html> has lang attribute
    'duplicate-id': { enabled: true }          // Avoid duplicate id attributes
  },
  // Optional: customize result reporting
  resultTypes: ['violations']  // Only return failed checks (can also include 'incomplete', etc.)
};
