"use client";

import { useEffect, useState } from "react";
import PageLayout from "../../component/dashboard/PageLayout";
import {
  Users,
  CheckCircle,
  Phone,
  TrendingUp,
} from "lucide-react";

const Report = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();

        if (!Array.isArray(data)) return;

        setStats({
          total: data.length,
          new: data.filter((l: any) => l.status === "New").length,
          contacted: data.filter((l: any) => l.status === "Contacted").length,
          qualified: data.filter((l: any) => l.status === "Qualified").length,
          closed: data.filter((l: any) => l.status === "Closed").length,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Qualified",
      value: stats.qualified,
      icon: TrendingUp,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Closed",
      value: stats.closed,
      icon: CheckCircle,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      icon: Phone,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  const total = stats.total || 1;

  const reportData = [
    {
      label: "New",
      value: stats.new,
      color: "bg-green-500",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      color: "bg-orange-500",
    },
    {
      label: "Qualified",
      value: stats.qualified,
      color: "bg-blue-500",
    },
    {
      label: "Closed",
      value: stats.closed,
      color: "bg-purple-500",
    },
  ];

return (
  <PageLayout
    title="Reports"
    description="CRM Performance Reports"
  >
    {/* Top Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow border p-6"
          >
            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                {loading ? (
                  <div className="mt-3 h-10 w-16 rounded bg-gray-200 animate-pulse"></div>
                ) : (
                  <h1 className="text-4xl font-bold mt-2">
                    {card.value}
                  </h1>
                )}

              </div>

              <div className={`${card.bg} p-3 rounded-full`}>
                <Icon
                  className={card.color}
                  size={28}
                />
              </div>

            </div>
          </div>
        );
      })}

    </div>

    {/* Reports */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* Lead Distribution */}

      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-6">
          Lead Distribution
        </h2>

        {loading ? (

          <div className="space-y-6">

            {Array.from({ length: 4 }).map((_, index) => (

              <div key={index} className="animate-pulse">

                <div className="flex justify-between mb-2">

                  <div className="h-4 w-24 rounded bg-gray-200"></div>

                  <div className="h-4 w-10 rounded bg-gray-200"></div>

                </div>

                <div className="w-full h-3 rounded-full bg-gray-200"></div>

              </div>

            ))}

          </div>

        ) : (

          <div className="space-y-5">

            {reportData.map((item) => (

              <div key={item.label}>

                <div className="flex justify-between mb-2">

                  <span>{item.label}</span>

                  <span>{item.value}</span>

                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className={`${item.color} h-full rounded-full`}
                    style={{
                      width: `${(item.value / total) * 100}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Performance Summary */}

      <div className="bg-white rounded-2xl shadow border p-6">

        <h2 className="text-xl font-semibold mb-6">
          Performance Summary
        </h2>

        {loading ? (

          <div className="space-y-6 animate-pulse">

            {Array.from({ length: 5 }).map((_, index) => (

              <div
                key={index}
                className="flex justify-between"
              >

                <div className="h-4 w-32 rounded bg-gray-200"></div>

                <div className="h-4 w-12 rounded bg-gray-200"></div>

              </div>

            ))}

            <hr />

            <div className="rounded-xl bg-gray-100 p-5">

              <div className="h-5 w-32 rounded bg-gray-200 mb-4"></div>

              <div className="space-y-2">

                <div className="h-4 w-full rounded bg-gray-200"></div>

                <div className="h-4 w-5/6 rounded bg-gray-200"></div>

                <div className="h-4 w-3/4 rounded bg-gray-200"></div>

              </div>

            </div>

          </div>

        ) : (

          <div className="space-y-6">

            <div className="flex justify-between">
              <span>Total Leads</span>
              <strong>{stats.total}</strong>
            </div>

            <div className="flex justify-between">
              <span>Conversion Rate</span>

              <strong>
                {stats.total === 0
                  ? "0%"
                  : `${Math.round(
                      (stats.closed / stats.total) * 100
                    )}%`}
              </strong>

            </div>

            <div className="flex justify-between">
              <span>Qualified Leads</span>
              <strong>{stats.qualified}</strong>
            </div>

            <div className="flex justify-between">
              <span>Contacted Leads</span>
              <strong>{stats.contacted}</strong>
            </div>

            <div className="flex justify-between">
              <span>New Leads</span>
              <strong>{stats.new}</strong>
            </div>

            <hr />

            <div className="bg-blue-50 rounded-xl p-5">

              <h3 className="font-semibold text-blue-700">
                CRM Insight
              </h3>

              <p className="mt-2 text-gray-600 leading-7">

                {stats.closed > stats.new
                  ? "Excellent! Most of your leads are getting converted successfully."
                  : "You have many new leads waiting for follow-up. Focus on contacting them to improve your conversion rate."}

              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  </PageLayout>
);
};

export default Report;