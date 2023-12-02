import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import plans from "@/models/pricePlansModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest) {
  try {
    // Step 1: Get the user's ID from the token
    const userId = await getDataFromToken(req);

    // Step 2: Ensure the user is authenticated
    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    // Step 3: Retrieve event data from the request body
    const PlansDetails = await req.json();

    // Step 4: Create a new event document in the database
    const event = await plans.create({ ...PlansDetails });

    // Step 5: Return the created event as a JSON response
    return new NextResponse(JSON.stringify(event), {
      status: 201, // 201 Created
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating the Plans", { status: 500 });
  }
}
