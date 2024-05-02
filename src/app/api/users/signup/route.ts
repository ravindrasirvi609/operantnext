import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import College from "@/models/collegeModel";
import Company from "@/models/companyModel";
import Teacher from "@/models/teacherModel";

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

    if (role === "STUDENT") {
      await createStudentForm(savedUser._id, savedUser.email);
    } else if (role === "TEACHER") {
      await createTeacherForm(savedUser._id, savedUser.email);
    } else if (role === "COMPANY") {
      await createCompanyForm(savedUser._id, savedUser.email);
    } else if (role === "COLLEGE") {
      await createCollegeForm(savedUser._id, savedUser.email);
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

async function createStudentForm(userId: string, personalEmail: string) {
  const studentForm = new Student({
    _id: userId,
    personalEmail,
  });

  return await studentForm.save();
}

async function createCollegeForm(userId: string, email: string) {
  const ColleageForm = new College({
    _id: userId,
    email,
  });

  return await ColleageForm.save();
}

async function createCompanyForm(companyId: string, email: string) {
  const companyForm = new Company({
    _id: companyId,
    email,
  });

  return await companyForm.save();
}

async function createTeacherForm(teacherId: string, personalEmail: string) {
  const teacherForm = new Teacher({
    _id: teacherId,
    personalEmail,
  });

  return await teacherForm.save();
}

async function sendVerificationEmail(email: string, userId: string) {
  await sendEmail({ email, emailType: "VERIFY", userId });
}
