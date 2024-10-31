import { connectToDB } from "@/app/lib/connectToDB";
import { HomeHero } from "@/app/lib/Home/models";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, shortDescription, img, isActive } = await req.json();
    await connectToDB();
    await HomeHero.create({ title, shortDescription, img, isActive });
    return NextResponse.json({ message: "Hero data created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create hero data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDB();
  const heroes = await HomeHero.find();
  return NextResponse.json(heroes);
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedHero = await HomeHero.findByIdAndDelete(id);
    if (!deletedHero) {
      return NextResponse.json(
        { message: "Hero data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Hero data deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete hero data" },
      { status: 500 }
    );
  }
}
