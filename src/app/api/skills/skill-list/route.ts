import { connect } from "@/dbConfig/dbConfig";
import SkillModel from "@/models/skillModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const skills = await SkillModel.find({});
    return NextResponse.json(skills);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
