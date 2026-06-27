"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageLayout from "../../component/dashboard/PageLayout";
import Link from "next/link";
import {
  Plus,
  Users,
  UserPlus,
  Phone,
  CheckCircle,
  Pencil,
  Trash2
} from "lucide-react";

const Leads = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0
  });

  const [leads, setLeads] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();

        if (!Array.isArray(data)) {
          setLoading(false);
          return;
        }

        setLeads(data);

        setStats({
          total: data.length,
          new: data.filter((lead: any) => lead.status === "New").length,
          contacted: data.filter((lead: any) => lead.status === "Contacted")
            .length,
          closed: data.filter((lead: any) => lead.status === "Closed").length
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Filter Leads
  const filteredLeads = statusFilter
    ? leads.filter((lead) => lead.status === statusFilter)
    : leads;

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: Users,
      bg: "bg-purple-100",
      color: "text-purple-600"
    },
    {
      title: "New Leads",
      value: stats.new,
      icon: UserPlus,
      bg: "bg-green-100",
      color: "text-green-600"
    },
    {
      title: "Contacted",
      value: stats.contacted,
      icon: Phone,
      bg: "bg-orange-100",
      color: "text-orange-600"
    },
    {
      title: "Closed",
      value: stats.closed,
      icon: CheckCircle,
      bg: "bg-blue-100",
      color: "text-blue-600"
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-700";
      case "Contacted":
        return "bg-orange-100 text-orange-700";
      case "Qualified":
        return "bg-blue-100 text-blue-700";
      case "Closed":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        alert("Failed to delete lead");
        return;
      }

      const deletedLead = leads.find((lead) => lead.id === id);

      setLeads((prev) => prev.filter((lead) => lead.id !== id));

      if (deletedLead) {
        setStats((prev) => ({
          total: prev.total - 1,
          new: prev.new - (deletedLead.status === "New" ? 1 : 0),
          contacted:
            prev.contacted - (deletedLead.status === "Contacted" ? 1 : 0),
          closed: prev.closed - (deletedLead.status === "Closed" ? 1 : 0)
        }));
      }

      alert("Lead deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <PageLayout title="Leads" description="Manage all your customer leads.">
      {/* Top Buttons */}

      <div className="flex justify-between items-center mb-6">
        {statusFilter ? (
          <Link
            href="/dashboard/leads"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Show All Leads
          </Link>
        ) : (
          <div></div>
        )}

        <Link
          href="/dashboard/add-lead"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Lead
        </Link>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow border p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{card.title}</p>

                  <h1 className="text-4xl font-bold mt-2">
                    {loading ? "--" : card.value}
                  </h1>
                </div>

                <div className={`${card.bg} p-3 rounded-full`}>
                  <Icon className={card.color} size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-semibold">
            {statusFilter ? `${statusFilter} Leads` : "All Leads"}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    Loading Leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    No Leads Found
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{lead.name}</td>

                    <td className="p-4">{lead.phone}</td>

                    <td className="p-4">{lead.email}</td>

                    <td className="p-4">{lead.company || "-"}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusStyle(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center items-center gap-5">
                        {/* Edit */}
                        <Link
                          href={`/dashboard/edit-lead/${lead.id}`}
                          className="text-green-600 hover:text-green-800"
                          title="Edit Lead"
                        >
                          <Pencil size={18} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Lead"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Leads;
