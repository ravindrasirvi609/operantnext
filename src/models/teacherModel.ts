import { profile } from "console";
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, maxlength: 50 },
  lastName: { type: String, maxlength: 50 },
  profileImage: { type: String },
  email: { type: String, unique: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  mobileNo: { type: String },
  dob: { type: Date },
  subjectSpecialization: { type: String },
  highestQualification: { type: String },
  university: { type: String },
  workExperience: { type: Number },
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  registrationDate: { type: Date, default: Date.now },
});

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
