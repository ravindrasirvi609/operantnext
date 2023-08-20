"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AadhaarForm = () => {
  const router = useRouter();
  const initialFormData = {
    profileImage: null,
    firstName: "",
    lastName: "",
    personalEmail: "",
    mobileNo: "",
    aadharNo: "",
    dob: "",
    streetAddress: "",
    town: "",
    district: "",
    state: "",
    country: "",
    secSclName: "",
    secMarks: "",
    srSecSclName: "",
    srSecMarks: "",
    ugColleageName: "",
    ugCourseName: "",
    ugMarks: "",
    pgColleageName: "",
    pgCourseName: "",
    pgMarks: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e: any) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/form");
        const receivedFormData = response.data;
        console.log("received", receivedFormData);

        if (receivedFormData && receivedFormData.data) {
          const parsedDate = new Date(receivedFormData.data.dob);

          const formattedDate =
            parsedDate.getDate() +
            "/" +
            (parsedDate.getMonth() + 1) +
            "/" +
            parsedDate.getFullYear();
          console.log("formattedDate", formattedDate);

          setFormData({
            ...initialFormData,
            ...receivedFormData.data,
            dob: formattedDate,
          });
        }
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      //  formDataWithImage.append("profileImage1", selectedImage);

      // for (const key in formData) {
      //   formDataWithImage.append(key, formData[key]);
      // }

      await axios.post("/api/users/form", formData);
      Swal.fire("Good job!", "Form Successfully Submitted!", "success");
      router.push("/rozorpay");

      setFormData(initialFormData);
    } catch (error) {
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  return (
    <div className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-blue-200 to-blue-300">
      <div className="flex justify-center">
        <div className=" p-6 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg">
          <h1 className="text-3xl text-center text-blue-900 font-bold mb-8">
            Registration Form
          </h1>
          <form id="onSubmit" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="profileImage"
                className="block mb-2 text-lg text-blue-900"
              >
                Profile Image:
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-2 text-lg">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2 text-lg">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="personalEmail" className="block mb-2 text-lg">
                Email:
              </label>
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                value={formData.personalEmail}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                * Active Email is required for Early Notification
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="mobileNo" className="block mb-2 text-lg">
                Mobile No.:
              </label>
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                value={formData.mobileNo}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="aadharNo" className="block mb-2 text-lg">
                Aadhar No.:
              </label>
              <input
                type="number"
                id="aadharNo"
                name="aadharNo"
                value={formData.aadharNo}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-xs text-gray-600 mt-1">
                * Aadhar is required for DigiLoker Certificate
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="dob" className="block mb-2 text-lg">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="streetAddress" className="block mb-2 text-lg">
                Street Address:
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="town" className="block mb-2 text-lg">
                Town:
              </label>
              <input
                type="text"
                id="town"
                name="town"
                value={formData.town}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="district" className="block mb-2 text-lg">
                District:
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block mb-2 text-lg">
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block mb-2 text-lg">
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="secSclName" className="block mb-2 text-lg">
                10th School Name:
              </label>
              <input
                type="text"
                id="secSclName"
                name="secSclName"
                value={formData.secSclName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="secMarks" className="block mb-2 text-lg">
                10th Percentage:
              </label>
              <input
                type="number"
                id="secMarks"
                name="secMarks"
                value={formData.secMarks}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="srSecSclName" className="block mb-2 text-lg">
                12th School Name:
              </label>
              <input
                type="text"
                id="srSecSclName"
                name="srSecSclName"
                value={formData.srSecSclName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="srSecMarks" className="block mb-2 text-lg">
                12th Percentage:
              </label>
              <input
                type="number"
                id="srSecMarks"
                name="srSecMarks"
                value={formData.srSecMarks}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ugColleageName" className="block mb-2 text-lg">
                College Name (UG):
              </label>
              <input
                type="text"
                id="ugColleageName"
                name="ugColleageName"
                value={formData.ugColleageName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ugCourseName" className="block mb-2 text-lg">
                Course Name (UG):
              </label>
              <input
                type="text"
                id="ugCourseName"
                name="ugCourseName"
                value={formData.ugCourseName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ugMarks" className="block mb-2 text-lg">
                CGPA (UG):
              </label>
              <input
                type="number"
                id="ugMarks"
                name="ugMarks"
                value={formData.ugMarks}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pgColleageName" className="block mb-2 text-lg">
                College Name (PG):
              </label>
              <input
                type="text"
                id="pgColleageName"
                name="pgColleageName"
                value={formData.pgColleageName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pgCourseName" className="block mb-2 text-lg">
                Course Name (PG):
              </label>
              <input
                type="text"
                id="pgCourseName"
                name="pgCourseName"
                value={formData.pgCourseName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="pgMarks" className="block mb-2 text-lg">
                CGPA (PG):
              </label>
              <input
                type="number"
                id="pgMarks"
                name="pgMarks"
                value={formData.pgMarks}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AadhaarForm;
