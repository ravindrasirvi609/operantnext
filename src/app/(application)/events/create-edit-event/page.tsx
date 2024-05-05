"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPaid: boolean;
  price?: string;
  registrationUrl?: string;
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
  };
  categories: string[];
  capacity?: string;
  planDetails: string;
  image?: File;
}

const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<EventFormData>();

  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axios.get("/api/plans/planList");
        console.log("response", response.data);

        setPlansData(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    fetchPlans();
  }, []);

  const onSubmit = (data: EventFormData) => {
    console.log("data", data.price, data.capacity);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "location") {
        Object.entries(value).forEach(([locationKey, locationValue]) => {
          formData.append(`location[${locationKey}]`, locationValue as string);
        });
      } else if (key === "image" && value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append("image", value[i]);
        }
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = axios.post("/api/events/addEvent", formData);
      console.log("response", response);
      setSubmitted(true);
      reset();
    } catch (error: any) {
      Swal.fire(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);
  };

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
            <div className="p-1">
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
            <div className="p-1">
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                rows={3}
                required
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
            <div className="p-1">
              <label htmlFor="date" className="sr-only">
                start Date
              </label>
              <input
                id="date"
                {...register("startDate")}
                type="date"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Date"
              />
              {errors.startDate && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div className="p-1">
              <label htmlFor="endDate" className="sr-only">
                end Date
              </label>
              <input
                id="endDate"
                {...register("endDate")}
                type="date"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="endDate"
              />
              {errors.endDate && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.endDate.message}
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
                <div className="p-1">
                  <label htmlFor="price" className="sr-only">
                    Price
                  </label>
                  <input
                    id="price"
                    {...register("price")}
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
                <div className="p-1">
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
            <div className="p-1">
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
            <div className="p-1">
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
            <div className="p-1">
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
            <div className="p-1">
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
            <div className="p-1">
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
            <div className="p-1">
              <label htmlFor="capacity" className="sr-only">
                Capacity
              </label>
              <input
                id="capacity"
                {...register("capacity")}
                type="number"
                required
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

          <div className="relative">
            <label
              htmlFor="planDetails"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Choose a Plan:
            </label>
            <select
              id="planDetails"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("planDetails", { required: true })}
            >
              {Array.isArray(plansData) &&
                plansData.map((plan: any) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                id="image"
                type="file"
                {...register("image")}
                className="block"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading} // Disable the submit button when loading
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {submitted && (
          <p className="text-green-500 text-center mt-4">
            Successfully submitted!
          </p>
        )}
      </div>
    </div>
  );
};

export default EventForm;
