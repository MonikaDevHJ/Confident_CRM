"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../component/dashboard/PageLayout";
import Link from "next/link";
import {
  Users,
  Building2,
  Phone,
  Search,
  Eye,
  Pencil,
} from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();

        if (Array.isArray(data)) {
          setContacts(data);
          setFilteredContacts(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleSearch = () => {
    const result = contacts.filter((contact) =>
      `${contact.name} ${contact.email} ${contact.phone} ${contact.company}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredContacts(result);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredContacts(contacts);
  };

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

  return (
  <PageLayout
    title="Contacts"
    description="Manage customer contact information."
  >
    {/* Cards */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {loading ? (
        [...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow border p-6 animate-pulse"
          >
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-20 bg-gray-200 rounded mt-4"></div>
          </div>
        ))
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow border p-6">
            <h3 className="text-gray-500">Total Contacts</h3>
            <h1 className="text-4xl font-bold mt-2">
              {contacts.length}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow border p-6">
            <h3 className="text-gray-500">Companies</h3>
            <h1 className="text-4xl font-bold mt-2">
              {contacts.filter((c) => c.company).length}
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow border p-6">
            <h3 className="text-gray-500">Phone Numbers</h3>
            <h1 className="text-4xl font-bold mt-2">
              {contacts.filter((c) => c.phone).length}
            </h1>
          </div>
        </>
      )}
    </div>

    {/* Search */}

    <div className="bg-white rounded-2xl shadow border p-5 mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            disabled={loading}
            placeholder={
              loading
                ? "Loading contacts..."
                : "Search by Name, Email, Phone..."
            }
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              const result = contacts.filter((contact) =>
                `${contact.name} ${contact.email} ${contact.phone} ${contact.company}`
                  .toLowerCase()
                  .includes(value.toLowerCase())
              );

              setFilteredContacts(result);
            }}
            className={`w-full border rounded-xl pl-11 pr-4 py-3 ${
              loading
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white"
            }`}
          />
        </div>

        <button
          onClick={handleClear}
          disabled={loading}
          className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300 disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>

    {/* Table */}

    <div
      className={`bg-white rounded-2xl shadow border overflow-hidden transition-all duration-500 ${
        loading ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="px-6 py-5 border-b">
        <h2 className="text-xl font-semibold">
          Contact List
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className="border-t animate-pulse"
                >
                  <td className="p-4">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  </td>

                  <td className="p-4">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </td>

                  <td className="p-4">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </td>

                  <td className="p-4">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                  </td>

                  <td className="p-4">
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                  </td>

                  <td className="p-4 flex justify-center">
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-14 text-gray-500"
                >
                  No Contacts Found
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-medium">
                    {contact.name}
                  </td>

                  <td className="p-4">
                    {contact.email}
                  </td>

                  <td className="p-4">
                    {contact.phone}
                  </td>

                  <td className="p-4">
                    {contact.company || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        contact.status
                      )}`}
                    >
                      {contact.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center">
                      <Link
                        href={`/dashboard/edit-lead/${contact.id}`}
                      >
                        <Pencil
                          size={18}
                          className="text-green-600 hover:text-green-800"
                        />
                      </Link>
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

export default Contact;