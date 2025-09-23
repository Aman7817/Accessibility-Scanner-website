// import { runScan } from "../services/scan.service.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import Scan from "../models/scan.model.js";
// import Report from "../models/report.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js"; // Added missing import

// const startScan = asyncHandler(async (req, res, next) => {
//   let scanDoc = null;
//   try {
//     const { url } = req.body;
//     console.log('Received scan request for URL:', url);
//     // Validate URL format
//     const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//     if (!urlPattern.test(url)) {
//       throw new ApiError(400, 'Invalid URL format');
//     }

//     // Create scan document
//     scanDoc = await Scan.create({
//       url,
//       status: 'running',
//       startedAt: new Date(),
//     //   initiatedBy: req.user?._id
//     });
//      console.log('Scan document created:', scanDoc._id);
//     // Run the scanner
//     const result = await runScan(url, String(scanDoc._id));
//     console.log('Scan result:', result);
//     // Create report document
//     const report = await Report.create({
//       scan: scanDoc._id,
//       url,
//       jsonReportPath: result.jsonReportPath,
//       htmlReportPath: result.htmlReportPath,
//       jsonReportFileName: result.jsonReportFileName,
//       htmlReportFileName: result.htmlReportFileName,
//       screenshotFileName: result.screenshotFileName,
//       summary: result.summary,
//       violationsCount: result.summary.total,
//       score: result.summary.score
//     });

//     // Update scan document
//     scanDoc.status = 'completed';
//     scanDoc.finishedAt = new Date();
//     scanDoc.reportId = report._id;
//     scanDoc.score = result.summary.score;
//     scanDoc.violationsCount = result.summary.total;
//     await scanDoc.save();

//     const reportUrl = `/api/v1/reports/${result.htmlReportFileName}`;

//     return res.status(200).json({
//       success: true,
//       data: {
//         scanId: scanDoc._id,
//         reportId: report._id,
//         summary: result.summary,
//         reportUrl,
//         screenshotUrl: `/api/v1/reports/${result.screenshotFileName}`,
//         score: result.summary.score
//       },
//       message: 'Scan completed successfully'
//     });

//   } catch (error) {
//     console.error('Scan failed:', error);

//     if (scanDoc && scanDoc._id) {
//       await Scan.findByIdAndUpdate(scanDoc._id, {
//         status: 'failed',
//         finishedAt: new Date(),
//         error: error.message
//       }).catch(console.error);
//     }

//     return next(new ApiError(500, `Scan failed: ${error.message}`));
//   }
// });

// const getReport = asyncHandler(async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const report = await Report.findById(id).lean();
//     if (!report) {
//       return next(new ApiError(404, 'Report not found'));
//     }
//     return res.json({ success: true, data: report });
//   } catch (error) {
//     next(error);
//   }
// });

// const listReports = asyncHandler(async (req, res, next) => {
//   try {
//     const items = await Report.find().sort({ createdAt: -1 }).limit(20).lean();
//     return res.json({ success: true, data: items });
//   } catch (err) {
//     next(err);
//   }
// });

// export const scanController = {
//   startScan,
//   getReport,
//   listReports
// };


import { runScan } from "../services/scan.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Scan from "../models/scan.model.js";
import Report from "../models/report.model.js";
import { ApiError } from "../utils/ApiError.js";

const startScan = asyncHandler(async (req, res, next) => {
  let scanDoc = null;
  try {
    const { url } = req.body;
    if (!url) throw new ApiError(400, "URL is required");

    console.log("Received scan request for URL:", url);

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

    // ✅ Return clean JSON response
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

    return next(new ApiError(500, `Scan failed: ${error.message}`));
  }
});

const getReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await Report.findById(id).lean();
  if (!report) return next(new ApiError(404, "Report not found"));

  return res.json({ success: true, data: report });
});

const listReports = asyncHandler(async (req, res, next) => {
  const items = await Report.find().sort({ createdAt: -1 }).limit(20).lean();
  return res.json({ success: true, data: items });
});

export const scanController = {
  startScan,
  getReport,
  listReports,
};
