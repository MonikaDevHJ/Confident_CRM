"use client";

import PageLayout from "../../component/dashboard/PageLayout";

const Report = () => {
  return (
    <PageLayout
      title="Reports"
      description="CRM Performance Reports"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="border rounded-xl p-6">

          <h3 className="font-semibold">
            Monthly Leads
          </h3>

          <div className="h-48 bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
            Chart
          </div>

        </div>

        <div className="border rounded-xl p-6">

          <h3 className="font-semibold">
            Sales Conversion
          </h3>

          <div className="h-48 bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
            Chart
          </div>

        </div>

      </div>
    </PageLayout>
  );
};

export default Report;