// HomePage.tsx
import React from 'react';
// import Navbar from '../Components/Common/Navbar'; // Adjust import path based on your structure

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Navbar /> */}
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Dashboard
          </h1>
          <p className="text-gray-300">
            This is the main content area of your application. You can add charts, 
            statistics, and other relevant information here.
          </p>
          
          {/* Example content section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">Recent Activity</h2>
              <p className="text-gray-300">No recent activity to display</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-2">Statistics</h2>
              <p className="text-gray-300">Statistics will appear here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}