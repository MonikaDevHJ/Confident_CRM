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
  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="h-20 px-5 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Only */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              CRM Dashboard
            </h1>

            <p className="text-xs text-gray-500">
              Manage leads and customers
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:block text-right">
            <p className="text-sm font-semibold">
              {today}
            </p>

            <p className="text-xs text-gray-500">
              Have a productive day 🚀
            </p>
          </div>

          <button className="relative p-2 rounded-xl hover:bg-gray-100">
            <Bell size={22} />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;