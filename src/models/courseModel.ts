import mongoose from "mongoose";
import Student from "./studentModel";

const CourseContentSchema = new mongoose.Schema({
  chapter: { type: String, required: true },
  lectures: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: true },
  },
  { _id: false }
);

const LearningOutcomeSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const CompetencySchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  inLanguage: { type: String, required: true },
  isFree: { type: Boolean, default: false },
  courseLevel: { type: String, required: true },
  typicalLearningTime: { type: String, required: true },
  hasDeliveryMode: { type: Boolean, default: false },
  requiresSkill: { type: String, required: true },
  level: { type: String, required: true },
  language: { type: String, required: true },
  tags: { type: [String], default: [] },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  isCourseAlreadyAttempted: { type: Boolean, default: false },
  isCourseCompleted: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 5 },
  price: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
  learnings: { type: [String], default: [] },
  courseContent: { type: [CourseContentSchema], default: [] },
  additionalInfo: { type: [String], default: [] },
  reviewsCount: { type: Number, default: 0 },
  deliveryMode: {
    type: String,
    enum: ["Online", "Onsite", "Blended"],
    required: true,
  },
  contentMode: {
    type: [String],
    enum: ["text", "video", "interactive"],
    required: true,
  },
  learningOutcomes: { type: [LearningOutcomeSchema], default: [] },
  assessmentMethod: { type: String, required: true },
  financialAssistance: { type: String, default: "" },
  competencyRequired: { type: [CompetencySchema], default: [] },
  requirements: { type: String, required: true },
  educationalAlignment: { type: [String], default: [] },
  reviews: { type: [ReviewSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

courseSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Courses =
  mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;
