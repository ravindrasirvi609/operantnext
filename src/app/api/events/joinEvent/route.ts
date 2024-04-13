import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import User from "@/models/userModel";
import UserModel from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
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

    const event = await eventModel.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { event, message: "Event not found" },
        { status: 404 }
      );
    }

    if (event.capacity && event.attendees.length >= event.capacity) {
      return NextResponse.json(
        { event, message: "Event is full" },
        { status: 400 }
      );
    }

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
    event.attendees.push(userId);
    await event.save();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { event, isJoin: false, message: "User not found" },
        { status: 404 }
      );
    }

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
