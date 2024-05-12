import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    // Fetch all students from the database
    const students = await Student.find();

    // Return the list of students
    return NextResponse.json({
      message: "Students fetched successfully",
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error in GET_ALL handler:", error);
    return new NextResponse("Error fetching students", { status: 500 });
  }
}
