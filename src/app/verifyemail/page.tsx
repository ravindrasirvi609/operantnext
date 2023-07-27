"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-4xl text-center text-white font-bold mb-6">
          Verify Email
        </h1>
        <h2 className="p-2 bg-orange-500 text-black text-lg text-center font-semibold mb-4">
          {token ? `${token}` : "No token"}
        </h2>

        {verified ? (
          <div className="text-center">
            <h2 className="text-2xl text-green-500 font-bold mb-4">
              Email Verified
            </h2>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl bg-red-500 text-white font-bold py-2 px-4 rounded-md mb-4">
              Error
            </h2>
            <p className="text-white font-semibold mb-4">
              There was an error verifying your email. Please try again.
            </p>
            {
              <Link
                href="/"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300"
              >
                Go Back Home
              </Link>
            }
          </div>
        )}
      </div>
    </div>
  );
}
