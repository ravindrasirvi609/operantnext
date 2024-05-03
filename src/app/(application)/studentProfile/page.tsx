"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";

const AadhaarForm = () => {
  const initialFormData: UserFormData = useMemo(
    () => ({
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
      profilePicture: null,
    }),
    []
  );

  const [userForm, setFormData] = useState<UserFormData>(initialFormData);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues: initialFormData });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/studentDetails");
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
  }, [initialFormData]);

  interface UserFormData {
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
    profilePicture: File | null;
    [key: string]: string | File | null; // Add index signature
  }

  useEffect(() => {
    Object.keys(userForm).forEach((key) => {
      return setValue(key, userForm[key as keyof UserFormData]); // Use keyof to access the correct type
    });
  }, [userForm, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({
        ...userForm,
        profilePicture: files[0],
      });
    }
  };
  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const Submit = async (data: UserFormData) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "profilePicture") {
          formData.append(key, (data as any)[key].toString());
        }
      });

      if (userForm.profilePicture) {
        formData.append("profilePicture", userForm.profilePicture);
      }

      await axios.post("/api/users/studentDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Success", "Form Successfully Submitted!", "success");
      // TODO: Implement the router.push statement
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                  pattern: /^\S+@\S+$/i,
                })}
                onChange={handleChange}
                name="personalEmail"
                className={`appearance-none block w-full bg-sky-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.personalEmail ? "border-red-500" : ""
                }`}
              />
              {errors.personalEmail && (
                <p className="text-xs text-red-500 mt-1">Invalid Email</p>
              )}
              <p className="text-xs text-gray-600 mt-1">
                * Active Email is required for Early Notification
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div
                className={`bg-blue-200 p-6 rounded-lg shadow-md w-full max-w-md ${
                  dragging
                    ? "border-dashed border-2 border-blue-500"
                    : "border-dashed border-2 border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="mb-4">
                  <label
                    htmlFor="file"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Profile Picture:
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div className="relative p-4 rounded-lg cursor-pointer">
                    <div className="text-center">
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-12 w-12 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-600 mt-2">
                          {file
                            ? (file as File).name
                            : "Drag and drop your file here"}
                        </p>
                        <Image
                          src={(userForm.profileImage as string) || ""}
                          alt="upload"
                          width={100}
                          height={100}
                          className="mt-2"
                        />
                      </>
                    </div>
                  </div>
                </div>
              </div>
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
