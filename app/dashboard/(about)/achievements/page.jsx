"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFetchAchievements = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define fetchData as a reusable function
  const fetchData = async () => {
    try {
      setLoading(true); // Start loading before fetching
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/achievements`
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching achievements data");
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  return { data, loading, error, fetchData }; // Expose fetchData to trigger refetch
};

const EditModal = ({ achievement, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    achievement || { title: "", description: [""], image: "", link: "" }
  );

  useEffect(() => {
    if (achievement) setFormData(achievement);
  }, [achievement]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg h-[90vh] overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-4">
          {achievement ? "Edit Achievement" : "Add New Achievement"}
        </h2>

        {/* Title */}
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-[#125b5c]"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-[#125b5c] resize-none"
          rows="4"
          value={formData.description.join("\n")}
          onChange={(e) =>
            handleChange("description", e.target.value.split("\n"))
          }
        />

        {/* Image URL */}
        <label className="block mb-2 font-semibold">Image URL</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-[#125b5c]"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />

        {/* Link */}
        <label className="block mb-2 font-semibold">Link</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-[#125b5c]"
          value={formData.link}
          onChange={(e) => handleChange("link", e.target.value)}
        />

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#125b5c] to-[#17a398] hover:from-[#17a398] hover:to-[#125b5c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17a398] shadow-md transition-all duration-200"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const {
    data: achievements,
    loading,
    error,
    fetchData,
  } = useFetchAchievements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const handleEditClick = (achievement) => {
    setCurrentAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setCurrentAchievement(null); // Reset for adding new achievement
    setIsModalOpen(true);
  };

  const handleSave = async (updatedAchievement) => {
    try {
      if (updatedAchievement._id) {
        // Update existing achievement
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/achievements/${updatedAchievement._id}`,
          updatedAchievement
        );
        toast.success("Achievement successfully updated!");
      } else {
        // Add new achievement
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/achievements`,
          updatedAchievement
        );
        toast.success("New achievement added successfully!");
      }
      fetchData(); // Refetch data to update UI
    } catch (error) {
      console.error("Error saving achievement:", error);
      toast.error(error.response?.data?.message || "Error saving achievement.");
    }
  };

  const handleDelete = async (achievementId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/achievements?id=${achievementId}`
      );
      toast.success("Achievement deleted successfully!");
      fetchData(); // Refetch data to update UI after deletion
    } catch (error) {
      console.error("Error deleting achievement:", error);
      toast.error(
        error.response?.data?.message || "Error deleting achievement."
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="px-[5%] py-12 bg-white font-sora">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#125b5c]">Achievements</h1>
        <button
          className="px-4 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-[#125b5c] to-[#17a398] hover:from-[#17a398] hover:to-[#125b5c] shadow-md transition-all duration-200"
          onClick={handleAddClick}
        >
          Add New Achievement
        </button>
      </div>

      <div className="space-y-8">
        {achievements.map((achievement, index) => (
          <div
            key={achievement._id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-start bg-gray-100 rounded-lg shadow-lg overflow-hidden`}
          >
            <div className="md:w-1/2 w-full">
              {achievement.image ? (
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  width={600}
                  height={700}
                  className="h-[700px]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p>No Image Available</p>
                </div>
              )}
            </div>
            <div className="p-8 md:w-1/2 w-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#125b5c] mb-4">
                  {achievement.title}
                </h2>
                <div className="text-gray-700 text-lg mb-6 space-y-4">
                  {(achievement.description || []).map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  className="px-3 py-1 text-white font-semibold rounded-full bg-gradient-to-r from-[#125b5c] to-[#17a398] hover:from-[#17a398] hover:to-[#125b5c] shadow-md transition-all duration-200"
                  onClick={() => handleEditClick(achievement)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-white font-semibold rounded-full bg-red-600 hover:bg-red-700 shadow-md transition-all duration-200"
                  onClick={() => handleDelete(achievement._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EditModal
        achievement={currentAchievement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Achievements;