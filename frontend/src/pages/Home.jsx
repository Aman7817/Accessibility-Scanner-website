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


import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import RecentScans from '../components/RecentScans';
import api from '../utils/axios';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [url, setUrl] = useState('');
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();


  
  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-700';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

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
    if (!url) return setError('Please enter a URL');

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/scan/start-scan', { url });
      const data = res.data.data;

      // ✅ Correct report URL construction
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

      setRecentScans(prev => [newScan, ...prev.slice(0, 9)]);
      setScanResult(data);
      
      // ✅ Correct report URL - localhost:5000
      const fullReportUrl = `http://localhost:5000${reportUrl}`;
      window.open(fullReportUrl, '_blank');

    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection 
        url={url} 
        setUrl={setUrl} 
        handleScan={handleScan} 
        loading={loading} 
      />
      
      <div className="container mx-auto px-4">
        <StatsSection />
        
        {error && (
          <div className="text-red-600 my-4 p-3 bg-red-50 rounded">
            {error}
          </div>
        )}
        
        {scanResult && (
          <div className="bg-white rounded p-4 shadow my-6">
            <h3 className="font-semibold mb-2">Latest Scan — {url}</h3>
            <p>Score: <strong>{scanResult.score}%</strong></p>
            <p>Total violations: {scanResult.violations}</p>
            {scanResult.reportLinks?.html && (
              <a
                href={`http://localhost:5000${scanResult.reportLinks.html}`}
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View full report
              </a>
            )}
          </div>
        )}

        <RecentScans recentScans={recentScans} getScoreColor={getScoreColor} />
      </div>
    </div>
  );
};

export default Home;