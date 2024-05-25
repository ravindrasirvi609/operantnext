import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Courses from "@/models/courseModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    const course = await Courses.findById(courseId);

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(course), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Error fetching the course", { status: 500 });
  }
}
