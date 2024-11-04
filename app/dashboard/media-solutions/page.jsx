"use client";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFetchMediaSolutions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/media-solutions`
        );
        setData(response.data[0]);
      } catch (err) {
        setError("Error fetching media solutions data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, setData };
};

const EditModal = ({ data, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleBrandChange = (index, field, value) => {
    const updatedBrands = [...formData.brand];
    updatedBrands[index][field] = value;
    setFormData({ ...formData, brand: updatedBrands });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl h-[90vh] overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-4">Edit Media Solutions</h2>

        {/* Short Description */}
        <label className="block mb-2 font-semibold">Short Description</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500 resize-none"
          rows="3"
          value={formData.shortDescription?.[0] || ""}
          onChange={(e) => handleChange("shortDescription", [e.target.value])}
          placeholder="Short Description"
        />

        {/* Items */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Items</h3>
          {formData.items?.map((item, index) => (
            <div key={item._id} className="mb-4 border-b border-gray-200 pb-4">
              <input
                className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
                value={item.title}
                onChange={(e) =>
                  handleItemChange(index, "title", e.target.value)
                }
                placeholder="Title"
              />
              <textarea
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
                rows="2"
                value={item.content}
                onChange={(e) =>
                  handleItemChange(index, "content", e.target.value)
                }
                placeholder="Content"
              />
            </div>
          ))}
        </div>

        {/* Brand Logos */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Brand Logos</h3>
          {formData.brand?.map((brand, index) => (
            <div key={brand._id} className="mb-2">
              <input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={brand.logo}
                onChange={(e) =>
                  handleBrandChange(index, "logo", e.target.value)
                }
                placeholder="Logo URL"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-secondary px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const MediaSolutions = () => {
  const { data, loading, error, setData } = useFetchMediaSolutions();
  const [open, setOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/media-solutions/${data._id}`,
        updatedData
      );
      setData(response.data.data);
      toast.success("Data successfully updated!");
    } catch (error) {
      toast.error("Error updating data.");
      console.error("Error updating media solutions data:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="px-[5%] py-12 bg-white rounded-[20px] font-sora">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 lg:mb-20">
        {/* Left Side */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl md:text-4xl lg:text-[48px] text-[#125b5c] font-bold">
              Media Solutions
            </h2>
            <button className="btn" onClick={handleEditClick}>
              Edit
            </button>
          </div>
          <p className="text-[18px] font-normal text-black mb-5 text-justify">
            {data?.shortDescription?.[0]}
          </p>
          <hr className="h-[3px] bg-black mb-5 max-w-52" />
          <p className="font-[600] text-[18px] text-[#125b5c] mb-10">
            Proud to work with the biggest media in India & Abroad
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-4 items-center mb-10 gap-y-5 px-7 md:px-0">
            {data?.brand?.map((brand) => (
              <Image
                key={brand._id}
                width={100}
                height={100}
                src={brand.logo}
                alt="Brand Logo"
                className="h-16 object-contain saturate-0 hover:saturate-100"
              />
            ))}
          </div>
        </div>

        {/* Right Side - Accordion */}
        <div className="space-y-4">
          {data?.items?.map((item, index) => (
            <div key={item._id} className="border-b border-gray-300">
              <button
                className="w-full flex justify-between items-center py-4 text-[16px] font-[700] text-[#125b5c] text-left"
                onClick={() => toggle(index)}
              >
                {item.title}
                {open === index ? (
                  <FaChevronUp className="ml-2 text-gray-500" />
                ) : (
                  <FaChevronDown className="ml-2 text-gray-500" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-[max-height] text-[14px] font-[400] duration-1000 ease-in-out ${
                  open === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="py-2 text-black pb-7">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        data={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default MediaSolutions;
