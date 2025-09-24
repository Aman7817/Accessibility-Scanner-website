import { runScan } from "../services/scan.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Scan from "../models/scan.model.js";
import Report from "../models/report.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateScanReportPDF , generateTextReport} from "../utils/genratePdf.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startScan = asyncHandler(async (req, res, next) => {
  let scanDoc = null;
  try {
    const { url } = req.body;
    if (!url) throw new ApiError(400, "URL is required");

    console.log("Received scan request for URL:", url);

    // Validate URL format
    try {
      new URL(url);
    } catch (err) {
      throw new ApiError(400, "Invalid URL format");
    }

    // Create scan doc
    scanDoc = await Scan.create({
      url,
      status: "running",
      startedAt: new Date(),
    });

    console.log("Scan document created:", scanDoc._id);

    // Run scanner
    const result = await runScan(url, String(scanDoc._id));
    console.log(`[scan:${scanDoc._id}] runScan completed.`);

    // Save report in DB
    const report = await Report.create({
      scan: scanDoc._id,
      url,
      jsonReportPath: result.jsonReportPath,
      htmlReportPath: result.htmlReportPath,
      jsonReportFileName: result.jsonReportFileName,
      htmlReportFileName: result.htmlReportFileName,
      screenshotFileName: result.screenshotFileName,
      summary: result.summary,
      violationsCount: result.summary.total,
      score: result.summary.score,
    });

    // Update scan doc
    scanDoc.status = "completed";
    scanDoc.finishedAt = new Date();
    scanDoc.reportId = report._id;
    scanDoc.score = result.summary.score;
    scanDoc.violationsCount = result.summary.total;
    await scanDoc.save();

    // Return response
    return res.status(200).json({
      success: true,
      message: "Scan completed successfully",
      data: {
        scanId: scanDoc._id,
        reportId: report._id,
        score: result.summary.score,
        violations: result.summary.total,
        summary: result.summary,
        reportLinks: {
          json: `/reports/${result.jsonReportFileName}`,
          html: `/reports/${result.htmlReportFileName}`,
          screenshot: `/reports/${result.screenshotFileName}`,
        },
      },
    });
  } catch (error) {
    console.error("Scan failed:", error);

    if (scanDoc && scanDoc._id) {
      await Scan.findByIdAndUpdate(scanDoc._id, {
        status: "failed",
        finishedAt: new Date(),
        error: error.message,
      }).catch(console.error);
    }

    let errorMessage = error.message;
    if (error.message.includes('axe not available')) {
      errorMessage = 'Accessibility engine failed to load. Please try again.';
    } else if (error.message.includes('Navigation failed')) {
      errorMessage = `Cannot access URL: ${error.message}`;
    }

    return next(new ApiError(500, `Scan failed: ${errorMessage}`));
  }
});

const getScan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const scan = await Scan.findById(id).populate('reportId').lean();
  if (!scan) return next(new ApiError(404, "Scan not found"));

  return res.json({ success: true, data: scan });
});

const listScans = asyncHandler(async (req, res, next) => {
  try {
    const scans = await Scan.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('reportId');
    res.json({ success: true, data: scans });
  } catch (error) {
    throw new ApiError(500, `Could not fetch scans: ${error.message}`);
  }
});

const getReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findById(id).lean();
  if (!report) return next(new ApiError(404, "Report not found"));
  if (!report.htmlReportFileName) throw new ApiError(404, "HTML Report file name not found");

  const reportPath = path.join(process.env.REPORT_DIR || path.join(process.cwd(), "reports"), report.htmlReportFileName);

  if (!fs.existsSync(reportPath)) throw new ApiError(404, "HTML report file not found on server");

  return res.sendFile(reportPath);
});

const getJsonReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findById(id).lean();
  if (!report) return next(new ApiError(404, "Report not found"));
  if (!report.jsonReportFileName) throw new ApiError(404, "JSON Report file name not found");

  const reportPath = path.join(process.env.REPORT_DIR || path.join(process.cwd(), "reports"), report.jsonReportFileName);

  if (!fs.existsSync(reportPath)) throw new ApiError(404, "JSON report file not found on server");

  return res.sendFile(reportPath);
});

const getScreenshot = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findById(id).lean();
  if (!report) return next(new ApiError(404, "Report not found"));
  if (!report.screenshotFileName) throw new ApiError(404, "Screenshot file name not found");

  const screenshotPath = path.join(process.env.REPORT_DIR || path.join(process.cwd(), "reports"), report.screenshotFileName);

  if (!fs.existsSync(screenshotPath)) throw new ApiError(404, "Screenshot file not found on server");

  return res.sendFile(screenshotPath);
});

const listReports = asyncHandler(async (req, res, next) => {
  const items = await Report.find().sort({ createdAt: -1 }).limit(20).lean();
  return res.json({ success: true, data: items });
 });
