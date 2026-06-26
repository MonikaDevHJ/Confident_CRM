"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
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
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/leads").then(res => res.json()).then(data => setLeads(data));
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-semibold">Recent Leads</h2>
      </div>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              {/* <th className="p-4 text-left">Action</th> */}
            </tr>
          </thead>

          <tbody>
            {leads.map(lead =>
              <tr key={lead.id} className="border-t">
                <td className="p-4">
                  {lead.name}
                </td>

                <td className="p-4">
                  {lead.phone}
                </td>

                <td className="p-4">
                  {lead.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-lg ${getStatusStyle(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>

                {/* <td className="p-4 flex gap-3">
                  <Eye size={18} className="cursor-pointer" />

                  <Link href={`/dashboard/edit-lead/${lead.id}`}>
                    <Pencil
                      size={18}
                      className="cursor-pointer text-green-600"
                    />
                  </Link>
                </td> */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
