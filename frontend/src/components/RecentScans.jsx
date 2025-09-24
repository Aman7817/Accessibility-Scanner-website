import React from 'react';
const RecentScans = ({ recentScans, getScoreColor }) => {
  const handleViewReport = (fileName) => {
    if (!fileName) {
      alert('Report not available yet');
      return;
    }
    const reportUrl = `http://localhost:5000/reports/${fileName}`;
    window.open(reportUrl, '_blank', 'noopener,noreferrer');
  };

  // Safe URL display function
  const getDisplayUrl = (url) => {
    if (!url) return 'Unknown URL';
    return url.replace(/^https?:\/\//, '');
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
          <p className="text-gray-600 text-sm mt-1">Your latest accessibility reports</p>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          View all
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {recentScans.map(scan => (
          <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate" title={scan.url || 'Unknown URL'}>
                  {getDisplayUrl(scan.url)}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{scan.date || 'Unknown date'}</p>
              </div>
              <div className="flex items-center space-x-3 ml-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(scan.score || 0)}`}>
                  {scan.score || 0}%
                </span>
                <button 
                  onClick={() => handleViewReport(scan.htmlReportFileName)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  View Report
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span>{scan.violations || 0} violations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span>{scan.warnings || 0} warnings</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Scan ID: {scan.id ? scan.id : 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentScans.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No scans yet</p>
          <p className="text-sm">Start by scanning a website above</p>
        </div>
      )}
    </section>
  );
};

export default RecentScans;