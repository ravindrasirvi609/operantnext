import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function PUT(req: NextRequest) {
  try {
    const eventData = await req.json();
    const eventId = eventData.id;

    if (!eventId) {
      return NextResponse.json("Event ID is missing", { status: 400 });
    }

    // Assuming you have authentication and authorization logic
    const user = getDataFromToken(req);
    console.log("User: " + user);

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // Check if the event exists
    const existingEvent = await eventModel.findById(eventId);

    if (!existingEvent) {
      return NextResponse.json("Event not found", { status: 404 });
    }

    // Check if the user has permission to update the event (implement your own logic)
    if (user && existingEvent.organizer._id.equals(new Object(user))) {
      return NextResponse.json("Unauthorized to update this event", {
        status: 401,
      });
    }

    const updateFields = { ...eventData };
    delete updateFields.id;

    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      updateFields,
      {
        new: true,
      }
    );

    if (!updatedEvent) {
      return NextResponse.json("Error updating event", { status: 500 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error updating event", { status: 500 });
  }
}
