"use client";

import { Menu, X, Bell } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({
  open,
  setOpen,
}: NavbarProps) => {
  const fullDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const shortDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="h-20 px-4 sm:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 flex-shrink-0"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Title */}
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800 truncate">
              <span className="sm:hidden">CRM</span>
              <span className="hidden sm:inline">
                CRM Dashboard
              </span>
            </h1>

            <p className="hidden md:block text-xs text-gray-500 truncate">
              Manage leads and customer relationships
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Mobile Date */}
          <div className="sm:hidden text-xs font-medium text-gray-600">
            {shortDate}
          </div>

          {/* Desktop Date */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-700">
              {fullDate}
            </p>

            <p className="hidden lg:block text-xs text-gray-500">
              Have a productive day 🚀
            </p>
          </div>

          {/* Notification */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
            <Bell
              size={21}
              className="text-gray-700"
            />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User */}
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-9 h-9 sm:w-10 sm:h-10",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;