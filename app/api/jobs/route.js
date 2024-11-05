import { connectToDB } from "@/app/lib/connectToDB";
import { JobCircular } from "@/app/lib/jobs/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const data = await JobCircular.find();
  const response = NextResponse.json(data);
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
}

export async function POST(req) {
  try {
    const edgeData = await req.json();

    await connectToDB();
    await JobCircular.create(edgeData);
    return NextResponse.json({ message: "job data created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating job data:", error);
    return NextResponse.json(
      { message: "Failed to create job data" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    await connectToDB();
    const deletedJob = await JobCircular.findByIdAndDelete(id);
    if (!deletedJob) {
      return NextResponse.json(
        { message: "Job data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Job data deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete Job data" },
      { status: 500 }
    );
  }
}
