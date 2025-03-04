import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBell, FaCommentDots } from 'react-icons/fa';

export default function Navbar() {
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Orders', path: '/orders' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Reports', path: '/reports' },
    { name: 'Accounting', path: '/accounting' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-700 fixed top-0 left-0 w-full z-50">
      <div className="w-9/12 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation Items */}
          <div className="flex items-center mx-auto">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `text-gray-300 hover:text-white px-1 py-2 text-sm font-medium transition-colors relative group ${
                      isActive ? 'text-white' : ''
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 transform origin-bottom transition-transform ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer text-gray-300 hover:text-white">
              <FaBell size={20} />
              {/* Notification badge example */}
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span> */}
            </div>
            <div className="cursor-pointer text-gray-300 hover:text-white">
              <FaCommentDots size={20} />
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium cursor-pointer">
              DK
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
