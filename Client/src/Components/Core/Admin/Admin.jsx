import React from 'react';
import Sidebar from './AdminSidebar';
// import TopNavbar from '../components/TopNavbar';

export default function AdminPage() {
  const adminSections = [
    {
      title: 'Administrator',
      items: [
        'User Permissions', 'Data Access', 'System Settings',
        'Smart Tag Setup', 'Lookup List', 'Company', 
        'Company Customer Fee Schedule', 'Users', 
        'User List Task Groups', 'User Non-Availability', 
        'User Task Reassign'
      ]
    },
    {
      title: 'System Settings',
      items: ['Smart Tag Setup', 'Lookup List']
    },
    {
      title: 'Workflow',
      items: ['Workflow Groups']
    },
    {
      title: 'Company',
      items: ['Company', 'Order Number', 'Invoice Number', 'Customer Fee Schedule']
    },
    {
      title: 'Order Settings',
      items: ['Transaction Types', 'Order Templates', 'Custom Documents', 'Email Template', 'SQSearch Bot']
    },
    {
      title: 'Defaults',
      items: ['Contact Fee Schedule', 'Contact Workflow Groups', 'Contact Guidance']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* <TopNavbar /> */}

      <div className="flex flex-1">
        {/* Sidebar (with width) */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-white">Admin Overview</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminSections.map((section, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="text-gray-300 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gray-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
