"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";

const BlogModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <dialog id="blogModal" className="modal ">
        <div className="modal-box max-w-[1000px]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="title">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Title"
                aria-invalid={errors.title ? "true" : "false"}
                className="rounded-lg px-5 py-2 border border-[#125b5c] w-full"
              />
              {errors.title && (
                <small className="text-red-600">{errors.title.message}</small>
              )}
            </div>

            <div>
              <label htmlFor="detailsTitle">
                Details Title <span className="text-red-600">*</span>
              </label>
              <input
                {...register("detailsTitle", {
                  required: "Details Title is required",
                })}
                placeholder="Details Title"
                aria-invalid={errors.detailsTitle ? "true" : "false"}
                className="rounded-lg px-5 py-2 border border-[#125b5c] w-full"
              />
              {errors.detailsTitle && (
                <small className="text-red-600">
                  {errors.detailsTitle.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="serviceDetails">
                Service Details <span className="text-red-600">*</span>
              </label>
              <textarea
                {...register("serviceDetails", {
                  required: "Service Details are required",
                })}
                placeholder="Service Details"
                aria-invalid={errors.serviceDetails ? "true" : "false"}
                className="rounded-lg px-5 py-2 border border-[#125b5c] w-full min-h-[100px]"
              />
              {errors.serviceDetails && (
                <small className="text-red-600">
                  {errors.serviceDetails.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="industry">
                Industry <span className="text-red-600">*</span>
              </label>
              <input
                {...register("industry", { required: "Industry is required" })}
                placeholder="Industry"
                aria-invalid={errors.industry ? "true" : "false"}
                className="rounded-lg px-5 py-2 border border-[#125b5c] w-full"
              />
              {errors.industry && (
                <small className="text-red-600">
                  {errors.industry.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="services">
                Services <span className="text-red-600">*</span>
              </label>
              <input
                {...register("services", { required: "Services are required" })}
                placeholder="Services"
                aria-invalid={errors.services ? "true" : "false"}
                className="rounded-lg px-5 py-2 border border-[#125b5c] w-full"
              />
              {errors.services && (
                <small className="text-red-600">
                  {errors.services.message}
                </small>
              )}
            </div>

            <div>
              <label htmlFor="img">
                Thumbnail Image URL <span className="text-red-600">*</span>
              </label>
              <input
                {...register("img", { required: "Image URL is required" })}
                placeholder="Image URL"
                aria-invalid={errors.img ? "true" : "false"}
                className="rounded-lg px-5 py-2 border border-[#125b5c] w-full"
              />
              {errors.img && (
                <small className="text-red-600">{errors.img.message}</small>
              )}
            </div>

            <div className="w-full flex justify-end items-center">
              <Button
                type="submit"
                className="px-10 bg-[#147274] hover:bg-[#145e60]"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BlogModal;
