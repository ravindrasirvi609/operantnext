import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: user._id,
          email: user.email,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            username: profile?.name?.replace(/\s+/g, "").toLowerCase(),
            email: user.email,
            isVerified: true,
            role: "STUDENT",
            provider: "google",
          });
          await newUser.save();
        }
      }
      return true;
    },
    async session({ session, user }: any) {
      if (session?.user) {
        const dbUser = await User.findOne({ email: user.email });
        console.log("dbUser", dbUser);

        session.user.role = dbUser?.role;
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }
  const currentUser = await User.findOne({ email: session.user.email });
  if (!currentUser) {
    return null;
  }
  return {
    id: currentUser._id,
    email: currentUser.email,
    name: currentUser.username,
    role: currentUser.role,
  };
}
