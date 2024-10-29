import { BrandService } from "@/app/lib/BrandAccordion/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { MediaService } from "@/app/lib/MediaAccordion/model";
import { Teams } from "@/app/lib/Teams/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await MediaService.find();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const mediaServiceData = await req.json();

    // Connect to the database
    await connectToDB();
    await MediaService.create(mediaServiceData);
    return NextResponse.json(
      { message: "mediaService data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating mediaService data:", error);
    return NextResponse.json(
      { message: "Failed to create mediaService data" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedMediaService = await MediaService.findByIdAndDelete(id);
    if (!deletedMediaService) {
      return NextResponse.json(
        { message: "MediaService data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "MediaService data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete MediaService data" },
      { status: 500 }
    );
  }
}
