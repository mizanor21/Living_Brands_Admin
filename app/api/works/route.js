import { connectToDB } from "@/app/lib/connectToDB";
import { Works } from "@/app/lib/Works/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const works = await Works.find();
  return NextResponse.json(works);
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedHero = await Works.findByIdAndDelete(id);
    if (!deletedHero) {
      return NextResponse.json(
        { message: "Work data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Work data deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete work data" },
      { status: 500 }
    );
  }
}
