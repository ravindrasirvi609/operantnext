import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const eventData = await req.json();
    const eventId = eventData.id; // Assuming you're passing the event ID as a query parameter
    const deletedEvent = await eventModel.findByIdAndRemove(eventId);

    if (!deletedEvent) {
      return NextResponse.json("Event not found", { status: 500 });
    }

    return NextResponse.json("Event deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error saving event", { status: 500 });
  }
}
