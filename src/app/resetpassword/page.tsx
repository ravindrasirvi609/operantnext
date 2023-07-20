"use client";

import axios from "axios";
import Link from "next/link";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const [user, setUser] = React.useState({
    password: "",
    confirmPassword: "",
    token:token,
  });


  const submit = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", user);
      Swal.fire("Good job!", "Password Reset Successfully!", "success");
      router.push("/login");
    } catch (error: any) {
      Swal.fire("Password Reset Failed", error.message, "error");
    } finally {
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

//   useEffect(() => {
//     if (token.length > 0) {
//       verifyUserEmail();
//     }
//   }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Your Password</h1>

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <label htmlFor="password">Confirm password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Confirm Password"
      />
      <button
          onClick={submit}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
    </div>
    
  );
}
