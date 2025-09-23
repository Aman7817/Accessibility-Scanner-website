

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert("Logged out!");
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center py-6">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <button 
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
        
//         <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mt-6">
//           <h2 className="text-xl font-semibold mb-4">Welcome, demo.user@example.com!</h2>
//           <p className="text-slate-300">You have successfully accessed the protected dashboard.</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
//             <div className="bg-slate-700 p-4 rounded-lg">
//               <h3 className="font-medium">Profile</h3>
//               <p className="text-sm text-slate-400 mt-2">Manage your account settings</p>
//             </div>
            
//             <div className="bg-slate-700 p-4 rounded-lg">
//               <h3 className="font-medium">Settings</h3>
//               <p className="text-sm text-slate-400 mt-2">Configure application preferences</p>
//             </div>
            
//             <div className="bg-slate-700 p-4 rounded-lg">
//               <h3 className="font-medium">Statistics</h3>
//               <p className="text-sm text-slate-400 mt-2">View your usage statistics</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// const Dashboard = () => {



//   const [activeTab, setActiveTab] = useState('profile');
//   const user = {
//     name: 'Jack',
//     email: 'demo.user@example.com'
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Content - Navbar को हटा दिया गया है */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
//           <div className="px-4 py-5 sm:p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               Welcome back, {user.name}! 👋
//             </h2>
//             <p className="text-gray-600">
//               We're glad to see you again. Your accessibility scanning dashboard is ready for use.
//             </p>
//           </div>
//         </div>

//         {/* Cards Section */}
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
//           {/* Profile Card */}
//           <div 
//             className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
//               activeTab === 'profile' 
//                 ? 'ring-2 ring-indigo-500 transform scale-105' 
//                 : 'hover:shadow-md'
//             }`}
//             onClick={() => setActiveTab('profile')}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
//                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium text-gray-800">Profile</h3>
//                   <p className="text-sm text-gray-500">Manage your account settings</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Settings Card */}
//           <div 
//             className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
//               activeTab === 'settings' 
//                 ? 'ring-2 ring-indigo-500 transform scale-105' 
//                 : 'hover:shadow-md'
//             }`}
//             onClick={() => setActiveTab('settings')}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
//                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium text-gray-800">Settings</h3>
//                   <p className="text-sm text-gray-500">Configure application preferences</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Statistics Card */}
//           <div 
//             className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
//               activeTab === 'statistics' 
//                 ? 'ring-2 ring-indigo-500 transform scale-105' 
//                 : 'hover:shadow-md'
//             }`}
//             onClick={() => setActiveTab('statistics')}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
//                   <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-lg font-medium text-gray-800">Statistics</h3>
//                   <p className="text-sm text-gray-500">View your usage statistics</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-8">
//           {activeTab === 'profile' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
//               <p className="text-gray-600">Here you can manage your account settings and personal information.</p>
//             </div>
//           )}
          
//           {activeTab === 'settings' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h3 className="text-lg font-medium text-gray-800 mb-4">Application Settings</h3>
//               <p className="text-gray-600">Configure your application preferences and notification settings.</p>
//             </div>
//           )}
          
//           {activeTab === 'statistics' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h3 className="text-lg font-medium text-gray-800 mb-4">Usage Statistics</h3>
//               <p className="text-gray-600">View your usage statistics and activity reports.</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [scanHistory, setScanHistory] = useState([]);
//   const [usageStats, setUsageStats] = useState({});
//   const [recentScans, setRecentScans] = useState([]);

//   const user = {
//     name: 'Jack',
//     email: 'demo.user@example.com',
//     membership: 'Premium',
//     joinDate: '2024-01-15'
//   };

//   // Mock data - replace with actual API calls
//   useEffect(() => {
//     // Simulate fetching data
//     setScanHistory([
//       { id: 1, url: 'https://example.com', date: '2024-03-20', score: 92 },
//       { id: 2, url: 'https://test.com', date: '2024-03-19', score: 85 },
//       { id: 3, url: 'https://demo.com', date: '2024-03-18', score: 78 }
//     ]);

//     setUsageStats({
//       totalScans: 47,
//       averageScore: 86,
//       issuesFixed: 128,
//       thisMonth: 12
//     });

//     setRecentScans([
//       { id: 1, url: 'https://example.com', timestamp: '2 hours ago', status: 'Completed' },
//       { id: 2, url: 'https://test.com', timestamp: '5 hours ago', status: 'Completed' }
//     ]);
//   }, []);

