import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaChartLine, FaUserFriends } from "react-icons/fa";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { PiClipboardText, PiNewspaperClippingThin, PiBooksLight } from "react-icons/pi";
import { BsDatabaseCheck } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { CiDollar } from "react-icons/ci";
import { SlNote } from "react-icons/sl";
import { LuFileSpreadsheet, LuClipboardPenLine, LuUsers } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiFileHistoryLine, RiListUnordered } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { IoIosContact } from "react-icons/io";
import { TiFlowChildren } from "react-icons/ti";
import { TbSettingsDollar } from "react-icons/tb";
import { LiaLayerGroupSolid } from "react-icons/lia";

const Sidebar = ({ order, isAdmin }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = isAdmin
    ? [
        { label: "Administrator", icon: <GrUserSettings />, path: "/admin/users" },
        { label: "Contacts", icon: <IoIosContact />, path: "/admin/settings" },
        { label: "Company", icon: <RiListUnordered />, path: "/admin/roles" },
        { label: "Users", icon: <LuUsers />, path: "/admin/logs" },
        { label: "Workflow", icon: <TiFlowChildren />, path: "/admin/logs" },
        { label: "Order Settings", icon: <TbSettingsDollar />, path: "/admin/logs" },
        { label: "Defaults", icon: <LiaLayerGroupSolid />, path: "/admin/logs" },
      ]
    : [
        { label: "Order Summary", icon: <TfiLayoutGrid2 />, path: "/order-summary" },
        { label: "Order Entry", icon: <PiClipboardText />, path: "/order-entry" },
        { label: "Data Access", icon: <BsDatabaseCheck />, path: "/data-access" },
        { label: "Property Tax", icon: <PiNewspaperClippingThin />, path: "/property-tax" },
        { label: "Worksheet", icon: <LuFileSpreadsheet />, path: "/worksheet" },
        { label: "Tasks", icon: <FaTasks />, path: "/tasks" },
        { label: "Documents", icon: <HiOutlineDocumentText />, path: "/documents" },
        { label: "File History", icon: <RiFileHistoryLine />, path: "/file-history" },
        { label: "Recording", icon: <PiBooksLight />, path: "/recording" },
        { label: "Notes", icon: <SlNote />, path: "/notes" },
        { label: "Email", icon: <MdOutlineEmail />, path: "/email" },
        { label: "Accounting", icon: <CiDollar />, path: "/accounting" },
        { label: "Custom Fields", icon: <LuClipboardPenLine />, path: "/custom-fields" },
      ];

  return (
    <>
      {/* Sidebar for Large Screens */}
      <div className="hidden lg:block w-52 h-screen bg-white text-black fixed top-16 left-0 p-5 border-r border-gray-300 overflow-y-auto">
        <h5 className="text-lg mb-2 font-bold">{value}</h5>
        <hr className="border-t-2 border-black mb-4" />
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <button key={index} onClick={() => { setValue(item.label); navigate(item.path); }}
              className="text-black text-start flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-md">
              {item.icon}<span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Button to Open Sidebar on Small Screens */}
      <button className="lg:hidden bg-blue-500 text-white m-3 p-2 rounded-md" onClick={() => setShow(true)}>
        <FaBars /> Menu
      </button>

      {/* Offcanvas Sidebar for Small Screens */}
      {show && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex">
          <div className="bg-white w-64 p-4 h-full overflow-y-auto">
            <button className="text-black mb-4" onClick={() => setShow(false)}>Close</button>
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <button key={index} onClick={() => { setValue(item.label); navigate(item.path); setShow(false); }}
                  className="text-black text-start flex items-center space-x-2 hover:bg-gray-200 p-2 rounded-md">
                  {item.icon}<span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
