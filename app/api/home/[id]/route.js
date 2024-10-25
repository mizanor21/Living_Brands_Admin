import { connectToDB } from "@/app/lib/connectToDB";
import { HomeHero } from "@/app/lib/Home/models";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const updateData = await req.json();

  await connectToDB();

  try {
    const updatedHero = await HomeHero.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures model validation
    });

    if (!updatedHero) {
      return NextResponse.json(
        { message: "Hero data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data Successfully Updated", data: updatedHero },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update hero data" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectToDB();
  const hero = await HomeHero.findOne({ _id: id });
  if (!hero) {
    return NextResponse.json(
      { message: "Hero data not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ hero }, { status: 200 });
}

// export async function PUT(req, { params }) {
//   const { id } = params;
//   const { title, shortDescription, img, isActive } = await req.json();
//   await connectToDB();
//   await HomeHero.findByIdAndUpdate(id, {
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
