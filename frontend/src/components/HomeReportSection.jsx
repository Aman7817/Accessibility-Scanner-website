// src/components/HomeReportSection.jsx
import React, { useEffect, useRef, useState } from "react";

const seedReports = [
  { id: "r-1", url: "https://example.com", scannedAt: "2025-09-18T10:30:00.000Z", score: 85, violations: 3, passedChecks: 42 },
  { id: "r-2", url: "https://demo-site.org", scannedAt: "2025-09-17T15:12:00.000Z", score: 62, violations: 12, passedChecks: 30 },
  { id: "r-3", url: "https://myapp.io", scannedAt: "2025-09-12T09:05:00.000Z", score: 74, violations: 6, passedChecks: 36 },
];

function fmt(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}
function host(u){ try { return new URL(u).hostname } catch { return u } }

export default function HomeReportSection({ maxItems = 3 }) {
  const [reports, setReports] = useState(seedReports);
  const [msg, setMsg] = useState("");
  const liveRef = useRef(null);

  const recent = reports.slice(0, maxItems);

  const handleDownload = (r) => {
    const data = JSON.stringify(r, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${host(r.url)}-a11y-report.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMsg("Download started");
    if (liveRef.current) liveRef.current.textContent = "Report download started";
    setTimeout(() => setMsg(""), 2000);
  };

  const handleRunScan = () => {
    // scroll to hero scan input (give your hero scan container id="hero-scan")
    const el = document.getElementById("hero-scan");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div aria-live="polite" className="sr-only" ref={liveRef}></div>

      {/* Compact stats */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 bg-white rounded-md p-3 shadow-sm border">
          <div className="text-xs text-slate-500">Total scans</div>
          <div className="text-lg font-semibold text-slate-800">{reports.length}</div>
        </div>
        <div className="flex-1 bg-white rounded-md p-3 shadow-sm border">
          <div className="text-xs text-slate-500">Avg score</div>
          <div className="text-lg font-semibold text-slate-800">
            {reports.length ? Math.round(reports.reduce((s,r)=>s+(r.score||0),0)/reports.length) + "%" : "-"}
          </div>
        </div>
        <div className="flex-1 bg-white rounded-md p-3 shadow-sm border">
          <div className="text-xs text-slate-500">Open violations</div>
          <div className="text-lg font-semibold text-red-600">{reports.reduce((s,r)=>s+(r.violations||0),0)}</div>
        </div>
      </div>

      {/* Recent scans (compact) + CTA */}
      <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800">Recent scans</h3>
          <p className="text-sm text-slate-500 mt-1">Quick access to your latest reports</p>

          <ul className="mt-3 space-y-3">
            {recent.map(r => (
              <li key={r.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="text-sm font-medium text-slate-800">{host(r.url)}</div>
                  <div className="text-xs text-slate-500">{fmt(r.scannedAt)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">
                    <span className={r.score >= 85 ? "text-emerald-700" : r.score >= 70 ? "text-amber-600" : "text-red-600"}>
                      {r.score}%
                    </span>
                  </div>
                  <button onClick={() => handleDownload(r)} className="px-3 py-1 text-sm rounded-md border">Download</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-56 flex-shrink-0 flex flex-col items-stretch gap-3">
          <div className="bg-indigo-600 text-white rounded-md p-3 text-center shadow">
            <div className="font-semibold">Need to scan a site?</div>
            <div className="text-sm text-indigo-100 mt-1">Run an accessibility check instantly</div>
          </div>

          <button onClick={handleRunScan} className="w-full px-4 py-2 bg-[#7C3AED] text-white rounded-md hover:bg-[#6b28d8]">
            Run a scan
          </button>

          <a href="/report" className="w-full text-center text-sm text-slate-600 underline pt-2">See all reports</a>
        </div>
      </div>

      {/* small floating message */}
      {msg && <div className="mt-3 text-sm text-slate-600">{msg}</div>}
    </section>
  );
}
