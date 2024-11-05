import mongoose from "mongoose";

const JobCircularSchema = new mongoose.Schema({
  jobId: {
    type: String,
    unique: true,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    name: String,
    logoUrl: String,
    location: String,
    website: String,
    industry: String,
    size: String,
  },
  jobDetails: {
    employmentType: String,
    experienceLevel: String,
    salaryRange: {
      min: Number,
      max: Number,
      currency: String,
      frequency: String,
    },
    applicationDeadline: Date,
    postingDate: Date,
  },
  jobDescription: [String],
  qualifications: {
    education: String,
    experience: String,
    skills: [String],
    preferredQualifications: [String],
  },
  benefits: [String],
  applicationInstructions: {
    applyLink: String,
    applyEmail: String,
    instructions: [String],
  },
  contactInformation: {
    recruiterName: String,
    recruiterEmail: String,
    phone: String,
  },
});

export const JobCircular =
  mongoose.models.JobCircular ||
  mongoose.model("JobCircular", JobCircularSchema);
