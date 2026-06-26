import { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SideBar from "../component/dashboard/SideBar";
import Navbar from "../component/dashboard/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({
  children,
}: DashboardLayoutProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />

      <div className="flex-1 lg:ml-64">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;