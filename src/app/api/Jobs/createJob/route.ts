import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import jobModel from "@/models/jobModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);
    console.log("user", user);

    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    if (user.role !== "COMPANY" && user.role !== "COLLEGE") {
      return new NextResponse(
        "Unauthorized. User must have the 'organization' role.",
        { status: 401 }
      );
    }

    const jobData = await req.json();
    const job = await jobModel.create({ ...jobData, organization: userId });

    return new NextResponse(JSON.stringify(job), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    if (error.name === "ValidationError") {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      return new NextResponse(
        JSON.stringify({ error: "Duplicate key error" }),
        {
          status: 409,
        }
      );
    } else {
      return new NextResponse("Error creating the job", { status: 500 });
    }
  }
}
