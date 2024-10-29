import { BrandService } from "@/app/lib/BrandAccordion/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { Teams } from "@/app/lib/Teams/model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedBrandService = await BrandService.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures model validation
      }
    );

    if (!updatedBrandService) {
      return NextResponse.json(
        { message: "team data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedBrandService },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update team data:", error);
    return NextResponse.json(
      { message: "Failed to update team data" },
      { status: 500 }
    );
  }
}
