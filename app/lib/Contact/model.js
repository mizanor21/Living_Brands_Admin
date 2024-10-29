import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  id: Number,
  img: String,
  isActive: Boolean,
});

export const Contact =
  mongoose.models.ContactSchema || mongoose.model("Contactimg", ContactSchema);
