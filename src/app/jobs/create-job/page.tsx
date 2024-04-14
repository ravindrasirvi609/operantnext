"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { isURL } from "validator";

const JobForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-300">
      <h1 className="text-3xl font-semibold text-center mb-8">Create Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            {...register("title", { required: true, maxLength: 100 })}
            type="text"
            id="title"
            className={`mt-1 p-2 w-full rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div> */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="mt-1 p-2 w-full border rounded-md font-semibold"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            id="description"
            className={`mt-1 p-2 w-full rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            {...register("company", { required: true })}
            type="text"
            id="company"
            className={`mt-1 p-2 w-full rounded-md ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.company && (
            <p className="text-red-500 text-sm">Company is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="locationType"
            className="block text-sm font-medium text-gray-700"
          >
            Location Type
          </label>
          <select
            {...register("location.type")}
            id="locationType"
            className="mt-1 p-2 w-full rounded-md"
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="locationAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Location Address
          </label>
          <input
            {...register("location.address")}
            type="text"
            id="locationAddress"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Job Type
          </label>
          <select
            {...register("type", { required: true })}
            id="type"
            className={`mt-1 p-2 w-full rounded-md ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">Job type is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="applyUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Apply URL
          </label>
          <input
            {...register("applyUrl", { required: true, validate: isURL })}
            type="text"
            id="applyUrl"
            className={`mt-1 p-2 w-full rounded-md ${
              errors.applyUrl ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.applyUrl && (
            <p className="text-red-500 text-sm">Invalid URL</p>
          )}
        </div>

        <div>
          <label
            htmlFor="companyLogo"
            className="block text-sm font-medium text-gray-700"
          >
            Company Logo URL
          </label>
          <input
            {...register("companyLogo", {
              validate: (value) => (value ? isURL(value) : true),
            })}
            type="text"
            id="companyLogo"
            className={`mt-1 p-2 w-full rounded-md ${
              errors.companyLogo ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.companyLogo && (
            <p className="text-red-500 text-sm">Invalid URL</p>
          )}
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          <input
            {...register("skills")}
            type="text"
            id="skills"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="benefits"
            className="block text-sm font-medium text-gray-700"
          >
            Benefits
          </label>
          <input
            {...register("benefits")}
            type="text"
            id="benefits"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="salaryMin"
            className="block text-sm font-medium text-gray-700"
          >
            Salary Min
          </label>
          <input
            {...register("salaryRange.min")}
            type="number"
            id="salaryMin"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="salaryMax"
            className="block text-sm font-medium text-gray-700"
          >
            Salary Max
          </label>
          <input
            {...register("salaryRange.max")}
            type="number"
            id="salaryMax"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="experienceLevel"
            className="block text-sm font-medium text-gray-700"
          >
            Experience Level
          </label>
          <select
            {...register("experienceLevel")}
            id="experienceLevel"
            className="mt-1 p-2 w-full rounded-md"
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="flexibleHours"
            className="block text-sm font-medium text-gray-700"
          >
            Flexible Hours
          </label>
          <input
            {...register("remoteOptions.flexibleHours")}
            type="checkbox"
            id="flexibleHours"
          />
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="block text-sm font-medium text-gray-700"
          >
            Timezone
          </label>
          <input
            {...register("remoteOptions.timezone")}
            type="text"
            id="timezone"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Department
          </label>
          <input
            {...register("department")}
            type="text"
            id="department"
            className="mt-1 p-2 w-full rounded-md"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
