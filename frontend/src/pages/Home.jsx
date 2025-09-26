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

