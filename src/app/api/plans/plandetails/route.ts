import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import plan from "@/models/pricePlansModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }
    const planData = await req.json();
    const planId = planData.id;
    const planDetails = await plan.findById(planId);

    if (!planDetails) {
      return NextResponse.json(planDetails, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving Plan details", { status: 500 });
  }
}
