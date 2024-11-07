"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaChartLine, FaBell } from "react-icons/fa";
import axios from "axios";

const DashboardUI = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assumes the token is stored in localStorage after login
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data); // Assumes the user data is in response.data.user
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

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
            <p className="text-2xl font-bold text-center">
              {userData?.length || "N/A"}
            </p>
            <p className="text-gray-600">Users</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaShoppingCart size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {userData?.totalOrders || "N/A"}
            </p>
            <p className="text-gray-600">Orders</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaChartLine size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {userData?.totalRevenue || "$0"}
            </p>
            <p className="text-gray-600">Revenue</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-[#135c5d] text-white p-3 rounded-full">
            <FaBell size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {userData?.notifications || "0"}
            </p>
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
          {userData?.recentActivity?.map((activity, index) => (
            <li key={index} className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">
                {/* Icon based on activity type */}
                <FaUser className="text-[#135c5d]" />
              </div>
              <p className="text-gray-700">{activity.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardUI;
