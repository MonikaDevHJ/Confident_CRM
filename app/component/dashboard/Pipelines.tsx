const pipelineData = [
  {
    stage: "New",
    leads: 10,
    percentage: 20,
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    dotColor: "bg-green-500",
  },
  {
    stage: "Contacted",
    leads: 20,
    percentage: 40,
    textColor: "text-orange-600",
    bgColor: "bg-orange-50",
    dotColor: "bg-orange-500",
  },
  {
    stage: "Qualified",
    leads: 10,
    percentage: 20,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-500",
  },
  {
    stage: "Closed",
    leads: 10,
    percentage: 20,
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    dotColor: "bg-purple-500",
  },
];

const Pipelines = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 mb-8">
        Lead Status Pipeline
      </h2>

      {/* Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {pipelineData.map((item) => (
          <div
            key={item.stage}
            className={`
              relative py-5 px-6
              ${item.bgColor}
              clip-arrow
              text-center
            `}
          >
            <h3
              className={`font-bold text-xl ${item.textColor}`}
            >
              {item.stage}
            </h3>

            <p
              className={`mt-1 font-medium ${item.textColor}`}
            >
              {item.leads} Leads
            </p>
          </div>
        ))}
      </div>

      {/* Progress Line */}
      <div className="relative">
        <div className="absolute top-2 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

        <div className="relative flex justify-between">
          {pipelineData.map((item) => (
            <div
              key={item.stage}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  h-5 w-5 rounded-full border-4 border-white shadow
                  ${item.dotColor}
                `}
              />

              <span className="mt-3 text-lg font-semibold text-gray-700">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pipelines;