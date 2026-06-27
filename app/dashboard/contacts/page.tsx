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

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow border p-5 mb-6">

        <div className="flex gap-3">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by Name, Email, Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3"
            />

          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700"
          >
            Search
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-200 px-6 rounded-xl hover:bg-gray-300"
          >
            Clear
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow border overflow-hidden">

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
                <tr>
                  <td colSpan={6} className="text-center p-10">
                    Loading...
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-10 text-gray-500"
                  >
                    No Contacts Found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">{contact.name}</td>

                    <td className="p-4">{contact.email}</td>

                    <td className="p-4">{contact.phone}</td>

                    <td className="p-4">
                      {contact.company || "-"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg ${getStatusStyle(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-4">

                     

                        <Link href={`/dashboard/edit-lead/${contact.id}`}>
                          <Pencil
                            size={18}
                            className="text-green-600"
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