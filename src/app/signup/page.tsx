"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

type ValidationErrors = {
  [key: string]: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const onSignup = async () => {
    try {
      if (user.password !== user.confirmPassword) {
        Swal.fire("Password and Confirm-Password Must Be Same!");
        return;
      }
      setLoading(true);
      const response = await axios.post("api/users/signup", user);
      Swal.fire(
        "User successfully Registered",
        "Please Verify User From Received mail",
        "success"
      );
      router.push("/login");
    } catch (error: any) {
      Swal.fire(
        "User Registration Failed!",
        error.response.data.error,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    const validationErrors: ValidationErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      role: "",
    };

    if (isSubmitted) {
      if (!value) {
        validationErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required.`;
      } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        validationErrors.email = "Invalid email address.";
      } else if (name === "password") {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
        if (!passwordRegex.test(value)) {
          validationErrors.password =
            "Password must have at least 8 characters, one capital letter, one special symbol, and one number.";
        }
      } else if (name === "confirmPassword" && value !== user.password) {
        validationErrors.confirmPassword = "Passwords do not match.";
      }
    }
    setErrors(validationErrors);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsTouched(true);
    setIsSubmitted(true);

    const validationErrors: ValidationErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      role: "",
    };

    if (!user.email) {
      validationErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = "Invalid email address.";
    }

    if (!user.password) {
      validationErrors.password = "Password is required.";
    } else if (user.password.length < 8) {
      validationErrors.password =
        "Password must have at least 8 characters, one capital letter, one special symbol, and one number.";
    }

    if (!user.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required.";
    } else if (user.confirmPassword !== user.password) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (!user.username) {
      validationErrors.username = "Username is required.";
    }

    setErrors(validationErrors);

    if (
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.confirmPassword &&
      !validationErrors.username
    ) {
      onSignup();
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.confirmPassword.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex flex-col justify-center px-4 py-8 lg:px-8 w-full max-w-md mx-auto">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-4 mt-36">
              <Image
                className="mx-auto h-15.5rem w-auto"
                src="/opflogo.png"
                alt="OPF Logo"
                height={1000}
                width={1000}
              />
            </div>

            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              {loading ? "Processing" : "Register Your Account"}
            </h2>

            <div className="mt-6">
              <div className="space-y-6">
                <div className="relative text-left">
                  <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="user">Student</option>
                    <option value="organization">Organization</option>
                  </select>
                  {user.role === "" && (
                    <p className="text-red-500 text-xs mt-1">
                      Role is required
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-indigo-600"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      value={user.username}
                      onChange={handleInputChange}
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {isTouched && errors.username && isSubmitted && (
                      <p className="text-red-500">{errors.username}</p>
                    )}
                  </div>
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
                      value={user.email}
                      onChange={handleInputChange}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {isTouched && errors.email && isSubmitted && (
                      <p className="text-red-500">{errors.email}</p>
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
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={user.password}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                      required
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {isTouched && errors.password && isSubmitted && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-indigo-600"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={user.confirmPassword}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                      required
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {isTouched && errors.confirmPassword && isSubmitted && (
                      <p className="text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${
                      buttonDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-500"
                    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    disabled={buttonDisabled}
                  >
                    {loading ? "Processing" : "Register"}
                  </button>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link
                  href="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
