import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserForm from "@/models/userForm";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  console.log("POST", req);

  try {
    // Step 1: Obtain the logged-in user's ID
  //  const _id = await getDataFromToken(req);
  //  console.log("userId------", _id);

    // Step 2: Get form data from request body
    const response = await req.json();
    console.log("OK", response);
    const {
      profileImage,
      firstName,
      lastName,
      personalEmail,
      mobileNo,
      aadharNo,
      dob,
      streetAddress,
      town,
      district,
      state,
      country,
      secSclName,
      secMarks,
      srSecSclName,
      srSecMarks,
      ugColleageName,
      ugCourseName,
      ugMarks,
      pgColleageName,
      pgCourseName,
      pgMarks,
    } = response;

    // Step 3: Create a new UserForm instance with associated userId
    const newUserForm = new UserForm({
   //   _id, // Associate the form data with the logged-in user's ID
      profileImage,
      firstName,
      lastName,
      personalEmail,
      mobileNo,
      aadharNo,
      dob,
      streetAddress,
      town,
      district,
      state,
      country,
      secSclName,
      secMarks,
      srSecSclName,
      srSecMarks,
      ugColleageName,
      ugCourseName,
      ugMarks,
      pgColleageName,
      pgCourseName,
      pgMarks,
    });

    // Step 4: Save the user form data to the database
    const savedUserForm = await newUserForm.save();
    console.log(savedUserForm);

    // Step 5: Return the response
    return new NextResponse('User form saved successfully', savedUserForm);
  } catch (error) {
    console.log(error);
    return new NextResponse('Error saving user form', { status: 500 });
  }
}
