import { connect } from "@/dbConfig/dbConfig";
import Organizer from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const organizers = await Organizer.find({});
    return NextResponse.json(organizers);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
