import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserForm from "@/models/userForm";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  console.log("POST", req);
  
  try {
    const userId = await getDataFromToken(req);
    console.log("userId", userId);
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

    return new NextResponse('User saved successfully');
  } catch (error) {
    console.log(error);
    return new NextResponse('Error saving user', { status: 500 });
  }
}
