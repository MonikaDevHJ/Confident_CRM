"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PageLayout = ({ title, description, children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow border">

          <div className="border-b px-8 py-6">
            <h1 className="text-3xl font-bold">
              {title}
            </h1>

            <p className="text-gray-500 mt-2">
              {description}
            </p>
          </div>

          <div className="p-8">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageLayout;