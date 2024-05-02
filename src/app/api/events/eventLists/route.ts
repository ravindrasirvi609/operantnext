import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import Organizer from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    const events = await eventModel.find();

    if (!events || events.length === 0) {
      return new NextResponse("No events found", { status: 404 });
    }

    const eventsWithJoinStatus = await Promise.all(
      events.map(async (event) => {
        const isUserJoined = event.attendees.includes(userId);

        try {
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
          return {
            ...event.toObject(),
            isJoin: isUserJoined,
            error: `Error fetching organizer: ${error.message}`,
          };
        }
      })
    );

    return new NextResponse(JSON.stringify(eventsWithJoinStatus), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving events", { status: 500 });
  }
}
