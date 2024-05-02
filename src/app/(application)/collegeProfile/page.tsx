"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface College {
  collegeName: string;
  university?: string;
  location: {
    streetAddress?: string;
    town?: string;
    district?: string;
    state?: string;
    country?: string;
  };
  coursesOffered: string[];
  studentsEnrolled: string[];
  mobileNo?: string;
  email: string;
  authorisedPersonName?: string;
  registrationDate: Date;
  establishedYear?: number;
  collegeType?: string;
  affiliatedTo?: string;
  websiteUrl?: string;
  profileImage?: string;
}

interface EditCollegeFormProps {
  initialCollegeData?: College;
  onSubmit: (data: College) => void;
}

const EditCollegeForm: React.FC<EditCollegeFormProps> = ({
  initialCollegeData = {} as College,
  onSubmit,
}) => {
  const [collegeData, setCollegeData] = useState<College>(initialCollegeData);

  const validationSchema = Yup.object().shape({
    collegeName: Yup.string().required("College name is required"),
    location: Yup.object().shape({
      streetAddress: Yup.string(),
      town: Yup.string(),
      district: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
    }),
    coursesOffered: Yup.array().of(Yup.string()),
    studentsEnrolled: Yup.array().of(Yup.string()),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    registrationDate: Yup.date().required("Registration date is required"),
    establishedYear: Yup.number().positive(
      "Established year must be a positive number"
    ),
    collegeType: Yup.string(),
    university: Yup.string(),
    affiliatedTo: Yup.string(),
    websiteUrl: Yup.string().url("Invalid URL format"),
    profileImage: Yup.string().url("Invalid URL format"),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number format")
      .notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialCollegeData,
  });

  useEffect(() => {
    setCollegeData(initialCollegeData);
  }, [initialCollegeData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCollegeData({
      ...collegeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Edit College</h2>
      <div className="form-group">
        <label htmlFor="collegeName">College Name:</label>
        <input
          {...register("collegeName")}
          type="text"
          id="collegeName"
          placeholder="Enter college name"
          value={collegeData.collegeName || ""}
          onChange={handleChange}
        />
        {errors.collegeName && (
          <p className="error-message">{errors.collegeName.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="university">University (Optional):</label>
        <input
          {...register("university")}
          type="text"
          id="university"
          placeholder="Enter university"
          value={collegeData.university || ""}
          onChange={handleChange}
        />
        {errors.university && (
          <p className="error-message">{errors.university.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="location.streetAddress">
          Street Address (Optional):
        </label>
        <input
          {...register("location.streetAddress")}
          type="text"
          id="location.streetAddress"
          placeholder="Enter street address"
          value={collegeData.location.streetAddress || ""}
          onChange={handleChange}
        />
        {errors.location?.streetAddress && (
          <p className="error-message">
            {errors.location.streetAddress.message}
          </p>
        )}
      </div>

      {/* Add other fields based on the College interface */}
      {/* Remember to adjust validation and error messages accordingly */}

      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditCollegeForm;
