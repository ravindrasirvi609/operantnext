"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface UserFormData {
  [key: string]: string;
  firstName: string;
  lastName: string;
  personalEmail: string;
  mobileNo: string;
  aadharNo: string;
  dob: string;
  streetAddress: string;
  town: string;
  district: string;
  state: string;
  country: string;
  highestQualification: string;
  university: string;
}

const AadhaarForm = () => {
  const router = useRouter();
  const initialFormData: UserFormData = {
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
    highestQualification: "",
    university: "",
  };

  const [userForm, setFormData] = useState<UserFormData>(initialFormData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({defaultValues: initialFormData});
  console.log(watch("firstName"));
  console.log(errors?.firstName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/form");
        const receivedFormData = response.data;
        if (receivedFormData && receivedFormData.data) {
          const parsedDate = new Date(receivedFormData.data.dob);
          const formattedDate = parsedDate.toISOString().split("T")[0];

          setFormData({
            ...initialFormData,
            ...receivedFormData.data,
            dob: formattedDate,
          });
        }
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Object.keys(userForm).forEach((key) => {
      setValue(key, userForm[key]);
    });
  }, [userForm, setValue]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Submit = async (data: any) => {
    try {
      await axios.post("/api/users/form", data);
      Swal.fire("Success", "Form Successfully Submitted!", "success");
      router.push("/profile");
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="bg-lime-100">
      <div className="max-w-7xl mx-auto py-16 sm:px-6 lg:px-32">
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold flex  justify-center leading-tight text-sky-900">
            Edit your account
          </h1>
        </div>
      </div>

      <div
        className="mx-auto justify-center w-3/6
"
      >
        <form id="onSubmit" onSubmit={handleSubmit(Submit)} className="w-full">
          <div className="flex justify-center flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="firstName"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                value={userForm.firstName}
                {...register("firstName", {
                  required: true,
                  maxLength: 80,
                  minLength: 3,
                })}
                onChange={handleChange}
                name="firstName"
                className={`appearance-none block w-full bg-sky-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors?.firstName ? "border-red-500" : ""
                }`}
              />

              {[
                errors?.firstName && errors?.firstName?.type === "required" && (
                  <p className="text-red-500">First Name is required</p>
                ),
                errors?.firstName &&
                  errors?.firstName?.type === "maxLength" && (
                    <p className="text-red-500">
                      First Name cannot exceed 80 characters
                    </p>
                  ),
                errors?.firstName &&
                  errors?.firstName?.type === "minLength" && (
                    <p className="text-red-500">
                      First Name must be at least 3 characters
                    </p>
                  ),
              ]}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="lastName"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                value={userForm.lastName}
                {...register("lastName", { required: true })}
                onChange={handleChange}
                name="lastName"
                className={`appearance-none block w-full bg-sky-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.lastName ? "border border-red-500 bg-red-400" : ""
                }`}
              />
            </div>
          </div>

          <div className="flex justify-center flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="personalEmail"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="text"
                id="personalEmail"
                value={userForm.personalEmail}
                {...register("personalEmail", {
                  required: true,
                  pattern: /^\S+@\S+$/i || "Invalid Email",
                })}
                onChange={handleChange}
                name="personalEmail"
                className={`appearance-none block w-full bg-sky-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.personalEmail ? "border-red-500" : ""
                }`}
              />

              <p className="text-xs text-gray-600 mt-1">
                * Active Email is required for Early Notification
              </p>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="mobileNo"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Mobile No.:
              </label>
              <input
                type="text"
                id="mobileNo"
                value={userForm.mobileNo}
                {...register("mobileNo", {
                  required: true,
                  pattern: /^[6-9]\d{9}$/ || "Invalid Mobile Number",
                })}
                onChange={handleChange}
                name="mobileNo"
                className="appearance-none block w-full bg-sky-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="flex justify-center flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="aadharNo"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Aadhar No.:
              </label>
              <input
                type="number"
                id="aadharNo"
                value={userForm.aadharNo}
                {...register("aadharNo", {
                  required: true,
                  pattern:
                    /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/ ||
                    "Invalid Aadhar Number",
                })}
                onChange={handleChange}
                name="aadharNo"
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
              <p className="text-xs text-gray-600 mt-1">
                * Aadhar is required for DigiLoker Certificate
              </p>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="dob"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                value={userForm.dob}
                {...register("dob", { required: true })}
                onChange={handleChange}
                name="dob"
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                htmlFor="streetAddress"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Street Address:
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={userForm.streetAddress}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                htmlFor="town"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Town:
              </label>
              <input
                type="text"
                id="town"
                name="town"
                value={userForm.town}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                htmlFor="district"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                District:
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={userForm.district}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
              <label
                htmlFor="state"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={userForm.state}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-4">
              <label
                htmlFor="country"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Country:
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={userForm.country}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>

          <div className="flex justify-center flex-wrap -mx-3 my-10">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="secSclName"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                HIGHEST QUALIFICATION:
              </label>
              <input
                type="text"
                id="highestQualification"
                value={userForm.highestQualification}
                {...register("highestQualification", { required: true })}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="secMarks"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                UNIVERSITY/INSTUTION:
              </label>
              <input
                type="text"
                id="university"
                value={userForm.university}
                {...register("university", { required: true })}
                onChange={handleChange}
                className="appearance-none block w-full bg-sky-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>

          {/* <div className="mb-4">
            <label htmlFor="secSclName" className="block mb-2 text-lg">
              10th School Name:
            </label>
            <input
              type="text"
              id="secSclName"
              name="secSclName"
              value={userForm.secSclName}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.secMarks}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.srSecSclName}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.srSecMarks}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.ugColleageName}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.ugCourseName}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.ugMarks}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.pgColleageName}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.pgCourseName}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              value={userForm.pgMarks}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div> */}

          <div className="text-center">
            <button
              type="submit"
              className=" bg-sky-300 hover:bg-black text-white font-bold py-1 px-4 rounded-full m-10 h-10 w-26"
            >
              <h1 className="text-xl">Submit</h1>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AadhaarForm;
