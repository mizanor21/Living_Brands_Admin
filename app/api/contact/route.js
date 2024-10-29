import { connectToDB } from "@/app/lib/connectToDB";
import { ContactImg } from "@/app/lib/ContactImg/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const contactImg = await ContactImg.find();
  return NextResponse.json(contactImg);
}

export async function POST(req) {
  try {
    const contactData = await req.json();

    // Connect to the database
    await connectToDB();
    await ContactImg.create(contactData);
    return NextResponse.json(
      { message: "contact data created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact data:", error);
    return NextResponse.json(
      { message: "Failed to create contact data" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedContactImg = await ContactImg.findByIdAndDelete(id);
    if (!deletedContactImg) {
      return NextResponse.json(
        { message: "ContactImg data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "ContactImg data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete ContactImg data" },
      { status: 500 }
    );
  }
}
