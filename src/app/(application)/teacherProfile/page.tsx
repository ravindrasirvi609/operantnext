"use client";
import React, { useState, useEffect, useMemo, use } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo?: string;
  dob?: Date;
  subjectSpecialization: string;
  highestQualification?: string;
  university?: string;
  workExperience?: number;
  college: string;
  registrationDate: Date;
  profileImage?: string;
}

const EditTeacherForm = () => {
  const initialTeacherData = useMemo(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      college: "",
      registrationDate: new Date(),
      subjectSpecialization: "",
      mobileNo: undefined,
      dob: undefined,
      highestQualification: undefined,
      university: undefined,
      workExperience: undefined,
      profileImage: undefined,
    };
  }, []);

  const [teacherData, setTeacherData] = useState<Teacher>(initialTeacherData);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    college: Yup.string().required("College is required"),
    registrationDate: Yup.date().required("Registration date is required"),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number format")
      .notRequired(),
    dob: Yup.date().nullable(),
    subjectSpecialization: Yup.string().notRequired(),
    highestQualification: Yup.string().notRequired(),
    university: Yup.string().notRequired(),
    workExperience: Yup.number().notRequired(),
    profileImage: Yup.string().url("Invalid URL format").notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialTeacherData,
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
          const parsedDate = new Date(receivedFormData.data.dob);

          setTeacherData({
            ...initialTeacherData,
            ...receivedFormData.data,
          });
        }
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchData();
  }, [initialTeacherData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  async function onSubmit(data: Teacher) {
    try {
      const response = await axios.put("/api/users/teacherDetails", data);
      Swal.fire("Success", response.data.message, "success");
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Edit Teacher</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          {...register("firstName")}
          type="text"
          id="firstName"
          placeholder="Enter first name"
          value={teacherData.firstName || ""}
          onChange={handleChange}
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName.message}</p>
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
        />
        {errors.lastName && (
          <p className="error-message">{errors.lastName.message}</p>
        )}
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
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
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
        />
        {errors.mobileNo && (
          <p className="error-message">{errors.mobileNo.message}</p>
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
        />
        {errors.dob && <p className="error-message">{errors.dob.message}</p>}
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
        />
        {errors.subjectSpecialization && (
          <p className="error-message">
            {errors.subjectSpecialization.message}
          </p>
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
        />
        {errors.highestQualification && (
          <p className="error-message">{errors.highestQualification.message}</p>
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
        />
        {errors.university && (
          <p className="error-message">{errors.university.message}</p>
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
        />
        {errors.workExperience && (
          <p className="error-message">{errors.workExperience.message}</p>
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
        />
        {errors.college && (
          <p className="error-message">{errors.college.message}</p>
        )}
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
        />
        {errors.registrationDate && (
          <p className="error-message">{errors.registrationDate.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="profileImage">Profile Image (Optional):</label>
        <input
          {...register("profileImage")}
          type="text"
          id="profileImage"
          placeholder="Enter profile image URL"
          value={teacherData.profileImage || ""}
          onChange={handleChange}
        />
        {errors.profileImage && (
          <p className="error-message">{errors.profileImage.message}</p>
        )}
      </div>

      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditTeacherForm;
