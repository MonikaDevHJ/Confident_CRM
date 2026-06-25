import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <Menu size={22} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search */}
          <div className="hidden md:flex items-center w-72 lg:w-96 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search leads..."
              className="ml-3 w-full bg-transparent outline-none text-sm"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
            <Bell size={22} className="text-gray-600" />

            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </button>

          {/* Profile */}
          {/* <button className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-gray-100 transition">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="h-11 w-11 rounded-xl object-cover"
            />

            <div className="hidden lg:block text-left">
              <h3 className="text-sm font-semibold text-gray-900">
                Sales Manager
              </h3>

              <p className="text-xs text-gray-500">
                Manager
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden lg:block text-gray-500"
            />
          </button> */}
          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search leads..."
            className="ml-3 w-full outline-none text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
