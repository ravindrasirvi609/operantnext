import mongoose, { Document, Schema } from "mongoose";

interface IStudent extends Document {
  profileImage: string;
  firstName: string;
  lastName: string;
  userTagLine: string;
  personalEmail: string;
  mobileNo: string;
  aadharNo: string;
  dob: Date;
  streetAddress: string;
  town: string;
  district: string;
  state: string;
  country: string;
  education: {
    secondary: {
      schoolName: string;
      marks: number;
    };
    seniorSecondary: {
      schoolName: string;
      marks: number;
    };
    undergraduate: {
      collegeName: string;
      courseName: string;
      marks: number;
    };
    postgraduate?: {
      collegeName: string;
      courseName: string;
      marks: number;
    };
  };
  highestQualification: string;
  university: string;
  workExperience: number;
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: Date;
  }[];
  achievements: string[];
  extracurricularActivities: string[];
  eventsAttended: mongoose.Types.ObjectId[];
  privacySettings: {
    isProfilePublic: boolean;
    visibleSections: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    profileImage: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userTagLine: { type: String },
    personalEmail: { type: String, required: true, unique: true },
    mobileNo: { type: String },
    aadharNo: { type: String },
    dob: { type: Date },
    streetAddress: { type: String },
    town: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    education: {
      secondary: {
        schoolName: { type: String },
        marks: { type: Number },
      },
      seniorSecondary: {
        schoolName: { type: String },
        marks: { type: Number },
      },
      undergraduate: {
        collegeName: { type: String },
        courseName: { type: String },
        marks: { type: Number },
      },
      postgraduate: {
        collegeName: { type: String },
        courseName: { type: String },
        marks: { type: Number },
      },
    },
    highestQualification: { type: String },
    university: { type: String },
    workExperience: { type: Number },
    skills: [{ type: String }],
    projects: [
      {
        title: { type: String },
        description: { type: String },
        technologies: [{ type: String }],
        link: { type: String },
      },
    ],
    certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        date: { type: Date },
      },
    ],
    achievements: [{ type: String }],
    extracurricularActivities: [{ type: String }],
    eventsAttended: [{ type: Schema.Types.ObjectId, ref: "eventModel" }],
    privacySettings: {
      isProfilePublic: { type: Boolean, default: true },
      visibleSections: [{ type: String }],
    },
  },
  { timestamps: true }
);

const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);

export default Student;
