import { connect } from "@/dbConfig/dbConfig";
import SkillModel from "@/models/skillModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Name and level are required" });
    }

    const skill = await SkillModel.create({ name });
    return NextResponse.json(skill);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
