import mongoose, { Document, Schema } from "mongoose";

interface ICollege extends Document {
  collegeName: string;
  university: string;
  location: {
    streetAddress: string;
    town: string;
    district: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  coursesOffered: {
    name: string;
    type: "undergraduate" | "postgraduate" | "diploma" | "certificate";
    duration: number;
  }[];
  studentsEnrolled: mongoose.Types.ObjectId[];
  facultyMembers: mongoose.Types.ObjectId[];
  mobileNo: string;
  email: string;
  authorisedPersonName: string;
  registrationDate: Date;
  establishedYear: number;
  collegeType: "public" | "private" | "autonomous";
  affiliatedTo: string;
  websiteUrl: string;
  profileImage: string;
  accreditations: {
    name: string;
    awardedBy: string;
    validUntil: Date;
  }[];
  rankings: {
    rankingBody: string;
    rank: number;
    year: number;
  }[];
  facilities: string[];
  researchCenters: {
    name: string;
    focusArea: string;
  }[];
  partnerships: {
    partnerName: string;
    partnerType: "academic" | "industry" | "research";
    description: string;
  }[];
  events: {
    name: string;
    date: Date;
    description: string;
  }[];
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  admissionProcess: string;
  placements: {
    year: number;
    averageSalary: number;
    topRecruiters: string[];
  }[];
}

const collegeSchema = new Schema<ICollege>(
  {
    collegeName: { type: String, required: true, maxlength: 100 },
    university: { type: String, required: true },
    location: {
      streetAddress: { type: String },
      town: { type: String },
      district: { type: String },
      state: { type: String },
      country: { type: String },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    coursesOffered: [
      {
        name: { type: String, required: true },
        type: {
          type: String,
          enum: ["undergraduate", "postgraduate", "diploma", "certificate"],
          required: true,
        },
        duration: { type: Number, required: true }, // in years
      },
    ],
    studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    facultyMembers: [{ type: Schema.Types.ObjectId, ref: "Teacher" }],
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
    establishedYear: { type: Number },
    collegeType: {
      type: String,
      enum: ["public", "private", "autonomous"],
      required: true,
    },
    affiliatedTo: { type: String },
    websiteUrl: { type: String },
    profileImage: { type: String },
    accreditations: [
      {
        name: { type: String, required: true },
        awardedBy: { type: String, required: true },
        validUntil: { type: Date },
      },
    ],
    rankings: [
      {
        rankingBody: { type: String, required: true },
        rank: { type: Number, required: true },
        year: { type: Number, required: true },
      },
    ],
    facilities: [{ type: String }],
    researchCenters: [
      {
        name: { type: String, required: true },
        focusArea: { type: String, required: true },
      },
    ],
    partnerships: [
      {
        partnerName: { type: String, required: true },
        partnerType: {
          type: String,
          enum: ["academic", "industry", "research"],
          required: true,
        },
        description: { type: String },
      },
    ],
    events: [
      {
        name: { type: String, required: true },
        date: { type: Date, required: true },
        description: { type: String },
      },
    ],
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
    admissionProcess: { type: String },
    placements: [
      {
        year: { type: Number },
        averageSalary: { type: Number },
        topRecruiters: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

const College =
  mongoose.models.College || mongoose.model<ICollege>("College", collegeSchema);

export default College;
