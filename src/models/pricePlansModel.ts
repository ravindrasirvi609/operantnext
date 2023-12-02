import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },


  isActive: {
    type: Boolean,
    default: true,
  },
  currency: {
    type: String, // e.g., 'USD', 'INR', etc.
    required: true,
  },

  // Add more fields as needed
});

const Plans = mongoose.models.Plans || mongoose.model("Plans", planSchema);

export default Plans;
