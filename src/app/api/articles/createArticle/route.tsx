import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Article from "@/models/articalModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Initialize the database connection
connect();

export async function POST(req: NextRequest) {
  try {
    // Step 1: Ensure the user is authenticated
    const userId = await getDataFromToken(req);
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    // Step 2: Check if the user has the "author" role
    if (user.role !== "author") {
      return new NextResponse(
        "Unauthorized. User must have the 'author' role.",
        { status: 401 }
      );
    }

    // Step 3: Retrieve article data from the request body
    const articleData = await req.json();

    // Step 4: Create a new article document in the database
    const article = await Article.create({ ...articleData, author: userId });

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
