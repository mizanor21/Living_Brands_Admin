import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const BrandService =
  mongoose.models.BrandService || mongoose.model("BrandService", ServiceSchema);
