import React from 'react';

const HeroSection = ({ url, setUrl, handleScan, loading, scanningProgress, error }) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Test Your Website
            <span className="text-blue-600 block">Accessibility</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get a comprehensive accessibility report in 
            <span className="text-blue-600 font-semibold"> just 30 seconds</span>
          </p>
        </div>

        {/* Steps */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {[
              { step: '1', title: 'Enter URL', desc: 'Paste your website link' },
              { step: '2', title: 'Wait 30s', desc: 'AI-powered analysis' },
              { step: '3', title: 'Get Report', desc: 'Detailed insights' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-16 w-12 h-0.5 bg-blue-300"></div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* URL Input Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleScan} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-6 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  autoFocus
                  disabled={loading}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scanning...
                  </span>
                ) : (
                  'Check Accessibility'
                )}
              </button>
            </div>
            
            {/* Helper Text */}
            <p className="text-gray-500 text-sm">
              ✅ No registration required • 🆓 100% free scan • ⚡ Instant results
            </p>
          </form>
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                Scanning your website... {scanningProgress}%
              </p>
              <p className="text-gray-600">
                Analyzing accessibility issues across multiple criteria
              </p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300 shadow-inner"
                style={{ width: `${scanningProgress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-500">
              <span>Started</span>
              <span>Estimated time: 30 seconds</span>
              <span>Complete</span>
            </div>
          </div>
        )}

        {/* Quick Examples */}
        {!loading && (
          <div className="mt-8">
            <p className="text-gray-600 mb-3">Try scanning popular sites:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['https://google.com', 'https://github.com', 'https://reactjs.org'].map((sampleUrl) => (
                <button
                  key={sampleUrl}
                  onClick={() => setUrl(sampleUrl)}
                  className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  {sampleUrl.replace('https://', '')}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;



















