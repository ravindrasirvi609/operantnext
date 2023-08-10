import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
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
    console.log("Password: " + user.isVerrified);

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerrified: user.isVerrified,
    };
    console.log("token: " + tokenData);

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
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
