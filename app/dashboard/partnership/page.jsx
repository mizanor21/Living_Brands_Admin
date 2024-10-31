"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Partnership = () => {
  const [partnersData, setPartnersData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedLogo, setEditedLogo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/partnership`
        );
        setPartnersData(response.data);
      } catch (error) {
        console.error("Error fetching partner data:", error);
        toast.error("Failed to load partner data.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this partner?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partnership?id=${id}`
      );
      setPartnersData(partnersData.filter((partner) => partner._id !== id));
      toast.success("Partner deleted successfully.");
    } catch (error) {
      console.error("Error deleting partner:", error);
      toast.error("Failed to delete partner.");
    }
  };

  const handleEditClick = (partner) => {
    setEditingId(partner._id);
    setEditedName(partner.name);
    setEditedDescription(partner.description);
    setEditedLogo(partner?.logo);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partnership/${id}`,
        {
          name: editedName,
          description: editedDescription,
          logo: editedLogo,
        }
      );

      // Immediately update the local state with the new data
      setPartnersData((prevData) =>
        prevData.map((partner) =>
          partner._id === id
            ? {
                ...partner,
                name: editedName,
                description: editedDescription,
                logo: editedLogo,
              }
            : partner
        )
      );

      toast.success("Partner data updated successfully.");
      setEditingId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating partner data:", error);
      toast.error("Failed to update partner data.");
    }
  };

  return (
    <div className="bg-white py-10 relative z-[110] rounded-[20px] font-sora">
      <div className="p-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 items-center text-center justify-center">
          {partnersData.map((partner) => (
            <div key={partner._id} className="text-center group">
              {editingId === partner._id ? (
                <input
                  type="text"
                  value={editedLogo}
                  onChange={(e) => setEditedLogo(e.target.value)}
                  className="text-[20px] tracking-tighter font-bold text-black mb-2 mt-10 border-b focus:outline-none"
                  placeholder="Logo URL"
                />
              ) : (
                <Image
                  width={200}
                  height={200}
                  src={partner?.logo}
                  alt={`${partner?.name} Logo`}
                  className="mx-auto mb-2 h-16 object-contain saturate-0 group-hover:saturate-100"
                />
              )}

              {editingId === partner._id ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-[20px] tracking-tighter font-bold text-black mb-2 mt-10 border-b focus:outline-none"
                  autoFocus
                />
              ) : (
                <h3
                  className="text-[20px] tracking-tighter font-bold text-black mb-2 mt-10 cursor-pointer"
                  onClick={() => handleEditClick(partner)}
                >
                  {partner.name}
                </h3>
              )}

              {editingId === partner._id ? (
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="text-black opacity-75 text-[15px] font-[400] mb-2 border-b focus:outline-none"
                  placeholder="Description"
                />
              ) : (
                <p className="text-black opacity-75 text-[15px] font-[400] mb-2">
                  {partner.description}
                </p>
              )}

              <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="text-xl bg-slate-100 hover:bg-green-600 hover:text-white duration-500 rounded-full p-2">
                  <IoIosAddCircle />
                </button>

                <button
                  className="text-xl bg-slate-100 hover:bg-red-500 hover:text-white duration-500 rounded-full p-2"
                  onClick={() => handleDelete(partner._id)}
                >
                  <RiDeleteBin6Fill />
                </button>
              </div>

              {editingId === partner._id && (
                <button
                  onClick={() => handleUpdate(partner._id)}
                  className="text-sm text-white bg-blue-500 rounded px-3 py-1 mt-2"
                >
                  Save
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Partnership;
