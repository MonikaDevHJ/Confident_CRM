import Card from "../component/dashboard/Card";
import Recentleads from "../component/dashboard/Recentleads";
import Pipelines from "../component/dashboard/Pipelines";
import Overview from "../component/dashboard/Overview";

const DashBoard = () => {
  return (
    <div className="space-y-6">
      <Card />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Recentleads />
        </div>

        <div>
          <Overview />
        </div>
      </div>

      <Pipelines />
    </div>
  );
};

export default DashBoard;