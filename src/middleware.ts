import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define public paths that don't require authentication
const publicPaths = ["/login", "/signup", "/verifyemail", "/admin/login"];

// Define admin paths that require admin authentication
const adminPaths = ["/admin", "/admin/dashboard"];

// Define role-based paths
const studentPaths = ["/student", "/student/dashboard"];
const collegePaths = ["/college", "/college/dashboard"];
const teacherPaths = ["/teacher", "/teacher/dashboard"];
const companyPaths = ["/company", "/company/dashboard"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublicPath = publicPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  // Check if the path is an admin path
  const isAdminPath = adminPaths.some((adminPath) =>
    path.startsWith(adminPath)
  );

  // Check if the path is a role-specific path
  const isStudentPath = studentPaths.some((studentPath) =>
    path.startsWith(studentPath)
  );
  const isCollegePath = collegePaths.some((collegePath) =>
    path.startsWith(collegePath)
  );
  const isTeacherPath = teacherPaths.some((teacherPath) =>
    path.startsWith(teacherPath)
  );
  const isCompanyPath = companyPaths.some((companyPath) =>
    path.startsWith(companyPath)
  );

  // Get the NextAuth session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Token:", token);

  // For /admin/login, only redirect if the user is already authenticated and is an admin
  if (path === "/admin/login") {
    if (token && token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Redirect logic for public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect logic for protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logic for admin paths
  if (isAdminPath && (!token || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirect logic for student paths
  if (isStudentPath && (!token || token.role !== "STUDENT")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logic for college paths
  if (isCollegePath && (!token || token.role !== "COLLEGE")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logic for teacher paths
  if (isTeacherPath && (!token || token.role !== "TEACHER")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logic for company paths
  if (isCompanyPath && (!token || token.role !== "COMPANY")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
