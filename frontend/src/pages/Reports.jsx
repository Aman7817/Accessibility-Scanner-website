// // import React from 'react'

// // const Report = () => {
// //   return (
// //     <div>
// //       <h1 className="text-2xl font-semibold text-slate-700">Accessibility Report</h1>
// //       <p className="mt-2 text-gray-600">Detailed issues and suggestions will appear here.</p>
// //     </div>
// //   )
// // }

// // export default Report

// import React, { useEffect, useRef, useState } from "react";

// /**
//  * ReportPage.jsx
//  * - Dummy report list
//  * - View report (modal)
//  * - Download JSON (simulated)
//  * - Delete report
//  *
//  * Tailwind classes used to match your project's style.
//  */

// const sampleReports = [
//   {
//     id: "r-1",
//     url: "https://example.com",
//     scannedAt: "2025-09-18T10:30:00.000Z",
//     score: 85,
//     violations: 3,
//     warnings: 5,
//     passedChecks: 42,
//     issues: [
//       {
//         id: "i1",
//         type: "Violation",
//         severity: "High",
//         selector: "img[alt=\"\"]",
//         description: "Image elements must have alternative text.",
//       },
//       {
//         id: "i2",
//         type: "Violation",
//         severity: "Medium",
//         selector: "button[aria-label]",
//         description: "Button labels should be descriptive.",
//       },
//       {
//         id: "i3",
//         type: "Warning",
//         severity: "Low",
//         selector: "a",
//         description: "Links should have visible focus styles.",
//       },
//     ],
//   },
//   {
//     id: "r-2",
//     url: "https://demo-site.org",
//     scannedAt: "2025-09-17T15:12:00.000Z",
//     score: 62,
//     violations: 12,
//     warnings: 8,
//     passedChecks: 30,
//     issues: [
//       {
//         id: "i4",
//         type: "Violation",
//         severity: "High",
//         selector: "form > input:not([aria-label])",
//         description: "Form controls should have accessible names.",
//       },
//     ],
//   },
// ];

// function formatDate(iso) {
//   const d = new Date(iso);
//   return d.toLocaleString();
// }

// export default function ReportPage() {
//   const [reports, setReports] = useState(sampleReports);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [message, setMessage] = useState("");
//   const modalCloseRef = useRef(null);
//   const lastFocusedRef = useRef(null);
//   const liveRegionRef = useRef(null);

//   // Open modal and set focus to close button for accessibility
//   const openReport = (report) => {
//     lastFocusedRef.current = document.activeElement;
//     setSelectedReport(report);
//   };

//   // Close modal and restore focus
//   const closeReport = () => {
//     setSelectedReport(null);
//     if (lastFocusedRef.current) lastFocusedRef.current.focus();
//   };

//   // When modal opens, focus the close button
//   useEffect(() => {
//     if (selectedReport && modalCloseRef.current) {
//       modalCloseRef.current.focus();
//     }
//   }, [selectedReport]);

//   // Remove a report
//   const handleDelete = (id) => {
//     const updated = reports.filter((r) => r.id !== id);
//     setReports(updated);
//     setMessage("Report deleted.");
//     if (liveRegionRef.current) {
//       liveRegionRef.current.textContent = "Report deleted";
//     }
//     setTimeout(() => setMessage(""), 2500);
//   };

//   // Download report as JSON file (simulated)
//   const handleDownload = (report) => {
//     const data = JSON.stringify(report, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${new URL(report.url).hostname}-accessibility-report.json`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);

//     setMessage("Download started");
//     if (liveRegionRef.current) {
//       liveRegionRef.current.textContent = "Report download started";
//     }
//     setTimeout(() => setMessage(""), 2000);
//   };

//   return (
//     <main className="min-h-[70vh] p-6 bg-slate-50">
//       <div className="max-w-6xl mx-auto">
//         <header className="mb-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Your Accessibility Reports</h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Saved scan results for your account. Click <strong>View</strong> to open a detailed report.
//             </p>
//           </div>
//           <div className="text-right">
//             <span className="text-sm text-slate-500 block">Reports: <strong className="text-slate-700">{reports.length}</strong></span>
//           </div>
//         </header>

