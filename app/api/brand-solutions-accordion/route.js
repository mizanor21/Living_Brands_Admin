import { BrandService } from "@/app/lib/BrandAccordion/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { Teams } from "@/app/lib/Teams/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await BrandService.find();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const brandServiceData = await req.json();

    // Connect to the database
    await connectToDB();
    await BrandService.create(brandServiceData);
    return NextResponse.json(
      { message: "brandService data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating brandService data:", error);
    return NextResponse.json(
      { message: "Failed to create brandService data" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedBrandService = await BrandService.findByIdAndDelete(id);
    if (!deletedBrandService) {
      return NextResponse.json(
        { message: "BrandService data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "BrandService data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete BrandService data" },
      { status: 500 }
    );
  }
}
