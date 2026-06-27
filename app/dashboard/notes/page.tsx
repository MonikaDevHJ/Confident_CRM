"use client";

import { useEffect, useMemo, useState } from "react";
import PageLayout from "../../component/dashboard/PageLayout";
import {
  StickyNote,
  Search,
  Pencil,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";

const Notes = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();

        if (Array.isArray(data)) {
          setNotes(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      `${note.name} ${note.notes || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [notes, search]);

  const totalNotes = notes.filter((n) => n.notes).length;

  return (
    <PageLayout
      title="Notes"
      description="Manage all customer notes."
    >
      {/* Top Card */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow border p-6">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Total Notes
              </p>

              <h1 className="text-4xl font-bold mt-2">
                {loading ? "--" : totalNotes}
              </h1>
            </div>

            <div className="bg-yellow-100 p-3 rounded-full">
              <StickyNote
                size={28}
                className="text-yellow-600"
              />
            </div>

          </div>

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
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Notes */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {loading ? (
          <div className="col-span-full text-center py-16">
            Loading Notes...
          </div>
        ) : filteredNotes.filter((n) => n.notes).length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500">
            No Notes Found
          </div>
        ) : (
          filteredNotes
            .filter((lead) => lead.notes)
            .map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl shadow border p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">

                  <div className="flex items-center gap-2">

                    <User
                      size={18}
                      className="text-blue-600"
                    />

                    <h2 className="font-bold text-lg">
                      {lead.name}
                    </h2>

                  </div>

                  <Link
                    href={`/dashboard/edit-lead/${lead.id}`}
                  >
                    <Pencil
                      size={18}
                      className="text-green-600 hover:text-green-800"
                    />
                  </Link>

                </div>

                <p className="mt-5 text-gray-600 leading-7">
                  {lead.notes}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span
                    className={`px-3 py-1 rounded-lg text-sm
                    ${
                      lead.status === "New"
                        ? "bg-green-100 text-green-700"
                        : lead.status === "Contacted"
                        ? "bg-orange-100 text-orange-700"
                        : lead.status === "Qualified"
                        ? "bg-blue-100 text-blue-700"
                        : lead.status === "Closed"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lead.status}
                  </span>

                  <div className="flex items-center gap-2 text-gray-500 text-sm">

                    <Calendar size={15} />

                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}

                  </div>

                </div>

              </div>
            ))
        )}

      </div>

    </PageLayout>
  );
};

export default Notes;