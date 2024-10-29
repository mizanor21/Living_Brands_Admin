import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,
  content: String,
});

export const MediaService =
  mongoose.models.MediaService || mongoose.model("MediaService", ServiceSchema);
