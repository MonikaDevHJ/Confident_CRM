"use client";

import { useEffect, useMemo, useState } from "react";
import PageLayout from "../../component/dashboard/PageLayout";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  User,
  Pencil,
} from "lucide-react";
import Link from "next/link";

const Task = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();

        if (Array.isArray(data)) {
          setTasks(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      `${task.name} ${task.company || ""} ${task.status}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const pending = tasks.filter(
    (t) => t.status === "New" || t.status === "Contacted"
  ).length;

  const completed = tasks.filter(
    (t) => t.status === "Closed"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "Qualified"
  ).length;

  const getBadge = (status: string) => {
    switch (status) {
      case "New":
        return {
          text: "Call Customer",
          color: "bg-red-100 text-red-600",
          icon: <AlertCircle size={16} />,
        };

      case "Contacted":
        return {
          text: "Follow Up",
          color: "bg-orange-100 text-orange-600",
          icon: <Clock size={16} />,
        };

      case "Qualified":
        return {
          text: "Send Proposal",
          color: "bg-blue-100 text-blue-600",
          icon: <Clock size={16} />,
        };

      case "Closed":
        return {
          text: "Completed",
          color: "bg-green-100 text-green-600",
          icon: <CheckCircle size={16} />,
        };

      default:
        return {
          text: status,
          color: "bg-gray-100 text-gray-600",
          icon: <Clock size={16} />,
        };
    }
  };

  return (
    <PageLayout
      title="Tasks"
      description="Track and manage daily CRM tasks."
    >
      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500">
            Pending Tasks
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {loading ? "--" : pending}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500">
            In Progress
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {loading ? "--" : inProgress}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">
          <h3 className="text-gray-500">
            Completed
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {loading ? "--" : completed}
          </h1>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow border p-5 mb-6">

        <div className="relative max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Tasks */}

      <div className="space-y-5">

        {loading ? (
          <div className="bg-white rounded-2xl shadow border p-10 text-center">
            Loading Tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border p-10 text-center text-gray-500">
            No Tasks Found
          </div>
        ) : (
          filteredTasks.map((lead) => {
            const badge = getBadge(lead.status);

            return (
              <div
                key={lead.id}
                className="bg-white rounded-2xl shadow border p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>

                    <div className="flex items-center gap-2 mb-2">

                      <User
                        size={18}
                        className="text-blue-600"
                      />

                      <h2 className="text-lg font-bold">
                        {lead.name}
                      </h2>

                    </div>

                    <p className="text-gray-500">
                      {lead.company || "No Company"}
                    </p>

                  </div>

                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${badge.color}`}
                  >
                    {badge.icon}

                    {badge.text}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </div>

                  <Link
                    href={`/dashboard/edit-lead/${lead.id}`}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Pencil size={20} />
                  </Link>

                </div>
              </div>
            );
          })
        )}

      </div>

    </PageLayout>
  );
};

export default Task;