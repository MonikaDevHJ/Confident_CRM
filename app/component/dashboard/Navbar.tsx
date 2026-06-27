"use client";

import { Menu, X, Bell } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ open, setOpen }: NavbarProps) => {
  const fullDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Title */}
          <div>
            <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
              CRM Dashboard
            </h1>

            <p className="hidden md:block text-sm text-gray-500 mt-1">
              Manage leads and customer relationships
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Date */}
          <div className="hidden md:block text-right">
            <p className="text-sm lg:text-base font-semibold text-gray-700">
              {fullDate}
            </p>

            <p className="hidden xl:block text-sm text-gray-500">
              Have a productive day 🚀
            </p>
          </div>

          {/* Notification */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">
            <Bell size={22} className="text-gray-700" />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Divider */}
          <div className="hidden lg:block h-8 w-px bg-gray-300"></div>

          {/* User */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 lg:w-11 lg:h-11",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;