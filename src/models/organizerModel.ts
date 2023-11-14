import mongoose from "mongoose";

const organizerSchema = new mongoose.Schema({
  collegeName: { type: String, maxlength: 100 },
  userName: { type: String, required: true },
  location: { type: String },
  mobileNumber: { type: Number, unique: true },
  email: { type: String, unique: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  authorisedPersonName: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

const Organizer =
  mongoose.models.Organizer || mongoose.model("Organizer", organizerSchema);

export default Organizer;
