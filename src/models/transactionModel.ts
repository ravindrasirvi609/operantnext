import mongoose from "mongoose";

// Define the RazorpayTransaction schema
const RazorpayTransactionSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  signature: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming you have a User model
});

// Define the RazorpayTransaction model
const RazorpayTransaction =
  mongoose.models.RazorpayTransaction ||
  mongoose.model("RazorpayTransaction", RazorpayTransactionSchema);

export default RazorpayTransaction;
