import { connectToDB } from "@/app/lib/connectToDB";
import { Contact } from "@/app/lib/Contact/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await Contact.find();
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(req) {
  try {
    const contactData = await req.json();

    // Connect to the database
    await connectToDB();
    await Contact.create(contactData);
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
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact data deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete Contact data" },
      { status: 500 }
    );
  }
}
