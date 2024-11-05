"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure modal root
Modal.setAppElement("#root");

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

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`
      );
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs!");
      console.error(error);
    }
  };

  // Handle input change for job data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input change for applicant data
  const handleApplicantChange = (e) => {
    const { name, value } = e.target;
    setApplicant({ ...applicant, [name]: value });
  };

  // Open modal with job data for editing or viewing
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

  // Add new job
  const addJob = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        formData
      );
      setJobs([...jobs, response.data]);
      toast.success("Job added successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to add job!");
      console.error(error);
    }
  };

  // Update existing job
  const updateJob = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${formData._id}`,
        formData
      );
      setJobs(
        jobs.map((job) => (job._id === formData._id ? response.data : job))
      );
      toast.success("Job updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update job!");
      console.error(error);
    }
  };

  // Delete job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete job!");
      console.error(error);
    }
  };

  // Submit applicant info
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
      console.error(error);
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
            <p className="text-gray-600">{job.company.name}</p>
            <p className="text-gray-500">{job.company.location}</p>
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
          name="company.name"
          value={formData.company?.name || ""}
          onChange={handleInputChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          readOnly={!isEditing}
        />

        {/* Additional Job Details Fields */}

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
