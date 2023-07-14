"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import router from "next/router";

const AadhaarForm = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    address: "",
    schoolName: "",
    collegeName: "",
    qualification: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      dob: "",
      address: "",
      schoolName: "",
      collegeName: "",
      qualification: "",
    });
  };

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/form", formData);
      console.log("form submitted successfully", response.data);
      toast.success("form submitted successfully");
      resetForm(); // Reset the form fields

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Perform form submission or data processing here
    console.log(formData);
    onLogin();
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 p-6 bg-orange-600 rounded-lg">
        <h1 className="text-2xl mb-4 justifly-center" >Operent Form</h1>
        <form id="onSubmit" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-lg">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
          </div>

          <label htmlFor="dob" className="block mb-2 text-lg">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            required
          />

          <label htmlFor="address" className="block mb-2 text-lg">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            required
          />

          <label htmlFor="schoolName" className="block mb-2 text-lg">
            School Name:
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            required
          />

          <label htmlFor="collegeName" className="block mb-2 text-lg">
            College Name:
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            required
          />

          <label htmlFor="qualification" className="block mb-2 text-lg">
            Qualification:
          </label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            required
          />

          <div className="text-center">
            <button
              type="submit"
              className= " mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AadhaarForm;
