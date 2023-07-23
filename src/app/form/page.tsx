"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AadhaarForm = () => {
  const formRef = useRef(null);

  const initialFormData = {
    name: "",
    dob: "",
    address: "",
    schoolName: "",
    collegeName: "",
    qualification: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/form", formData);
      Swal.fire("Good job!", "Form Successfully Submmited!", "success");
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
                className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
