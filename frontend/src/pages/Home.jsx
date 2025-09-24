// // import React from 'react'
// // // import Navbar from '../components/Navbar'
// // import Hero from '../components/Hero'
// // import Footer from '../components/Footer'
// // // import HomeReportSection from '../components/HomeReportSection'
// // // import AccessibilityDashboard from '../components/AccessibilityDashboard'
// // import FeaturesSection from '../components/FeaturesSection'
// // import StatsSection from '../components/StatsSection'
// // import RecentScans from '../components/RecentScans'

// // const Home = () => {
// //   return (
// //     <>
      
// //       {/* <AccessibilityDashboard/> */}
// //       <Hero/>
// //       <FeaturesSection/>
// //       <StatsSection/>
// //       <RecentScans/>

// //       {/* <HomeReportSection/> */}
// //       <Footer/>
// //     </>
// //   )
// // }

// // export default Home


///* --- IGNORE ---

// // import React, { useState } from "react";
// // import HeroSection from "../components/HeroSection";
// // import StatsSection from "../components/StatsSection";
// // import RecentScans from "../components/RecentScans";
// // import FeaturesSection from "../components/FeaturesSection";

// // const Home = () => {
// //   const [url, setUrl] = useState('');
// //   const [recentScans, setRecentScans] = useState([
// //     { id: 1, url: 'https://example.com', date: '2023-10-15', score: 92, violations: 2, warnings: 5 },
// //     { id: 2, url: 'https://demo-site.org', date: '2023-10-14', score: 78, violations: 8, warnings: 12 },
// //     { id: 3, url: 'https://test-site.com', date: '2023-10-13', score: 85, violations: 4, warnings: 7 }
// //   ]);

// //   const handleScan = (e) => {
// //     e.preventDefault();
// //     if (url) {
// //       const newScan = {
// //         id: recentScans.length + 1,
// //         url: url,
// //         date: new Date().toISOString().split('T')[0],
// //         score: Math.floor(Math.random() * 30) + 70,
// //         violations: Math.floor(Math.random() * 10) + 1,
// //         warnings: Math.floor(Math.random() * 15) + 1
// //       };
// //       setRecentScans([newScan, ...recentScans]);
// //       setUrl('');
// //     }
// //   };

// //   return (
// //     <>
// //       <HeroSection url={url} setUrl={setUrl} handleScan={handleScan} />
// //       <StatsSection />
// //       {/* Function to determine score color */}
// //       <RecentScans 
// //         recentScans={recentScans} 
// //         getScoreColor={getScoreColor}
// //       />

// //       <FeaturesSection />
// //     </>
// //   );
// // };

// // export default Home;

// import React, { useState } from "react";
// import HeroSection from "../components/HeroSection";
// import StatsSection from "../components/StatsSection";
// import RecentScans from "../components/RecentScans";
// import FeaturesSection from "../components/FeaturesSection";

// const Home = () => {
//   const [url, setUrl] = useState('');
//   const [recentScans, setRecentScans] = useState([
//     { id: 1, url: 'https://example.com', date: '2023-10-15', score: 92, violations: 2, warnings: 5 },
//     { id: 2, url: 'https://demo-site.org', date: '2023-10-14', score: 78, violations: 8, warnings: 12 },
//     { id: 3, url: 'https://test-site.com', date: '2023-10-13', score: 85, violations: 4, warnings: 7 }
//   ]);

//   const handleScan = (e) => {
//     e.preventDefault();
//     if (url) {
//       const newScan = {
//         id: recentScans.length + 1,
//         url: url,
//         date: new Date().toISOString().split('T')[0],
//         score: Math.floor(Math.random() * 30) + 70,
//         violations: Math.floor(Math.random() * 10) + 1,
//         warnings: Math.floor(Math.random() * 15) + 1
//       };
//       setRecentScans([newScan, ...recentScans]);
//       setUrl('');
//     }
//   };

//   // ✅ Function to determine score color
//   const getScoreColor = (score) => {
//     if (score >= 90) return 'bg-green-100 text-green-800';
//     if (score >= 80) return 'bg-yellow-100 text-yellow-800';
//     if (score >= 70) return 'bg-orange-100 text-orange-800';
//     return 'bg-red-100 text-red-800';
//   };

//   return (
//     <>
//       <HeroSection url={url} setUrl={setUrl} handleScan={handleScan} />
//       <StatsSection />
//       <RecentScans 
//         recentScans={recentScans} 
//         getScoreColor={getScoreColor}
//       />
//       <FeaturesSection />
//     </>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from 'react';
// import HeroSection from '../components/HeroSection';
// import StatsSection from '../components/StatsSection';
// import RecentScans from '../components/RecentScans';
// import api from '../utils/axios';
// import { useLocation } from 'react-router-dom';

// const Home = () => {
//   const [url, setUrl] = useState('');
//   const [recentScans, setRecentScans] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [scanResult, setScanResult] = useState(null);
//   const [error, setError] = useState('');
//   const [scanningProgress, setScanningProgress] = useState(0); // ✅ YAHAN ADD KAREN
//   const location = useLocation();

//   // ... rest of your existing code ...

//   const handleScan = async (e) => {
//     e.preventDefault();
//     if (!url) return setError('Please enter a URL');

