import { ColorPalettes } from "@/app/lib/ColorPalettes/model";
import { connectToDB } from "@/app/lib/connectToDB";
import { Teams } from "@/app/lib/Teams/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const teams = await ColorPalettes.find();
  const response = NextResponse.json(teams);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(req) {
  try {
    const colorData = await req.json();

    await connectToDB();
    await ColorPalettes.create(colorData);
    return NextResponse.json(
      { message: "Color data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating color data:", error);
    return NextResponse.json(
      { message: "Failed to create color data" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedColorPalette = await ColorPalettes.findByIdAndDelete(id);
    if (!deletedColorPalette) {
      return NextResponse.json(
        { message: "ColorPalette data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "ColorPalette data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete ColorPalette data" },
      { status: 500 }
    );
  }
}
