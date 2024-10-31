"use client";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Fill } from "react-icons/ri";

const HeroSection = () => {
  const [heros, setHeros] = useState([]);

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const fetchHerosData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch hero data");

        const data = await res.json();
        setHeros(data || []); // Default to empty array if not found
      } catch (error) {
        console.error("Error fetching heros:", error);
        setFetchError("Failed to load hero data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHerosData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/home/6718863eeb96ef16ccbf6172`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to update hero data");

      console.log("Hero data updated successfully");
    } catch (error) {
      console.error("Error updating hero data:", error);
    }
  };

  const renderError = (error) =>
    error && (
      <small className="text-[12px] text-red-600" role="alert">
        {error.message}
      </small>
    );

  return (
    <div>
      {loading ? (
        <p>Loading heros...</p>
      ) : fetchError ? (
        <p>{fetchError}</p>
      ) : (
        heros.map(({ id, title, shortDescription }, i) => (
          <div key={i} className="relative rounded-lg bg-white p-[2%]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold uppercase">Hero Section</h3>
              <div className="flex gap-1">
                <button className="text-xl">
                  <IoIosAddCircle />
                </button>
                <button className="text-xl">
                  <LiaEditSolid />
                </button>
                <button className="text-xl">
                  <RiDeleteBin6Fill />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 gap-5">
                <div className="w-full">
                  <label>
                    Title <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    defaultValue={title}
                    {...register("title", { required: "Title is required" })}
                    placeholder="Title"
                    className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c] w-full min-h-[100px]"
                  />
                  {renderError(errors.title)}
                </div>

                <div className="w-full">
                  <label>
                    Short Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    defaultValue={shortDescription}
                    {...register("shortDescription", {
                      required: "Short Description is required",
                    })}
                    placeholder="Short Description"
                    className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c] w-full min-h-[100px]"
                  />
                  {renderError(errors.shortDescription)}
                </div>

                <div className="w-full">
                  <label>
                    Hero Image <span className="text-red-600">*</span>
                  </label>
                  <input
                    {...register("heroImage", {
                      required: "Hero Image is required",
                    })}
                    type="file"
                    className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c] w-full"
                  />
                  {renderError(errors.heroImage)}
                </div>
              </div>

              <div className="w-full flex justify-end items-center mt-4">
                <Button
                  type="submit"
                  className="px-10 bg-[#147274] hover:bg-[#145e60]"
                >
                  Save
                </Button>
              </div>
            </form>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        ))
      )}
    </div>
  );
};

export default HeroSection;
