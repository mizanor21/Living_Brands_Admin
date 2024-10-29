import mongoose from "mongoose";

const ColorPaletteSchema = new mongoose.Schema({
  id: Number,
  imageUrl: String,
  title: String,
  description: String,
  isActive: Boolean,
});

export const ColorPalettes =
  mongoose.models.ColorPalettes ||
  mongoose.model("ColorPalettes", ColorPaletteSchema);
