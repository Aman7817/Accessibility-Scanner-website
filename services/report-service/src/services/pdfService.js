import PDFDocument from 'pdfkit';

/**
 * Creates a PDF document from the summary and violations.
 * Returns a PDFKit document stream.
 */

export function createPdfStream(summary, violations) {
  const doc = new PDFDocument({margin: 50});

  // Add title
  doc.fontSize(18).text('Accessibility Report', { underline: true });
  doc.moveDown();

  // Add summary
  doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();
  doc.fontSize(14).text(summary);
  doc.fontSize(12).text(JSON.stringify(summary, null, 2));
  doc.addPage();
  

  // Add violations
  if (violations.length > 0) {
    doc.fontSize(14).text('Violations', { underline: true });
    doc.moveDown();
    violations.forEach((violation, index) => {
      doc.text(`${index + 1}. ${violation}`);
      doc.moveDown();
    });
  } else {
    doc.text('No violations found.');
  }

  // Finalize the PDF and end the stream
  doc.end();

  return doc;
}