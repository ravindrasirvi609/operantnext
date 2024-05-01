import { uploadToCloudinary } from "@/cloudinary/cloudinary";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Article from "@/models/articalModel";
import User from "@/models/userModel";
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
    console.log("Cloudinary response", res);

    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);

    let message = "failure";
    let imgUrl = "";

    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }
    if (res.success && res.result) {
      message = "success";
      imgUrl = res.result.secure_url;
    }
    const { title, slug, content, excerpt, tags, category, status } =
      Object.fromEntries(formData.entries());

    // if (user.role !== "author") {
    //   return new NextResponse(
    //     "Unauthorized. User must have the 'author' role.",
    //     { status: 401 }
    //   );
    // }

    const articleData = new Article({
      title,
      slug,
      content,
      excerpt,
      tags,
      category,
      status,
      author: userId,
      imageUrl: res.success ? res?.result?.secure_url : "",
    });

    // Step 4: Save the article to the database
    const article = await articleData.save();

    // Step 5: Return the created article as a JSON response
    return new NextResponse(JSON.stringify(article), {
      status: 201, // 201 Created
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ValidationError") {
      // Handle validation errors (e.g., required fields missing)
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      // Handle duplicate key error (e.g., unique constraint violation)
      return new NextResponse(
        JSON.stringify({ error: "Duplicate key error" }),
        {
          status: 409,
        }
      );
    } else {
      // Handle other errors
      return new NextResponse("Error creating the article", { status: 500 });
    }
  }
}
