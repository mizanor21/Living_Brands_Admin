import { connectToDB } from "@/app/lib/connectToDB";
import { News } from "@/app/lib/NewsCenter/model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const news = await News.findOne({ _id: id });
  if (!news) {
    return NextResponse.json({ message: "News not found" }, { status: 404 });
  }
  const response = NextResponse.json({ news }, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function PATCH(req, { params }) {
  try {
    const { img, title, category, details, isTrending } = await req.json();
    const { id } = params;
    // Connect to the database
    await connectToDB();

    // Update the work document with the provided _id
    const updatedNews = await News.findByIdAndUpdate(
      id,
      {
        img,
        title,
        category,
        details,
        isTrending,
      },
      { new: true } // Return the updated document
    );

    // Check if the document was found and updated
    if (!updatedNews) {
      return NextResponse.json({ message: "news not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "news updated successfully", news: updatedNews },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { message: "Failed to update news" },
      { status: 500 }
    );
  }
}
