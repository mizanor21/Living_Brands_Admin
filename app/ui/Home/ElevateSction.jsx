"use client";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin6Fill } from "react-icons/ri";

const ElevateSection = ({ dataElevate }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      {/* Elevate Section  */}

      {dataElevate.map((data, i) => (
        <div key={i} className="relative rounded-lg bg-white p-[2%]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold uppercase ">Elevate Section </h3>
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
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-3 gap-5">
              <div className="w-full">
                <label htmlFor="">
                  Title <span className="text-red-600">*</span>
                </label>
                <br />
                <textarea
                  defaultValue={data?.title}
                  {...register("title", { required: true })}
                  placeholder="Title"
                  aria-invalid={errors.title ? "true" : "false"}
                  className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c] w-full min-h-[100px]"
                />
                <div className="min-h-6">
                  {errors.title && (
                    <small className="text-[12px] text-red-600" role="alert">
                      Title is required
                    </small>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="">
                  Short Description <span className="text-red-600">*</span>
                </label>
                <br />
                <textarea
                  defaultValue={data?.shortDescription}
                  {...register("shortDescription", {
                    required: "Short Description is required",
                  })}
                  placeholder="Short Description"
                  aria-invalid={errors.shortDescription ? "true" : "false"}
                  className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c] w-full min-h-[100px]"
                />
                <div className="min-h-6">
                  {errors.shortDescription && (
                    <small className="text-[12px] text-red-600" role="alert">
                      Short Description is required
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end items-center">
              <Button className="px-10 bg-[#147274] hover:bg-[#145e60]">
                <input type="submit" value="Save" className="cursor-pointer" />
              </Button>
            </div>
          </form>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
      ))}
    </div>
  );
};

export default ElevateSection;
