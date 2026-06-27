"use client";

import { useEffect, useState } from "react";
import { Lightbulb, RefreshCw } from "lucide-react";

const SalesTip = () => {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTip = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();

      setTip(data.slip.advice);
    } catch (error) {
      console.log(error);
      setTip("Success in sales starts with listening more than speaking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Left Section */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <Lightbulb
              size={22}
              className="text-yellow-600"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-gray-800">
                Today's Sales Insight
              </h3>

              <span className="rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-700">
                Live API
              </span>
            </div>

            <p className="mt-3 text-gray-700 leading-7 text-sm sm:text-base">
              {loading
                ? "Loading today's motivation..."
                : `"${tip}"`}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <button
          onClick={fetchTip}
          disabled={loading}
          className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-medium transition hover:bg-blue-700 disabled:opacity-60"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Loading..." : "New Tip"}
        </button>
      </div>
    </div>
  );
};

export default SalesTip;