"use client";
import axios from "axios";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormData {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  currency: string;
}

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  isActive: z.boolean(),
  currency: z.string().nonempty("Currency is required"),
});

const PlanForm = () => {
  const defaultValues = useMemo(
    () => ({
      name: "",
      description: "",
      price: 0,
      isActive: false,
      currency: "",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormData) => {
    try {
      submitForm(data);
      // Handle form submission logic here (add or edit)
      console.log(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors);
        // Handle validation errors
      }
    }
  };

  const submitForm = async (data: FormData) => {
    try {
      console.log("data", data);

      // Validate form data
      schema.parse(data);

      // API call
      const response = await axios.post("/api/plans/addplans", data);

      // Log response
      console.log(response);
    } catch (error) {
      // Log and handle errors
      console.error("API call failed:", error);

      if (error instanceof z.ZodError) {
        console.log(error.errors);
        // Handle validation errors
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4">Add Plan</h1>
        <p className="mb-4">Fill in the form below to add a new plan.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              {...register("description")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Repeat for other input fields */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { valueAsNumber: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            {errors.price && (
              <span className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="isActive"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Is Active
            </label>
            <input
              type="checkbox"
              id="isActive"
              {...register("isActive")}
              className="mr-2 leading-tight"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="currency"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Currency
            </label>
            <input
              type="text"
              id="currency"
              {...register("currency")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.currency && (
              <span className="text-red-500 text-xs">
                {errors.currency.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanForm;
