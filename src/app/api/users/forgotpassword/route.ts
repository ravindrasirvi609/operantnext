import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("POST request body", reqBody);

    const { email } = reqBody;

    const user = await User.findOne({ email: email });
    console.log("user", user);

    if (!user) {
      return NextResponse.json({ error: "Enter Valid Email" }, { status: 400 });
    }
    console.log(user);

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    await user.save();

    return NextResponse.json({
      message: "Success",
      sendEmail: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
