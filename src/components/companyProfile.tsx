"use client";
import { useRouter } from "next/navigation";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface ICompany {
  companyName: string;
  location: {
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  mobileNo?: string;
  email: string;
  authorisedPersonName?: string;
  registrationDate: Date;
  industryType?: string;
  numberOfEmployees?: number;
  websiteUrl?: string;
  profileImage?: string;
}

export default function CompanyProfile() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState<ICompany | null>(null);
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

  const getCompanyDetails = async () => {
    try {
      const res = await axios.get("/api/users/companyDetails");
      setData(res.data.data.firstName);
      setCompanyData(res.data.data);
    } catch (error) {
      toast.error("Failed to get company details");
    }
  };

  const editProfileRouting = () => {
    router.push("/companyProfile");
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-32">
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold leading-tight text-sky-800">
            Company Profile
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-2/12 py-6 mx-3">
          <div className="bg-white shadow-2xl p-3 overflow-hidden sm:rounded-lg">
            <div className="w-1/2 mx-auto mb-4">
              <div className="bg-sky-200 rounded-full w-36 h-36 items-center ">
                {companyData?.profileImage ? (
                  <Image
                    className="rounded-full"
                    src={companyData?.profileImage}
                    alt=""
                    width={144}
                    height={144}
                  />
                ) : (
                  <Image
                    className="rounded-full"
                    src="/user.png"
                    alt=""
                    width={144}
                    height={144}
                  />
                )}
              </div>
            </div>
            <div className="text-center font-bold text-sky-900 mt-16">
              {" "}
              {companyData?.companyName}
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                className="bg-sky-200 text-black px-4 py-2 rounded-full"
                onClick={editProfileRouting}
              >
                Edit Profile
              </button>
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                className="bg-sky-200 text-black px-4 py-2 rounded-full"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="w-9/12 mx-12 py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Company Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="border-t border-sky-200">
              <dl>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Company Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {companyData?.companyName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {companyData?.email}
                  </dd>
                </div>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mobile Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {companyData?.mobileNo}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
