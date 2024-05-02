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

      // Use find() to get an array of users
      const users = await UserForm.find({ _id: { $in: attendeeIds } });

      const organiz = await Organizer.findById(event.organizer);

      if (!users || users.length === 0) {
        console.log(`Users not found for event ${event._id}`);
        return new NextResponse("Users not found", { status: 404 });
      }

      const price = plan.price; // Use the correct field from your schema
      const currency = plan.currency; // Use the correct field from your schema

      const attendees = users.map((user) => ({
        personalEmail: user.personalEmail,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      }));

      const responsePayload = {
        ...event.toObject(),
        plan: {
          price: price,
          currency: currency,
        },
        attendees: attendees,
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
