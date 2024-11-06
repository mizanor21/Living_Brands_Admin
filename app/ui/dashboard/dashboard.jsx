import React from "react";
import { FaUser, FaShoppingCart, FaChartLine, FaBell } from "react-icons/fa";

const DashboardUI = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Welcome Message */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-gray-600 mt-2">
          Here&apos;s what&apos;s happening today:
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaUser size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">1,245</p>
            <p className="text-gray-600">Users</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaShoppingCart size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">3,678</p>
            <p className="text-gray-600">Orders</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaChartLine size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">$45,800</p>
            <p className="text-gray-600">Revenue</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaBell size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">15</p>
            <p className="text-gray-600">Notifications</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <ul className="space-y-4">
          <li className="flex items-center space-x-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FaUser className="text-[#135c5d]" />
            </div>
            <p className="text-gray-700">
              New user <span className="font-bold">Mahabub Jamil</span>{" "}
              registered.
            </p>
          </li>
          <li className="flex items-center space-x-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FaShoppingCart className="text-[#135c5d]" />
            </div>
            <p className="text-gray-700">
              Order <span className="font-bold">#1024</span> has been completed.
            </p>
          </li>
          <li className="flex items-center space-x-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FaChartLine className="text-[#135c5d]" />
            </div>
            <p className="text-gray-700">
              Revenue reached <span className="font-bold">$45,800</span> this
              month.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardUI;
