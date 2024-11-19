"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ isVisible, onClose, onSave }) => {
  if (!isVisible) return null;

  // const [formData, setFormData] = useState({
  //   jobId: "",
  //   title: "",
  //   company: {
  //     name: "",
  //     website: "",
  //     address: {
  //       street: "",
  //       city: "",
  //       state: "",
  //       postalCode: "",
  //       country: "",
  //     },
  //   },
  //   location: {
  //     type: "",
  //     city: "",
  //     country: "",
  //   },
  //   employmentType: "",
  //   experienceLevel: "",
  //   industry: "",
  //   department: "",
  //   openings: 1,
  //   description: "",
  //   responsibilities: [],
  //   requirements: {
  //     education: "",
  //     experience: "",
  //     skills: [],
  //     languages: [],
  //   },
  //   salary: {
  //     currency: "",
  //     min: 0,
  //     max: 0,
  //     frequency: "",
  //   },
  //   benefits: [],
  //   applicationDetails: {
  //     deadline: "",
  //     link: "",
  //     contactEmail: "",
  //     instructions: "",
  //   },
  //   keywords: [],
  // });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNestedInputChange = (e, section, key) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [key]: value },
    }));
  };

  const handleDeepNestedInputChange = (e, section, subSection, key) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subSection]: { ...prevData[section][subSection], [key]: value },
      },
    }));
  };

  const handleArrayInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.post("/api/jobs", formData);
      onSave(formData);
      toast.success("Job saved successfully!");
      onClose();
    } catch (error) {
      toast.error("Error saving job. Please try again.");
      console.error("Error saving job:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-full max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Add New Job</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &#10005;
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-4 overflow-y-auto flex-grow">
          {/* Job Basic Info */}
          <input
            type="text"
            name="jobId"
            value={formData.jobId}
            onChange={handleInputChange}
            placeholder="Job ID (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Job Title (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Job Description (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />

          {/* Company Information */}
          <input
            type="text"
            value={formData.company.name}
            onChange={(e) => handleNestedInputChange(e, "company", "name")}
            placeholder="Company Name (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            value={formData.company.website}
            onChange={(e) => handleNestedInputChange(e, "company", "website")}
            placeholder="Company Website"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.company.address.street}
            onChange={(e) =>
              handleDeepNestedInputChange(e, "company", "address", "street")
            }
            placeholder="Street Address (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            value={formData.company.address.city}
            onChange={(e) =>
              handleDeepNestedInputChange(e, "company", "address", "city")
            }
            placeholder="City (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            value={formData.company.address.state}
            onChange={(e) =>
              handleDeepNestedInputChange(e, "company", "address", "state")
            }
            placeholder="State"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.company.address.postalCode}
            onChange={(e) =>
              handleDeepNestedInputChange(e, "company", "address", "postalCode")
            }
            placeholder="Postal Code (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />
          <input
            type="text"
            value={formData.company.address.country}
            onChange={(e) =>
              handleDeepNestedInputChange(e, "company", "address", "country")
            }
            placeholder="Country (Required)"
            className="border p-2 rounded mb-4 w-full"
            required
          />

          {/* Location Information */}
          <input
            type="text"
            value={formData.location.type}
            onChange={(e) => handleNestedInputChange(e, "location", "type")}
            placeholder="Location Type (e.g., Remote)"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.location.city}
            onChange={(e) => handleNestedInputChange(e, "location", "city")}
            placeholder="Location City"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.location.country}
            onChange={(e) => handleNestedInputChange(e, "location", "country")}
            placeholder="Location Country"
            className="border p-2 rounded mb-4 w-full"
          />

          {/* Employment Details */}
          <input
            type="text"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleInputChange}
            placeholder="Employment Type"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleInputChange}
            placeholder="Experience Level"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Industry"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="number"
            name="openings"
            value={formData.openings}
            onChange={handleInputChange}
            placeholder="Number of Openings"
            className="border p-2 rounded mb-4 w-full"
          />

          {/* Responsibilities and Requirements */}
          <input
            type="text"
            value={formData.responsibilities.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "responsibilities")}
            placeholder="Responsibilities (comma-separated)"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.requirements.education}
            onChange={(e) =>
              handleNestedInputChange(e, "requirements", "education")
            }
            placeholder="Education Requirement"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.requirements.experience}
            onChange={(e) =>
              handleNestedInputChange(e, "requirements", "experience")
            }
            placeholder="Experience Requirement"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.requirements.skills.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "requirements.skills")}
            placeholder="Skills (comma-separated)"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.requirements.languages.join(", ")}
            onChange={(e) =>
              handleArrayInputChange(e, "requirements.languages")
            }
            placeholder="Languages (comma-separated)"
            className="border p-2 rounded mb-4 w-full"
          />

          {/* Salary Information */}
          <input
            type="text"
            value={formData.salary.currency}
            onChange={(e) => handleNestedInputChange(e, "salary", "currency")}
            placeholder="Currency"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="number"
            value={formData.salary.min}
            onChange={(e) => handleNestedInputChange(e, "salary", "min")}
            placeholder="Minimum Salary"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="number"
            value={formData.salary.max}
            onChange={(e) => handleNestedInputChange(e, "salary", "max")}
            placeholder="Maximum Salary"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.salary.frequency}
            onChange={(e) => handleNestedInputChange(e, "salary", "frequency")}
            placeholder="Salary Frequency (e.g., Yearly)"
            className="border p-2 rounded mb-4 w-full"
          />

          {/* Benefits and Application Details */}
          <input
            type="text"
            value={formData.benefits.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "benefits")}
            placeholder="Benefits (comma-separated)"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="date"
            value={formData.applicationDetails.deadline}
            onChange={(e) =>
              handleNestedInputChange(e, "applicationDetails", "deadline")
            }
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="text"
            value={formData.applicationDetails.link}
            onChange={(e) =>
              handleNestedInputChange(e, "applicationDetails", "link")
            }
            placeholder="Application Link"
            className="border p-2 rounded mb-4 w-full"
          />
          <input
            type="email"
            value={formData.applicationDetails.contactEmail}
            onChange={(e) =>
              handleNestedInputChange(e, "applicationDetails", "contactEmail")
            }
            placeholder="Contact Email"
            className="border p-2 rounded mb-4 w-full"
          />
          <textarea
            value={formData.applicationDetails.instructions}
            onChange={(e) =>
              handleNestedInputChange(e, "applicationDetails", "instructions")
            }
            placeholder="Application Instructions"
            className="border p-2 rounded mb-4 w-full"
          />

          {/* Keywords */}
          <input
            type="text"
            value={formData.keywords.join(", ")}
            onChange={(e) => handleArrayInputChange(e, "keywords")}
            placeholder="Keywords (comma-separated)"
            className="border p-2 rounded mb-4 w-full"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
