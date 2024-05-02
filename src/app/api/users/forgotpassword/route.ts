import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { error: "Please provide a valid email" },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "User with the provided email not found" },
        { status: 400 }
      );
    }

    await sendPasswordResetEmail(user);
    return NextResponse.json({
      message: "Password reset email sent successfully",
      sendEmail: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function findUserByEmail(email: string) {
  return await User.findOne({ email: email });
}

async function sendPasswordResetEmail(user: any) {
  await sendEmail({ email: user.email, emailType: "RESET", userId: user._id });
}
