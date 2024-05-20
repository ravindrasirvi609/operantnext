import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, maxlength: 100 },
  username: { type: String, maxlength: 50 },
  location: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  mobileNo: { type: String },
  email: { type: String, unique: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  authorisedPersonName: { type: String },
  registrationDate: { type: Date, default: Date.now },
  industryType: { type: String },
  numberOfEmployees: { type: Number },
  websiteUrl: { type: String },
  profileImage: { type: String },
});

const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;
