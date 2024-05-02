"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

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

const EditCollegeForm = () => {
  const initialCollegeData = useMemo(() => {
    return {
      collegeName: "",
      university: "",
      location: {
        streetAddress: "",
        town: "",
        district: "",
        state: "",
        country: "",
      },
      coursesOffered: [],
      studentsEnrolled: [],
      mobileNo: undefined,
      email: "",
      authorisedPersonName: "",
      registrationDate: new Date(),
      establishedYear: undefined,
      collegeType: "",
      affiliatedTo: "",
      websiteUrl: "",
      profileImage: "",
    };
  }, []);

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
    affiliatedTo: Yup.string(),
    websiteUrl: Yup.string().url("Invalid URL format"),
    profileImage: Yup.string().url("Invalid URL format"),
    mobileNo: Yup.string()
      .matches(/^\d{10}$/, "Invalid mobile number format")
      .notRequired(),

    university: Yup.string().notRequired(),
    authorisedPersonName: Yup.string().notRequired(),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/collegeDetails");
        const receivedFormData = response.data;
        if (receivedFormData && receivedFormData.data) {
          const parsedDate = new Date(receivedFormData.data.dob);

          setCollegeData({
            ...initialCollegeData,
            ...receivedFormData.data,
          });
        }
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchData();
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

  async function onSubmit(data: College) {
    try {
      const response = await axios.put("/api/users/collegeDetails", data);
      Swal.fire("Success", response.data.message, "success");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-40">
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

        <div className="form-group">
          <label htmlFor="location.town">Town (Optional):</label>
          <input
            {...register("location.town")}
            type="text"
            id="location.town"
            placeholder="Enter town"
            value={collegeData.location.town || ""}
            onChange={handleChange}
          />
          {errors.location?.town && (
            <p className="error-message">{errors.location.town.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location.district">District (Optional):</label>
          <input
            {...register("location.district")}
            type="text"
            id="location.district"
            placeholder="Enter district"
            value={collegeData.location.district || ""}
            onChange={handleChange}
          />
          {errors.location?.district && (
            <p className="error-message">{errors.location.district.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location.state">State (Optional):</label>
          <input
            {...register("location.state")}
            type="text"
            id="location.state"
            placeholder="Enter state"
            value={collegeData.location.state || ""}
            onChange={handleChange}
          />
          {errors.location?.state && (
            <p className="error-message">{errors.location.state.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="location.country">Country (Optional):</label>
          <input
            {...register("location.country")}
            type="text"
            id="location.country"
            placeholder="Enter country"
            value={collegeData.location.country || ""}
            onChange={handleChange}
          />
          {errors.location?.country && (
            <p className="error-message">{errors.location.country.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="coursesOffered">Courses Offered:</label>
          <input
            {...register("coursesOffered")}
            type="text"
            id="coursesOffered"
            placeholder="Enter courses offered"
            value={collegeData.coursesOffered || ""}
            onChange={handleChange}
          />
          {errors.coursesOffered && (
            <p className="error-message">{errors.coursesOffered.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="studentsEnrolled">Students Enrolled:</label>
          <input
            {...register("studentsEnrolled")}
            type="text"
            id="studentsEnrolled"
            placeholder="Enter students enrolled"
            value={collegeData.studentsEnrolled || ""}
            onChange={handleChange}
          />
          {errors.studentsEnrolled && (
            <p className="error-message">{errors.studentsEnrolled.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter email"
            value={collegeData.email || ""}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No (Optional):</label>
          <input
            {...register("mobileNo")}
            type="text"
            id="mobileNo"
            placeholder="Enter mobile number"
            value={collegeData.mobileNo || ""}
            onChange={handleChange}
          />
          {errors.mobileNo && (
            <p className="error-message">{errors.mobileNo.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="authorisedPersonName">Authorised Person Name:</label>
          <input
            {...register("authorisedPersonName")}
            type="text"
            id="authorisedPersonName"
            placeholder="Enter authorised person name"
            value={collegeData.authorisedPersonName || ""}
            onChange={handleChange}
          />
          {errors.authorisedPersonName && (
            <p className="error-message">
              {errors.authorisedPersonName.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="establishedYear">Established Year:</label>
          <input
            {...register("establishedYear")}
            type="number"
            id="establishedYear"
            placeholder="Enter established year"
            value={collegeData.establishedYear || ""}
            onChange={handleChange}
          />
          {errors.establishedYear && (
            <p className="error-message">{errors.establishedYear.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="collegeType">College Type:</label>
          <input
            {...register("collegeType")}
            type="text"
            id="collegeType"
            placeholder="Enter college type"
            value={collegeData.collegeType || ""}
            onChange={handleChange}
          />
          {errors.collegeType && (
            <p className="error-message">{errors.collegeType.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="affiliatedTo">Affiliated To:</label>
          <input
            {...register("affiliatedTo")}
            type="text"
            id="affiliatedTo"
            placeholder="Enter affiliated to"
            value={collegeData.affiliatedTo || ""}
            onChange={handleChange}
          />
          {errors.affiliatedTo && (
            <p className="error-message">{errors.affiliatedTo.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="websiteUrl">Website URL:</label>
          <input
            {...register("websiteUrl")}
            type="text"
            id="websiteUrl"
            placeholder="Enter website URL"
            value={collegeData.websiteUrl || ""}
            onChange={handleChange}
          />
          {errors.websiteUrl && (
            <p className="error-message">{errors.websiteUrl.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="profileImage">Profile Image URL:</label>
          <input
            {...register("profileImage")}
            type="text"
            id="profileImage"
            placeholder="Enter profile image URL"
            value={collegeData.profileImage || ""}
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
    </div>
  );
};

export default EditCollegeForm;
