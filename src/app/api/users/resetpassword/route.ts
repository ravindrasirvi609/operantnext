// Import necessary modules and models
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// Establish the database connection
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON payload
    const reqBody = await request.json();
    console.log("POST request", reqBody);
    const { password, token } = reqBody;

    // Verify the provided token
    console.log("Reset token", token);
    const decodedToken = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log("decodedToken", decodedToken);
    

    // Find the user in the database based on the userId from the token
    const user = await User.findById(decodedToken._id);
    console.log("user", user);

    if (!user) {
      // If the user is not found, return an error response
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Hash the new password and update the user's password in the database
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    // Return a success response
    const response = NextResponse.json({
      message: "Password reset Successfully",
      success: true,
  })

    return response;
  } catch (error: any) {
    // If an error occurs during the process, return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
