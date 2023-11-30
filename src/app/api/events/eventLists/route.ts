import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import Organizer from "@/models/organizerModel";
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
    const events = await eventModel.find(/* add query conditions if needed */);

    if (!events || events.length === 0) {
      // Handle the case where no events were found
      return new NextResponse("No events found", { status: 404 });
    }

    // Step 4: Check if the user has already joined each event
    const eventsWithJoinStatus = await Promise.all(
      events.map(async (event) => {
        const isUserJoined = event.attendees.includes(userId);

        try {
          // Fetch organizer details
          const organizer = await Organizer.findById(event.organizer);

          if (!organizer) {
            console.log(`Organizer not found for event ${event._id}`);
            return null; // or handle the case where organizer is not found
          }

          const organizerName = organizer.userName; // Use the correct field from your schema
          const organizerEmail = organizer.email;

          console.log("Organizer name", organizerName);

          return {
            ...event.toObject(),
            isJoin: isUserJoined,
            organizerDetails: {
              name: organizerName,
              email: organizerEmail,
            },
          };
        } catch (error) {
          console.error(`Error fetching organizer for event ${event._id}:`, error);
          return null; // or handle the error case
        }
      })
    );

    // Filter out null values (events without organizers)
    const validEvents = eventsWithJoinStatus.filter((event) => event !== null);

    // Step 5: Handle successful response
    return new NextResponse(JSON.stringify(validEvents), {
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