//   const startNewScan = () => {
//     // Implement scan functionality
//     alert('Starting new accessibility scan...');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Welcome back, {user.name}! 👋
//                 </h2>
//                 <p className="text-gray-600">
//                   Ready to make the web more accessible. Start a new scan or review your results.
//                 </p>
//               </div>
//               <button 
//                 onClick={startNewScan}
//                 className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
//               >
//                 Start New Scan
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-sm font-medium text-gray-500">Total Scans</h3>
//                 <p className="text-2xl font-bold text-gray-900">{usageStats.totalScans || 0}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
//                 <p className="text-2xl font-bold text-gray-900">{usageStats.averageScore || 0}%</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center">
//               <div className="bg-red-100 p-3 rounded-full">
//                 <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-sm font-medium text-gray-500">Issues Fixed</h3>
//                 <p className="text-2xl font-bold text-gray-900">{usageStats.issuesFixed || 0}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center">
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-sm font-medium text-gray-500">This Month</h3>
//                 <p className="text-2xl font-bold text-gray-900">{usageStats.thisMonth || 0}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Recent Scans */}
//           <div className="bg-white shadow rounded-lg">
//             <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-800">Recent Scans</h3>
//             </div>
//             <div className="p-6">
//               {recentScans.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {recentScans.map((scan) => (
//                     <li key={scan.id} className="py-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm font-medium text-gray-900 truncate">{scan.url}</p>
//                           <p className="text-sm text-gray-500">{scan.timestamp}</p>
//                         </div>
//                         <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//                           {scan.status}
//                         </span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 text-center py-4">No recent scans</p>
//               )}
//               <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//                 View all scans →
//               </button>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white shadow rounded-lg">
//             <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 gap-4">
//                 <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
//                   <div className="bg-blue-100 p-2 rounded-full">
//                     <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <h4 className="text-sm font-medium text-gray-900">Website Analysis</h4>
//                     <p className="text-xs text-gray-500">Scan a new website</p>
//                   </div>
//                 </button>

//                 <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
//                   <div className="bg-green-100 p-2 rounded-full">
//                     <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <h4 className="text-sm font-medium text-gray-900">Generate Report</h4>
//                     <p className="text-xs text-gray-500">Create accessibility report</p>
//                   </div>
//                 </button>

//                 <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
//                   <div className="bg-purple-100 p-2 rounded-full">
//                     <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <h4 className="text-sm font-medium text-gray-900">Add Team Member</h4>
//                     <p className="text-xs text-gray-500">Invite colleagues</p>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import RecentScans from '../components/RecentScans'; // Import your RecentScans component

// const Dashboard = () => {
//   const [scanHistory, setScanHistory] = useState([]);
//   const [usageStats, setUsageStats] = useState({});
//   const [recentScans, setRecentScans] = useState([]);

//   const user = {
//     name: 'Jack',
//     email: 'demo.user@example.com',
//     membership: 'Premium',
//     joinDate: '2024-01-15'
//   };

//   // Mock data - replace with actual API calls
//   useEffect(() => {
//     // Simulate fetching data
//     setScanHistory([
//       { id: 1, url: 'https://example.com', date: '2024-03-20', score: 92 },
//       { id: 2, url: 'https://test.com', date: '2024-03-19', score: 85 },
//       { id: 3, url: 'https://demo.com', date: '2024-03-18', score: 78 }
//     ]);

//     setUsageStats({
//       totalScans: 542,
//       averageScore: 92,
//       issuesDetected: 128,
//       avgScanTime: 2.4
//     });

//     // Updated to match the structure expected by RecentScans
//     setRecentScans([
//       { 
//         id: 'UA123', 
//         url: 'https://example.com', 
//         date: 'Mar 20, 2024', 
//         score: 92, 
//         violations: 3, 
//         warnings: 5,
//         htmlReportFileName: 'report_UA123.html'
//       },
//       { 
//         id: 'WA456', 
//         url: 'https://test-site.com', 
//         date: 'Mar 19, 2024', 
//         score: 85, 
//         violations: 8, 
//         warnings: 12,
//         htmlReportFileName: 'report_WA456.html'
//       },
//       { 
//         id: 'MA789', 
//         url: 'https://demo-site.com', 
//         date: 'Mar 18, 2024', 
//         score: 78, 
//         violations: 15, 
//         warnings: 7,
//         htmlReportFileName: 'report_MA789.html'
//       }
//     ]);
//   }, []);

//   const startNewScan = () => {
//     // Implement scan functionality
//     alert('Starting new accessibility scan...');
//   };

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'bg-green-100 text-green-800';
//     if (score >= 70) return 'bg-yellow-100 text-yellow-800';
//     return 'bg-red-100 text-red-800';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">
//                   DeepSeek Accessibility Scanner
//                 </h1>
//                 <h2 className="text-xl font-semibold text-gray-700 mb-2">
//                   Welcome back, {user.name}!
//                 </h2>
//                 <p className="text-gray-600">
//                   Ready to make the web more accessible. Start a new scan or review your results.
//                 </p>
//               </div>
//               <button 
//                 onClick={startNewScan}
//                 className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
//               >
//                 Start New Scan
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview - Check Accessibility Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Check Accessibility</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="text-3xl font-bold text-gray-800">{usageStats.averageScore || 0}%</div>
//               <div className="text-sm text-gray-600 mt-2">Average Score</div>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="text-3xl font-bold text-gray-800">{usageStats.issuesDetected || 0}</div>
//               <div className="text-sm text-gray-600 mt-2">Issues Detected</div>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="text-3xl font-bold text-gray-800">{usageStats.totalScans || 0}</div>
//               <div className="text-sm text-gray-600 mt-2">Websites Scanned</div>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <div className="text-3xl font-bold text-gray-800">{usageStats.avgScanTime || 0}s</div>
//               <div className="text-sm text-gray-600 mt-2">Average Scan Time</div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Scans Component */}
//         <RecentScans recentScans={recentScans} getScoreColor={getScoreColor} />

