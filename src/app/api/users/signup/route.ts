import UserForm from "@/models/userForm";
import Organizer from "@/models/organizerModel";
import User from "@/models/userModel";

import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

const SALT_ROUNDS = 10;

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Validate request data
    if (
      !reqBody.username ||
      !reqBody.email ||
      !reqBody.password ||
      !reqBody.role
    ) {
      return NextResponse.json(
        { error: "Incomplete request data" },
        { status: 400 }
      );
    }

    const { username, email, password, role } = reqBody;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const savedUser = await createUser(username, email, hashedPassword, role);

    if (role === "user") {
      await createUserForm(savedUser._id, savedUser.email);
    } else if (role === "organization") {
      await createOrganizer(savedUser._id, savedUser.emailcs);
    }

    await sendVerificationEmail(savedUser.email, savedUser._id);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function createUser(
  username: string,
  email: string,
  password: string,
  role: string
) {
  const newUser = new User({
    username,
    email,
    password,
    role,
  });

  return await newUser.save();
}

async function createUserForm(
  userId: string,
  personalEmail: string
) {
  const userForm = new UserForm({
    _id: userId,
    personalEmail,
  });

  return await userForm.save();
}

async function createOrganizer(
  userId: string,
  email: string,
) {
  const organizer = new Organizer({
    _id: userId,
    email,
  });

  return await organizer.save();
}

async function sendVerificationEmail(email: string, userId: string) {
  await sendEmail({ email, emailType: "VERIFY", userId });
}
