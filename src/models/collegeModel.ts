import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  collegeName: { type: String, required: true, unique: true, maxlength: 100 },
  university: { type: String },
  location: {
    streetAddress: { type: String },
    town: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
  },
  coursesOffered: [{ type: String }],
  studentsEnrolled: [
    { type: mongoose.Schema.Types.ObjectId, ref: "studentData" },
  ],
  mobileNo: { type: String },
  email: { type: String, unique: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  authorisedPersonName: { type: String },
  registrationDate: { type: Date, default: Date.now },
  establishedYear: { type: Number },
  collegeType: { type: String },
  affiliatedTo: { type: String },
  websiteUrl: { type: String },
});

const College =
  mongoose.models.College || mongoose.model("College", collegeSchema);

export default College;