//         {/* Live region for announcements */}
//         <div aria-live="polite" className="sr-only" ref={liveRegionRef}></div>

//         {/* Empty state */}
//         {reports.length === 0 ? (
//           <section className="rounded-lg border border-dashed border-slate-200 p-8 text-center">
//             <h2 className="text-lg font-medium text-slate-700">No reports yet</h2>
//             <p className="text-sm text-slate-500 mt-2">Run your first accessibility scan on the Home page to generate reports.</p>
//           </section>
//         ) : (
//           <>
//             {/* Table for md+ screens */}
//             <section className="hidden md:block bg-white border border-slate-200 rounded-lg shadow-sm overflow-x-auto">
//               <table className="w-full table-auto">
//                 <thead className="bg-slate-50">
//                   <tr>
//                     <th className="text-left px-4 py-3 text-sm text-slate-600">Website</th>
//                     <th className="text-left px-4 py-3 text-sm text-slate-600">Scanned At</th>
//                     <th className="text-left px-4 py-3 text-sm text-slate-600">Score</th>
//                     <th className="text-left px-4 py-3 text-sm text-slate-600">Violations</th>
//                     <th className="text-left px-4 py-3 text-sm text-slate-600">Warnings</th>
//                     <th className="px-4 py-3 text-sm text-slate-600">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reports.map((r) => (
//                     <tr key={r.id} className="border-t">
//                       <td className="px-4 py-3">
//                         <div className="text-sm text-slate-800">{r.url}</div>
//                         <div className="text-xs text-slate-500">{new URL(r.url).hostname}</div>
//                       </td>
//                       <td className="px-4 py-3 text-sm text-slate-600">{formatDate(r.scannedAt)}</td>
//                       <td className="px-4 py-3">
//                         <div className="inline-flex items-center gap-3">
//                           <div className="text-sm font-semibold">{r.score}%</div>
//                           <div className="text-xs text-slate-400">passed: {r.passedChecks}</div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm text-red-600">{r.violations}</td>
//                       <td className="px-4 py-3 text-sm text-amber-500">{r.warnings}</td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => openReport(r)}
//                             className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                             aria-label={`View report for ${r.url}`}
//                           >
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleDownload(r)}
//                             className="px-3 py-1 text-sm rounded-md border border-slate-300 hover:bg-slate-50 focus:outline-none"
//                             aria-label={`Download report for ${r.url}`}
//                           >
//                             Download
//                           </button>
//                           <button
//                             onClick={() => handleDelete(r.id)}
//                             className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100 focus:outline-none"
//                             aria-label={`Delete report for ${r.url}`}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </section>

//             {/* Cards for small screens */}
//             <section className="md:hidden space-y-4">
//               {reports.map((r) => (
//                 <article key={r.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="text-sm font-semibold text-slate-800">{r.url}</div>
//                       <div className="text-xs text-slate-500">{formatDate(r.scannedAt)}</div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-sm font-bold">{r.score}%</div>
//                       <div className="text-xs text-slate-400">violations: {r.violations}</div>
//                     </div>
//                   </div>

//                   <div className="mt-3 flex gap-2">
//                     <button
//                       onClick={() => openReport(r)}
//                       className="flex-1 px-3 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleDownload(r)}
//                       className="px-3 py-2 text-sm rounded-md border border-slate-300"
//                     >
//                       Download
//                     </button>
//                   </div>
//                 </article>
//               ))}
//             </section>
//           </>
//         )}

