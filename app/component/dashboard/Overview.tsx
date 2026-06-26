"use client";

import { useEffect, useState } from "react";
import { Plus, Upload } from "lucide-react";
import Link from "next/link";

type StatusItem = {
  label: string;
  count: number;
  color: string;
};

const Overview = () => {
  const [statusData, setStatusData] = useState<StatusItem[]>([
    { label: "New", count: 0, color: "#22c55e" },
    { label: "Contacted", count: 0, color: "#fb923c" },
    { label: "Qualified", count: 0, color: "#3b82f6" },
    { label: "Closed", count: 0, color: "#8b5cf6" },
  ]);

  const tasks = [
    {
      task: "Call Ravi Kumar",
      date: "25 Jun 2026",
      urgent: true,
    },
    {
      task: "Send Proposal to Priya",
      date: "25 Jun 2026",
      urgent: false,
    },
    {
      task: "Follow up with Amit",
      date: "26 Jun 2026",
      urgent: false,
    },
  ];

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch("/api/leads");

        if (!res.ok) {
          throw new Error("Failed to fetch leads");
        }

        const data = await res.json();

        // Prevent data.filter is not a function
        const leads = Array.isArray(data) ? data : [];

        setStatusData([
          {
            label: "New",
            count: leads.filter((lead) => lead.status === "New").length,
            color: "#22c55e",
          },
          {
            label: "Contacted",
            count: leads.filter((lead) => lead.status === "Contacted").length,
            color: "#fb923c",
          },
          {
            label: "Qualified",
            count: leads.filter((lead) => lead.status === "Qualified").length,
            color: "#3b82f6",
          },
          {
            label: "Closed",
            count: leads.filter((lead) => lead.status === "Closed").length,
            color: "#8b5cf6",
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOverview();
  }, []);

  const totalLeads =
    statusData.reduce((sum, item) => sum + item.count, 0) || 1;

  let current = 0;

  const gradient = statusData
    .map((item) => {
      const start = current;
      const end = current + (item.count / totalLeads) * 100;
      current = end;

      return `${item.color} ${start}% ${end}%`;
    })
    .join(",");

  return (
    <div className="space-y-6">

      {/* Lead Status */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Lead Status Overview
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8">

          <div
            className="h-40 w-40 rounded-full relative"
            style={{
              background: `conic-gradient(${gradient})`,
            }}
          >
            <div className="absolute inset-7 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold">
                  {totalLeads}
                </h1>
                <p className="text-gray-500 text-sm">
                  Leads
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">

            {statusData.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="font-medium">
                  {item.label}
                </span>

                <span className="text-gray-500">
                  ({item.count})
                </span>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Upcoming Tasks */}

      {/* <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Upcoming Tasks
        </h2>

        <div className="space-y-5">

          {tasks.map((item) => (
            <div
              key={item.task}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <span>{item.task}</span>
              </div>

              <span
                className={
                  item.urgent
                    ? "text-red-500"
                    : "text-gray-500"
                }
              >
                {item.date}
              </span>
            </div>
          ))}

        </div>

      </div> */}

      {/* Quick Actions */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="space-y-4">

          <Link href="/dashboard/add-lead">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-medium py-3 rounded-xl hover:bg-blue-200">
              <Plus size={18} />
              Add New Lead
            </button>
          </Link>

          {/* <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl hover:bg-gray-50">
            <Upload size={18} />
            Import Leads
          </button> */}

        </div>

      </div>

    </div>
  );
};

export default Overview;