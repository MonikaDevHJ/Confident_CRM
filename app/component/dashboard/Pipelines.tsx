"use client";

import { useEffect, useState } from "react";

const initialPipeline = [
  {
    stage: "New",
    leads: 0,
    percentage: 0,
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    dotColor: "bg-green-500",
  },
  {
    stage: "Contacted",
    leads: 0,
    percentage: 0,
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
    dotColor: "bg-orange-500",
  },
  {
    stage: "Qualified",
    leads: 0,
    percentage: 0,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-500",
  },
  {
    stage: "Closed",
    leads: 0,
    percentage: 0,
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    dotColor: "bg-purple-500",
  },
];

const Pipelines = () => {
  const [loading, setLoading] = useState(true);
  const [pipelineData, setPipelineData] = useState(initialPipeline);

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const res = await fetch("/api/leads", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!Array.isArray(data)) return;

        const total = data.length || 1;

        setPipelineData([
          {
            stage: "New",
            leads: data.filter((l: any) => l.status === "New").length,
            percentage: Math.round(
              (data.filter((l: any) => l.status === "New").length / total) * 100
            ),
            textColor: "text-green-600",
            bgColor: "bg-green-50",
            dotColor: "bg-green-500",
          },
          {
            stage: "Contacted",
            leads: data.filter((l: any) => l.status === "Contacted").length,
            percentage: Math.round(
              (data.filter((l: any) => l.status === "Contacted").length /
                total) *
                100
            ),
            textColor: "text-orange-600",
            bgColor: "bg-orange-50",
            dotColor: "bg-orange-500",
          },
          {
            stage: "Qualified",
            leads: data.filter((l: any) => l.status === "Qualified").length,
            percentage: Math.round(
              (data.filter((l: any) => l.status === "Qualified").length /
                total) *
                100
            ),
            textColor: "text-blue-600",
            bgColor: "bg-blue-50",
            dotColor: "bg-blue-500",
          },
          {
            stage: "Closed",
            leads: data.filter((l: any) => l.status === "Closed").length,
            percentage: Math.round(
              (data.filter((l: any) => l.status === "Closed").length / total) *
                100
            ),
            textColor: "text-purple-600",
            bgColor: "bg-purple-50",
            dotColor: "bg-purple-500",
          },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPipeline();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">
        Lead Status Pipeline
      </h2>

      {/* Pipeline Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {loading
          ? [...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-50 p-6 animate-pulse"
              >
                <div className="h-6 w-28 bg-gray-200 rounded mx-auto"></div>

                <div className="h-5 w-20 bg-gray-200 rounded mx-auto mt-4"></div>
              </div>
            ))
          : pipelineData.map((item) => (
              <div
                key={item.stage}
                className={`${item.bgColor} rounded-xl p-6 text-center transition hover:shadow-md`}
              >
                <h3 className={`text-xl font-bold ${item.textColor}`}>
                  {item.stage}
                </h3>

                <p className={`mt-2 font-medium ${item.textColor}`}>
                  {item.leads} Leads
                </p>
              </div>
            ))}
      </div>

      {/* Progress */}

      {loading ? (
        <div className="animate-pulse">
          <div className="h-2 rounded-full bg-gray-200"></div>

          <div className="flex justify-between mt-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex flex-col items-center"
              >
                <div className="w-5 h-5 rounded-full bg-gray-200"></div>

                <div className="mt-3 h-4 w-10 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute top-2 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

          <div className="relative flex justify-between">
            {pipelineData.map((item) => (
              <div
                key={item.stage}
                className="flex flex-col items-center"
              >
                <div
                  className={`h-5 w-5 rounded-full border-4 border-white shadow ${item.dotColor}`}
                ></div>

                <span className="mt-3 text-lg font-semibold text-gray-700">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pipelines;