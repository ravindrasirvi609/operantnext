import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Courses from "@/models/courseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();

    // Handle file upload
    const file = formData.get("imageUrl") as File;
    if (!file) {
      return new NextResponse("No image file provided", { status: 400 });
    }
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    // Upload to Cloudinary
    const uploadResponse = await uploadToCloudinary(fileUri, file.name);
    if (!uploadResponse.success) {
      return new NextResponse("Error uploading to Cloudinary", { status: 500 });
    }

    // Get user ID from token
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    // Extract and parse other form fields
    const {
      title,
      description,
      teacher,
      rating,
      price,
      learnings,
      courseContent,
      additionalInfo,
    } = Object.fromEntries(formData.entries()) as Record<string, string>;

    const parsedLearnings = JSON.parse(learnings);
    const parsedCourseContent = JSON.parse(courseContent).map(
      (content: any) => ({
        chapter: content.chapter,
        lectures: content.lectures.map((lecture: any) => ({
          title: lecture.title,
          type: lecture.type,
        })),
      })
    );
    const parsedAdditionalInfo = JSON.parse(additionalInfo);

    // Create new course data
    const newCourse = new Courses({
      title,
      description,
      teacher,
      rating: parseFloat(rating),
      price: parseFloat(price),
      imageUrl: uploadResponse?.result?.secure_url,
      learnings: parsedLearnings,
      courseContent: parsedCourseContent,
      additionalInfo: parsedAdditionalInfo,
    });

    // Save course to database
    const course = await newCourse.save();

    return new NextResponse(JSON.stringify(course), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ValidationError") {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      return new NextResponse(
        JSON.stringify({ error: "Duplicate key error" }),
        {
          status: 409,
        }
      );
    } else {
      return new NextResponse("Error creating the course", { status: 500 });
    }
  }
}
