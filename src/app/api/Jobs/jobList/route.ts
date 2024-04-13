import { connect } from "@/dbConfig/dbConfig";
import jobModel from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function GET(req: NextRequest) {
  try {
    // Step 1: Retrieve all jobs from the database
    const jobs = await jobModel.find();

    // Step 2: Return the jobs as a JSON response
    return new NextResponse(JSON.stringify(jobs), {
      status: 200, // 200 OK
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);

    // Handle errors
    return new NextResponse("Error retrieving the jobs", { status: 500 });
  }
}
