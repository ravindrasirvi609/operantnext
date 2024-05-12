import { connect } from "@/dbConfig/dbConfig";
import Teacher from "@/models/teacherModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    // Fetch all teachers from the database
    const teachers = await Teacher.find();

    // Return the list of teachers
    return NextResponse.json({
      message: "Teachers fetched successfully",
      success: true,
      data: teachers,
    });
  } catch (error) {
    console.error("Error in GET_ALL handler:", error);
    return new NextResponse("Error fetching teachers", { status: 500 });
  }
}
