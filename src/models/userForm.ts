import mongoose from "mongoose";

const userFormSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  address: String,
  schoolName: String,
  collegeName: String,
  qualification: String,
});

const UserForm = mongoose.models.usersform || mongoose.model("usersform", userFormSchema);

export default UserForm;
