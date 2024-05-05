"use client";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";

interface EventFormData {
  title: string;
  description: string;
  date: string;
  isPaid: boolean;
  price?: number;
  registrationUrl?: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
  };
  categories: string[];
  capacity?: number;
}

const categoriesOptions = [
  "Category 1",
  "Category 2",
  "Category 3",
  // Add more categories as needed
];

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  date: z.string().nonempty("Date is required"),
  isPaid: z.boolean(),
  price: z.number().optional(),
  registrationUrl: z.string().url("Invalid registration URL").optional(),
  location: z.object({
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().optional().nullable(),
    country: z.string().nonempty("Country is required"),
  }),
  categories: z.array(z.string()),
  capacity: z.number().optional(),
});

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: async (data) => {
      console.log("data", data);

      try {
        schema.parse(data);
        console.log(
          "data",
          data,
          schema.parse(data),
          schema.parse(data).location
        );

        return { values: data, errors: {} };
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log("err", error);

          return {
            values: {},
            errors: error.errors.reduce(
              (acc, err) => ({
                ...acc,

                [err.path[0]]: err.message,
              }),
              {}
            ),
          };
        }
        return { values: {}, errors: {} };
      }
    },
  });

  const onSubmit = (data: EventFormData) => {
    fetchData(data);
  };

  async function fetchData(data: EventFormData) {
    try {
      const response = await axios.post("/api/events/addEvent", { data });
    } catch (error: any) {
      Swal.fire(error.message);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Event
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill out the form below to create a new event.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                type="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Title"
              />
              {errors.title && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={3}
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
              />
              {errors.description && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="date" className="sr-only">
                Date
              </label>
              <input
                id="date"
                {...register("date")}
                type="date"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date"
              />
              {errors.date && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <input
                id="isPaid"
                {...register("isPaid")}
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isPaid"
                className="ml-2 block text-sm text-gray-900"
              >
                Is Paid Event?
              </label>
            </div>
            {watch("isPaid") && (
              <>
                <div>
                  <label htmlFor="price" className="sr-only">
                    Price
                  </label>
                  <input
                    id="price"
                    {...(register("price"), { valueAsNumber: true })}
                    type="number"
                    className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Price"
                  />
                  {errors.price && (
                    <p className="mt-1 text-red-500 text-xs">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="registrationUrl" className="sr-only">
                    Registration URL
                  </label>
                  <input
                    id="registrationUrl"
                    {...register("registrationUrl")}
                    type="url"
                    className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Registration URL"
                  />
                  {errors.registrationUrl && (
                    <p className="mt-1 text-red-500 text-xs">
                      {errors.registrationUrl.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <input
                id="address"
                {...register("location.address")}
                type="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
              />
              {errors.location?.address && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.location.address.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
                id="city"
                {...register("location.city")}
                type="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="City"
              />
              {errors.location?.city && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.location.city.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <input
                id="state"
                {...register("location.state")}
                type="text"
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="State"
              />
              {errors.location?.state && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.location.state.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <input
                id="country"
                {...register("location.country")}
                type="text"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Country"
              />
              {errors.location?.country && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.location.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="categories" className="sr-only">
                Categories
              </label>
              <select {...register("categories", { required: true })} multiple>
                {" "}
                <option value="">Select...</option>
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
              </select>
              {errors.categories && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.categories.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="capacity" className="sr-only">
                Capacity
              </label>
              <input
                id="capacity"
                {...(register("capacity"), { valueAsNumber: true })}
                type="number"
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Capacity"
              />
              {errors.capacity && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/pencil-alt */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 5.293a1 1 0 011.414 0L15 13.586V17a1 1 0 01-1 1H4a1 1 0 01-1-1v-1.586l6.293-6.293a1 1 0 011.414 0l3.586 3.586a1 1 0 001.414-1.414l-3.586-3.586a3 3 0 00-4.243 0L5.293 5.293zM7 3a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1V3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
