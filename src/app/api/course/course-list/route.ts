import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Courses from "@/models/courseModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const courses = await Courses.find({});

    return new NextResponse(JSON.stringify(courses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Error fetching the courses", { status: 500 });
  }
}
