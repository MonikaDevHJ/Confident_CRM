"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Phone,
  CheckCircle,
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
        setStats({
          total: data.length,
          new: data.filter((l: any) => l.status === "New").length,
          contacted: data.filter((l: any) => l.status === "Contacted").length,
          closed: data.filter((l: any) => l.status === "Closed").length,
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
    },
    {
      title: "New Leads",
      value: stats.new,
      description: "Not contacted yet",
      icon: UserPlus,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Contacted",
      value: stats.contacted,
      description: "In conversation",
      icon: Phone,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Closed",
      value: stats.closed,
      description: "Successfully closed",
      icon: CheckCircle,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
  ];

  return (
    <section className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back.
          </p>
        </div>

        <Link
          href="/dashboard/add-lead"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Add New Lead
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <div className="flex justify-between">

                <div>
                  <p>{card.title}</p>

                  <h1 className="text-4xl font-bold">
                    {card.value}
                  </h1>
                </div>

                <div className={`${card.bg} p-3 rounded-full`}>
                  <Icon className={card.color} />
                </div>

              </div>

              <p className="mt-4 text-gray-500">
                {card.description}
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
}