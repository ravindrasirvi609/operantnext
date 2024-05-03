"use client";
import React, { useState, useEffect, useMemo, use } from "react";
import { FieldValues, ResolverResult, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  dob: Date;
  subjectSpecialization: string;
  highestQualification: string;
  university: string;
  workExperience: number;
  college: string;
  registrationDate: Date;
  profileImage: File | null;
  [key: string]: string | File | number | Date | null; // Add index signature
}

const teacherSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().email("Invalid email format").trim(),
  college: z.string().trim().min(1, "College is required"),
  registrationDate: z.date().optional(),
  mobileNo: z
    .string()
    .optional()
    .refine(
      (value) => /^\d{10}$/.test(value ?? ""),
      "Invalid mobile number format"
    ),
  dob: z.date().optional(),
  subjectSpecialization: z.string().optional(),
  highestQualification: z.string().optional(),
  university: z.string().optional(),
  workExperience: z.number().optional(),
  profileImage: z.unknown().optional(),
});

const EditTeacherForm = () => {
  const initialTeacherData: Teacher = useMemo(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      college: "",
      registrationDate: new Date(),
      subjectSpecialization: "",
      mobileNo: "",
      dob: new Date(),
      highestQualification: "",
      university: "",
      workExperience: 0,
      profileImage: null,
    };
  }, []);
  const [teacherData, setTeacherData] = useState<Teacher>(initialTeacherData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: async (data): Promise<ResolverResult<FieldValues>> => {
      const result = teacherSchema.safeParse(data);
      if (result.success) {
        return result.data as unknown as ResolverResult<FieldValues>;
      } else {
        throw new Error(result.error.message);
      }
    },
  });

  useEffect(() => {
    setTeacherData(initialTeacherData);
  }, [initialTeacherData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/teacherDetails");
        const receivedFormData = response.data;
        if (receivedFormData && receivedFormData.data) {
          setTeacherData(receivedFormData.data);
        }
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = event.target;

    if (type === "file") {
      const files = (event.target as HTMLInputElement).files;

      if (files && files.length > 0) {
        setTeacherData({
          ...teacherData,
          profileImage: files[0],
        });
      }
    } else {
      setTeacherData({
        ...teacherData,
        [name]: event.target.value,
      });
    }
  };
  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  async function onSubmit(data: Teacher) {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response = await axios.put("/api/users/teacherDetails", formData);
      Swal.fire("Success", response.data.message, "success");
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Teacher</h2>
      <div className="mb-4">
        <label htmlFor="firstName" className="text-sm font-semibold mb-1">
          First Name:
        </label>
        <input
          {...register("firstName")}
          type="text"
          id="firstName"
          placeholder="Enter first name"
          value={teacherData.firstName || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.firstName && errors.firstName.message && (
          <p className="text-red-500 text-sm mt-1">here is Soeme Error</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          {...register("lastName")}
          type="text"
          id="lastName"
          placeholder="Enter last name"
          value={teacherData.lastName || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.lastName && <p className="error-message">here is error</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter email"
          value={teacherData.email || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && <p className="error-message">Invalid email format</p>}
      </div>

      <div className="form-group">
        <label htmlFor="mobileNo">Mobile No. (Optional):</label>
        <input
          {...register("mobileNo")}
          type="text"
          id="mobileNo"
          placeholder="Enter mobile number"
          value={teacherData.mobileNo || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.mobileNo && (
          <p className="error-message">Mobile number should be 10 digits</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth (Optional):</label>
        <input
          {...register("dob")}
          type="date"
          id="dob"
          placeholder="Select date of birth"
          value={teacherData.dob ? teacherData.dob.toString() : ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.dob && (
          <p className="error-message">Invalid date of birth format</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="subjectSpecialization">
          Subject Specialization (Optional):
        </label>
        <input
          {...register("subjectSpecialization")}
          type="text"
          id="subjectSpecialization"
          placeholder="Enter subject specialization"
          value={teacherData.subjectSpecialization || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.subjectSpecialization && (
          <p className="error-message">Subject specialization is required</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="highestQualification">
          Highest Qualification (Optional):
        </label>
        <input
          {...register("highestQualification")}
          type="text"
          id="highestQualification"
          placeholder="Enter highest qualification"
          value={teacherData.highestQualification || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.highestQualification && (
          <p className="error-message">Highest qualification is required</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="university">University (Optional):</label>
        <input
          {...register("university")}
          type="text"
          id="university"
          placeholder="Enter university"
          value={teacherData.university || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.university && (
          <p className="error-message">University is required</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="workExperience">Work Experience (Optional):</label>
        <input
          {...register("workExperience")}
          type="number"
          id="workExperience"
          placeholder="Enter work experience"
          value={teacherData.workExperience || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.workExperience && (
          <p className="error-message">
            Work experience should be a number in years
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="college">College:</label>
        <input
          {...register("college")}
          type="text"
          id="college"
          placeholder="Enter college"
          value={teacherData.college || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.college && <p className="error-message">College is required</p>}
      </div>

      <div className="form-group">
        <label htmlFor="registrationDate">Registration Date:</label>
        <input
          {...register("registrationDate")}
          type="date"
          id="registrationDate"
          placeholder="Select registration date"
          value={
            teacherData.registrationDate
              ? teacherData.registrationDate.toString()
              : ""
          }
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.registrationDate && (
          <p className="error-message">Invalid registration date format</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="profileImage">Profile Image</label>
        <input
          {...register("profileImage")}
          type="file"
          id="profileImage"
          placeholder="Enter profile image URL"
          onChange={handleChange}
        />
        {errors.profileImage && (
          <p className="error-message">
            Profile image should be a valid image file
          </p>
        )}
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditTeacherForm;