//         {/* Modal for selected report */}
//         {selectedReport && (
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="report-title"
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             {/* backdrop */}
//             <div
//               className="absolute inset-0 bg-black/50"
//               onClick={closeReport}
//               aria-hidden="true"
//             />
//             <div className="relative z-10 max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh]">
//               <header className="flex items-start justify-between p-4 border-b">
//                 <div>
//                   <h2 id="report-title" className="text-lg font-semibold text-slate-800">
//                     Report — {selectedReport.url}
//                   </h2>
//                   <p className="text-xs text-slate-500 mt-1">Scanned: {formatDate(selectedReport.scannedAt)}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     ref={modalCloseRef}
//                     onClick={() => handleDownload(selectedReport)}
//                     className="px-3 py-1 text-sm rounded-md border"
//                     aria-label="Download current report"
//                   >
//                     Download
//                   </button>
//                   <button
//                     onClick={closeReport}
//                     className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
//                     aria-label="Close report dialog"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </header>

//               <div className="p-4">
//                 <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="p-4 bg-slate-50 rounded">
//                     <div className="text-xs text-slate-500">Score</div>
//                     <div className="text-2xl font-bold text-slate-800">{selectedReport.score}%</div>
//                   </div>
//                   <div className="p-4 bg-slate-50 rounded">
//                     <div className="text-xs text-slate-500">Violations</div>
//                     <div className="text-lg font-semibold text-red-600">{selectedReport.violations}</div>
//                   </div>
//                   <div className="p-4 bg-slate-50 rounded">
//                     <div className="text-xs text-slate-500">Warnings</div>
//                     <div className="text-lg font-semibold text-amber-500">{selectedReport.warnings}</div>
//                     <div className="text-xs text-slate-400">Passed checks: {selectedReport.passedChecks}</div>
//                   </div>
//                 </section>

//                 <section>
//                   <h3 className="text-md font-semibold mb-2">Issues</h3>
//                   <ul className="space-y-3">
//                     {selectedReport.issues.map((issue) => (
//                       <li key={issue.id} className="border rounded p-3 bg-slate-50">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <div className="text-sm font-medium text-slate-800">{issue.type} — {issue.severity}</div>
//                             <div className="text-xs text-slate-500 mt-1">{issue.description}</div>
//                           </div>
//                           <div className="text-xs text-slate-400 ml-4">{issue.selector}</div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </section>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button
//                     onClick={() => handleDelete(selectedReport.id)}
//                     className="px-4 py-2 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100"
//                   >
//                     Delete Report
//                   </button>
//                   <button
//                     onClick={() => { setSelectedReport(null); if (lastFocusedRef.current) lastFocusedRef.current.focus(); }}
//                     className="px-4 py-2 text-sm rounded-md border"
//                   >
//                     Done
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// src/pages/Report.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Polished Report page
 * - Soft page background + white card/table surfaces
 * - Refined badges, shadows, spacing
 * - Search, sort, filter controls
 * - Accessible modal (focus restore, Esc close)
 *
 * Tailwind classes are used (replace or tweak if needed).
 */

const sampleReports = [
  {
    id: "r-1",
    url: "https://example.com",
    scannedAt: "2025-09-18T10:30:00.000Z",
    score: 85,
    violations: 3,
    warnings: 5,
    passedChecks: 42,
    notes: "Good contrast overall; missing alt on few images.",
    issues: [
      { id: "i1", type: "Violation", severity: "High", selector: 'img[alt=""]', description: "Image elements must have alternative text." },
      { id: "i2", type: "Violation", severity: "Medium", selector: "button[aria-label]", description: "Button labels should be descriptive." },
      { id: "i3", type: "Warning", severity: "Low", selector: "a", description: "Links should have visible focus styles." },
    ],
  },
  {
    id: "r-2",
    url: "https://demo-site.org",
    scannedAt: "2025-09-17T15:12:00.000Z",
    score: 62,
    violations: 12,
    warnings: 8,
    passedChecks: 30,
    notes: "Many form controls missing labels.",
    issues: [
      { id: "i4", type: "Violation", severity: "High", selector: "form > input:not([aria-label])", description: "Form controls should have accessible names." },
    ],
  },
];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function scoreBadge(score) {
  if (score >= 85) return "bg-emerald-100 text-emerald-800";
  if (score >= 70) return "bg-amber-100 text-amber-800";
  return "bg-red-100 text-red-800";
}

