"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { useState } from "react";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { EyeOffIcon } from "lucide-react";

type FormValues = {
  role: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      localStorage.setItem("role", response.data.data.role);
      router.push("/");
      Swal.fire("Good job!", "Login Successfully!", "success");
    } catch (error: any) {
      Swal.fire(
        "Login failed",
        error.response?.data?.error || "An error occurred",
        "error"
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const ForgotPassword = async () => {
    Swal.fire({
      title: "Forgot Password",
      input: "email",
      inputLabel: "Enter your email address",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Send",
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return axios
          .post("/api/users/forgotpassword", { email })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Email sent!",
          "Check your email for the reset link",
          "success"
        );
      }
    });
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <Image
              className="h-24 w-24"
              src="/opflogo.png"
              alt="OPF Logo"
              height={96}
              width={96}
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative text-left">
                <select
                  {...register("role", { required: "Role is required" })}
                  defaultValue={"DEFAULT"}
                  className="block w-full px-4 py-2 bg-lime-100 text-sm text-gray-700  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="DEFAULT" disabled>
                    Choose a role
                  </option>
                  <option value="STUDENT">Student</option>
                  <option value="TEACHER">Teacher</option>
                  <option value="COLLEGE">College</option>
                  <option value="COMPANY">Company</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-indigo-600"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", { required: "Email is required" })}
                    className="p-2 block w-full bg-lime-100 rounded-md border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-indigo-600"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={ForgotPassword}
                      className="font-semibold text-indigo-300 hover:text-indigo-800"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="p-2 block bg-lime-100 w-full rounded-md border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                href="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                New Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
