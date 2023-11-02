import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true, unique: true },
  isPaid: { type: Boolean, required: true },
  price: { type: Number },
  registrationUrl: { type: String, required: true },
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  image: { type: String }, // You can store the URL or path to the event image
   organizer: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Organizer", // Reference to an Organizer model
   },
  categories: [{ type: String }], // An array of event categories or tags
  capacity: { type: Number }, // If you want to limit the number of attendees
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to a User model for tracking attendees
    },
  ],
});

const eventModel =
  mongoose.models.eventModel || mongoose.model("eventModel", eventSchema);

export default eventModel;
