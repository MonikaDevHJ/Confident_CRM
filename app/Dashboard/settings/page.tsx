"use client";

import PageLayout from "../../component/dashboard/PageLayout";

const Settings = () => {
  return (
    <PageLayout
      title="Settings"
      description="Manage CRM settings."
    >
      <div className="space-y-6">

        <div className="border rounded-xl p-6 flex justify-between">

          <div>

            <h3 className="font-semibold">
              Email Notifications
            </h3>

            <p className="text-gray-500">
              Receive lead updates.
            </p>

          </div>

          <input
            type="checkbox"
            defaultChecked
          />

        </div>

        <div className="border rounded-xl p-6 flex justify-between">

          <div>

            <h3 className="font-semibold">
              Dark Mode
            </h3>

            <p className="text-gray-500">
              Enable dark theme.
            </p>

          </div>

          <input type="checkbox" />

        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Save Settings
        </button>

      </div>
    </PageLayout>
  );
};

export default Settings;