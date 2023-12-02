import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req); // Pass req as the second argument
    const eventData = await req.json();
    const eventId = eventData.id; // Assuming you're passing the event ID as a query parameter

    // TODO: This should probably be a function need to check if the event--------------------------
    // TODO: This should be SOFT DELETE----------------------------------------------------------------

    //  const deletedEvent = await eventModel.findByIdAndRemove(eventId);

    // if (!deletedEvent) {
    //   return NextResponse.json("Event not found", { status: 500 });
    // }

    return NextResponse.json("Event deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error saving event", { status: 500 });
  }
}
