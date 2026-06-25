import { Plus, Upload } from "lucide-react";

const Overview = () => {
  const statusData = [
    { label: "New", count: 10, color: "bg-green-500" },
    { label: "Contacted", count: 20, color: "bg-orange-500" },
    { label: "Qualified", count: 10, color: "bg-blue-500" },
    { label: "Closed", count: 10, color: "bg-purple-500" },
  ];

  const tasks = [
    {
      task: "Call Ravi Kumar",
      date: "25 Jun 2026",
      urgent: true,
    },
    {
      task: "Send Proposal to Priya",
      date: "25 Jun 2026",
      urgent: false,
    },
    {
      task: "Follow up with Amit",
      date: "26 Jun 2026",
      urgent: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Lead Status Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">
          Lead Status Overview
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Donut Chart */}
          <div
            className="h-36 w-36 rounded-full relative"
            style={{
              background: `
                conic-gradient(
                  #22c55e 0% 20%,
                  #fb923c 20% 60%,
                  #3b82f6 60% 80%,
                  #8b5cf6 80% 100%
                )
              `,
            }}
          >
            <div className="absolute inset-6 bg-white rounded-full"></div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {statusData.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-3 h-3 rounded-full ${item.color}`}
                />

                <span className="text-gray-700">
                  {item.label} ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">
          Upcoming Tasks
        </h2>

        <div className="space-y-5">
          {tasks.map((item) => (
            <div
              key={item.task}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                />

                <span className="text-gray-700">
                  {item.task}
                </span>
              </div>

              <span
                className={`text-sm font-medium ${
                  item.urgent
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 font-medium py-3 rounded-xl hover:bg-blue-200 transition">
            <Plus size={18} />
            Add New Lead
          </button>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition">
            <Upload size={18} />
            Import Leads
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Overview;