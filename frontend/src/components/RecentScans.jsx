// // import React from 'react';

// // const RecentScans = ({ recentScans, getScoreColor }) => {
// //   return (
// //     <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
// //         <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
// //           View all
// //           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //           </svg>
// //         </button>
// //       </div>
      
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {recentScans.map(scan => (
// //           <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
// //             <div className="flex justify-between items-start mb-4">
// //               <div className="text-sm text-gray-500">{scan.date}</div>
// //               <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(scan.score)}`}>
// //                 {scan.score}%
// //               </span>
// //             </div>
            
// //             <h3 className="font-medium text-gray-800 mb-2 truncate">{scan.url}</h3>
            
// //             <div className="flex justify-between text-sm text-gray-600 mb-4">
// //               <div className="flex items-center">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //                 {scan.violations} violations
// //               </div>
// //               <div className="flex items-center">
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //                 </svg>
// //                 {scan.warnings} warnings
// //               </div>
// //             </div>
            
// //             <button className="w-full py-2 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 transition-colors">
// //               View Report
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default RecentScans;



// // components/RecentScans.jsx - Complete fixed version
// import React from 'react';

// const RecentScans = ({ recentScans, getScoreColor }) => {
//   const handleViewReport = (fileName) => {
//     if (!fileName) {
//       alert('Report file not available');
//       return;
//     }
    
//     const reportUrl = `http://localhost:5000/reports/${fileName}`;
//     window.open(reportUrl, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
//         <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//           View all
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {recentScans.map(scan => (
//           <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div className="text-sm text-gray-500">{scan.date}</div>
//               <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(scan.score)}`}>
//                 {scan.score}%
//               </span>
//             </div>
            
//             <h3 className="font-medium text-gray-800 mb-2 truncate" title={scan.url}>
//               {scan.url}
//             </h3>
            
//             <div className="flex justify-between text-sm text-gray-600 mb-4">
//               <div className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//                 {scan.violations} violations
//               </div>
//               <div className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//                 {scan.warnings} warnings
//               </div>
//             </div>
            
//             <button 
//               onClick={() => handleViewReport(scan.htmlReportFileName)}
//               className="w-full py-2 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 transition-colors"
//             >
//               View Report
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default RecentScans;


// import React from 'react';

// const RecentScans = ({ recentScans, getScoreColor }) => {
//   const handleViewReport = (fileName) => {
//     if (!fileName) return;
//     const reportUrl = `http://localhost:5000/reports/${fileName}`;
//     window.open(reportUrl, '_blank');
//   };

//   return (
//     <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Scan History</h2>
//           <p className="text-gray-600 text-sm mt-1">Recently analyzed websites</p>
//         </div>
//         <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
//           {recentScans.length} scans
//         </span>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//         {recentScans.map(scan => (
//           <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200">
//             {/* Header */}
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-semibold text-gray-800 truncate" title={scan.url}>
//                   {scan.url.replace(/^https?:\/\//, '')}
//                 </h3>
//                 <p className="text-xs text-gray-500 mt-1">{scan.date}</p>
//               </div>
//             </div>
            
//             {/* Score Circle */}
//             <div className="flex items-center justify-center mb-4">
//               <div className="relative">
//                 <div className="w-16 h-16 rounded-full border-4 border-gray-100 flex items-center justify-center">
//                   <span className={`text-xl font-bold ${getScoreColor(scan.score).replace('bg-', 'text-')}`}>
//                     {scan.score}%
//                   </span>
//                 </div>
//                 <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
//               </div>
//             </div>
            
//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-2 mb-4">
//               <div className="text-center p-2 bg-red-50 rounded">
//                 <div className="text-red-600 font-bold">{scan.violations}</div>
//                 <div className="text-xs text-red-500">Violations</div>
//               </div>
//               <div className="text-center p-2 bg-yellow-50 rounded">
//                 <div className="text-yellow-600 font-bold">{scan.warnings}</div>
//                 <div className="text-xs text-yellow-500">Warnings</div>
//               </div>
//             </div>
            
//             {/* Action Button */}
//             <button 
//               onClick={() => handleViewReport(scan.htmlReportFileName)}
//               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
//             >
//               View Detailed Report
//             </button>
//           </div>
//         ))}
//       </div>

//       {recentScans.length === 0 && (
//         <div className="text-center py-12">
//           <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-gray-600 mb-2">No scans yet</h3>
//           <p className="text-gray-500">Scan your first website to see results here</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default RecentScans;


// import React from 'react';

// const RecentScans = ({ recentScans, getScoreColor }) => {
//   const handleViewReport = (fileName) => {
//     if (!fileName) {
//       alert('Report not available yet');
//       return;
//     }
//     const reportUrl = `http://localhost:5000/reports/${fileName}`;
//     window.open(reportUrl, '_blank', 'noopener,noreferrer');
//   };

//   // Safe URL display function
//   const getDisplayUrl = (url) => {
//     if (!url) return 'Unknown URL';
//     return url.replace(/^https?:\/\//, '');
//   };

//   return (
//     <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
//           <p className="text-gray-600 text-sm mt-1">Your latest accessibility reports</p>
//         </div>
//         <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//           View all
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {recentScans.map(scan => (
//           <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-3">
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-medium text-gray-800 truncate" title={scan.url || 'Unknown URL'}>
//                   {getDisplayUrl(scan.url)}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-1">{scan.date || 'Unknown date'}</p>
//               </div>
//               <div className="flex items-center space-x-3 ml-4">
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(scan.score || 0)}`}>
//                   {scan.score || 0}%
//                 </span>
//                 <button 
//                   onClick={() => handleViewReport(scan.htmlReportFileName)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
//                 >
//                   View Report
//                 </button>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between text-sm text-gray-600">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
//                   <span>{scan.violations || 0} violations</span>
//                 </div>
//                 <div className="flex items-center">
//                   <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
//                   <span>{scan.warnings || 0} warnings</span>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs text-gray-400">Scan ID: {scan.id ? scan.id.slice(-6) : 'N/A'}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {recentScans.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           <p>No scans yet</p>
//           <p className="text-sm">Start by scanning a website above</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default RecentScans;
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