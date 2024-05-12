"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/teachers/teachersList");
        console.log("response", response.data.data);

        if (!response.data.success) {
          throw new Error("Failed to fetch data");
        }
        setStudents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onGetExportTeacher = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/teachers/teachersList");
      if (students && Array.isArray(students)) {
        const dataToExport = students.map((student: any) => ({
          Id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          personalEmail: student.personalEmail,
          aadharNo: student.aadharNo,
          dob: student.dob,
          highestQualification: student.highestQualification,
          mobileNo: student.mobileNo,
          profileImage: student.profileImage,
          university: student.university,
          country: student.country,
          district: student.district,
          state: student.state,
          streetAddress: student.streetAddress,
          town: student.town,
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };
  return (
    <main className="flex flex-col items-center gap-8 p-8 md:p-24 bg-[#111827] min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-center">
        All The Teachers Data{" "}
      </h1>
      <div className="overflow-x-auto w-full md:w-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                First Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Mobile No
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                University
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Aadhar No
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                DOB
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Highest Qualification
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Personal Email
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Address
              </th>

              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Profile Image
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: any) => (
              <tr
                className="border-b border-gray-200 dark:border-gray-700"
                key={student._id}
              >
                <th
                  scope="row"
                  className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4"
                >
                  {student.firstName}
                </th>
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.lastName}
                </td>
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.mobileNo}
                </td>
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.university}
                </td>
                {/* Add more cells for other properties */}
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.aadharNo}
                </td>
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.dob}
                </td>
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.highestQualification}
                </td>

                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.personalEmail}
                </td>
                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  {student.country} ,{student.district} ,{student.state} ,
                  {student.streetAddress} ,{student.town}
                </td>

                <td className="table-cell sm:px-4 sm:py-2 md:px-6 md:py-4">
                  <Image
                    src={student.profileImage}
                    alt="Profile"
                    height={100}
                    width={100}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => onGetExportTeacher("Students", "ProductExport")}
        className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600"
      >
        <span className="relative">{loading ? "Loading..." : "Export"}</span>
        <div className="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]">
          <div className="relative h-full w-8 bg-white/30"></div>
        </div>
      </button>
    </main>
  );
}
