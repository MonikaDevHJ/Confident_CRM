"use client";

import PageLayout from "../../component/dashboard/PageLayout";

const Task = () => {
  return (
    <PageLayout
      title="Tasks"
      description="Track daily work."
    >
      <div className="space-y-4">

        <div className="flex justify-between border rounded-xl p-5">
          <span>Call New Lead</span>

          <span className="text-red-500">
            Today
          </span>
        </div>

        <div className="flex justify-between border rounded-xl p-5">
          <span>Send Proposal</span>

          <span className="text-orange-500">
            Tomorrow
          </span>
        </div>

        <div className="flex justify-between border rounded-xl p-5">
          <span>Meeting</span>

          <span className="text-green-600">
            Completed
          </span>
        </div>

      </div>
    </PageLayout>
  );
};

export default Task;