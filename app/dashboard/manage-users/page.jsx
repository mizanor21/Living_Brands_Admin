"use client";
import React, { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaExclamationTriangle,
  FaUserCircle,
} from "react-icons/fa";
import axios from "axios";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <FaExclamationTriangle size={24} className="mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">
        Manage Users
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4 text-gray-600 font-semibold">Name</th>
              <th className="p-4 text-gray-600 font-semibold">Email</th>
              <th className="p-4 text-gray-600 font-semibold">Role</th>
              <th className="p-4 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 transition">
                <td className="p-4 text-gray-700 flex items-center space-x-2">
                  <FaUserCircle className="text-gray-400 text-2xl" />
                  <span>{user.name}</span>
                </td>
                <td className="p-4 text-gray-700">{user.email}</td>
                <td className="p-4 text-gray-700">{user.role}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
