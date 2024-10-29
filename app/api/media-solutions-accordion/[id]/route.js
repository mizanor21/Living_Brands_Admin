import { BrandService } from "@/app/lib/BrandAccordion/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { MediaService } from "@/app/lib/MediaAccordion/model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedMediaService = await MediaService.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures model validation
      }
    );

    if (!updatedMediaService) {
      return NextResponse.json(
        { message: "media data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedMediaService },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update media data:", error);
    return NextResponse.json(
      { message: "Failed to update media data" },
      { status: 500 }
    );
  }
}
