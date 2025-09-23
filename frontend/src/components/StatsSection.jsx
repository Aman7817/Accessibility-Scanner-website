import React from 'react';

const StatsSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="bg-green-100 p-3 rounded-lg mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">92%</h3>
          <p className="text-gray-600">Average Score</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="bg-red-100 p-3 rounded-lg mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">128</h3>
          <p className="text-gray-600">Issues Detected</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="bg-blue-100 p-3 rounded-lg mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">542</h3>
          <p className="text-gray-600">Websites Scanned</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
        <div className="bg-purple-100 p-3 rounded-lg mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">2.4s</h3>
          <p className="text-gray-600">Average Scan Time</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;