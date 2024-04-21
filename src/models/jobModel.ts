import mongoose from "mongoose";
import { isURL } from "validator";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer",
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
    },
    address: {
      type: String,
      trim: true,
    },
  },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  applyUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (url: any) => isURL(url),
      message: (props) => `${props.value} is not a valid URL.`,
    },
  },
  companyLogo: {
    type: String,
    trim: true,
    validate: {
      validator: (url: any) => (url ? isURL(url) : true),
      message: (props) => `${props.value} is not a a valid URL (if provided).`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  ],
  benefits: [String],
  salaryRange: {
    min: Number,
    max: Number,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry Level", "Mid Level", "Senior Level"],
  },
  remoteOptions: {
    flexibleHours: Boolean,
    timezone: String,
  },
  department: String,
});

jobSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const JobModel = mongoose.models.eventModel || mongoose.model("Job", jobSchema);

export default JobModel;
