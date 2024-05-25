import mongoose from "mongoose";

const CourseContentSchema = new mongoose.Schema({
  chapter: { type: String, required: true },
  lectures: [
    {
      title: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  learnings: { type: [String], required: true },
  courseContent: { type: [CourseContentSchema], required: true },
  additionalInfo: { type: [String], required: true },
});

const Courses =
  mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Courses;
