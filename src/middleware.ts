import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define public paths that don't require authentication
const publicPaths = ["/login", "/signup", "/verifyemail", "/admin/login"];

// Define admin paths that require admin authentication
const adminPaths = ["/admin", "/admin/dashboard"];

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

  // Redirect logic for other public paths
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

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
