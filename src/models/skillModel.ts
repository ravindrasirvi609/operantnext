import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SkillModel =
  mongoose.models.Skill || mongoose.model("Skill", SkillSchema);

export default SkillModel;
