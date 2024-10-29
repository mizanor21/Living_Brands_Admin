import { BrandService } from "@/app/lib/BrandAccordion/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { TechService } from "@/app/lib/TechAccordion/model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedTechService = await TechService.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures model validation
      }
    );

    if (!updatedTechService) {
      return NextResponse.json(
        { message: "tech data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedTechService },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update tech data:", error);
    return NextResponse.json(
      { message: "Failed to update tech data" },
      { status: 500 }
    );
  }
}
