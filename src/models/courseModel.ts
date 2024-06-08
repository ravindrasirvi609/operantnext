import mongoose from "mongoose";
import Student from "./studentModel";

// Schema for course content
const CourseContentSchema = new mongoose.Schema({
  chapter: { type: String },
  lectures: [
    {
      title: { type: String },
      type: { type: String },
    },
  ],
});

// Schema for reviews
const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    review: { type: String },
  },
  { _id: false }
);

// Schema for learning outcomes
const LearningOutcomeSchema = new mongoose.Schema(
  {
    skill: { type: String },
    description: { type: String },
  },
  { _id: false }
);

// Schema for competencies
const CompetencySchema = new mongoose.Schema(
  {
    skill: { type: String },
    description: { type: String },
  },
  { _id: false }
);

// Main course schema
const courseSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  teacher: {
    type: String,
    default: "Teacher Name",
  },
  category: { type: String },
  duration: { type: String },
  language: { type: String },
  isFree: { type: Boolean, default: false },
  level: { type: String },
  typicalLearningTime: { type: String },
  hasDeliveryMode: { type: Boolean, default: false },
  requiresSkill: { type: String },
  tags: { type: [String], default: [] },
  capacity: { type: Number, default: 100 },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  rating: { type: Number, min: 0, max: 5 },
  price: { type: Number, default: 0 },
  imageUrl: { type: String },
  learnings: { type: [String], default: [] },
  courseContent: { type: [CourseContentSchema], default: [] },
  additionalInfo: { type: [String], default: [] },
  reviewsCount: { type: Number, default: 0 },
  deliveryMode: {
    type: String,
    enum: ["Online", "Onsite", "Blended"],
  },
  contentMode: {
    type: [String],
    enum: ["text", "video", "interactive"],
  },
  learningOutcomes: { type: [LearningOutcomeSchema], default: [] },
  assessmentMethod: { type: String },
  financialAssistance: { type: String, default: "" },
  competencyRequired: { type: [CompetencySchema], default: [] },
  requirements: { type: String },
  educationalAlignment: { type: [String], default: [] },
  reviews: { type: [ReviewSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Model creation
const Courses =
  mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;
