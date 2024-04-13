import { connect } from "@/dbConfig/dbConfig";
import jobModel from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const jobId = await req.json();

    const job = await jobModel.findById(jobId);

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(job), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Error retrieving the job", { status: 500 });
  }
}
