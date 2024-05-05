import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import eventModel from "@/models/eventModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    if (user.role !== "COMPANY" && user.role !== "COLLEGE") {
      return new NextResponse(
        "Unauthorized. User must have the 'organization' role.",
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("profilePicture") as File;
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, file.name);

    let message = "failure";
    let imgUrl = "";

    console.log("POST request", userId, formData);
    if (res.success && res.result) {
      imgUrl = res.result.secure_url;
      message = "success";
    }

    let eventForm = new eventModel({
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      isPaid: formData.get("isPaid"),
      categories: formData.get("categories"),
      planDetails: formData.get("planDetails"),
      image: formData.get("imgUrl"),
      organizer: userId,
    });

    const event = await eventForm.save();

    // const eventData = await req.json();
    // console.log("eventData", eventData);

    // const event = await eventModel.create({
    //   ...eventData.data,
    //   organizer: userId,
    // });
    return new NextResponse(JSON.stringify(event), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse("An error occurred while adding the event", {
      status: 500,
    });
  }
}
