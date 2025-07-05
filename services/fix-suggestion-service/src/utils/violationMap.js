export const violationMap = {
    'color-contrast': violation => {
        const node = violation.node[0];
        const anyDetails = node.any && node.any[0] && node.any[0].details;
        const background = anyDetails && anyDetails[0] && anyDetails[0].background;
        const color = anyDetails && anyDetails[0] && anyDetails[0].color;

        return {
            message: `The contrast ratio between the text color "${color}" and the background color "${background}" is insufficient.`,
            fix: `Ensure that the contrast ratio meets the minimum requirement of 4.5:1 for normal text and 3:1 for large text.`
        };
    },

  'image-alt': () =>
    'Add meaningful alt text: e.g., <img src="..." alt="Description of image content">',
  'label': () =>
    'Associate form control with a <label> element or use aria-label attribute',
  'heading-order': () =>
    'Ensure headings follow a logical order (e.g., h1 → h2 → h3)',
  // Add more rules as needed
};
