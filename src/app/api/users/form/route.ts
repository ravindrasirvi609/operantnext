// Import required modules and setup database connection
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserForm from "@/models/userForm";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

// POST API to save or update user form data
export async function POST(req: NextRequest) {
  try {
    // Step 1: Obtain the logged-in user's ID from the token
    const userId = await getDataFromToken(req);
    console.log("userId------", userId);

    // Step 2: Get form data from request body
    const response = await req.json();
    console.log("OK", response);

    // Step 3: Find the existing UserForm record for the logged-in user using the userId
    let userForm = await UserForm.findOne({ _id: userId });

    if (!userForm) {
      // Step 4: If no record exists, create a new UserForm instance with the associated userId
      userForm = new UserForm({
        _id: userId,
        ...response,
      });
    } else {
      // Step 5: If a record exists, update the fields with the new form data
      userForm.set(response);
    }

    // Step 6: Save the user form data to the database
    const savedUserForm = await userForm.save();
    console.log(savedUserForm);

    // Step 7: Return the response
    return new NextResponse('User form saved successfully', savedUserForm);
  } catch (error) {
    console.log(error);
    return new NextResponse('Error saving user form', { status: 500 });
  }
}

// GET API to fetch user form data
export async function GET(req: NextRequest) {
  try {
    // Step 1: Obtain the logged-in user's ID from the token
    const userId = await getDataFromToken(req);
    console.log("userId--", userId);

    // Step 2: Fetch the user form data from the database based on the user's ID
    const userForm = await UserForm.findOne({ _id: userId });
    console.log("userForm------***", userForm);
    
    // Step 3: Return the response
    return new NextResponse(userForm || {}, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Error fetching user form', { status: 500 });
  }
}
