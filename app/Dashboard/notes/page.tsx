"use client";

import PageLayout from "../../component/dashboard/PageLayout";

const Notes = () => {
  return (
    <PageLayout
      title="Notes"
      description="Manage lead notes."
    >
      <div className="space-y-4">

        <div className="border rounded-xl p-5">
          Meeting with Client
        </div>

        <div className="border rounded-xl p-5">
          Follow-up Tomorrow
        </div>

        <div className="border rounded-xl p-5">
          Waiting for Proposal Approval
        </div>

      </div>
    </PageLayout>
  );
};

export default Notes;