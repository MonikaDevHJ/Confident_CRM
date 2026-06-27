"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Phone,
  CheckCircle,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function Card() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0,
  });

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        setStats({
          total: data.length,
          new: data.filter((l: any) => l.status === "New").length,
          contacted: data.filter(
            (l: any) => l.status === "Contacted"
          ).length,
          closed: data.filter(
            (l: any) => l.status === "Closed"
          ).length,
        });
      });
  }, []);

  const cards = [
    {
      title: "Total Leads",
      value: stats.total,
      description: "All time leads",
      icon: Users,
      bg: "bg-purple-100",
      color: "text-purple-600",
      link: "/dashboard/leads",
    },
    {
      title: "New Leads",
      value: stats.new,
      description: "Not contacted yet",
      icon: UserPlus,
      bg: "bg-green-100",
      color: "text-green-600",
      link: "/dashboard/leads?status=New",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      description: "In conversation",
      icon: Phone,
      bg: "bg-orange-100",
      color: "text-orange-600",
      link: "/dashboard/leads?status=Contacted",
    },
    {
      title: "Closed",
      value: stats.closed,
      description: "Successfully closed",
      icon: CheckCircle,
      bg: "bg-blue-100",
      color: "text-blue-600",
      link: "/dashboard/leads?status=Closed",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome back.
          </p>
        </div> */}

        <Link
          href="/dashboard/add-lead"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          + Add New Lead
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow border hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                {/* Left */}
                <div>
                  <p className="text-gray-500 font-medium">
                    {card.title}
                  </p>

                  <h1 className="text-4xl font-bold mt-2">
                    {card.value}
                  </h1>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                  {/* Main Icon */}
                  <div
                    className={`${card.bg} p-3 rounded-full`}
                  >
                    <Icon
                      className={card.color}
                      size={22}
                    />
                  </div>

                  {/* Eye Button */}
                  <Link href={card.link}>
                    <div className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition cursor-pointer">
                      <Eye
                        size={20}
                        className="text-gray-700 hover:text-blue-600"
                      />
                    </div>
                  </Link>
                </div>
              </div>

              <p className="mt-5 text-gray-500">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}