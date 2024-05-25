import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Courses from "@/models/courseModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("courseImage") as File;
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, file.name);
    console.log("Cloudinary response", res);

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    const {
      title,
      description,
      teacher,
      rating,
      price,
      learnings,
      courseContent,
      additionalInfo,
    } = Object.fromEntries(formData.entries());

    const courseData = new Courses({
      title,
      description,
      teacher,
      rating,
      price,
      imageUrl: res.success ? res?.result?.secure_url : "",
      learnings,
      courseContent,
      additionalInfo,
    });

    const course = await courseData.save();

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
