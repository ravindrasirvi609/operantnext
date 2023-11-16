import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function GET(req: NextRequest) {
  try {
    // Step 1: Get the user's ID from the token
    const userId = await getDataFromToken(req);

    // Step 2: Check authentication
    if (!userId) {
      // Handle the case where the user is not authenticated or the token is invalid
      return new NextResponse("Authentication required", { status: 401 });
    }

    // Step 3: Retrieve events from the database
    // You may want to add additional authorization and query conditions here.
    const events = await eventModel.find(/* add query conditions if needed */);

    if (!events || events.length === 0) {
      // Handle the case where no events were found
      return new NextResponse("No events found", { status: 404 });
    }

    // Step 4: Check if the user has already joined each event
    const eventsWithJoinStatus = events.map((event) => {
      const isUserJoined = event.attendees.includes(userId);
      return { ...event.toObject(), isJoin: isUserJoined };
    });

    // Step 5: Handle successful response
    return new NextResponse(JSON.stringify(eventsWithJoinStatus), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    // Step 6: Handle errors gracefully
    return new NextResponse("Error retrieving events", { status: 500 });
  }
}
