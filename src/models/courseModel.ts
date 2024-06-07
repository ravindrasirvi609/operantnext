import mongoose from "mongoose";
import Student from "./studentModel";

// Schema for course content
const CourseContentSchema = new mongoose.Schema({
  chapter: { type: String, required: true },
  lectures: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

// Schema for reviews
const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    review: { type: String, required: true },
  },
  { _id: false }
);

// Schema for learning outcomes
const LearningOutcomeSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Schema for competencies
const CompetencySchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Main course schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  language: { type: String, required: true },
  isFree: { type: Boolean, default: false },
  level: { type: String, required: true },
  typicalLearningTime: { type: String, required: true },
  hasDeliveryMode: { type: Boolean, default: false },
  requiresSkill: { type: String, required: true },
  tags: { type: [String], default: [] },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
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

// Model creation
const Courses =
  mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;
