"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  personalEmail: string;
  mobileNo: string;
  streetAddress: string;
  town: string;
  district: string;
  state: string;
  country: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/form");
      setData(res.data.data.firstName);
      setUserData(res.data.data);
    } catch (error) {
      toast.error("Failed to get user details");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <hr className="w-1/4 mb-6 border-t-2 border-gray-300" />
      <div className="bg-black rounded-lg p-6 shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {userData ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {data === "nothing" ? (
                "Nothing"
              ) : (
                <a className="text-blue-500 hover:underline">
                  <Link href={`/profile/${data}`}>{data}</Link>
                </a>
              )}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">First Name:</span>{" "}
              {userData.firstName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Last Name:</span>{" "}
              {userData.lastName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {userData.personalEmail}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Mobile No:</span>{" "}
              {userData.mobileNo}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span>{" "}
              {userData.streetAddress}, {userData.town}, {userData.district},{" "}
              {userData.state}, {userData.country}
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <hr className="w-1/4 mt-6 border-t-2 border-gray-300" />
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
      >
        Logout
      </button>
    </div>
  );
}
