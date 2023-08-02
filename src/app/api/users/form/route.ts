import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserForm from "@/models/userForm";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  console.log("POST", req);
  
  try {
    const userId = await getDataFromToken(req);
    console.log("userId------", userId);
    const response = await req.json();
    console.log("OK", response);
    const {
      name,
      dob,
      address,
      schoolName,
      collegeName,
      qualification,
    } = response;
    
    const newUser = new UserForm({
      
      name,
      dob,
      address,
      schoolName,
      collegeName,
      qualification,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return new NextResponse('User saved successfully', savedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse('Error saving user', { status: 500 });
  }


  
}
export async function GET(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Fetch user based on email or any other identifier
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user ID
    return NextResponse.json({ userId: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}