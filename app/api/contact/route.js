import { NextResponse } from "next/server";
import connectToDB from "@/app/lib/connectToDB";
import Contact from "@/app/lib/Contact/model";

// Handle GET request to fetch all contacts
export async function GET() {
  try {
    await connectToDB();
    const data = await Contact.find();

    const response = NextResponse.json(data, { status: 200 });
    // Add CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://living-brands-v1.vercel.app"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { message: "Failed to fetch contact data" },
      { status: 500 }
    );
  }
}

// Handle POST request to create a new contact
export async function POST(req) {
  try {
    const contactData = await req.json();
    await connectToDB();
    await Contact.create(contactData);

    const response = NextResponse.json(
      { message: "Contact data created" },
      { status: 201 }
    );

    // Add CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://living-brands-v1.vercel.app"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error creating contact data:", error);
    return NextResponse.json(
      { message: "Failed to create contact data" },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete a specific contact by ID
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

    const response = NextResponse.json(
      { message: "Contact data deleted" },
      { status: 200 }
    );

    // Add CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://living-brands-v1.vercel.app"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error deleting contact data:", error);
    return NextResponse.json(
      { message: "Failed to delete contact data" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://living-brands-v1.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
