import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
import { connect } from "@/dbConfig/dbConfig";
import { authOptions } from "@/lib/auth";

connect();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { role } = await req.json();

  if (!role) {
    return NextResponse.json({ message: "Role is required" }, { status: 400 });
  }

  // Update the user's role in the database
  await User.findOneAndUpdate(
    { email: session.user.email },
    { role },
    { new: true }
  );

  return NextResponse.json(
    { message: "Role updated successfully" },
    { status: 200 }
  );
}
