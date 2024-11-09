import { NextResponse } from "next/server";
import connectToDB from "@/app/lib/connectToDB";
import Contact from "@/app/lib/Contact/model";

// Handle POST request
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
      "https://living-brands-admin.vercel.app/api/contact"
    ); // Set to your frontend domain
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
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

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://living-brands-admin.vercel.app/api/contact"
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
