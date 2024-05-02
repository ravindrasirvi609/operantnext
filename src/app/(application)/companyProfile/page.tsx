import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

interface EditCompanyFormProps {
  initialCompanyData?: ICompany;
  onSubmit: (data: ICompany) => void;
}

const EditCompanyForm: React.FC<EditCompanyFormProps> = ({
  initialCompanyData = {} as ICompany,
  onSubmit,
}) => {
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
