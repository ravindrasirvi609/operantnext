"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSighup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      console.log("response", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Failed to notify user about", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#31c14e] to-[#1a3e85]">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <h1>{loading ? "Loading..." : " Sign Up"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
        />
        <hr />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
        />
        <hr />
        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
        />
        <button
          onClick={onSighup}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "disabled" : "enabled"}
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </div>
  );
}
