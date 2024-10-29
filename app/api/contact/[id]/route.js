import { connectToDB } from "@/app/lib/connectToDB";
import { ContactImg } from "@/app/lib/ContactImg/model";
import { Teams } from "@/app/lib/Teams/model";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedContactImg = await ContactImg.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Returns the updated document
        runValidators: true, // Ensures model validation
      }
    );

    if (!updatedContactImg) {
      return NextResponse.json(
        { message: "contact data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedContactImg },
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

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const team = await Teams.findOne({ _id: id });
  if (!team) {
    return NextResponse.json(
      { message: "team data not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(team, { status: 200 });
}
