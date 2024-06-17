import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Courses from "@/models/courseModel";
import User from "@/models/userModel";
import UserModel from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const userId = await getDataFromToken(req);

    const userObject = await User.findById(userId);
    if (userObject.role === "organization") {
      return NextResponse.json(
        { message: "Organization cannot Join any Course" },
        { status: 404 }
      );
    }

    const courseObject = await req.json();

    const courseId = courseObject.courseId;

    const course = await Courses.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { course, message: "Course not found" },
        { status: 404 }
      );
    }

    if (course.capacity && course.attendees.length >= course.capacity) {
      return NextResponse.json(
        { course, message: "Course is full" },
        { status: 400 }
      );
    }

    const isUserJoined = course.attendees.includes(userId);

    if (isUserJoined) {
      return NextResponse.json(
        {
          course,
          message: "User is already registered for the event",
        },
        { status: 400 }
      );
    }
    course.attendees.push(userId);
    await course.save();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { course, isJoin: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { course, isJoin: false, message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Courses, isJoin: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
