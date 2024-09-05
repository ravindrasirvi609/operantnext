import mongoose, { Document, Schema } from "mongoose";

interface ISkill extends Document {
  name: string;
  category: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  relatedSkills: mongoose.Types.ObjectId[];
  popularityScore: number;
  industryDemand: number;
  resources: {
    title: string;
    url: string;
    type: "article" | "video" | "course" | "book";
  }[];
  createdBy: mongoose.Types.ObjectId;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["technical", "soft", "language", "industry-specific", "other"],
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "beginner",
    },
    relatedSkills: [
      {
        type: Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    popularityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    industryDemand: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    resources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["article", "video", "course", "book"],
          required: true,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster searches
SkillSchema.index({ name: 1, category: 1 });

// Virtual for the skill's full representation
SkillSchema.virtual("fullRepresentation").get(function (this: ISkill) {
  return `${this.name} (${this.category}) - ${this.level}`;
});

// Static method to find skills by category
SkillSchema.statics.findByCategory = function (category: string) {
  return this.find({ category });
};

// Instance method to update popularity score
SkillSchema.methods.updatePopularityScore = function (
  this: ISkill,
  newScore: number
) {
  this.popularityScore = newScore;
  return this.save();
};

const SkillModel =
  mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default SkillModel;
