import mongoose from "mongoose";

const organizerSchema = new mongoose.Schema({
  collegeName: { type: String, required: true, maxlength: 100 },
  location: { type: String, required: true },
  mobileNumber: { type: Number, required: true, unique: true },
  email: { type: String, unique: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  authorisedPersonName: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
});

const Organizer =
  mongoose.models.Organizer || mongoose.model("Organizer", organizerSchema);

export default Organizer;
