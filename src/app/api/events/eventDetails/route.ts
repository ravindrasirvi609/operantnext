import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import Plans from "@/models/pricePlansModel";
import UserForm from "@/models/userForm";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    const eventData = await req.json();
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

      // Use find() to get an array of users
      const users = await UserForm.find({ _id: { $in: attendeeIds } });

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
      };

      return new NextResponse((JSON.stringify(responsePayload))) ;
    } catch (error) {
      console.error(`Error fetching plan for event ${event._id}:`, error);
      return new NextResponse("Error fetching plan details", { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving event details", { status: 500 });
  }
}
