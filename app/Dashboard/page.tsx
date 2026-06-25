import Navbar from "../component/dashboard/Navbar";
import Card from "../component/dashboard/Card";
import Recentleads from "../component/dashboard/Recentleads";
import Pipelines from "../component/dashboard/Pipelines";
import Overview from "../component/dashboard/Overview";
import SideBar from "../component/dashboard/SideBar";

const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Navbar />

        <div className="p-6 space-y-6">
          <Card />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Side */}
            <div className="xl:col-span-2">
              <Recentleads />
            </div>

            {/* Right Side */}
            <div>
              <Overview />
            </div>
          </div>

          <Pipelines />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;