import mongoose, { Document, Schema } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  username: string;
  location: {
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  mobileNo: string;
  email: string;
  authorisedPersonName: string;
  registrationDate: Date;
  industryType: string;
  numberOfEmployees: number;
  websiteUrl: string;
  profileImage: string;
  description: string;
  foundedYear: number;
  companySize: "startup" | "small" | "medium" | "large" | "enterprise";
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  benefits: string[];
  openPositions: {
    title: string;
    department: string;
    description: string;
    requirements: string[];
    isActive: boolean;
  }[];
  companyValues: string[];
  awards: {
    name: string;
    year: number;
    description: string;
  }[];
  events: {
    name: string;
    date: Date;
    description: string;
    registrationLink?: string;
  }[];
  preferredSkills: string[];
  verificationStatus: "pending" | "verified" | "rejected";
  lastActive: Date;
}

const companySchema = new Schema<ICompany>(
  {
    companyName: { type: String, required: true, maxlength: 100 },
    username: { type: String, required: true, maxlength: 50, unique: true },
    location: {
      streetAddress: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
    },
    mobileNo: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    authorisedPersonName: { type: String },
    registrationDate: { type: Date, default: Date.now },
    industryType: { type: String },
    numberOfEmployees: { type: Number },
    websiteUrl: { type: String },
    profileImage: { type: String },
    description: { type: String, maxlength: 1000 },
    foundedYear: { type: Number },
    companySize: {
      type: String,
      enum: ["startup", "small", "medium", "large", "enterprise"],
    },
    socialMedia: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
    },
    benefits: [{ type: String }],
    openPositions: [
      {
        title: { type: String },
        department: { type: String },
        description: { type: String },
        requirements: [{ type: String }],
        isActive: { type: Boolean, default: true },
      },
    ],
    companyValues: [{ type: String }],
    awards: [
      {
        name: { type: String },
        year: { type: Number },
        description: { type: String },
      },
    ],
    events: [
      {
        name: { type: String },
        date: { type: Date },
        description: { type: String },
        registrationLink: { type: String },
      },
    ],
    preferredSkills: [{ type: String }],
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Company =
  mongoose.models.Company || mongoose.model<ICompany>("Company", companySchema);

export default Company;
