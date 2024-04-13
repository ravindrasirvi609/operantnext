import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import jobModel from "@/models/jobModel";
import Organizer from "@/models/organizerModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest) {
  try {
    // Step 1: Ensure the user is authenticated
    const userId = await getDataFromToken(req);
    const user = await Organizer.findById(userId);

    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    // Step 2: Check if the user has the "employer" role
    if (user.role !== "organization") {
      return new NextResponse(
        "Unauthorized. User must have the 'organization' role.",
        { status: 401 }
      );
    }

    // Step 3: Retrieve job data from the request body
    const jobData = await req.json();

    // Step 4: Create a new job document in the database
    const job = await jobModel.create({ ...jobData, organization: userId });

    // Step 5: Return the created job as a JSON response
    return new NextResponse(JSON.stringify(job), {
      status: 201, // 201 Created
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ValidationError") {
      // Handle validation errors (e.g., required fields missing)
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      // Handle duplicate key error (e.g., unique constraint violation)
      return new NextResponse(
        JSON.stringify({ error: "Duplicate key error" }),
        {
          status: 409,
        }
      );
    } else {
      // Handle other errors
      return new NextResponse("Error creating the job", { status: 500 });
    }
  }
}
