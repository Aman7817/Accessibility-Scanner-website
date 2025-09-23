export const axeConfig = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa']
  },
  rules: {
    'color-contrast': { enabled: true },
    'image-alt': { enabled: true },
    label: { enabled: true },
    'landmark-one-main': { enabled: false },
    'document-title': { enabled: true },
    'html-has-lang': { enabled: true },
    'duplicate-id': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'button-name': { enabled: true }
  },
  // Remove resultTypes to get full results
};