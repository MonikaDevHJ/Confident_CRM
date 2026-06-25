import {
  Users,
  UserPlus,
  Phone,
  CheckCircle,
  Plus,
} from "lucide-react";

const stats = [
  {
    title: "Total Leads",
    value: "50",
    description: "All time leads",
    icon: Users,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "New Leads",
    value: "10",
    description: "Not contacted yet",
    icon: UserPlus,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Contacted",
    value: "20",
    description: "In conversation",
    icon: Phone,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Closed",
    value: "20",
    description: "Successfully closed",
    icon: CheckCircle,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const Card = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back, manage your leads efficiently.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-medium shadow-md hover:bg-blue-700 transition">
          <Plus size={18} />
          Add New Lead
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-14 w-14 rounded-full flex items-center justify-center ${item.bgColor}`}
                >
                  <Icon
                    size={28}
                    className={item.iconColor}
                  />
                </div>

                <div>
                  <h3 className="text-gray-600 text-sm font-medium">
                    {item.title}
                  </h3>

                  <h2 className="text-4xl font-bold text-gray-900">
                    {item.value}
                  </h2>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Card;