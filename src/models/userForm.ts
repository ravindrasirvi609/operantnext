import mongoose from "mongoose";

const userFormSchema = new mongoose.Schema({
  profileImage: { type: String }, // You can store the image URL or file path
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  personalEmail: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  aadharNo: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
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
});

const UserForm = mongoose.models.usersform || mongoose.model("usersform", userFormSchema);

export default UserForm;