export default function ReportPage() {
  const [reports, setReports] = useState(sampleReports);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("scannedAt_desc");
  const [filter, setFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [message, setMessage] = useState("");
  const lastFocusedRef = useRef(null);
  const modalCloseRef = useRef(null);
  const liveRegionRef = useRef(null);

  const filtered = reports
    .filter((r) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return r.url.toLowerCase().includes(q) || getHostname(r.url).toLowerCase().includes(q);
    })
    .filter((r) => {
      if (filter === "all") return true;
      if (filter === "high") return r.issues.some((i) => (i.severity || "").toLowerCase() === "high");
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "scannedAt_desc") return new Date(b.scannedAt) - new Date(a.scannedAt);
      if (sortBy === "scannedAt_asc") return new Date(a.scannedAt) - new Date(b.scannedAt);
      if (sortBy === "score_desc") return b.score - a.score;
      if (sortBy === "score_asc") return a.score - b.score;
      return 0;
    });

  const openReport = (report) => {
    lastFocusedRef.current = document.activeElement;
    setSelectedReport(report);
  };

  const closeReport = () => {
    setSelectedReport(null);
    if (lastFocusedRef.current) lastFocusedRef.current.focus();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && selectedReport) closeReport();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedReport]);

  useEffect(() => {
    if (selectedReport && modalCloseRef.current) modalCloseRef.current.focus();
  }, [selectedReport]);

  const handleDelete = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    setMessage("Report removed");
    if (liveRegionRef.current) liveRegionRef.current.textContent = "Report removed";
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDownload = (report) => {
    const data = JSON.stringify(report, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${getHostname(report.url)}-a11y-report.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setMessage("Download started");
    if (liveRegionRef.current) liveRegionRef.current.textContent = "Report download started";
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <main className="min-h-[70vh] p-6 bg-[#F1F5F9]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Your Accessibility Reports</h1>
            <p className="text-sm text-slate-500 mt-1">
              Saved scan results. Click <strong>View</strong> to open the full report.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="search" className="sr-only">Search reports</label>
            <div className="flex items-center bg-white border border-slate-200 rounded-md px-3 py-2 shadow-sm w-full md:w-72">
              <svg className="w-4 h-4 text-slate-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
              <input
                id="search"
                className="w-full text-sm bg-transparent outline-none"
                placeholder="Search by URL or hostname"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search reports"
              />
            </div>

            <select
              className="ml-2 bg-white border border-slate-200 rounded-md px-3 py-2 text-sm shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort reports"
            >
              <option value="scannedAt_desc">Newest</option>
              <option value="scannedAt_asc">Oldest</option>
              <option value="score_desc">Score: High → Low</option>
              <option value="score_asc">Score: Low → High</option>
            </select>

            <select
              className="ml-2 bg-white border border-slate-200 rounded-md px-3 py-2 text-sm shadow-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter reports"
            >
              <option value="all">All</option>
              <option value="high">Has high severity</option>
            </select>
          </div>
        </div>

        {/* Live region */}
        <div aria-live="polite" className="sr-only" ref={liveRegionRef}></div>

        {/* Content */}
        <section>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center bg-white">
              <h2 className="text-lg font-medium text-slate-700">No reports found</h2>
              <p className="text-sm text-slate-500 mt-2">Run a scan from the Home page to generate reports.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F8FAFC]">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm text-slate-600">Website</th>
                      <th className="text-left px-6 py-3 text-sm text-slate-600">Scanned At</th>
                      <th className="text-left px-6 py-3 text-sm text-slate-600">Score</th>
                      <th className="text-left px-6 py-3 text-sm text-slate-600">Violations</th>
                      <th className="text-left px-6 py-3 text-sm text-slate-600">Warnings</th>
                      <th className="px-6 py-3 text-sm text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} className="border-t hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-slate-800">{r.url}</div>
                          <div className="text-xs text-slate-500 mt-1">{getHostname(r.url)}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{formatDate(r.scannedAt)}</td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm font-semibold ${scoreBadge(r.score)}`}>
                            <span>{r.score}%</span>
                            <span className="text-xs text-slate-500">passed {r.passedChecks}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-red-600">{r.violations}</td>
                        <td className="px-6 py-4 text-sm text-amber-500">{r.warnings}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => openReport(r)}
                              className="px-3 py-1 text-sm rounded-md bg-[#7C3AED] text-white hover:bg-[#6b28d8] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
                              aria-label={`View report for ${r.url}`}
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDownload(r)}
                              className="px-3 py-1 text-sm rounded-md border border-slate-200 hover:bg-slate-50"
                              aria-label={`Download report for ${r.url}`}
                            >
                              Download
                            </button>
                            <button
                              onClick={() => handleDelete(r.id)}
                              className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                              aria-label={`Delete report for ${r.url}`}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-4">
                {filtered.map((r) => (
                  <article key={r.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{getHostname(r.url)}</div>
                        <div className="text-xs text-slate-500">{formatDate(r.scannedAt)}</div>
                      </div>

                      <div className="text-right">
                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-semibold ${scoreBadge(r.score)}`}>
                          <span>{r.score}%</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">violations: {r.violations}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => openReport(r)} className="flex-1 px-3 py-2 text-sm rounded-md bg-[#7C3AED] text-white">View</button>
                      <button onClick={() => handleDownload(r)} className="px-3 py-2 text-sm rounded-md border">Download</button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Modal */}
        {selectedReport && (
          <div role="dialog" aria-modal="true" aria-labelledby="report-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/45" onClick={closeReport} aria-hidden="true"></div>

            <div className="relative z-10 max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh]">
              <header className="flex items-start justify-between p-4 border-b">
                <div>
                  <h2 id="report-title" className="text-lg font-semibold text-slate-800">{selectedReport.url}</h2>
                  <p className="text-xs text-slate-500 mt-1">Scanned: {formatDate(selectedReport.scannedAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button ref={modalCloseRef} onClick={() => handleDownload(selectedReport)} className="px-3 py-1 text-sm rounded-md border">Download</button>
                  <button onClick={closeReport} className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">Close</button>
                </div>
              </header>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-slate-50 rounded">
                    <div className="text-xs text-slate-500">Score</div>
                    <div className="text-2xl font-bold text-slate-800">{selectedReport.score}%</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded">
                    <div className="text-xs text-slate-500">Violations</div>
                    <div className="text-lg font-semibold text-red-600">{selectedReport.violations}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded">
                    <div className="text-xs text-slate-500">Warnings</div>
                    <div className="text-lg font-semibold text-amber-500">{selectedReport.warnings}</div>
                    <div className="text-xs text-slate-400 mt-1">Passed checks: {selectedReport.passedChecks}</div>
                  </div>
                </div>

                <section>
                  <h3 className="text-md font-semibold mb-2">Issues</h3>
                  <ul className="space-y-3">
                    {selectedReport.issues.map((issue) => (
                      <li key={issue.id} className="border rounded p-3 bg-slate-50">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm font-medium text-slate-800">{issue.type} • <span className="font-semibold">{issue.severity}</span></div>
                            <div className="text-xs text-slate-500 mt-1">{issue.description}</div>
                          </div>
                          <div className="text-xs text-slate-400 ml-4">{issue.selector}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={() => handleDelete(selectedReport.id)} className="px-4 py-2 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                  <button onClick={() => { setSelectedReport(null); if (lastFocusedRef.current) lastFocusedRef.current.focus(); }} className="px-4 py-2 text-sm rounded-md border">Done</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Small message bar */}
        {message && (
          <div className="fixed right-6 bottom-6 bg-slate-800 text-white px-4 py-2 rounded shadow">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}





// // src/pages/ReportPage.jsx
// import React, { useEffect, useRef, useState } from "react";

// /**
//  * Stylish, accessible Report page (Tailwind)
//  * - Search, sort, filter
//  * - Responsive (table on desktop, cards on mobile)
//  * - Accessible modal with focus management
//  *
//  * Replace `sampleReports` with API data when backend is ready.
//  */

// const sampleReports = [
//   {
//     id: "r-1",
//     url: "https://example.com",
//     scannedAt: "2025-09-18T10:30:00.000Z",
//     score: 85,
//     violations: 3,
//     warnings: 5,
//     passedChecks: 42,
//     notes: "Good contrast overall; missing alt on few images.",
//     issues: [
//       { id: "i1", type: "Violation", severity: "High", selector: "img[alt=\"\"]", description: "Image elements must have alternative text." },
//       { id: "i2", type: "Violation", severity: "Medium", selector: "button[aria-label]", description: "Button labels should be descriptive." }
//     ]
//   },
//   {
//     id: "r-2",
//     url: "https://demo-site.org",
//     scannedAt: "2025-09-17T15:12:00.000Z",
//     score: 62,
//     violations: 12,
//     warnings: 8,
//     passedChecks: 30,
//     notes: "Many form controls missing labels.",
//     issues: [
//       { id: "i4", type: "Violation", severity: "High", selector: "form > input:not([aria-label])", description: "Form controls should have accessible names." }
//     ]
//   }
// ];

// function formatDate(iso) {
//   const d = new Date(iso);
//   return d.toLocaleString();
// }

// function getHostname(url) {
//   try {
//     return new URL(url).hostname;
//   } catch {
//     return url;
//   }
// }

// function scoreBadge(score) {
//   if (score >= 85) return "bg-emerald-100 text-emerald-800";
//   if (score >= 70) return "bg-amber-100 text-amber-800";
//   return "bg-red-100 text-red-800";
// }

// export default function ReportPage() {
//   const [reports, setReports] = useState(sampleReports);
//   const [query, setQuery] = useState("");
//   const [sortBy, setSortBy] = useState("scannedAt_desc");
//   const [filter, setFilter] = useState("all"); // all | high | medium | low
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [message, setMessage] = useState("");
//   const lastFocusedRef = useRef(null);
//   const modalCloseRef = useRef(null);
//   const liveRegionRef = useRef(null);

//   // Derived list: search, filter, sort
//   const filtered = reports
//     .filter((r) => {
//       const q = query.trim().toLowerCase();
//       if (!q) return true;
//       return r.url.toLowerCase().includes(q) || getHostname(r.url).toLowerCase().includes(q);
//     })
//     .filter((r) => {
//       if (filter === "all") return true;
//       // filter by presence of severity in issues (simple)
//       const hasHigh = r.issues.some((i) => i.severity?.toLowerCase() === "high");
//       if (filter === "high") return hasHigh;
//       // other filters can be added later
//       return true;
//     })
//     .sort((a, b) => {
//       if (sortBy === "scannedAt_desc") return new Date(b.scannedAt) - new Date(a.scannedAt);
//       if (sortBy === "scannedAt_asc") return new Date(a.scannedAt) - new Date(b.scannedAt);
//       if (sortBy === "score_desc") return b.score - a.score;
//       if (sortBy === "score_asc") return a.score - b.score;
//       return 0;
//     });

//   // Open modal and remember focus
//   const openReport = (report) => {
//     lastFocusedRef.current = document.activeElement;
//     setSelectedReport(report);
//   };

//   // Close modal and restore focus
//   const closeReport = () => {
//     setSelectedReport(null);
//     if (lastFocusedRef.current) lastFocusedRef.current.focus();
//   };

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape" && selectedReport) closeReport();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [selectedReport]);

//   useEffect(() => {
//     if (selectedReport && modalCloseRef.current) modalCloseRef.current.focus();
//   }, [selectedReport]);

//   // Delete a report
//   const handleDelete = (id) => {
//     setReports((prev) => prev.filter((r) => r.id !== id));
//     setMessage("Report removed");
//     if (liveRegionRef.current) liveRegionRef.current.textContent = "Report removed";
//     setTimeout(() => setMessage(""), 2000);
//   };

//   // Download report as JSON
//   const handleDownload = (report) => {
//     const data = JSON.stringify(report, null, 2);
//     const blob = new Blob([data], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${getHostname(report.url)}-a11y-report.json`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);

//     setMessage("Download started");
//     if (liveRegionRef.current) liveRegionRef.current.textContent = "Report download started";
//     setTimeout(() => setMessage(""), 2000);
//   };

//   return (
//     <main className="min-h-[70vh] p-6 bg-slate-50">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Your Accessibility Reports</h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Saved scan results. Click <strong>View</strong> to open the full report.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <label htmlFor="search" className="sr-only">Search reports</label>
//             <div className="flex items-center bg-white border rounded-md px-3 py-2 shadow-sm w-full md:w-72">
//               <svg className="w-4 h-4 text-slate-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
//               <input
//                 id="search"
//                 className="w-full text-sm bg-transparent outline-none"
//                 placeholder="Search by URL or hostname"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 aria-label="Search reports"
//               />
//             </div>

//             <select
//               className="ml-2 bg-white border rounded-md px-3 py-2 text-sm shadow-sm"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               aria-label="Sort reports"
//             >
//               <option value="scannedAt_desc">Newest</option>
//               <option value="scannedAt_asc">Oldest</option>
//               <option value="score_desc">Score: High → Low</option>
//               <option value="score_asc">Score: Low → High</option>
//             </select>

//             <select
//               className="ml-2 bg-white border rounded-md px-3 py-2 text-sm shadow-sm"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               aria-label="Filter reports"
//             >
//               <option value="all">All</option>
//               <option value="high">Has high severity</option>
//             </select>
//           </div>
//         </div>

//         {/* Live region for announcements */}
//         <div aria-live="polite" className="sr-only" ref={liveRegionRef}></div>

//         {/* Content */}
//         <section>
//           {filtered.length === 0 ? (
//             <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center bg-white">
//               <h2 className="text-lg font-medium text-slate-700">No reports found</h2>
//               <p className="text-sm text-slate-500 mt-2">Run a scan from the Home page to generate reports.</p>
//             </div>
//           ) : (
//             <>
//               {/* Desktop table */}
//               <div className="hidden md:block bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
//                 <table className="w-full">
//                   <thead className="bg-slate-50">
//                     <tr>
//                       <th className="text-left px-6 py-3 text-sm text-slate-600">Website</th>
//                       <th className="text-left px-6 py-3 text-sm text-slate-600">Scanned At</th>
//                       <th className="text-left px-6 py-3 text-sm text-slate-600">Score</th>
//                       <th className="text-left px-6 py-3 text-sm text-slate-600">Violations</th>
//                       <th className="text-left px-6 py-3 text-sm text-slate-600">Warnings</th>
//                       <th className="px-6 py-3 text-sm text-slate-600">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filtered.map((r) => (
//                       <tr key={r.id} className="border-t hover:bg-slate-50">
//                         <td className="px-6 py-4">
//                           <div className="text-sm font-medium text-slate-800">{r.url}</div>
//                           <div className="text-xs text-slate-500 mt-1">{getHostname(r.url)}</div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-slate-600">{formatDate(r.scannedAt)}</td>
//                         <td className="px-6 py-4">
//                           <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full text-sm font-semibold ${scoreBadge(r.score)}`}>
//                             <span>{r.score}%</span>
//                             <span className="text-xs text-slate-500">passed {r.passedChecks}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-red-600">{r.violations}</td>
//                         <td className="px-6 py-4 text-sm text-amber-500">{r.warnings}</td>
//                         <td className="px-6 py-4">
//                           <div className="flex gap-2 justify-end">
//                             <button
//                               onClick={() => openReport(r)}
//                               className="px-3 py-1 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
//                               aria-label={`View report for ${r.url}`}
//                             >
//                               View
//                             </button>
//                             <button
//                               onClick={() => handleDownload(r)}
//                               className="px-3 py-1 text-sm rounded-md border border-slate-200 hover:bg-slate-50"
//                               aria-label={`Download report for ${r.url}`}
//                             >
//                               Download
//                             </button>
//                             <button
//                               onClick={() => handleDelete(r.id)}
//                               className="px-3 py-1 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100"
//                               aria-label={`Delete report for ${r.url}`}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile cards */}
//               <div className="md:hidden space-y-4">
//                 {filtered.map((r) => (
//                   <article key={r.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <div className="text-sm font-semibold text-slate-800">{getHostname(r.url)}</div>
//                         <div className="text-xs text-slate-500">{formatDate(r.scannedAt)}</div>
//                       </div>

//                       <div className="text-right">
//                         <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-semibold ${scoreBadge(r.score)}`}>
//                           <span>{r.score}%</span>
//                         </div>
//                         <div className="text-xs text-slate-400 mt-1">violations: {r.violations}</div>
//                       </div>
//                     </div>

//                     <div className="mt-3 flex gap-2">
//                       <button onClick={() => openReport(r)} className="flex-1 px-3 py-2 text-sm rounded-md bg-purple-600 text-white">View</button>
//                       <button onClick={() => handleDownload(r)} className="px-3 py-2 text-sm rounded-md border">Download</button>
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             </>
//           )}
//         </section>

//         {/* Modal */}
//         {selectedReport && (
//           <div role="dialog" aria-modal="true" aria-labelledby="report-title" className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="absolute inset-0 bg-black/50" onClick={closeReport} aria-hidden="true"></div>

//             <div className="relative z-10 max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-auto max-h-[85vh]">
//               <header className="flex items-start justify-between p-4 border-b">
//                 <div>
//                   <h2 id="report-title" className="text-lg font-semibold text-slate-800">{selectedReport.url}</h2>
//                   <p className="text-xs text-slate-500 mt-1">Scanned: {formatDate(selectedReport.scannedAt)}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button ref={modalCloseRef} onClick={() => handleDownload(selectedReport)} className="px-3 py-1 text-sm rounded-md border">Download</button>
//                   <button onClick={closeReport} className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">Close</button>
//                 </div>
//               </header>

//               <div className="p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="p-4 bg-slate-50 rounded">
//                     <div className="text-xs text-slate-500">Score</div>
//                     <div className="text-2xl font-bold text-slate-800">{selectedReport.score}%</div>
//                   </div>
//                   <div className="p-4 bg-slate-50 rounded">
//                     <div className="text-xs text-slate-500">Violations</div>
//                     <div className="text-lg font-semibold text-red-600">{selectedReport.violations}</div>
//                   </div>
//                   <div className="p-4 bg-slate-50 rounded">
//                     <div className="text-xs text-slate-500">Warnings</div>
//                     <div className="text-lg font-semibold text-amber-500">{selectedReport.warnings}</div>
//                     <div className="text-xs text-slate-400 mt-1">Passed checks: {selectedReport.passedChecks}</div>
//                   </div>
//                 </div>

//                 <section>
//                   <h3 className="text-md font-semibold mb-2">Issues</h3>
//                   <ul className="space-y-3">
//                     {selectedReport.issues.map((issue) => (
//                       <li key={issue.id} className="border rounded p-3 bg-slate-50">
//                         <div className="flex items-start justify-between gap-4">
//                           <div>
//                             <div className="text-sm font-medium text-slate-800">{issue.type} • <span className="font-semibold">{issue.severity}</span></div>
//                             <div className="text-xs text-slate-500 mt-1">{issue.description}</div>
//                           </div>
//                           <div className="text-xs text-slate-400 ml-4">{issue.selector}</div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </section>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button onClick={() => handleDelete(selectedReport.id)} className="px-4 py-2 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
//                   <button onClick={() => { setSelectedReport(null); if (lastFocusedRef.current) lastFocusedRef.current.focus(); }} className="px-4 py-2 text-sm rounded-md border">Done</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Small message bar */}
//         {message && (
//           <div className="fixed right-6 bottom-6 bg-slate-800 text-white px-4 py-2 rounded shadow">
//             {message}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }
