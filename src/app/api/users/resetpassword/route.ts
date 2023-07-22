import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("POST request", reqBody);
    const { password, token } = reqBody;

    console.log("POST request", JSON.stringify(reqBody));

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      userId: number;
    };
    console.log("decodedToken", decodedToken);

    const user = await User.findById(decodedToken.userId);
    console.log("user", user);

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
