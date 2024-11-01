"use client";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

// Custom hook for data fetching
const useFetchBrandSolutions = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/brand-solutions`
        );
        setData(response.data[0]); // Assume the data is wrapped in an array
      } catch (err) {
        setError("Error fetching brand solutions data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const BrandSolutions = () => {
  const { data, loading, error } = useFetchBrandSolutions();
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="px-[5%] py-12 bg-white rounded-[20px] font-sora">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 lg:mb-20">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-[48px] text-[#125b5c] font-bold mb-7 md:mb-10">
            Brand Solutions
          </h2>
          <p className="text-[18px] font-normal text-black mb-5 text-justify">
            {data?.shortDescription?.[0]}
          </p>
          <hr className="h-[3px] bg-black mb-5 max-w-52" />
          <p className="font-[600] text-[18px] text-[#125b5c] mb-10">
            Proud to work with the biggest brands in India & Abroad
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-4 items-center mb-10 gap-y-5  px-7 md:px-0">
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
    </section>
  );
};

export default BrandSolutions;