// const deleteScan = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log("Delete request for scan ID:", id); // 👈 add this
//     const scan = await Scan.findById(id);
//     if (!scan) {
//       console.log("Scan not found in DB!");
//       throw new ApiError(404, "Scan not found");
//     }
//     await scan.remove(); // or Scan.findByIdAndDelete(id)

//     res.status(200).json({
//       success: true,
//       message: "Scan deleted successfully",
//     });
//   } catch (err) {
//     next(err);
//   }
// };



const deleteScan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log('[scan] DELETE request received for id:', id);

  // validate id presence
  if (!id) return next(new ApiError(400, 'Scan id is required'));

  // find scan
  const scan = await Scan.findById(id);
  if (!scan) {
    console.log(`[scan] Scan not found: ${id}`);
    return next(new ApiError(404, 'Scan not found'));
  }

  // If there is an associated report, delete its DB doc and files
  try {
    if (scan.reportId) {
      const report = await Report.findById(scan.reportId);
      if (report) {
        const reportDir = process.env.REPORT_DIR || path.join(process.cwd(), 'reports');

        const filesToDelete = [
          report.jsonReportFileName,
          report.htmlReportFileName,
          report.screenshotFileName
        ].filter(Boolean);

        for (const fname of filesToDelete) {
          const filePath = path.join(reportDir, fname);
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log(`[scan] Deleted file: ${filePath}`);
            }
          } catch (fsErr) {
            console.warn(`[scan] Failed to delete file ${filePath}:`, fsErr.message);
          }
        }

        // delete report doc
        await Report.findByIdAndDelete(report._id);
        console.log(`[scan] Deleted report doc: ${report._id}`);
      } else {
        console.log(`[scan] reportId present but report not found: ${scan.reportId}`);
      }
    }

    // finally delete scan doc
    await Scan.findByIdAndDelete(id);
    console.log(`[scan] Deleted scan doc: ${id}`);

    return res.status(200).json({
      success: true,
      message: 'Scan deleted successfully'
    });
  } catch (err) {
    console.error('[scan] deleteScan error:', err);
    return next(err);
  }
});

// // GET /api/v1/scan/stats
// export const getStats = asyncHandler(async (req, res, next) => {
//   // If you have req.user, filter by user: { createdBy: req.user._id }
//   const total = await Scan.countDocuments();
//   const completed = await Scan.countDocuments({ status: "completed" });
//   const failed = await Scan.countDocuments({ status: "failed" });
//   const agg = await Scan.aggregate([
//     { $match: { score: { $exists: true } } },
//     { $group: { _id: null, avgScore: { $avg: "$score" } } }
//   ]);
//   const avgScore = agg[0] ? Math.round(agg[0].avgScore) : 0;
//   const last = await Scan.findOne().sort({ createdAt: -1 }).lean();

//   res.json({
//     success: true,
//     data: {
//       total, completed, failed, avgScore, lastScan: last ? last.createdAt : null
//     }
//   });
// });

// // GET /api/v1/scan/scheduled
// // NOTE: if you don't implement scheduling now, return [] — placeholder
// export const getScheduled = asyncHandler(async (req, res, next) => {
//   // If you implement scheduled scans collection, query that model instead.
//   // For now return empty list to keep frontend happy.
//   res.json({ success: true, data: [] });
// });

// // GET /api/v1/scan/export
// export const exportScans = asyncHandler(async (req, res, next) => {
//   const items = await Scan.find().sort({ createdAt: -1 }).lean();
//   const filename = `scans-export-${new Date().toISOString()}.json`;
//   res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify(items, null, 2));
// });

// scan.controller.js में नया function add करें


const downloadReport = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find the report with scan details
    const report = await Report.findById(id).populate('scan');
    if (!report) {
      return res.status(404).json({ 
        success: false, 
        message: 'Report not found' 
      });
    }

    // Check if we have basic report data
    if (!report.summary && report.violationsCount === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'No scan data available for download' 
      });
    }

    try {
      // Try to generate PDF using the utility function
      const pdfBuffer = await generateScanReportPDF(report);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=security-scan-${id}.pdf`);
      res.send(pdfBuffer);
      
    } catch (pdfError) {
      console.warn('PDF generation failed, falling back to text:', pdfError);
      
      // Fallback to text report if PDF fails
      const textContent = generateTextReport(report);
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename=security-scan-${id}.txt`);
      res.send(textContent);
    }
    
  } catch (error) {
    console.error('Download report error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to download report' 
    });
  }
});



export const scanController = {
  startScan,
  getScan,
  listScans,
  getReport,
  getJsonReport,
  getScreenshot,
  listReports,
  deleteScan,
  downloadReport
};
