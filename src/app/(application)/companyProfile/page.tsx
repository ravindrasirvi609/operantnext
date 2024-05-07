"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/companyDetails");
        const receivedFormData = response.data;
        if (receivedFormData && receivedFormData.data) {
          const parsedDate = new Date(receivedFormData.data.dob);

          setCompanyData({
            ...initialCompanyData,
            ...receivedFormData.data,
          });
        }
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    };

    fetchData();
  }, [initialCompanyData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setCompanyData({
        ...companyData,
        location: {
          ...companyData.location,
          [locationField]: value,
        },
      });
    } else {
      setCompanyData({
        ...companyData,
        [name]: value,
      });
    }
  };

  const handleChangeFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (event.target.files && event.target.files[0]) {
      setCompanyData({
        ...companyData,
        [fieldName]: event.target.files[0],
      });
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log("data", data);

    onSubmit(data);
  };

  async function onSubmit(data: any) {
    try {
      const formData = new FormData();

      // Append non-file fields
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "object" && data[key] !== null) {
          // Handling nested objects like location
          Object.keys(data[key]).forEach((nestedKey) => {
            formData.append(`${key}.${nestedKey}`, data[key][nestedKey]);
          });
        } else {
          formData.append(key, data[key]);
        }
      });

      // Append file if exists
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await axios.post("/api/users/companyDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to set the correct content type
        },
      });
      toast.success("Company details updated successfully");
      // router.push("/companyProfile");
    } catch (error) {
      toast.error("Failed to update company details");
    }
  }

  return (
    <div className="bg-purple-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Company</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              {...register("companyName")}
              type="text"
              id="companyName"
              placeholder="Enter company name"
              value={companyData.companyName || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
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
              value={companyData.location.streetAddress}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.location?.streetAddress && (
              <p className="error-message">
                {errors.location.streetAddress.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location.city">City:</label>
            <input
              {...register("location.city")}
              type="text"
              id="location.city"
              placeholder="Enter city"
              value={companyData.location.city || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.location?.city && (
              <p className="error-message">{errors.location.city.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location.state">State:</label>
            <input
              {...register("location.state")}
              type="text"
              id="location.state"
              placeholder="Enter state"
              value={companyData.location.state || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.location?.state && (
              <p className="error-message">{errors.location.state.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location.country">Country:</label>
            <input
              {...register("location.country")}
              type="text"
              id="location.country"
              placeholder="Enter country"
              value={companyData.location.country || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.location?.country && (
              <p className="error-message">{errors.location.country.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="location.postalCode">Postal Code:</label>
            <input
              {...register("location.postalCode")}
              type="text"
              id="location.postalCode"
              placeholder="Enter postal code"
              value={companyData.location.postalCode || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.location?.postalCode && (
              <p className="error-message">
                {errors.location.postalCode.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No:</label>
            <input
              {...register("mobileNo")}
              type="text"
              id="mobileNo"
              placeholder="Enter mobile number"
              value={companyData.mobileNo || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.mobileNo && (
              <p className="error-message">{errors.mobileNo.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              {...register("email")}
              type="text"
              id="email"
              placeholder="Enter email"
              value={companyData.email || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="authorisedPersonName">
              Authorised Person Name:
            </label>
            <input
              {...register("authorisedPersonName")}
              type="text"
              id="authorisedPersonName"
              placeholder="Enter authorised person name"
              value={companyData.authorisedPersonName || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.authorisedPersonName && (
              <p className="error-message">
                {errors.authorisedPersonName.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="registrationDate">Registration Date:</label>
            <input
              {...register("registrationDate")}
              type="date"
              id="registrationDate"
              value={
                companyData.registrationDate
                  ? companyData.registrationDate.toString()
                  : ""
              }
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.registrationDate && (
              <p className="error-message">{errors.registrationDate.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="industryType">Industry Type:</label>
            <input
              {...register("industryType")}
              type="text"
              id="industryType"
              placeholder="Enter industry type"
              value={companyData.industryType || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.industryType && (
              <p className="error-message">{errors.industryType.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="numberOfEmployees">Number of Employees:</label>
            <input
              {...register("numberOfEmployees")}
              type="number"
              id="numberOfEmployees"
              value={companyData.numberOfEmployees || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.numberOfEmployees && (
              <p className="error-message">
                {errors.numberOfEmployees.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="websiteUrl">Website URL:</label>
            <input
              {...register("websiteUrl")}
              type="text"
              id="websiteUrl"
              placeholder="Enter website URL"
              value={companyData.websiteUrl || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-purple-800 text-white"
            />
            {errors.websiteUrl && (
              <p className="error-message">{errors.websiteUrl.message}</p>
            )}
          </div>
          <div className="flex justify-center items-center p-10 border-2 border-dashed border-green-500 rounded-lg relative">
            <input
              type="file"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              {...register("profileImage")}
              id="profileImage"
              placeholder="Enter profile image URL"
              value={companyData.profileImage || ""}
              onChange={(e) => handleChangeFile(e, "profileImage")}
            />
            <div className="text-center">
              <p className="text-lg">Drag & drop to upload</p>
              <p className="text-sm text-zinc-600">or browse</p>
            </div>
          </div>
          {errors.profileImage && (
            <p className="error-message">{errors.profileImage.message}</p>
          )}

          <div className="form-group">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyForm;
