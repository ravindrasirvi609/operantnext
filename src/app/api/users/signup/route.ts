// Import your additional models
import UserForm from "@/models/userForm";
import Organizer from "@/models/organizerModel";
import User from "@/models/userModel";

import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();

// ... (other imports and setup code)

export async function POST(request: NextRequest) {
  try {    
    const reqBody = await request.json();
    const { username, email, password, role } = reqBody;

    // Check if the user already exists
    console.log("email", email);
    
    const existingUser = await User.findOne({ email });

    console.log("existingUser", existingUser);
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the user in the "users" collection
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    console.log("newUser", newUser);

    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);

    // Conditionally create records in other models based on the user's role
    if (role === "user") {
      const userForm = new UserForm({
        _id: savedUser._id,
        personalEmail: savedUser.email,
        userName: savedUser.username,
        // Other userForm fields
      });
      console.log("userForm", userForm);

      await userForm.save();
    } else if (role === "organization") {
      const organizer = new Organizer({
        _id: savedUser._id,
        email: savedUser.email,
        userName: savedUser.username,
        // Other organizer fields
      });
      console.log("organizer", organizer);

      await organizer.save();
    }

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
