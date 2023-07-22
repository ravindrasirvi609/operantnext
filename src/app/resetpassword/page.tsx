"use client";
import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const submit = async () => {
    if (password !== confirmPassword) {
      Swal.fire("Password and Confirm-Password Must Be Same!");
      return;
    }
    try {
      const requestData = {
        password: password,
        token: token,
      };
      const response = await axios.post(
        "/api/users/resetpassword",
        requestData
      );
      Swal.fire("Good job!", "Password Reset Successfully!", "success");
      router.push("/login");
    } catch (error) {
      Swal.fire("Password Reset Failed", "error", "error");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Your Password</h1>

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <label htmlFor="password">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
