import { BrandService } from "@/app/lib/BrandAccordion/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { Teams } from "@/app/lib/Teams/model";
import { TechService } from "@/app/lib/TechAccordion/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await TechService.find();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const techServiceData = await req.json();

    // Connect to the database
    await connectToDB();
    await TechService.create(techServiceData);
    return NextResponse.json(
      { message: "techService data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating techService data:", error);
    return NextResponse.json(
      { message: "Failed to create techService data" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedTechService = await TechService.findByIdAndDelete(id);
    if (!deletedTechService) {
      return NextResponse.json(
        { message: "TechService data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "TechService data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete TechService data" },
      { status: 500 }
    );
  }
}
