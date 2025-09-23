import React from 'react';

const HeroSection = ({ url, setUrl, handleScan ,loading = false }) => {
  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Test your website accessibility</h2>
          <p className="text-gray-600 mb-6">Ensure your applications are inclusive and easy to use for everyone</p>
          
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Scanning...' : 'Check Accessibility'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check Accessibility
            </button>
          </form>
        </div>
        
        <div className="md:w-1/3 flex justify-center">
          <div className="bg-blue-100 p-4 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


// import React from 'react'

// const Hero = () => {
//   return (
//     <div>
//             /* <main className="container mx-auto px-4 py-8">
//         {/* Hero Section */}
//         <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col md:flex-row items-center">
//             <div className="md:w-2/3 mb-6 md:mb-0">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">Test your website accessibility</h2>
//               <p className="text-gray-600 mb-6">Ensure your applications are inclusive and easy to use for everyone</p>
              
//               <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
//                 <input
//                   type="url"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   placeholder="Enter website URL"
//                   className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//                 <button 
//                   type="submit" 
//                   className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Check Accessibility
//                 </button>
//               </form>
//             </div>
            
//             <div className="md:w-1/3 flex justify-center">
//               <div className="bg-blue-100 p-4 rounded-xl">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </section> */

//         {/* Stats Section */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-green-100 p-3 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800">92%</h3>
//               <p className="text-gray-600">Average Score</p>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-red-100 p-3 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800">128</h3>
//               <p className="text-gray-600">Issues Detected</p>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-blue-100 p-3 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800">542</h3>
//               <p className="text-gray-600">Websites Scanned</p>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
//             <div className="bg-purple-100 p-3 rounded-lg mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-800">2.4s</h3>
//               <p className="text-gray-600">Average Scan Time</p>
//             </div>
//           </div>
//         </section>

//         {/* Recent Scans */}
//         <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
//             <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//               View all
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recentScans.map(scan => (
//               <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="text-sm text-gray-500">{scan.date}</div>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(scan.score)}`}>
//                     {scan.score}%
//                   </span>
//                 </div>
                
//                 <h3 className="font-medium text-gray-800 mb-2 truncate">{scan.url}</h3>
                
//                 <div className="flex justify-between text-sm text-gray-600 mb-4">
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                     {scan.violations} violations
//                   </div>
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                     {scan.warnings} warnings
//                   </div>
//                 </div>
                
//                 <button className="w-full py-2 bg-blue-50 text-blue-600 font-medium rounded-md hover:bg-blue-100 transition-colors">
//                   View Report
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Why Choose Our Accessibility Scanner?</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
//               <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Scanning</h3>
//               <p className="text-gray-600">Get comprehensive accessibility reports in seconds, not minutes.</p>
//             </div>
            
//             <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
//               <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Detailed Reports</h3>
//               <p className="text-gray-600">Receive in-depth analysis with actionable recommendations.</p>
//             </div>
            
//             <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
//               <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
//               <p className="text-gray-600">Your data remains confidential and is never shared with third parties.</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default Hero
