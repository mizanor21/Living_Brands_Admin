import { connectToDB } from "@/app/lib/connectToDB";
import { Jobs } from "@/app/lib/jobs/model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const jobs = await Jobs.find();
  return NextResponse.json(jobs);
}

export async function POST(req) {
  try {
    const {
      title,
      location,
      experience,
      jobType,
      date,
      isActive = true,
    } = await req.json();

    // Connect to the database
    await connectToDB();

    // Create a new job document
    await Jobs.create({ title, location, experience, jobType, date, isActive });

    return NextResponse.json({ message: "Job data created" }, { status: 201 });
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
    const deletedJob = await Jobs.findByIdAndDelete(id);
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
