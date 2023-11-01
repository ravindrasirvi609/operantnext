import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const eventData = await req.json();
    const eventId = eventData.id;
    const event = await eventModel.findById(eventId);

    if (!event) {
      return NextResponse.json(event, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving event details", { status: 500 });
  }
}
