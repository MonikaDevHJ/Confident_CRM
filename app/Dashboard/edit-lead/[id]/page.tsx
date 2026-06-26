"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";

const EditLead = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "Website",
    status: "New",
    notes: "",
  });

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await fetch(`/api/leads/${id}`);
        const data = await response.json();

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          company: data.company || "",
          source: data.source || "Website",
          status: data.status || "New",
          notes: data.notes || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchLead();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Lead Updated Successfully");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FiArrowLeft />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Edit Lead
            </h1>

            <p className="text-gray-500 mt-1">
              Update customer lead information.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <h2 className="text-xl font-semibold mb-8">
            Edit Lead Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2">Full Name</label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-4 text-gray-400" />

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Email</label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-4 text-gray-400" />

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Phone</label>

                <div className="relative">
                  <FiPhone className="absolute left-4 top-4 text-gray-400" />

                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Company</label>

                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-4 text-gray-400" />

                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Lead Source</label>

                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option>Website</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>Referral</option>
                  <option>Walk-In</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Closed</option>
                  <option>Rejected</option>
                </select>
              </div>

            </div>

            <div>
              <label className="block mb-2">Notes</label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href="/dashboard"
                className="border px-6 py-3 rounded-xl"
              >
                Cancel
              </Link>

              <button
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-2"
              >
                <FiSave />

                {loading ? "Updating..." : "Update Lead"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLead;