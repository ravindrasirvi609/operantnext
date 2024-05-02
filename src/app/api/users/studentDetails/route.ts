import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("profilePicture") as File;
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, file.name);
    const userId = await getDataFromToken(req);

    let message = "failure";
    let imgUrl = "";

    console.log("POST request", userId, formData);
    if (res.success && res.result) {
      imgUrl = res.result.secure_url;
      message = "success";
    }

    let userForm = await Student.findOne({ _id: userId });

    if (userForm) {
      userForm.firstName = formData.get("firstName") as string;
      userForm.lastName = formData.get("lastName") as string;
      userForm.personalEmail = formData.get("personalEmail") as string;
      userForm.mobileNo = formData.get("mobileNo") as string;
      userForm.aadharNo = formData.get("aadharNo") as string;
      userForm.dob = formData.get("dob") as string;
      userForm.streetAddress = formData.get("streetAddress") as string;
      userForm.town = formData.get("town") as string;
      userForm.district = formData.get("district") as string;
      userForm.state = formData.get("state") as string;
      userForm.country = formData.get("country") as string;
      userForm.highestQualification = formData.get(
        "highestQualification"
      ) as string;
      userForm.university = formData.get("university") as string;
      userForm.profileImage = imgUrl;
    } else {
      userForm = new Student({
        _id: userId,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        personalEmail: formData.get("personalEmail"),
        mobileNo: formData.get("mobileNo"),
        aadharNo: formData.get("aadharNo"),
        dob: formData.get("dob"),
        streetAddress: formData.get("streetAddress"),
        town: formData.get("town"),
        district: formData.get("district"),
        state: formData.get("state"),
        country: formData.get("country"),
        highestQualification: formData.get("highestQualification"),
        university: formData.get("university"),
        profileImage: imgUrl,
      });
    }
    const response = await userForm.save();
    return new NextResponse("User form saved successfully", response);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse("Error processing the request", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const userForm = await Student.findOne({ _id: userId });
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
