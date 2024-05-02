import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Teacher from "@/models/teacherModel";
import { NextRequest, NextResponse } from "next/server";

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

    let userForm = await Teacher.findOne({ _id: userId });

    if (userForm) {
      userForm.firstName = formData.get("firstName") as string;
      userForm.lastName = formData.get("lastName") as string;
      userForm.email = formData.get("email") as string;
      userForm.mobileNo = formData.get("mobileNo") as string;
      userForm.dob = formData.get("dob") as string;
      userForm.subjectSpecialization = formData.get(
        "subjectSpecialization"
      ) as string;
      userForm.highestQualification = formData.get(
        "highestQualification"
      ) as string;
      userForm.university = formData.get("university") as string;
      userForm.workExperience = formData.get("workExperience") as string;
      userForm.profileImage = imgUrl;
    } else {
      userForm = new Teacher({
        _id: userId,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        mobileNo: formData.get("mobileNo"),
        dob: formData.get("dob"),
        subjectSpecialization: formData.get("subjectSpecialization"),
        highestQualification: formData.get("highestQualification"),
        university: formData.get("university"),
        workExperience: formData.get("workExperience"),
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
    const userForm = await Teacher.findOne({ _id: userId });
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
