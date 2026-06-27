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
  Trash2,
  Search,
} from "lucide-react";

const Leads = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
const [filteredLeads, setFilteredLeads] = useState<any[]>([]);

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
setFilteredLeads(data);

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
  // const filteredLeads = statusFilter
  //   ? leads.filter((lead) => lead.status === statusFilter)
  //   : leads;

    const displayedLeads = statusFilter
  ? filteredLeads.filter(
      (lead) => lead.status === statusFilter
    )
  : filteredLeads;
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
  <PageLayout
    title="Leads"
    description="Manage all your customer leads."
  >
    {/* Top Section */}

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {statusFilter ? (
        <Link
          href="/dashboard/leads"
          className="text-blue-600 font-medium hover:underline"
        >
          ← Show All Leads
        </Link>
      ) : (
        <div />
      )}

      <Link
        href="/dashboard/add-lead"
        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 hover:shadow-lg"
      >
        <Plus size={18} />
        Add Lead
      </Link>
    </div>

    {/* Stats Cards */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-800">
                  {loading ? "--" : card.value}
                </h2>
              </div>

              <div className={`${card.bg} rounded-full p-3`}>
                <Icon
                  className={card.color}
                  size={28}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Search */}

<div className="mb-6">

  <div className="relative">

    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search by name, phone, email, company..."
      value={search}
      onChange={(e) => {
        const value = e.target.value;

        setSearch(value);

        const result = leads.filter((lead) =>
          `${lead.name} ${lead.email} ${lead.phone} ${lead.company} ${lead.status}`
            .toLowerCase()
            .includes(value.toLowerCase())
        );

        setFilteredLeads(result);
      }}
      className="w-full rounded-2xl border bg-white py-3 pl-11 pr-10 shadow-sm focus:border-blue-500 focus:outline-none"
    />

    {search && (
      <button
        onClick={() => {
          setSearch("");
          setFilteredLeads(leads);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>
    )}

  </div>

</div>

    {/* Leads Table */}

    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800">
          {statusFilter
            ? `${statusFilter} Leads`
            : "All Leads"}
        </h2>
      </div>

      <div className="w-full overflow-x-auto rounded-b-2xl">
        <table className="min-w-[900px] w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                Phone
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                Company
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-600">
                Created
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-16 text-center text-gray-500"
                >
                  Loading Leads...
                </td>
              </tr>
            ) : displayedLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-16 text-center text-gray-500"
                >
                  No Leads Found
                </td>
              </tr>
            ) : (
              displayedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b transition-colors hover:bg-blue-50"
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {lead.name}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.phone}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.email}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {lead.company || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/dashboard/edit-lead/${lead.id}`}
                        className="text-green-600 transition hover:text-green-800"
                        title="Edit Lead"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(lead.id)
                        }
                        className="text-red-600 transition hover:text-red-800"
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
