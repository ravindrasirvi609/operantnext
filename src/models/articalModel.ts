import mongoose from "mongoose";

// Define the article schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  views: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
