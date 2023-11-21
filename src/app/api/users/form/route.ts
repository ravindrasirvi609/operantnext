// Import required modules and setup database connection
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserForm from "@/models/userForm";
import uploadMiddleware from "@/multer.middleware";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
  const userAvatar = await uploadMiddleware(req); // Add middleware invocation

    const userId = await getDataFromToken(req);
    const data = await req.formData();

    const response = await req.json();
    console.log("OK", response);

    let userForm = await UserForm.findOne({ _id: userId });

    if (userForm) {
      userForm = await UserForm.findOneAndUpdate({ _id: userId }, response, {
        new: true,
      });
    } else {
      userForm = new UserForm({ _id: userId, ...response });
      await userForm.save();
    }

    // Step 5: Return the response
    return new NextResponse("User form saved successfully", userForm);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error saving user form", { status: 500 });
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
    console.log("userForm-", userForm);

    // Step 3: Return the response
    const resp = NextResponse.json({
      message: "data recieved successful",
      success: true,
      data: userForm,
    });
    console.log("response =", resp);

    return resp;
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetching user form", { status: 500 });
  }
}
