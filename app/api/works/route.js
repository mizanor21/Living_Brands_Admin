import { connectToDB } from "@/app/lib/connectToDB";
import { Works } from "@/app/lib/Works/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const works = await Works.find();
  return NextResponse.json(works);
}
