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

    // Step 2: Retrieve events from the database
    if (!userId) {
      // Handle the case where the user is not authenticated or the token is invalid
      return new NextResponse("Authentication required", { status: 401 });
    }

    // You may want to add additional authorization logic here to ensure the user has the right to access this data.

    const events = await eventModel.find(/* add query conditions if needed */);
    console.log("Events found", events);
    

    // Step 3: Return the data as JSON
    return new NextResponse(JSON.stringify(events), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    // Step 4: Handle errors gracefully
    return new NextResponse("Error retrieving events", { status: 500 });
  }
}
