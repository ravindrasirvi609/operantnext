import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "ADMIN" | "STUDENT" | "TEACHER" | "COMPANY" | "COLLEGE";
    };
  }

  interface User {
    role?: "ADMIN" | "STUDENT" | "TEACHER" | "COMPANY" | "COLLEGE";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "STUDENT" | "TEACHER" | "COMPANY" | "COLLEGE";
  }
}
