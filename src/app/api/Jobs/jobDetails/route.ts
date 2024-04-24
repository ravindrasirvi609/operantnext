import { connect } from "@/dbConfig/dbConfig";
import jobModel from "@/models/jobModel";
import Organizer from "@/models/organizerModel";
import SkillModel from "@/models/skillModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid Job ID format", { status: 400 });
    }

    const job = await jobModel.findById(id); // Populate company data
    console.log("job", job);

    // Check if job exists and company data is populated
    const company = await Organizer.findById(job?.company);
    if (!job) {
      return new NextResponse("Job not found or company data missing", {
        status: 404,
      });
    }

    const skills = await SkillModel.find({ _id: { $in: job?.skills } });
    console.log("skills", skills);

    if (!skills) {
      return new NextResponse("Error retrieving skills", { status: 500 });
    }

    const companyName = company.userName || "Company Name unavailable";
    const skillNames = skills.map(
      (skill) => skill.name || "Skill name unavailable"
    );

    job.company = companyName;
    job.skills = skillNames;

    const newJob = {
      ...job,
      company: companyName,
      skills: skillNames,
    };

    return new NextResponse(JSON.stringify(newJob), {
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
