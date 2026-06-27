"use client";

import { ReactNode, useState } from "react";
import SideBar from "../component/dashboard/SideBar";
import Navbar from "../component/dashboard/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar
        open={open}
        setOpen={setOpen}
      />

      <div className="flex-1 lg:ml-64">
        <Navbar
          open={open}
          setOpen={setOpen}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}