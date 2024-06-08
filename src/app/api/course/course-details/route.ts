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

    // Calculate total chapters
    const totalChapters = course.courseContent.length;

    // Calculate total lectures
    const totalLectures = course.courseContent.reduce(
      (total: any, chapter: { lectures: string | any[] }) =>
        total + chapter.lectures.length,
      0
    );

    // Add totalChapters and totalLectures to the response object
    const courseData = {
      ...course.toObject(),
      totalChapters,
      totalLectures,
    };

    console.log(courseData);

    return new NextResponse(JSON.stringify(courseData), {
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
