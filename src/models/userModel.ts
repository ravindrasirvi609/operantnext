import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [
      function (this: any) {
        return this?.provider !== "google";
      },
      "Please provide a password",
    ],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  role: {
    type: String,
    enum: ["STUDENT", "COLLEGE", "COMPANY", "TEACHER", "ADMIN"],
    required: true,
  },
  provider: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials",
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
