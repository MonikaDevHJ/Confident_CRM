"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

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

  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Leads",
      href: "/dashboard/leads",
      icon: <FaUserFriends />,
    },
    {
      name: "Add Lead",
      href: "/dashboard/add-lead",
      icon: <FaUserPlus />,
    },
    {
      name: "Contacts",
      href: "/dashboard/contacts",
      icon: <FaAddressBook />,
    },
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: <FaStickyNote />,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}

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
          text-white
          z-50
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

          <h1 className="text-xl font-bold">
            CRM Pro
          </h1>
        </div>

        {/* Menu */}

        <nav className="mt-6 px-4">

          {menuItems.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-300
                ${
                  pathname === item.href
                    ? "bg-blue-600 shadow-lg"
                    : "hover:bg-white/10"
                }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </Link>

          ))}

        </nav>

        {/* Logout */}

        <div className="absolute bottom-6 left-0 w-full px-4">

          <SignOutButton>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition">
              <FaSignOutAlt />
              Logout
            </button>

          </SignOutButton>

        </div>

      </aside>
    </>
  );
};

export default SideBar;