import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../Components/Core/Admin/AdminSidebar';

export default function AdminPage() {
  const adminSections = [
    {
      title: 'Administrator',
      icon: '👤',
      items: [
        { name: 'User Permissions', path: '/admin/user-permissions' },
        { name: 'Data Access', path: '/admin/data-access' },
        { name: 'Allowed IP Address', path: '/admin/allowed-ip' }
      ]
    },
    {
      title: 'Contacts',
      icon: '👤',
      items: [
        { name: 'Contact Type', path: '/admin/contact-type' }
      ]
    },
    {
      title: 'System Settings',
      icon: '⚙️',
      items: [
        { name: 'Smart Tag Setup', path: '/admin/smart-tag' },
        { name: 'Lookup List', path: '/admin/lookup-list' }
      ]
    },
    {
      title: 'Company',
      icon: '🏢',
      items: [
        { name: 'Company', path: '/admin/company' },
        { name: 'Order Number', path: '/admin/order-number' },
        { name: 'Invoice Number', path: '/admin/invoice-number' },
        { name: 'Customer Fee Schedule', path: '/admin/customer-fee-schedule' }
      ]
    },
    {
      title: 'Users',
      icon: '👥',
      items: [
        { name: 'User List', path: '/admin/user-list' },
        { name: 'Lite User List', path: '/admin/lite-user-list' },
        { name: 'Permission Groups', path: '/admin/permission-groups' },
        { name: 'Task Groups', path: '/admin/task-groups' },
        { name: 'User Non-Availability', path: '/admin/user-non-availability' },
        { name: 'User Task Reassign', path: '/admin/user-task-reassign' }
      ]
    },
    {
      title: 'Workflow',
      icon: '🔄',
      items: [
        { name: 'Workflow Groups', path: '/admin/workflow-groups' }
      ]
    },
    {
      title: 'Order Settings',
      icon: '📦',
      items: [
        { name: 'Transaction Types', path: '/admin/transaction-types' },
        { name: 'Order Templates', path: '/admin/order-templates' },
        { name: 'Custom Documents', path: '/admin/custom-documents' },
        { name: 'Email Template', path: '/admin/email-template' },
        { name: 'SQSearch Bot', path: '/admin/sqsearch-bot' }
      ]
    },
    {
      title: 'Defaults',
      icon: '🔧',
      items: [
        { name: 'Contact Fee Schedule', path: '/admin/contact-fee-schedule' },
        { name: 'Contact Workflow Groups', path: '/admin/contact-workflow-groups' },
        { name: 'Contact Guidance', path: '/admin/contact-guidance' }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (Fixed) */}
      <div className="w-64 h-screen bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Admin Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-100 text-blue-800 font-medium px-4 py-3 flex items-center gap-2">
                <span className="text-lg">{section.icon}</span>
                <span>{section.title}</span>
              </div>
              <ul className="divide-y divide-gray-200">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <NavLink
                      to={item.path}
                      className="block text-gray-700 hover:text-blue-600 cursor-pointer px-4 py-3 transition-colors"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
