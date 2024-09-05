import mongoose, { Document, Schema } from "mongoose";

interface ITeacher extends Document {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string;
  mobileNo: string;
  dob: Date;
  subjectSpecialization: string[];
  highestQualification: string;
  university: string;
  workExperience: number;
  college: mongoose.Types.ObjectId;
  department: string;
  position: string;
  publications: {
    title: string;
    journal: string;
    year: number;
    link?: string;
  }[];
  researchInterests: string[];
  awards: {
    name: string;
    year: number;
    description: string;
  }[];
  courses: {
    name: string;
    code: string;
    description: string;
  }[];
  professionalMemberships: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
  };
  bio: string;
  registrationDate: Date;
  lastActive: Date;
}

const teacherSchema = new Schema<ITeacher>(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    profileImage: { type: String },
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
    mobileNo: { type: String },
    dob: { type: Date },
    subjectSpecialization: [{ type: String }],
    highestQualification: { type: String },
    university: { type: String },
    workExperience: { type: Number },
    college: { type: Schema.Types.ObjectId, ref: "College", required: true },
    department: { type: String },
    position: { type: String },
    publications: [
      {
        title: { type: String },
        journal: { type: String },
        year: { type: Number },
        link: { type: String },
      },
    ],
    researchInterests: [{ type: String }],
    awards: [
      {
        name: { type: String },
        year: { type: Number },
        description: { type: String },
      },
    ],
    courses: [
      {
        name: { type: String },
        code: { type: String },
        description: { type: String },
      },
    ],
    professionalMemberships: [{ type: String }],
    socialMedia: {
      linkedin: { type: String },
      twitter: { type: String },
      researchGate: { type: String },
    },
    bio: { type: String, maxlength: 1000 },
    registrationDate: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Teacher =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
