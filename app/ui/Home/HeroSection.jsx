import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const HeroSection = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/home/672acdb3167e8afc7894cdd9`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Hero data updated successfully!"); // Show success notification
    } catch (error) {
      console.error("Error updating hero data:", error);
      toast.error("Failed to update hero data."); // Show error notification
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
      <div className="relative rounded-lg bg-white p-[2%] shadow-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold uppercase">Hero Section</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-5">
            <div className="w-full">
              <label>
                Title <span className="text-red-600">*</span>
              </label>
              <textarea
                defaultValue={data?.title}
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
                defaultValue={data?.shortDescription}
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
    </div>
  );
};

export default HeroSection;
