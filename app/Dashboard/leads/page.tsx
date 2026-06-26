"use client";

import PageLayout from "../../component/dashboard/PageLayout";

const Leads = () => {
  return (
    <PageLayout
      title="Leads"
      description="Manage all your customer leads."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-gray-500">
            Total Leads
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            --
          </h1>
        </div>

        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="text-gray-500">
            Active Leads
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            --
          </h1>
        </div>

        <div className="bg-orange-50 rounded-xl p-6">
          <h3 className="text-gray-500">
            Closed Leads
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            --
          </h1>
        </div>

      </div>

      <div className="mt-8 border rounded-xl p-6">

        <h2 className="font-semibold text-xl mb-4">
          Recent Leads
        </h2>

        <p className="text-gray-500">
          Lead table will appear here.
        </p>

      </div>
    </PageLayout>
  );
};

export default Leads;