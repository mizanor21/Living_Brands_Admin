"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Set up the modal after the DOM has loaded
const JobCircular = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Set modal root to document.body to avoid server-side rendering issues
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
      );
      console.log("Fetched jobs:", response.data); // Log fetched data
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs!");
      console.error("Error fetching jobs:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleApplicantChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prevApplicant) => ({ ...prevApplicant, [name]: value }));
  };

  const openModal = (job = null) => {
    if (job) {
      setFormData(job);
      setIsEditing(true);
    } else {
      setFormData({});
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setApplicant({ name: "", email: "", phone: "" });
  };

  const addJob = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        formData
      );
      setJobs((prevJobs) => [...prevJobs, response.data]);
      toast.success("Job added successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to add job!");
      console.error("Error adding job:", error.message);
    }
  };

  const updateJob = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${formData._id}`,
        formData
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === formData._id ? response.data : job))
      );
      toast.success("Job updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update job!");
      console.error("Error updating job:", error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete job!");
      console.error("Error deleting job:", error.message);
    }
  };

  const submitApplicant = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${formData._id}/applicants`,
        applicant
      );
      toast.success("Applicant info submitted!");
      setApplicant({ name: "", email: "", phone: "" });
    } catch (error) {
      toast.error("Failed to submit applicant info!");
      console.error("Error submitting applicant info:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <ToastContainer />
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Add New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {job.jobTitle}
            </h3>
            <p className="text-gray-600">
              {job.company?.name || "Company name unavailable"}
            </p>
            <p className="text-gray-500">
              {job.company?.location || "Location unavailable"}
            </p>
            <button
              onClick={() => openModal(job)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Details
            </button>
            <button
              onClick={() => deleteJob(job._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Job
            </button>
          </div>
        ))}
      </div>

      {/* Job Details and Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Job Details"
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Job" : "Job Details"}
        </h2>

        <label className="block mb-2">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle || ""}
          onChange={handleInputChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          readOnly={!isEditing}
        />

        <label className="block mb-2">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.company?.name || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              company: { ...prevFormData.company, name: e.target.value },
            }))
          }
          className="w-full mb-4 px-3 py-2 border rounded"
          readOnly={!isEditing}
        />

        {isEditing ? (
          <button
            onClick={updateJob}
            className="px-4 py-2 bg-teal-500 text-white rounded mt-4"
          >
            Update Job
          </button>
        ) : (
          <div>
            <label className="block mt-8 mb-2 font-semibold text-lg">
              Applicant Information
            </label>
            <input
              type="text"
              name="name"
              value={applicant.name}
              onChange={handleApplicantChange}
              placeholder="Name"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={applicant.email}
              onChange={handleApplicantChange}
              placeholder="Email"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              value={applicant.phone}
              onChange={handleApplicantChange}
              placeholder="Phone"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <button
              onClick={submitApplicant}
              className="px-4 py-2 bg-teal-500 text-white rounded"
            >
              Submit Applicant
            </button>
          </div>
        )}
        <button
          onClick={closeModal}
          className="px-4 py-2 mt-4 bg-gray-400 text-white rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default JobCircular;
