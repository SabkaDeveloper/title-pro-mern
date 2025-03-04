import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FaUsers, FaCog, FaBuilding, FaUserShield, FaThLarge } from 'react-icons/fa';
import { FaThLarge } from 'react-icons/fa';
export default function Sidebar() {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center space-x-2 text-sm px-4 py-2 cursor-pointer ${
      isActive ? 'text-blue-500' : 'text-black'
    } hover:text-blue-500`;

  return (
    <aside className="w-64 bg-white text-black h-[100vh] overflow-y-auto fixed font-sans border-r border-gray-200 font-normal shadow-lg shadow-gray-900 ">
      <ul className="space-y-2 py-4">
        {/* Admin Heading */}
        <li className="text-sm font-semibold uppercase px-4 text-gray-600 tracking-wide">Admin</li>

        {/* Overview */}
        <li>
          <NavLink to="/overview" className={navLinkClasses}>
            <FaThLarge />
            <span>Overview</span>
          </NavLink>
        </li>

        {/* Administrator Section */}
        <li className="text-xs uppercase text-gray-500 font-semibold px-4 mt-4 tracking-wide">
          Administrator
        </li>
        <ul className="pl-6 text-sm text-black space-y-1">
          <li>
            <NavLink to="/admin/user-permissions" className={navLinkClasses}>
              User Permissions
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/data-access" className={navLinkClasses}>
              Data Access
            </NavLink>
          </li>
        </ul>

        {/* System Settings Section */}
        <li className="text-xs uppercase text-gray-500 font-semibold px-4 mt-4 tracking-wide">
          System Settings
        </li>
        <ul className="pl-6 text-sm text-black space-y-1">
          <li>
            <NavLink to="/system/smart-tag-setup" className={navLinkClasses}>
              Smart Tag Setup
            </NavLink>
          </li>
          <li>
            <NavLink to="/system/lookup-list" className={navLinkClasses}>
              Lookup List
            </NavLink>
          </li>
        </ul>

        {/* Company Section */}
        <li className="text-xs uppercase text-gray-500 font-semibold px-4 mt-4 tracking-wide">
          Company
        </li>
        <ul className="pl-6 text-sm text-black space-y-1">
          <li>
            <NavLink to="/company" className={navLinkClasses}>
              Company
            </NavLink>
          </li>
          <li>
            <NavLink to="/company/customer-fee-schedule" className={navLinkClasses}>
              Customer Fee Schedule
            </NavLink>
          </li>
        </ul>

        {/* Users Section */}
        <li className="text-xs uppercase text-gray-500 font-semibold px-4 mt-4 tracking-wide">
          Users
        </li>
        <ul className="pl-6 text-sm text-black space-y-1">
          <li>
            <NavLink to="/users/user-list" className={navLinkClasses}>
              User List
            </NavLink>
          </li>
          <li>
            <NavLink to="/users/task-groups" className={navLinkClasses}>
              Task Groups
            </NavLink>
          </li>
          <li>
            <NavLink to="/users/non-availability" className={navLinkClasses}>
              User Non-Availability
            </NavLink>
          </li>
          <li>
            <NavLink to="/users/task-reassign" className={navLinkClasses}>
              User Task Reassign
            </NavLink>
          </li>
        </ul>
      </ul>
    </aside>
  );
}
