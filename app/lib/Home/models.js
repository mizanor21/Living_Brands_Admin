import mongoose, { Schema } from "mongoose";

const heroSchema = new Schema(
  {
    title: String,
    shortDescription: String,
    img: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

// const elevateSchema = new Schema(
//   {
//     title: String,
//     shortDescription: String,
//     isActive: Boolean,
//   },
//   { timestamps: true }
// );

// const definesSchema = new Schema(
//   {
//     heading: String,
//     title: String,
//     shortDescription: String,
//     img: String,
//     isActive: Boolean,
//   },
//   { timestamps: true }
// );

export const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", heroSchema);

// export const HomeElevate =
//   mongoose.models.HomeElevate || mongoose.model("HomeElevate", elevateSchema);

// export const HomeDefines =
//   mongoose.models.HomeDefines || mongoose.model("HomeDefines", definesSchema);
