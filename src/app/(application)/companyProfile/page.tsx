"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { on } from "events";
import axios from "axios";
import toast from "react-hot-toast";

interface ICompany {
  companyName: string;
  location: {
    streetAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  mobileNo?: string;
  email: string;
  authorisedPersonName?: string;
  registrationDate: Date;
  industryType?: string;
  numberOfEmployees?: number;
  websiteUrl?: string;
  profileImage?: string;
}

const EditCompanyForm = () => {
  const initialCompanyData = useMemo(() => {
    return {
      companyName: "",
      location: {
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      mobileNo: "",
      email: "",
      authorisedPersonName: "",
      registrationDate: new Date(),
      industryType: "",
      numberOfEmployees: 0,
      websiteUrl: "",
      profileImage: "",
    };
  }, []);

  const [companyData, setCompanyData] = useState<ICompany>(initialCompanyData);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required("Company name is required"),
    location: Yup.object().shape({
      streetAddress: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
      postalCode: Yup.string(),
    }),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    authorisedPersonName: Yup.string(),
    registrationDate: Yup.date().required("Registration date is required"),
    industryType: Yup.string(),
    numberOfEmployees: Yup.number().positive(
      "Number of employees must be a positive number"
    ),
    websiteUrl: Yup.string().url("Invalid URL format"),
    profileImage: Yup.string().url("Invalid URL format"),
    mobileNo: Yup.string().matches(/^\d{10}$/, "Invalid mobile number format"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialCompanyData,
  });

  useEffect(() => {
    setCompanyData(initialCompanyData);
  }, [initialCompanyData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyData({
      ...companyData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  async function onSubmit(data: any) {
    try {
      const res = await axios.post("/api/users/editCompany", data);
      toast.success("Company details updated successfully");
      // router.push("/companyProfile");
    } catch (error) {
      toast.error("Failed to update company details");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Edit Company</h2>
      <div className="form-group">
        <label htmlFor="companyName">Company Name:</label>
        <input
          {...register("companyName")}
          type="text"
          id="companyName"
          placeholder="Enter company name"
          value={companyData.companyName || ""}
          onChange={handleChange}
        />
        {errors.companyName && (
          <p className="error-message">{errors.companyName.message}</p>
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
          value={companyData.location.streetAddress || ""}
          onChange={handleChange}
        />
        {errors.location?.streetAddress && (
          <p className="error-message">
            {errors.location.streetAddress.message}
          </p>
        )}
      </div>

      {/* Add other fields based on the ICompany interface */}
      {/* Remember to adjust validation and error messages accordingly */}

      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditCompanyForm;
