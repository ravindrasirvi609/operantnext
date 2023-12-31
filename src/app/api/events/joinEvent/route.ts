import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import User from "@/models/userModel";
import UserModel from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Step 1: Get the user's ID from the token
    const userId = await getDataFromToken(req);

    const userObject = await User.findById(userId);
    if (userObject.role === "organization") {
      return NextResponse.json(
        { message: "Organization cannot Join any Event" },
        { status: 404 }
      );
    }

    const eventData = await req.json();
    const eventId = eventData.id;

    // Step 2: Ensure the user is authenticated
    const event = await eventModel.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { event, message: "Event not found" },
        { status: 404 }
      );
    }

    // Check if the event is full (optional, depending on your requirements)
    if (event.capacity && event.attendees.length >= event.capacity) {
      return NextResponse.json(
        { event, message: "Event is full" },
        { status: 400 }
      );
    }

    // Check if the user is already registered for the event
    const isUserJoined = event.attendees.includes(userId);

    if (isUserJoined) {
      return NextResponse.json(
        {
          event,
          isJoin: true,
          message: "User is already registered for the event",
        },
        { status: 400 }
      );
    }
    // Register the user for the event
    event.attendees.push(userId);
    await event.save();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { event, isJoin: false, message: "User not found" },
        { status: 404 }
      );
    }

    //  user.eventsAttended.push(eventId);
    //   await user.save();
    return NextResponse.json(
      { event, isJoin: false, message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { event, isJoin: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
