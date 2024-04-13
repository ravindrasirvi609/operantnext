import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import Organizer from "@/models/organizerModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
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
            throw new Error(`Organizer not found for event ${event._id}`);
          }

          const organizerEmail = organizer.email;

          return {
            ...event.toObject(),
            isJoin: isUserJoined,
            organizerDetails: {
              email: organizerEmail,
            },
          };
        } catch (error: any) {
          console.error(
            `Error fetching organizer for event ${event._id}:`,
            error
          );
          // Return the event with an error field
          return {
            ...event.toObject(),
            isJoin: isUserJoined,
            error: `Error fetching organizer: ${error.message}`,
          };
        }
      })
    );

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
