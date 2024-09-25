'use client';

import React, { useState } from 'react';

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadReport = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/cinepar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: 'http://localhost:3000/api/report', // URL of the page to convert to PDF
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf'; // The name of the file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error('Failed to download report');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full h-full">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Download Your Report</h1>
        <p className="text-gray-600 mb-6">Click the button below to download the report in PDF format.</p> 
        
        {/* Wrapping iframe in a div to control its size */}
        <div className="w-full h-96 mb-4"> {/* Adjust height as needed */}
          <iframe 
            src="http://localhost:3000/api/report" 
            className="w-full h-full"
            style={{ border: 0 }} 
            allowFullScreen 
          />
        </div>

        <button
          onClick={handleDownloadReport}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Download Report'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