//         {/* Quick Actions Section */}
//         <div className="bg-white shadow rounded-lg mt-8">
//           <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//             <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
//                 <div className="bg-blue-100 p-3 rounded-full mb-3">
//                   <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <h4 className="text-sm font-medium text-gray-900">Website Analysis</h4>
//                 <p className="text-xs text-gray-500 text-center mt-1">Scan a new website</p>
//               </button>

//               <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
//                 <div className="bg-green-100 p-3 rounded-full mb-3">
//                   <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <h4 className="text-sm font-medium text-gray-900">Generate Report</h4>
//                 <p className="text-xs text-gray-500 text-center mt-1">Create accessibility report</p>
//               </button>

//               <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
//                 <div className="bg-purple-100 p-3 rounded-full mb-3">
//                   <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                 </div>
//                 <h4 className="text-sm font-medium text-gray-900">Add Team Member</h4>
//                 <p className="text-xs text-gray-500 text-center mt-1">Invite colleagues</p>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


// // import React, { useState, useEffect, useRef } from 'react';
// // import Chart from 'chart.js/auto';

// // const Dashboard = () => {
// //   const [scans, setScans] = useState([
// //     {
// //       id: 'EX1234',
// //       url: 'example.com',
// //       date: 'Mar 20, 2024 • 2:45 PM',
// //       score: 92,
// //       violations: 5,
// //       warnings: 12,
// //       status: 'high'
// //     },
// //     {
// //       id: 'TS5678',
// //       url: 'test-site.com',
// //       date: 'Mar 19, 2024 • 11:30 AM',
// //       score: 88,
// //       violations: 8,
// //       warnings: 10,
// //       status: 'medium'
// //     },
// //     {
// //       id: 'SS9012',
// //       url: 'sample-site.org',
// //       date: 'Mar 18, 2024 • 4:15 PM',
// //       score: 72,
// //       violations: 15,
// //       warnings: 22,
// //       status: 'low'
// //     }
// //   ]);
  
// //   const [filterText, setFilterText] = useState('');
// //   const chartRef = useRef(null);
// //   const chartInstance = useRef(null);

// //   useEffect(() => {
// //     // Initialize compliance trend chart
// //     if (chartRef.current) {
// //       if (chartInstance.current) {
// //         chartInstance.current.destroy();
// //       }
      
// //       const ctx = chartRef.current.getContext('2d');
// //       chartInstance.current = new Chart(ctx, {
// //         type: 'line',
// //         data: {
// //           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
// //           datasets: [{
// //             label: 'Compliance Score',
// //             data: [85, 82, 88, 90, 86, 89, 91, 93, 90, 92, 94, 92],
// //             borderColor: '#4361ee',
// //             backgroundColor: 'rgba(67, 97, 238, 0.1)',
// //             tension: 0.3,
// //             fill: true,
// //             pointBackgroundColor: '#4361ee',
// //             pointRadius: 4,
// //             pointHoverRadius: 6
// //           }]
// //         },
// //         options: {
// //           responsive: true,
// //           maintainAspectRatio: false,
// //           scales: {
// //             y: {
// //               beginAtZero: false,
// //               min: 70,
// //               max: 100,
// //               grid: {
// //                 drawBorder: false
// //               }
// //             },
// //             x: {
// //               grid: {
// //                 display: false
// //               }
// //             }
// //           },
// //           plugins: {
// //             legend: {
// //               display: false
// //             }
// //           }
// //         }
// //       });
// //     }

// //     return () => {
// //       if (chartInstance.current) {
// //         chartInstance.current.destroy();
// //       }
// //     };
// //   }, []);

// //   const filteredScans = scans.filter(scan => 
// //     scan.url.toLowerCase().includes(filterText.toLowerCase()) || 
// //     scan.date.toLowerCase().includes(filterText.toLowerCase())
// //   );

// //   const getScoreClass = (score) => {
// //     if (score >= 90) return 'bg-green-100 text-green-800';
// //     if (score >= 75) return 'bg-yellow-100 text-yellow-800';
// //     return 'bg-red-100 text-red-800';
// //   };

// //   const getScoreColor = (score) => {
// //     if (score >= 90) return 'score-high';
// //     if (score >= 75) return 'score-medium';
// //     return 'score-low';
// //   };

