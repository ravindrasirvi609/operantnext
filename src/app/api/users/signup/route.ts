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

// Define allowed roles
type UserRole = "ADMIN" | "STUDENT" | "TEACHER" | "COMPANY" | "COLLEGE";

const isValidRole = (role: string): role is UserRole => {
  return ["ADMIN", "STUDENT", "TEACHER", "COMPANY", "COLLEGE"].includes(role);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password: string): boolean => {
  // Implement your password strength criteria here
  return password.length >= 8; // Example: at least 8 characters
};

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

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!isStrongPassword(password)) {
      return NextResponse.json(
        { error: "Password does not meet strength requirements" },
        { status: 400 }
      );
    }

    if (!isValidRole(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Validate role-specific fields
    if (!validateRoleSpecificFields(role, reqBody)) {
      return NextResponse.json(
        { error: "Missing or invalid role-specific fields" },
        { status: 400 }
      );
    }

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

    await createRoleSpecificForm(role, savedUser._id, savedUser.email, reqBody);

    await sendVerificationEmail(savedUser.email, savedUser._id);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "An error occurred during sign-up" },
      { status: 500 }
    );
  }
}

function validateRoleSpecificFields(role: UserRole, reqBody: any): boolean {
  switch (role) {
    case "STUDENT":
      return !!reqBody.firstName && !!reqBody.lastName && !!reqBody.mobileNo;
    case "COLLEGE":
      return !!reqBody.collegeName && !!reqBody.mobileNo;
    case "TEACHER":
      return (
        !!reqBody.firstName &&
        !!reqBody.lastName &&
        !!reqBody.mobileNo &&
        !!reqBody.collegeId
      );
    case "COMPANY":
      return !!reqBody.companyName && !!reqBody.mobileNo;
    default:
      return true; // For ADMIN, no additional fields are required
  }
}

async function createUser(
  username: string,
  email: string,
  password: string,
  role: UserRole
) {
  const newUser = new User({
    username,
    email,
    password,
    role,
    isAdmin: role === "ADMIN",
  });

  return await newUser.save();
}

async function createRoleSpecificForm(
  role: UserRole,
  userId: string,
  email: string,
  reqBody: any
) {
  switch (role) {
    case "STUDENT":
      return await createStudentForm(userId, email, reqBody);
    case "TEACHER":
      return await createTeacherForm(userId, email, reqBody);
    case "COMPANY":
      return await createCompanyForm(userId, email, reqBody);
    case "COLLEGE":
      return await createCollegeForm(userId, email, reqBody);
    default:
      // For ADMIN, no additional form is created
      return;
  }
}

async function createStudentForm(
  userId: string,
  personalEmail: string,
  reqBody: any
) {
  const studentForm = new Student({
    _id: userId,
    personalEmail,
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    mobileNo: reqBody.mobileNo,
  });
  return await studentForm.save();
}

async function createCollegeForm(userId: string, email: string, reqBody: any) {
  const collegeForm = new College({
    _id: userId,
    email,
    collegeName: reqBody.collegeName,
    mobileNo: reqBody.mobileNo,
  });
  return await collegeForm.save();
}

async function createCompanyForm(
  companyId: string,
  email: string,
  reqBody: any
) {
  const companyForm = new Company({
    _id: companyId,
    email,
    companyName: reqBody.companyName,
    mobileNo: reqBody.mobileNo,
  });
  return await companyForm.save();
}

async function createTeacherForm(
  teacherId: string,
  personalEmail: string,
  reqBody: any
) {
  const teacherForm = new Teacher({
    _id: teacherId,
    personalEmail,
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    mobileNo: reqBody.mobileNo,
    collegeId: reqBody.collegeId,
  });
  return await teacherForm.save();
}

async function sendVerificationEmail(email: string, userId: string) {
  await sendEmail({ email, emailType: "VERIFY", userId });
}
