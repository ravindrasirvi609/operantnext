import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import plans from "@/models/pricePlansModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    console.log(userId);
    
    if (!userId) {
      return new NextResponse("Authentication required", { status: 401 });
    }
    const planData = await req.json();
    console.log("plan data is json" , planData);
    
    const planId = planData.planId;
    const planDetails = await plans.findById(planId);
    console.log("plan details are" , planDetails);

    if (planDetails) {
      return NextResponse.json(planDetails, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Error retrieving Plan details", { status: 500 });
  }
}
