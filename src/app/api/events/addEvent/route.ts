import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const eventData = await req.json();
    console.log("eventData", eventData);

    let event = await eventModel.findOne({ _id: userId });

    event = event
      ? await eventModel.findOneAndUpdate({ _id: userId }, eventData, {
          new: true,
        })
      : new eventModel({ _id: userId, ...eventData });

    return new NextResponse("Event saved successfully", event);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error saving event", { status: 500 });
  }
}
