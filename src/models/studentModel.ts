import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  profileImage: { type: String },
  firstName: { type: String },
  lastName: { type: String },
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
  secSclName: { type: String },
  secMarks: { type: Number },
  srSecSclName: { type: String },
  srSecMarks: { type: Number },
  ugColleageName: { type: String },
  ugCourseName: { type: String },
  ugMarks: { type: Number },
  pgColleageName: { type: String },
  pgCourseName: { type: String },
  pgMarks: { type: Number },
  highestQualification: { type: String },
  university: { type: String },
  workExperience: { type: Number },
  eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "eventModel" }],
});

const Student =
  mongoose.models.studentData || mongoose.model("studentData", studentSchema);

export default Student;
