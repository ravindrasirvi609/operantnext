// Import required modules and setup database connection
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserForm from "@/models/userForm";
import uploadMiddleware from "@/multer.middleware";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const formData = await req.formData();

    console.log("POST request", userId, formData);
    

    let userForm = await UserForm.findOne({ _id: userId });

    if (userForm) {
      userForm.set(formData);
    } else {
      userForm = new UserForm({ _id: userId, ...formData });
    }

    await userForm.save();

    return new NextResponse("User form saved successfully", userForm);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse("Error processing the request", { status: 500 });
  }
}


// GET API to fetch user form data
export async function GET(req: NextRequest) {
  try {
    // Step 1: Obtain the logged-in user's ID from the token
    const userId = await getDataFromToken(req);

    // Step 2: Fetch the user form data from the database based on the user's ID
    const userForm = await UserForm.findOne({ _id: userId });

    // Step 3: Return the response
    const resp = NextResponse.json({
      message: "data received successfully",
      success: true,
      data: userForm,
    });

    return resp;
  } catch (error) {
    return new NextResponse("Error fetching user form", { status: 500 });
  }
}
