import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const company = await Company.find({});
    return NextResponse.json(company);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
