"use client";

import Link from "next/link";
import { FiArrowLeft, FiSave, FiUser, FiMail, FiPhone, FiBriefcase } from "react-icons/fi";

const AddLead = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
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
              Add New Lead
            </h1>

            <p className="text-gray-500 mt-1">
              Create a new customer lead for your sales pipeline.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">

          <h2 className="text-xl font-semibold mb-8">
            Lead Information
          </h2>

          <form className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Company
                </label>

                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lead Source
                </label>

                <select className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Website</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>Referral</option>
                  <option>Walk-In</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Status
                </label>

                <select className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Qualified</option>
                  <option>Closed</option>
                  <option>Rejected</option>
                </select>
              </div>

            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Notes
              </label>

              <textarea
                rows={5}
                placeholder="Write any notes about this lead..."
                className="w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">

              <Link
                href="/dashboard"
                className="border px-6 py-3 rounded-xl text-center hover:bg-gray-100 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <FiSave />
                Save Lead
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AddLead;