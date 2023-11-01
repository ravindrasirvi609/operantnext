import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const events = await eventModel.find();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving events", { status: 500 });
  }
}
