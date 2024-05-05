import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  price: { type: Number },
  registrationUrl: { type: String },
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  image: { type: String },
  isJoined: { type: Boolean, default: false },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizer",
  },
  categories: [{ type: String }],
  capacity: { type: Number },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  planDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plans", // Reference to a Plan model for tracking plans
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const eventModel =
  mongoose.models.eventModel || mongoose.model("eventModel", eventSchema);

export default eventModel;
