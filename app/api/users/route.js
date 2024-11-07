import { connectToDB } from "@/app/lib/connectToDB";
import { User } from "@/app/lib/Login/modal";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await User.find();
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}
