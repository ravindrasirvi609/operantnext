import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import Organizer from "@/models/collegeModel";
import Plans from "@/models/pricePlansModel";
import UserForm from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    const eventData = await req.json();
    console.log("Event data:", eventData);

    const eventId = eventData.id;
    const event = await eventModel.findById(eventId);

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    try {
      // Fetch plan details
      const plan = await Plans.findById(event.planDetails);

      if (!plan) {
        console.log(`Plan not found for event ${event._id}`);
        return new NextResponse("Plan not found", { status: 404 });
      }

      const ObjectId = require("mongoose").Types.ObjectId;

      const attendeeIds = event.attendees.map((id: string) => new ObjectId(id));
      console.log("Attendee IDs:", attendeeIds);

      const users = await UserForm.find({ _id: { $in: attendeeIds } });
      console.log("Users:", users);

      const organiz = await Organizer.findById(event.organizer);

      const price = plan.price;
      const currency = plan.currency;

      const attendees = users.map((user) => ({
        personalEmail: user.personalEmail,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        isJoined: users.some((u) => u._id.toString() === user._id.toString()),
      }));

      const responsePayload = {
        ...event.toObject(),
        plan: {
          price: price,
          currency: currency,
        },
        attendees: attendees,
        isJoined: attendees.some(
          (attendee) => attendee._id.toString() === userId
        ),
        organizerDetails: {
          name: organiz.userName,
          email: organiz.email,
        },
      };

      return new NextResponse(JSON.stringify(responsePayload));
    } catch (error) {
      console.error(`Error fetching plan for event ${event._id}:`, error);
      return new NextResponse("Error fetching plan details", { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving event details", { status: 500 });
  }
}
