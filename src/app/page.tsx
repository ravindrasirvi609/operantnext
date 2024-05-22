"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderNav from "./header";
import Image from "next/image";

export interface UserData {
  username: string;
  email: string;
}

const initialUserData: UserData | null = null;

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [role, setRole] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const isOrganization = role === "organization";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: UserData = response.data.data;
        const role = localStorage.getItem("role");
        const todayDate = new Date();
        const newformattedDate = todayDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setFormattedDate(newformattedDate);
        setUserData(userData);
        setRole(role);
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-24 top-0 left-0 right-0 flex justify-center items-center sticky">
        <HeaderNav />
      </div>
    </>
  );
}
