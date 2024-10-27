import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    experience: String,
    jobType: String,
    data: String,
    // isActive: Boolean,
  },
  { timestamps: true }
);

export const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", jobsSchema);
