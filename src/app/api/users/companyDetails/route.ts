import Company from "@/models/companyModel";
import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("profileImage") as File;
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

    let companyForm = await Company.findOne({ _id: userId });

    if (companyForm) {
      companyForm.companyName = formData.get("companyName") as string;
      companyForm.location = {
        streetAddress: formData.get("streetAddress") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        country: formData.get("country") as string,
        postalCode: formData.get("postalCode") as string,
      };
      companyForm.mobileNo = formData.get("mobileNo") as string;
      companyForm.email = formData.get("email") as string;
      companyForm.authorisedPersonName = formData.get(
        "authorisedPersonName"
      ) as string;
      companyForm.industryType = formData.get("industryType") as string;
      companyForm.numberOfEmployees = formData.get(
        "numberOfEmployees"
      ) as string;
      companyForm.websiteUrl = formData.get("websiteUrl") as string;
      companyForm.profileImage = imgUrl;
    } else {
      companyForm = new Company({
        _id: userId,
        companyName: formData.get("companyName"),
        location: {
          streetAddress: formData.get("streetAddress"),
          city: formData.get("city"),
          state: formData.get("state"),
          country: formData.get("country"),
          postalCode: formData.get("postalCode"),
        },
        mobileNo: formData.get("mobileNo"),
        email: formData.get("email"),
        authorisedPersonName: formData.get("authorisedPersonName"),
        industryType: formData.get("industryType"),
        numberOfEmployees: formData.get("numberOfEmployees"),
        websiteUrl: formData.get("websiteUrl"),
        profileImage: imgUrl,
      });
    }
    const response = await companyForm.save();
    return new NextResponse("Company form saved successfully", response);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse("Error processing the request", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const companyForm = await Company.findOne({ _id: userId });
    const resp = NextResponse.json({
      message: "data received successfully",
      success: true,
      data: companyForm,
    });

    return resp;
  } catch (error) {
    return new NextResponse("Error fetching company form", { status: 500 });
  }
}
