import { connectToDB } from "@/app/lib/connectToDB";
import { Home } from "@/app/lib/Home/models";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedHome = await Home.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures model validation
    });

    if (!updatedHome) {
      return NextResponse.json(
        { message: "Home data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedHome },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update Home data" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const home = await Home.findOne({ _id: id });
  if (!home) {
    return NextResponse.json(
      { message: "Home data not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ home }, { status: 200 });
}

// export async function PUT(req, { params }) {
//   const { id } = params;
//   const { title, shortDescription, img, isActive } = await req.json();
//   await connectToDB();
//   await Home.findByIdAndUpdate(id, {
//     title,
//     shortDescription,
//     img,
//     isActive,
//   });
//   return NextResponse.json(
//     { message: "Data Successfully Updated" },
//     { status: 200 }
//   );
// }
