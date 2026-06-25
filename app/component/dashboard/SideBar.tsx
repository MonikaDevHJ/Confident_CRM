"use client"

import { useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaUserPlus,
  FaAddressBook,
  FaStickyNote,
  FaTasks,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Leads", icon: <FaUserFriends /> },
    { name: "Add Lead", icon: <FaUserPlus /> },
    { name: "Contacts", icon: <FaAddressBook /> },
    { name: "Notes", icon: <FaStickyNote /> },
    { name: "Tasks", icon: <FaTasks /> },
    { name: "Reports", icon: <FaChartBar /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-gradient-to-b from-slate-900 to-blue-950
          text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FaAddressBook size={20} />
          </div>
          <h1 className="text-xl font-bold">CRM Pro</h1>
        </div>

        {/* Menu */}
        <nav className="mt-6 px-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300
                ${
                  index === 0
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-white/10"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;