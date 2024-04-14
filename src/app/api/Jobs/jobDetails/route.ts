import { connect } from "@/dbConfig/dbConfig";
import jobModel from "@/models/jobModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Connect to MongoDB
connect();

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body from the request
    const { id } = await req.json();

    // Validate the id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid Job ID format", { status: 400 });
    }

    // Find the job by ID
    const job = await jobModel.findById(id);

    // Check if job exists
    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    // Return the job as a JSON response
    return new NextResponse(JSON.stringify(job), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // Log and return error response
    console.error(error);
    return new NextResponse("Error retrieving the job", { status: 500 });
  }
}
