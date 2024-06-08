import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Courses from "@/models/courseModel";
import UserForm from "@/models/studentModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }

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

    const ObjectId = require("mongoose").Types.ObjectId;

    // Ensure attendees is always an array
    const attendeesArray = course.attendees || [];
    const attendeeIds = attendeesArray.map((id: string) => new ObjectId(id));
    console.log("Attendee IDs:", attendeeIds);

    const users = await UserForm.find({ _id: { $in: attendeeIds } });

    const attendees = users.map((user) => ({
      personalEmail: user.personalEmail,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      isJoined: attendeesArray.includes(user._id.toString()),
    }));

    const courseData = {
      ...course.toObject(),
      totalChapters,
      totalLectures,
      attendees,
      isJoined: attendees.some(
        (attendee) => attendee._id.toString() === userId
      ),
    };

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
