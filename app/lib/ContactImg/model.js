import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  id: Number,
  img: String,
  isActive: Boolean,
});

export const ContactImg =
  mongoose.models.ContactImg || mongoose.model("ContactImg", ContactSchema);