// //   const getStatusText = (score) => {
// //     if (score >= 90) return 'Excellent';
// //     if (score >= 75) return 'Good';
// //     return 'Needs Improvement';
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-50">
// //       {/* Sidebar */}
// //       <div className="w-64 bg-white shadow-md hidden md:block">
// //         <div className="p-5">
// //           <h1 className="text-xl font-bold text-gray-800 flex items-center">
// //             <i className="fas fa-universal-access mr-2 text-blue-500"></i>
// //             DeepSeek Scanner
// //           </h1>
// //         </div>
// //         <nav className="mt-6">
// //           <a className="flex items-center px-6 py-3 text-gray-700 bg-blue-50 border-r-4 border-blue-500" href="#">
// //             <i className="fas fa-home mr-3 text-blue-600"></i>
// //             Dashboard
// //           </a>
// //           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
// //             <i className="fas fa-search mr-3"></i>
// //             Scan Website
// //           </a>
// //           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
// //             <i className="fas fa-history mr-3"></i>
// //             Scan History
// //           </a>
// //           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
// //             <i className="fas fa-chart-bar mr-3"></i>
// //             Reports
// //           </a>
// //           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
// //             <i className="fas fa-cog mr-3"></i>
// //             Settings
// //           </a>
// //         </nav>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-auto">
// //         {/* Header */}
// //         <header className="bg-white shadow-sm">
// //           <div className="flex items-center justify-between p-4">
// //             <div className="flex items-center">
// //               <button className="md:hidden text-gray-500 mr-4">
// //                 <i className="fas fa-bars text-xl"></i>
// //               </button>
// //               <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
// //             </div>
// //             <div className="flex items-center">
// //               <div className="relative mr-4">
// //                 <input 
// //                   type="text" 
// //                   placeholder="Search scans..." 
// //                   className="search-box pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 />
// //                 <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
// //               </div>
// //               <div className="relative">
// //                 <img className="h-10 w-10 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" />
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         <main className="p-6">
// //           {/* Welcome Section */}
// //           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
// //             <div className="flex flex-col md:flex-row md:items-center justify-between">
// //               <div>
// //                 <h2 className="text-2xl font-bold mb-2">Welcome back, Jack!</h2>
// //                 <p className="opacity-90">Ready to make the web more accessible. Start a new scan or review your results.</p>
// //               </div>
// //               <button className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
// //                 <i className="fas fa-plus mr-2"></i>New Scan
// //               </button>
// //             </div>
// //           </div>

// //           {/* Overview Stats */}
// //           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
// //             <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
// //               {/* Circular Progress Score */}
// //               <div className="flex flex-col items-center justify-center">
// //                 <div className="circular-progress" style={{ "--progress": "331deg" }}>
// //                   <span className="progress-value">92%</span>
// //                 </div>
// //                 <p className="mt-3 text-sm font-medium text-gray-600">Overall Score</p>
// //                 <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium mt-1 rounded-full">
// //                   <i className="fas fa-star mr-1"></i>Excellent
// //                 </span>
// //               </div>
              
