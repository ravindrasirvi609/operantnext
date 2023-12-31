"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HeaderNav from "./header";

interface UserData {
  username: string;
  email: string;
}
const initialUserData: UserData | null = null;

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [role, setRole] = useState<string | null>();
  const isOrganization = role === "organization";

  let myobj = {
    role: role,
    isOrganization: isOrganization,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: UserData = response.data.data;
        const role = localStorage.getItem("role");
        // Set the user data and role to the state
        setUserData(userData);
        setRole(role);
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <HeaderNav />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {userData && (
          <div className="mt-44">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome, {userData.username}!
            </h2>
          </div>
        )}

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Greetings, Future Leaders!.{" "}
              <a href="/events" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Visit here <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Wellcome to the operant pharmacy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your path to wellness starts here - Operant Pharmacy, where
              quality care meets convenience for a healthier tomorrow.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/form"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="http://www.opf.org.in"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
