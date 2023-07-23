"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      Swal.fire("Good job!", "Login Successfully!", "success");
      router.push("/profile");
    } catch (error: any) {
      Swal.fire("Login failed", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };

  const ForgotPassword = async () => {
    try {
      const result = await Swal.fire({
        title: "Submit your Email",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
          try {
            const formdata = {
              email: login,
            };
            const response = await axios.post(
              "/api/users/forgotpassword",
              formdata
            );
            if (response.data.message === "Success") {
              console.log("res SuccessSuccess", response);
              Swal.fire(
                "success",
                "Please Check your mailbox for a new password",
                "success"
              );
              return response.data;
            } else {
              throw new Error("Error creating a new password for the user");
            }
          } catch (error) {
            throw new Error("Password reset request failed.");
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        Swal.fire(
          "success",
          "Please Check your mailbox for a new password",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("error", "Forgot Password Failed", "error");
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#31c14e] to-[#1a3e85]">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />

        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login here
        </button>
        <button
          onClick={ForgotPassword}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Forgot Password
        </button>
        <Link href="/signup">Visit Signup page</Link>
      </div>
    </div>
  );
}
