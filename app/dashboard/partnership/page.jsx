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
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/partnership?id=${id}`
      );
      setPartnersData(partnersData.filter((partner) => partner._id !== id));
      toast.success("Partner deleted successfully.");
    } catch (error) {
      console.error("Error deleting partner:", error);
      toast.error("Failed to delete partner.");
    }
  };

  return (
    <div className="bg-white py-10 relative z-[110] rounded-[20px] font-sora">
      <div className="p-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 items-center text-center justify-center">
          {partnersData.map((partner) => (
            <div key={partner._id} className="text-center group">
              <Image
                width={200}
                height={200}
                src={partner.logo}
                alt={`${partner.name} Logo`}
                className="mx-auto mb-2 h-16 object-contain saturate-0 group-hover:saturate-100"
              />
              <h3 className="text-[20px] tracking-tighter font-bold text-black mb-2 mt-10">
                {partner.name}
              </h3>
              <p className="text-black opacity-75 text-[15px] font-[400] mb-2">
                {partner.description}
              </p>

              <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button className="text-xl">
                  <IoIosAddCircle />
                </button>
                <button className="text-xl">
                  <LiaEditSolid />
                </button>
                <button
                  className="text-xl"
                  onClick={() => handleDelete(partner._id)}
                >
                  <RiDeleteBin6Fill />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Partnership;
