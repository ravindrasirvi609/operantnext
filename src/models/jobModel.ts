import mongoose, { Document, Schema } from "mongoose";
import { isURL } from "validator";

interface ISalaryRange {
  min: number;
  max: number;
  currency: string;
}

interface IRemoteOptions {
  flexibleHours: boolean;
  timezone?: string;
}

interface IJob extends Document {
  title: string;
  description: string;
  company: mongoose.Types.ObjectId;
  location: {
    type: "Remote" | "On-site" | "Hybrid";
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  applyUrl: string;
  companyLogo?: string;
  createdAt: Date;
  updatedAt: Date;
  skills: mongoose.Types.ObjectId[];
  benefits: string[];
  salaryRange?: ISalaryRange;
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level" | "Executive";
  remoteOptions?: IRemoteOptions;
  department: string;
  responsibilities: string[];
  qualifications: string[];
  applicationDeadline?: Date;
  jobStatus: "Open" | "Closed" | "On Hold";
  numberOfOpenings: number;
  applicantCount: number;
  interviewProcess: string[];
  workSchedule?: string;
  keywords: string[];
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Remote", "On-site", "Hybrid"],
        required: true,
      },
      address: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    type: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      index: true,
    },
    applyUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (url: string) => isURL(url),
        message: (props) => `${props.value} is not a valid URL.`,
      },
    },
    companyLogo: {
      type: String,
      trim: true,
      validate: {
        validator: (url: string) => (url ? isURL(url) : true),
        message: (props) => `${props.value} is not a valid URL (if provided).`,
      },
    },
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      },
    ],
    benefits: [String],
    salaryRange: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "USD",
      },
    },
    experienceLevel: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level", "Executive"],
      required: true,
      index: true,
    },
    remoteOptions: {
      flexibleHours: Boolean,
      timezone: String,
    },
    department: {
      type: String,
      required: true,
      index: true,
    },
    responsibilities: [String],
    qualifications: [String],
    applicationDeadline: Date,
    jobStatus: {
      type: String,
      enum: ["Open", "Closed", "On Hold"],
      default: "Open",
      index: true,
    },
    numberOfOpenings: {
      type: Number,
      default: 1,
    },
    applicantCount: {
      type: Number,
      default: 0,
    },
    interviewProcess: [String],
    workSchedule: String,
    keywords: [
      {
        type: String,
        index: true,
      },
    ],
  },
  { timestamps: true }
);

// Index for faster searches
jobSchema.index({ title: "text", description: "text", department: "text" });

// Virtual for the full job representation
jobSchema.virtual("fullJobDetails").get(function (this: IJob) {
  return `${this.title} at ${this.company} - ${this.type} (${this.location.type})`;
});

// Static method to find jobs by skill
jobSchema.statics.findBySkill = function (skillId: mongoose.Types.ObjectId) {
  return this.find({ skills: skillId });
};

// Instance method to update applicant count
jobSchema.methods.updateApplicantCount = function (this: IJob) {
  this.applicantCount += 1;
  return this.save();
};

const JobModel = mongoose.models.Job || mongoose.model<IJob>("Job", jobSchema);

export default JobModel;
