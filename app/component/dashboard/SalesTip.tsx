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
    <div className="bg-white border rounded-xl shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4 flex-1">
        <div className="w-11 h-11 rounded-full bg-yellow-100 flex items-center justify-center">
          <Lightbulb size={20} className="text-yellow-600" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-gray-800">
              Today's Sales Insight{" "}
            </h3>

            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
              Live API
            </span>
          </div>

          <p className="mt-2 text-[15px] leading-6 text-gray-800 font-bold">
            {loading ? "Loading today's motivation..." : `"${tip}"`}
          </p>
        </div>
      </div>

      {/* Button */}

      <button
        onClick={fetchTip}
        disabled={loading}
        className="ml-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />

        {loading ? "Loading" : "New Tip"}
      </button>
    </div>
  );
};

export default SalesTip;
