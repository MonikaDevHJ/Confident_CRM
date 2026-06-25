import { Eye, Pencil } from "lucide-react";

const leads = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "9876543210",
    email: "ravi@gmail.com",
    status: "New",
    createdAt: "24 Jun 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "9567891234",
    email: "priya@gmail.com",
    status: "Contacted",
    createdAt: "24 Jun 2026",
  },
  {
    id: 3,
    name: "Amit Patel",
    phone: "9123456789",
    email: "amit@gmail.com",
    status: "Qualified",
    createdAt: "23 Jun 2026",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    phone: "9988776655",
    email: "sneha@gmail.com",
    status: "Closed",
    createdAt: "23 Jun 2026",
  },
  {
    id: 5,
    name: "Vikram Singh",
    phone: "9001234567",
    email: "vikram@gmail.com",
    status: "New",
    createdAt: "22 Jun 2026",
  },
  {
    id: 6,
    name: "Vikram Singh",
    phone: "9001234567",
    email: "vikram@gmail.com",
    status: "New",
    createdAt: "22 Jun 2026",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "New":
      return "bg-green-100 text-green-700";

    case "Contacted":
      return "bg-orange-100 text-orange-700";

    case "Qualified":
      return "bg-blue-100 text-blue-700";

    case "Closed":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const RecentLeads = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          Recent Leads
        </h2>

        <button className="text-blue-600 font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-4 font-semibold text-gray-700">
                Name
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Phone
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Email
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Created At
              </th>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {lead.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {lead.phone}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {lead.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusStyle(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {lead.createdAt}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-500 hover:text-blue-600">
                      <Eye size={18} />
                    </button>

                    <button className="text-gray-500 hover:text-green-600">
                      <Pencil size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;