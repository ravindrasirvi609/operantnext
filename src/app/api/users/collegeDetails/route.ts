import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import College from "@/models/collegeModel";
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

    let collegeForm = await College.findOne({ _id: userId });

    if (collegeForm) {
      collegeForm.collegeName = formData.get("collegeName") as string;
      collegeForm.university = formData.get("university") as string;
      collegeForm.location = {
        streetAddress: formData.get("streetAddress") as string,
        town: formData.get("town") as string,
        district: formData.get("district") as string,
        state: formData.get("state") as string,
        country: formData.get("country") as string,
      };
      collegeForm.mobileNo = formData.get("mobileNo") as string;
      collegeForm.email = formData.get("email") as string;
      collegeForm.authorisedPersonName = formData.get(
        "authorisedPersonName"
      ) as string;
      collegeForm.establishedYear = formData.get("establishedYear") as string;
      collegeForm.collegeType = formData.get("collegeType") as string;
      collegeForm.affiliatedTo = formData.get("affiliatedTo") as string;
      collegeForm.websiteUrl = formData.get("websiteUrl") as string;
      collegeForm.profileImage = imgUrl;
    } else {
      collegeForm = new College({
        _id: userId,
        collegeName: formData.get("collegeName"),
        university: formData.get("university"),
        location: {
          streetAddress: formData.get("streetAddress"),
          town: formData.get("town"),
          district: formData.get("district"),
          state: formData.get("state"),
          country: formData.get("country"),
        },
        mobileNo: formData.get("mobileNo"),
        email: formData.get("email"),
        authorisedPersonName: formData.get("authorisedPersonName"),
        establishedYear: formData.get("establishedYear"),
        collegeType: formData.get("collegeType"),
        affiliatedTo: formData.get("affiliatedTo"),
        websiteUrl: formData.get("websiteUrl"),
        profileImage: imgUrl,
      });
    }
    const response = await collegeForm.save();
    return new NextResponse("College form saved successfully", response);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse("Error processing the request", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const collegeForm = await College.findOne({ _id: userId });
    const resp = NextResponse.json({
      message: "data received successfully",
      success: true,
      data: collegeForm,
    });

    return resp;
  } catch (error) {
    return new NextResponse("Error fetching college form", { status: 500 });
  }
}
