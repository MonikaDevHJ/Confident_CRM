"use client";

import { useState } from "react";
import PageLayout from "../../component/dashboard/PageLayout";
import {
  Bell,
  Moon,
  Shield,
  Globe,
  Database,
  Save,
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoBackup: true,
    twoFactor: false,
    publicProfile: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const settingItems = [
    {
      title: "Email Notifications",
      description: "Receive notifications when a new lead is created.",
      icon: Bell,
      key: "notifications",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Dark Mode",
      description: "Enable dark appearance for the CRM dashboard.",
      icon: Moon,
      key: "darkMode",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Auto Backup",
      description: "Automatically backup CRM data every day.",
      icon: Database,
      key: "autoBackup",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Two Factor Authentication",
      description: "Increase account security using OTP verification.",
      icon: Shield,
      key: "twoFactor",
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      title: "Public Company Profile",
      description: "Allow customers to view your company profile.",
      icon: Globe,
      key: "publicProfile",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <PageLayout
      title="Settings"
      description="Customize your CRM preferences."
    >
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h2 className="text-3xl font-bold">
          CRM Settings
        </h2>

        <p className="mt-2 text-blue-100">
          Manage your notifications, security and application preferences.
        </p>
      </div>

      {/* Settings List */}
      <div className="space-y-5">

        {settingItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow border p-6 flex justify-between items-center hover:shadow-lg transition"
            >
              <div className="flex gap-5 items-center">

                <div className={`${item.bg} p-4 rounded-xl`}>
                  <Icon
                    size={24}
                    className={item.color}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.description}
                  </p>
                </div>

              </div>

              {/* Toggle */}
              <button
                onClick={() =>
                  handleToggle(item.key as keyof typeof settings)
                }
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition
                  ${
                    settings[item.key as keyof typeof settings]
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition
                    ${
                      settings[item.key as keyof typeof settings]
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          );
        })}

      </div>

      {/* Account Info */}
      <div className="mt-8 bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-5">
          Account Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm text-gray-500">
              Company Name
            </label>

            <input
              type="text"
              defaultValue="CRM Pro"
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">
              Support Email
            </label>

            <input
              type="email"
              defaultValue="support@crmpro.com"
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </PageLayout>
  );
};

export default Settings;