import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, role } = reqBody;
    const user = await User.findOne({ email });
    console.log("user", user);

    if (!user) {
      return NextResponse.json(
        { error: "User Not Registered" },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Please Enter Valid Password" },
        { status: 400 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "User is not verified yet" },
        { status: 400 }
      );
    }

    // Check user role
    if (user.role !== role) {
      return NextResponse.json(
        { error: "Invalid Role for this User" },
        { status: 403 } // 403 Forbidden status code
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role, // Include user role in the token data
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully completed",
      success: true,
      data: tokenData,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
