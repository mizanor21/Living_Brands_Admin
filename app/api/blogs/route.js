import { Blogs } from "@/app/lib/Blogs/models";
import { connectToDB } from "@/app/lib/connectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const blogs = await Blogs.find();
  return NextResponse.json(blogs);
}
