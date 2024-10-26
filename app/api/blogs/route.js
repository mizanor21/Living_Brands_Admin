import { Blogs } from "@/app/lib/Blogs/models";
import { connectToDB } from "@/app/lib/connectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const blogs = await Blogs.find();
  return NextResponse.json(blogs);
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedHero = await Blogs.findByIdAndDelete(id);
    if (!deletedHero) {
      return NextResponse.json(
        { message: "Blog data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog data deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete blog data" },
      { status: 500 }
    );
  }
}
