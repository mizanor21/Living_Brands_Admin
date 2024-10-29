import { ColorPalettes } from "@/app/lib/ColorPalettes/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { Teams } from "@/app/lib/Teams/model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedColorPalette = await ColorPalettes.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures model validation
      }
    );

    if (!updatedColorPalette) {
      return NextResponse.json(
        { message: "ColorPalettes data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedColorPalette },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update ColorPalettes data:", error);
    return NextResponse.json(
      { message: "Failed to update ColorPalettes data" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const colorPalettes = await ColorPalettes.findOne({ _id: id });
  if (!colorPalettes) {
    return NextResponse.json(
      { message: "colorPalettes data not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(colorPalettes, { status: 200 });
}
