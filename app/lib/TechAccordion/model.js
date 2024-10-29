import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const TechService =
  mongoose.models.TechService || mongoose.model("TechService", ServiceSchema);
