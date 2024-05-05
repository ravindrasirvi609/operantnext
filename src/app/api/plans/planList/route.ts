import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import plans from "@/models/pricePlansModel";

connect();

export async function GET(req: NextRequest) {
  try {
    // Step 1: Get the user's ID from the token
    const userId = await getDataFromToken(req);

    // Step 2: Ensure the user is authenticated
    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    // Step 3: Retrieve all plans from the database
    const allPlans = await plans.find();

    // Step 4: Return the plans as a JSON response
    return new NextResponse(JSON.stringify(allPlans), {
      status: 200, // 200 OK
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving the plans", { status: 500 });
  }
}