// //               {/* Stats */}
// //               <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
// //                 <div className="bg-blue-50 p-4 rounded-lg text-center">
// //                   <div className="text-2xl font-bold text-blue-800">128</div>
// //                   <div className="text-sm text-blue-600 mt-1">Violations</div>
// //                 </div>
// //                 <div className="bg-yellow-50 p-4 rounded-lg text-center">
// //                   <div className="text-2xl font-bold text-yellow-800">542</div>
// //                   <div className="text-sm text-yellow-600 mt-1">Warnings</div>
// //                 </div>
// //                 <div className="bg-green-50 p-4 rounded-lg text-center">
// //                   <div className="text-2xl font-bold text-green-800">45</div>
// //                   <div className="text-sm text-green-600 mt-1">Scanned Sites</div>
// //                 </div>
// //                 <div className="bg-purple-50 p-4 rounded-lg text-center">
// //                   <div className="text-2xl font-bold text-purple-800">2.45s</div>
// //                   <div className="text-sm text-purple-600 mt-1">Avg Time</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Compliance Trend Graph */}
// //           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-2xl font-bold text-gray-800">Compliance Trend</h2>
// //               <div className="flex space-x-2">
// //                 <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Week</button>
// //                 <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Month</button>
// //                 <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Year</button>
// //               </div>
// //             </div>
// //             <div className="h-64">
// //               <canvas ref={chartRef}></canvas>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {/* Recent Scans */}
// //             <div className="lg:col-span-2">
// //               <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
// //                 <div className="flex justify-between items-center mb-6">
// //                   <div>
// //                     <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
// //                     <p className="text-gray-600 text-sm mt-1">Your latest accessibility reports</p>
// //                   </div>
// //                   <div className="flex items-center">
// //                     <div className="relative mr-3">
// //                       <input 
// //                         type="text" 
// //                         placeholder="Filter scans..." 
// //                         value={filterText}
// //                         onChange={(e) => setFilterText(e.target.value)}
// //                         className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
// //                       />
// //                       <i className="fas fa-filter absolute left-3 top-3 text-gray-400"></i>
// //                     </div>
// //                     <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
// //                       View all
// //                       <i className="fas fa-chevron-right ml-1 text-sm"></i>
// //                     </button>
// //                   </div>
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   {filteredScans.map(scan => (
// //                     <div key={scan.id} className="scan-item border border-gray-200 rounded-lg p-4">
// //                       <div className="flex justify-between items-start mb-3">
// //                         <div className="flex-1 min-w-0">
// //                           <h3 className="font-medium text-gray-800 truncate">{scan.url}</h3>
// //                           <p className="text-sm text-gray-500 mt-1">{scan.date}</p>
// //                         </div>
// //                         <div className="flex items-center space-x-3 ml-4">
// //                           <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getScoreColor(scan.score)}`}>
// //                             {scan.score}%
// //                           </span>
// //                           <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
// //                             View Report
// //                           </button>
// //                         </div>
// //                       </div>
                      
// //                       <div className="flex items-center justify-between text-sm text-gray-600">
// //                         <div className="flex items-center space-x-4">
// //                           <div className="flex items-center">
// //                             <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
// //                             <span>{scan.violations} violations</span>
// //                           </div>
// //                           <div className="flex items-center">
// //                             <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
// //                             <span>{scan.warnings} warnings</span>
// //                           </div>
// //                         </div>
                        
// //                         <div className="flex items-center space-x-2">
// //                           <span className="text-xs text-gray-400">Scan ID: {scan.id}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
                  
// //                   {filteredScans.length === 0 && (
// //                     <div className="text-center py-8 text-gray-500">
// //                       <i className="fas fa-search fa-3x text-gray-300 mb-3"></i>
// //                       <p>No scans found</p>
// //                       <p className="text-sm">Try a different search term</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Quick Actions & Scan Form */}
// //             <div className="lg:col-span-1">
// //               <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Website</h2>
// //                 <form>
// //                   <div className="mb-4">
// //                     <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="url">
// //                       Website URL
// //                     </label>
// //                     <input 
// //                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" 
// //                       id="url" 
// //                       type="url" 
// //                       placeholder="https://example.com" 
// //                       required 
// //                     />
// //                   </div>
// //                   <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
// //                     <i className="fas fa-search mr-2"></i>Check Accessibility
// //                   </button>
// //                 </form>
// //               </div>

// //               <div className="bg-white rounded-xl shadow-lg p-6">
// //                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
// //                 <div className="space-y-4">
// //                   <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition w-full">
// //                     <div className="bg-blue-100 p-3 rounded-full">
// //                       <i className="fas fa-file-alt text-blue-600"></i>
// //                     </div>
// //                     <div className="ml-4 text-left">
// //                       <h4 className="text-sm font-medium text-gray-900">Generate Report</h4>
// //                       <p className="text-xs text-gray-500">Create accessibility report</p>
// //                     </div>
// //                   </button>

// //                   <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition w-full">
// //                     <div className="bg-green-100 p-3 rounded-full">
// //                       <i className="fas fa-users text-green-600"></i>
// //                     </div>
// //                     <div className="ml-4 text-left">
// //                       <h4 className="text-sm font-medium text-gray-900">Add Team Member</h4>
// //                       <p className="text-xs text-gray-500">Invite colleagues</p>
// //                     </div>
// //                   </button>

// //                   <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition w-full">
// //                     <div className="bg-purple-100 p-3 rounded-full">
// //                       <i className="fas fa-cog text-purple-600"></i>
// //                     </div>
// //                     <div className="ml-4 text-left">
// //                       <h4 className="text-sm font-medium text-gray-900">Settings</h4>
// //                       <p className="text-xs text-gray-500">Configure scanner</p>
// //                     </div>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       </div>

// //       <style jsx>{`
// //         :root {
// //           --primary: #4361ee;
// //           --secondary: #3f37c9;
// //           --success: #4cc9f0;
// //           --warning: #f72585;
// //           --light: #f8f9fa;
// //         }
        
// //         .circular-progress {
// //           position: relative;
// //           height: 120px;
// //           width: 120px;
// //           border-radius: 50%;
// //           background: conic-gradient(#4361ee var(--progress), #ededed 0deg);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }
        
// //         .circular-progress::before {
// //           content: "";
// //           position: absolute;
// //           height: 100px;
// //           width: 100px;
// //           border-radius: 50%;
// //           background-color: white;
// //         }
        
// //         .progress-value {
// //           position: relative;
// //           font-size: 24px;
// //           font-weight: 600;
// //         }
        
// //         .scan-item {
// //           border-left: 4px solid transparent;
// //           transition: all 0.3s;
// //         }
        
// //         .scan-item:hover {
// //           border-left-color: #4361ee;
// //           background-color: #f0f4ff;
// //         }
        
// //         .search-box:focus {
// //           outline: none;
// //           box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
// //         }
        
// //         .score-high {
// //           background-color: #10b981;
// //         }
        
// //         .score-medium {
// //           background-color: #f59e0b;
// //         }
        
// //         .score-low {
// //           background-color: #ef4444;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // Dashboard.js
// //import React, { useState, useEffect, useRef } from "react";
// import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// //Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler, Tooltip, Legend);

// //const Dashboard = () => {
//   const [scans, setScans] = useState([
//     {
//       id: 'EX1234',
//       url: 'example.com',
//       date: 'Mar 20, 2024 • 2:45 PM',
//       score: 92,
//       violations: 5,
//       warnings: 12,
//       status: 'high'
//     },
//     {
//       id: 'TS5678',
//       url: 'test-site.com',
//       date: 'Mar 19, 2024 • 11:30 AM',
//       score: 88,
//       violations: 8,
//       warnings: 10,
//       status: 'medium'
//     },
//     {
//       id: 'SS9012',
//       url: 'sample-site.org',
//       date: 'Mar 18, 2024 • 4:15 PM',
//       score: 72,
//       violations: 15,
//       warnings: 22,
//       status: 'low'
//     }
//   ]);
  
//   const [filterText, setFilterText] = useState('');
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     // Initialize compliance trend chart
//     if (chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
      
//       const ctx = chartRef.current.getContext('2d');
//       chartInstance.current = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//           datasets: [{
//             label: 'Compliance Score',
//             data: [85, 82, 88, 90, 86, 89, 91, 93, 90, 92, 94, 92],
//             borderColor: '#4361ee',
//             backgroundColor: 'rgba(67, 97, 238, 0.1)',
//             tension: 0.3,
//             fill: true,
//             pointBackgroundColor: '#4361ee',
//             pointRadius: 4,
//             pointHoverRadius: 6
//           }]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               beginAtZero: false,
//               min: 70,
//               max: 100,
//               grid: {
//                 drawBorder: false
//               }
//             },
//             x: {
//               grid: {
//                 display: false
//               }
//             }
//           },
//           plugins: {
//             legend: {
//               display: false
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   const filteredScans = scans.filter(scan => 
//     scan.url.toLowerCase().includes(filterText.toLowerCase()) || 
//     scan.date.toLowerCase().includes(filterText.toLowerCase())
//   );

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'bg-green-500';
//     if (score >= 75) return 'bg-yellow-500';
//     return 'bg-red-500';
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md hidden md:block">
//         <div className="p-5">
//           <h1 className="text-xl font-bold text-gray-800 flex items-center">
//             <span className="mr-2 text-blue-500">🌐</span>
//             DeepSeek Scanner
//           </h1>
//         </div>
//         <nav className="mt-6">
//           <a className="flex items-center px-6 py-3 text-gray-700 bg-blue-50 border-r-4 border-blue-500" href="#">
//             <span className="mr-3 text-blue-600">🏠</span>
//             Dashboard
//           </a>
//           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
//             <span className="mr-3">🔍</span>
//             Scan Website
//           </a>
//           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
//             <span className="mr-3">📊</span>
//             Scan History
//           </a>
//           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
//             <span className="mr-3">📈</span>
//             Reports
//           </a>
//           <a className="flex items-center px-6 py-3 mt-2 text-gray-500 hover:bg-gray-100" href="#">
//             <span className="mr-3">⚙️</span>
//             Settings
//           </a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center">
//               <button className="md:hidden text-gray-500 mr-4">
//                 <span>≡</span>
//               </button>
//               <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//             </div>
//             <div className="flex items-center">
//               <div className="relative mr-4">
//                 <input 
//                   type="text" 
//                   placeholder="Search scans..." 
//                   className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <span className="absolute left-3 top-3 text-gray-400">🔍</span>
//               </div>
//               <div className="relative">
//                 <img className="h-10 w-10 rounded-full object-cover" src="https://randomuser.me/api/portraits/men/75.jpg" alt="User" />
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="p-6">
//           {/* Welcome Section */}
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">Welcome back, Jack!</h2>
//                 <p className="opacity-90">Ready to make the web more accessible. Start a new scan or review your results.</p>
//               </div>
//               <button className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//                 <span className="mr-2">+</span>New Scan
//               </button>
//             </div>
//           </div>

//           {/* Overview Stats */}
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//               {/* Circular Progress Score */}
//               <div className="flex flex-col items-center justify-center">
//                 <div className="relative h-32 w-32">
//                   <svg className="w-full h-full" viewBox="0 0 36 36">
//                     <path
//                       d="M18 2.0845
//                         a 15.9155 15.9155 0 0 1 0 31.831
//                         a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none"
//                       stroke="#eee"
//                       strokeWidth="3"
//                     />
//                     <path
//                       d="M18 2.0845
//                         a 15.9155 15.9155 0 0 1 0 31.831
//                         a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none"
//                       stroke="#4361ee"
//                       strokeWidth="3"
//                       strokeDasharray="85, 100"
//                     />
//                     <text x="18" y="20.5" textAnchor="middle" className="text-4xl font-bold">92%</text>
//                   </svg>
//                 </div>
//                 <p className="mt-3 text-sm font-medium text-gray-600">Overall Score</p>
//                 <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium mt-1 rounded-full">
//                   <span className="mr-1">⭐</span>Excellent
//                 </span>
//               </div>
              
//               {/* Stats */}
//               <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className="bg-blue-50 p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-blue-800">128</div>
//                   <div className="text-sm text-blue-600 mt-1">Violations</div>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-yellow-800">542</div>
//                   <div className="text-sm text-yellow-600 mt-1">Warnings</div>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-green-800">45</div>
//                   <div className="text-sm text-green-600 mt-1">Scanned Sites</div>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg text-center">
//                   <div className="text-2xl font-bold text-purple-800">2.45s</div>
//                   <div className="text-sm text-purple-600 mt-1">Avg Time</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compliance Trend Graph */}
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Compliance Trend</h2>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Week</button>
//                 <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Month</button>
//                 <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Year</button>
//               </div>
//             </div>
//             <div className="h-64">
//               <canvas ref={chartRef}></canvas>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Recent Scans */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
//                     <p className="text-gray-600 text-sm mt-1">Your latest accessibility reports</p>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="relative mr-3">
//                       <input 
//                         type="text" 
//                         placeholder="Filter scans..." 
//                         value={filterText}
//                         onChange={(e) => setFilterText(e.target.value)}
//                         className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                       />
//                       <span className="absolute left-3 top-3 text-gray-400">🔍</span>
//                     </div>
//                     <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//                       View all
//                       <span className="ml-1 text-sm">→</span>
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   {filteredScans.map(scan => (
//                     <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-medium text-gray-800 truncate">{scan.url}</h3>
//                           <p className="text-sm text-gray-500 mt-1">{scan.date}</p>
//                         </div>
//                         <div className="flex items-center space-x-3 ml-4">
//                           <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getScoreColor(scan.score)}`}>
//                             {scan.score}%
//                           </span>
//                           <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
//                             View Report
//                           </button>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center justify-between text-sm text-gray-600">
//                         <div className="flex items-center space-x-4">
//                           <div className="flex items-center">
//                             <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
//                             <span>{scan.violations} violations</span>
//                           </div>
//                           <div className="flex items-center">
//                             <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
//                             <span>{scan.warnings} warnings</span>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <span className="text-xs text-gray-400">Scan ID: {scan.id}</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
                  
//                   {filteredScans.length === 0 && (
//                     <div className="text-center py-8 text-gray-500">
//                       <span className="text-4xl text-gray-300 mb-3 block">🔍</span>
//                       <p>No scans found</p>
//                       <p className="text-sm">Try a different search term</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Actions & Scan Form */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Website</h2>
//                 <form>
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="url">
//                       Website URL
//                     </label>
//                     <input 
//                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" 
//                       id="url" 
//                       type="url" 
//                       placeholder="https://example.com" 
//                       required 
//                     />
//                   </div>
//                   <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
//                     <span className="mr-2">🔍</span>Check Accessibility
//                   </button>
//                 </form>
//               </div>

//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
//                 <div className="space-y-4">
//                   <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition w-full">
//                     <div className="bg-blue-100 p-3 rounded-full">
//                       <span className="text-blue-600">📄</span>
//                     </div>
//                     <div className="ml-4 text-left">
//                       <h4 className="text-sm font-medium text-gray-900">Generate Report</h4>
//                       <p className="text-xs text-gray-500">Create accessibility report</p>
//                     </div>
//                   </button>

//                   <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition w-full">
//                     <div className="bg-green-100 p-3 rounded-full">
//                       <span className="text-green-600">👥</span>
//                     </div>
//                     <div className="ml-4 text-left">
//                       <h4 className="text-sm font-medium text-gray-900">Add Team Member</h4>
//                       <p className="text-xs text-gray-500">Invite colleagues</p>
//                     </div>
//                   </button>

//                   <button className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition w-full">
//                     <div className="bg-purple-100 p-3 rounded-full">
//                       <span className="text-purple-600">⚙️</span>
//                     </div>
//                     <div className="ml-4 text-left">
//                       <h4 className="text-sm font-medium text-gray-900">Settings</h4>
//                       <p className="text-xs text-gray-500">Configure scanner</p>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// //};

// //export default Dashboard;

// import React, { useEffect, useRef } from "react";
// import { Chart } from "chart.js/auto";

// const Dashboard = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current;
//     if (!ctx) return;

//     // Destroy old chart instance if it exists
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     // Create new chart
//     chartInstance.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: [
//           "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//         ],
//         datasets: [
//           {
//             label: "Compliance Score",
//             data: [85, 82, 88, 90, 86, 89, 91, 93, 90, 92, 94, 92],
//             borderColor: "#4361ee",
//             backgroundColor: "rgba(67, 97, 238, 0.1)",
//             tension: 0.3,
//             fill: true,
//             pointBackgroundColor: "#4361ee",
//             pointRadius: 4,
//             pointHoverRadius: 6,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { min: 70, max: 100, grid: { drawBorder: false } },
//           x: { grid: { display: false } },
//         },
//         plugins: { legend: { display: false } },
//       },
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const url = e.target.url.value;
//     alert("Scanning website: " + url);
//   };

//   const handleButtonClick = (text) => {
//     alert("Button clicked: " + text);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg hidden md:flex flex-col">
//         <div className="p-6">
//           <h1 className="text-xl font-bold text-gray-800 flex items-center">
//             <span className="text-blue-500 mr-2">
//               <i className="fas fa-globe-americas"></i>
//             </span>
//             DeepSeek Scanner
//           </h1>
//         </div>
//         <nav className="flex-1 px-4 pb-4">
//           <a
//             href="#"
//             className="flex items-center px-4 py-3 text-gray-700 bg-blue-50 rounded-lg border-r-4 border-blue-500"
//           >
//             <i className="fas fa-home text-blue-500 w-5"></i>
//             <span className="ml-3">Dashboard</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center px-4 py-3 mt-2 text-gray-500 hover:bg-gray-100 rounded-lg"
//           >
//             <i className="fas fa-search w-5"></i>
//             <span className="ml-3">Scan Website</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center px-4 py-3 mt-2 text-gray-500 hover:bg-gray-100 rounded-lg"
//           >
//             <i className="fas fa-history w-5"></i>
//             <span className="ml-3">Scan History</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center px-4 py-3 mt-2 text-gray-500 hover:bg-gray-100 rounded-lg"
//           >
//             <i className="fas fa-chart-bar w-5"></i>
//             <span className="ml-3">Reports</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center px-4 py-3 mt-2 text-gray-500 hover:bg-gray-100 rounded-lg"
//           >
//             <i className="fas fa-cog w-5"></i>
//             <span className="ml-3">Settings</span>
//           </a>
//         </nav>
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex items-center">
//             <img
//               className="h-10 w-10 rounded-full object-cover"
//               src="https://randomuser.me/api/portraits/men/75.jpg"
//               alt="User"
//             />
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-700">Just Smith</p>
//               <p className="text-xs text-gray-500">Admin</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="flex items-center justify-between p-4">
//             <div className="flex items-center">
//               <button className="md:hidden text-gray-500 mr-4">
//                 <i className="fas fa-bars text-xl"></i>
//               </button>
//               <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
//             </div>
//             <div className="flex items-center">
//               <div className="relative mr-4">
//                 <input
//                   type="text"
//                   placeholder="Search scans..."
//                   className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
//                 />
//                 <span className="absolute left-3 top-3 text-gray-400">
//                   <i className="fas fa-search"></i>
//                 </span>
//               </div>
//               <button
//                 onClick={() => handleButtonClick("Notifications")}
//                 className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
//               >
//                 <i className="fas fa-bell"></i>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Body */}
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
//           {/* Welcome Section */}
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">Welcome back, Just!</h2>
//                 <p className="opacity-90">
//                   Ready to make the web more accessible. View or manage your
//                   results.
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleButtonClick("New Scan")}
//                 className="mt-4 md:mt-0 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
//               >
//                 <i className="fas fa-plus mr-2"></i>New Scan
//               </button>
//             </div>
//           </div>

//           {/* Compliance Trend Graph */}
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Compliance Trend
//               </h2>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
//                   Week
//                 </button>
//                 <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
//                   Month
//                 </button>
//                 <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
//                   Year
//                 </button>
//               </div>
//             </div>
//             <div className="h-64">
//               <canvas ref={chartRef}></canvas>
//             </div>
//           </div>

//           {/* Scan Website Form */}
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               Scan Website
//             </h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="url"
//                   className="block text-gray-700 text-sm font-medium mb-2"
//                 >
//                   Website URL
//                 </label>
//                 <input
//                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
//                   id="url"
//                   type="url"
//                   placeholder="https://example.com"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
//               >
//                 <i className="fas fa-search mr-2"></i>Check Accessibility
//               </button>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";


const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Total Scans</h2>
            <p className="text-3xl font-bold mt-2">124</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Passed</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">96</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Failed</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">28</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scan History */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Scans</h2>
            <Button variant="outline">View All</Button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">URL</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
                <th className="p-2">Report</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">https://example.com</td>
                <td className="p-2 text-green-600">Passed</td>
                <td className="p-2">22 Sep, 2025</td>
                <td className="p-2">
                  <Button size="sm">View</Button>
                </td>
              </tr>
              <tr>
                <td className="p-2">https://testsite.com</td>
                <td className="p-2 text-red-600">Failed</td>
                <td className="p-2">21 Sep, 2025</td>
                <td className="p-2">
                  <Button size="sm">View</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* User Settings */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">User Settings</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <Button variant="outline">Toggle</Button>
          </div>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Button variant="outline">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