//     setLoading(true);
//     setError('');
//     setScanningProgress(0); // ✅ Reset progress

//     // Progress animation for 30 seconds
//     const progressInterval = setInterval(() => {
//       setScanningProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(progressInterval);
//           return 100;
//         }
//         return prev + 3.33; // 100% in 30 seconds
//       });
//     }, 1000);

//     try {
//       const res = await api.post('/scan/start-scan', { url });
//       const data = res.data.data;

//       // ✅ Correct report URL construction
//       const reportUrl = data.reportLinks?.html || '';
//       const htmlReportFileName = reportUrl.split('/').pop();

//       // Update recent scans
//       const newScan = {
//         id: data.reportId,
//         date: new Date().toLocaleString(),
//         url: url,
//         score: data.score,
//         violations: data.violations,
//         htmlReportFileName: htmlReportFileName
//       };

//       setRecentScans(prev => [newScan, ...prev.slice(0, 9)]);
//       setScanResult(data);
      
//       // ✅ Correct report URL - localhost:5000
//       const fullReportUrl = `http://localhost:5000${reportUrl}`;
//       window.open(fullReportUrl, '_blank');

//     } catch (err) {
//       setError(err.response?.data?.message || 'Scan failed');
//     } finally {
//       clearInterval(progressInterval); // ✅ Clear interval
//       setLoading(false);
//       setScanningProgress(0); // ✅ Reset progress
//     }
//   };

//   return (
//     <div>
//       <HeroSection 
//         url={url} 
//         setUrl={setUrl} 
//         handleScan={handleScan} 
//         loading={loading} 
//         scanningProgress={scanningProgress} // ✅ YAHAN PASS KAREN
//         error={error}
//       />
      
//       <div className="container mx-auto px-4">
//         <StatsSection />
        
//         {error && (
//           <div className="text-red-600 my-4 p-3 bg-red-50 rounded">
//             {error}
//           </div>
//         )}
        
//         {scanResult && (
//           <div className="bg-white rounded p-4 shadow my-6">
//             <h3 className="font-semibold mb-2">Latest Scan — {url}</h3>
//             <p>Score: <strong>{scanResult.score}%</strong></p>
//             <p>Total violations: {scanResult.violations}</p>
//             {scanResult.reportLinks?.html && (
//               <a
//                 href={`http://localhost:5000${scanResult.reportLinks.html}`}
//                 target="_blank" 
//                 rel="noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View full report
//               </a>
//             )}
//           </div>
//         )}

        
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import BenefitsAndFAQ from '../components/BenefitsAndFAQ';
import Footer from '../components/Footer';
import api from '../utils/axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [url, setUrl] = useState('');
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const [scanningProgress, setScanningProgress] = useState(0);
  const location = useLocation();

  // Fetch recent scans on component mount
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await api.get('/reports');
        const items = res.data?.data ?? [];
        
        const mapped = items.map((r) => ({
          id: r._id,
          date: new Date(r.createdAt).toLocaleString(),
          url: r.url,
          score: r.score || r.summary?.score || 0,
          violations: r.violationsCount || r.summary?.total || 0,
          warnings: 0,
          htmlReportFileName: r.htmlReportFileName,
        }));
        
        setRecentScans(mapped);
      } catch (err) {
        console.warn('Could not load recent scans', err);
      }
    };
    fetchRecent();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return setError('Please enter a valid URL');

    setLoading(true);
    setError('');
    setScanningProgress(0);
    setScanResult(null);

    // Progress animation for 30 seconds
    const progressInterval = setInterval(() => {
      setScanningProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3.33;
      });
    }, 1000);

    try {
      const res = await api.post('/scan/start-scan', { url });
      const data = res.data.data;

      const reportUrl = data.reportLinks?.html || '';
      const htmlReportFileName = reportUrl.split('/').pop();

      // Update recent scans
      const newScan = {
        id: data.reportId,
        date: new Date().toLocaleString(),
        url: url,
        score: data.score,
        violations: data.violations,
        htmlReportFileName: htmlReportFileName
      };

      setRecentScans(prev => [newScan, ...prev.slice(0, 4)]); // Show only last 5 scans
      setScanResult(data);
      
      const fullReportUrl = `http://localhost:5000${reportUrl}`;
      window.open(fullReportUrl, '_blank');

    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed. Please try again.');
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        url={url} 
        setUrl={setUrl} 
        handleScan={handleScan} 
        loading={loading} 
        scanningProgress={scanningProgress}
        error={error}
      />
      
      <div className="container mx-auto px-4 py-8">
        
        
        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}
        
        {/* Latest Scan Result */}
        {scanResult && (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Latest Scan Result</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(scanResult.score)}`}>
                {scanResult.score}% Score
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Scanned URL</p>
                <p className="text-blue-600 truncate">{url}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Violations Found</p>
                <p className="text-red-600 font-semibold">{scanResult.violations} issues</p>
              </div>
            </div>
            
            {scanResult.reportLinks?.html && (
              <a
                href={`http://localhost:5000${scanResult.reportLinks.html}`}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Full Report
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Recent Scans Section */}
        <div className="max-w-4xl mx-auto">
          
        </div>
        <BenefitsAndFAQ/>
      </div>
      
    </div>
  );
};

export default Home;

