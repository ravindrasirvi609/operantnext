import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function PUT(req: NextRequest) {
    try {  
      const eventData = await req.json();
      const eventId = eventData.id; // Assuming you're passing the event ID as part of the request body
      const updateFields = { ...eventData };
      delete updateFields.id; // Remove the ID from the update data to avoid modifying it
  
      const updatedEvent = await eventModel.findByIdAndUpdate(eventId, updateFields, {
        new: true, // To return the updated event
      });
  
      if (!updatedEvent) {
        return NextResponse.json("Event not found", { status: 404 });
      }
  
      return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Error updating event", { status: 500 });
    }
  }
  