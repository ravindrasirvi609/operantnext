"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AadhaarForm = () => {
  const formRef = useRef(null);

  const initialFormData = {
    profileImage: null,
    firstName: "", // Set the default value to null
    lastName: "", // Set the default value to null
    personalEmail: "",
    mobileNo: "",
    aadharNo: "",
    dob: "", // Set dob format as "15/04/2018"
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
  
        // Check if received data is valid
        if (receivedFormData && receivedFormData.data) {
          // Set the form data with the received data
          setFormData({
            ...initialFormData,
            ...receivedFormData.data,
          });
  
          // If firstName and lastName fields exist, you can log them if needed
          console.log("FirstName: " + receivedFormData.data.firstName);
          console.log("LastName: " + receivedFormData.data.lastName);
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
      await axios.post("/api/users/form", formData);
      Swal.fire("Good job!", "Form Successfully Submitted!", "success");
      setFormData(initialFormData);
    } catch (error) {
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  return (
    <div className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#31c14e] to-[#1a3e85]">
      <div className="flex justify-center">
        <div className="w-1/2 p-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg">
          <h1 className="text-2xl text-justify justify-center text-cyan-950 font-bold mb-4 flex justifly-center">
            Operent Form
          </h1>
          <form id="onSubmit" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="profileImage" className="block mb-2 text-lg">
                Profile Image:
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="personalEmail" className="block mb-2 text-lg">
                Email:
              </label>
              {/* <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                value={userData?.email || ""} // Set the value to userData.email if it exists, otherwise use an empty string
                readOnly // Add readOnly attribute to make it read-only
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              /> */}
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
