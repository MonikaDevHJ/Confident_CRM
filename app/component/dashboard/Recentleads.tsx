"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "New":
      return "bg-green-100 text-green-700";

    case "Contacted":
      return "bg-orange-100 text-orange-700";

    case "Qualified":
      return "bg-blue-100 text-blue-700";

    case "Closed":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function RecentLeads() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads", {
          cache: "no-store",
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setLeads(data.slice(0, 5));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b">

        <h2 className="text-xl font-semibold">
          Recent Leads
        </h2>

        <Link
          href="/dashboard/leads"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
          <ArrowRight size={18} />
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Phone
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                Created
              </th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              [...Array(5)].map((_, index) => (

                <tr
                  key={index}
                  className="border-t animate-pulse"
                >

                  <td className="px-5 py-5">
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="h-4 w-44 rounded bg-gray-200"></div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="h-7 w-20 rounded-full bg-gray-200"></div>
                  </td>

                  <td className="px-5 py-5">
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                  </td>

                </tr>

              ))

            ) : leads.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-16 text-center text-gray-500"
                >
                  No Leads Found
                </td>

              </tr>

            ) : (

              leads.map((lead) => (

                <tr
                  key={lead.id}
                  className="border-t hover:bg-blue-50 transition"
                >

                  <td className="px-5 py-4 font-medium">
                    {lead.name}
                  </td>

                  <td className="px-5 py-4">
                    {lead.phone}
                  </td>

                  <td className="px-5 py-4">
                    {lead.email}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}