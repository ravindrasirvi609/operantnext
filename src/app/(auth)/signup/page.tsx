"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeOffIcon } from "lucide-react";

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  role: string;
}

type ValidationErrors = {
  [key in keyof UserData]?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<ValidationErrors>({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSignup = async () => {
    try {
      if (user.password !== user.confirmPassword) {
        Swal.fire(
          "Error",
          "Password and Confirm Password must be the same!",
          "error"
        );
        return;
      }
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      Swal.fire(
        "Success",
        "User successfully registered. Please verify your account from the received email.",
        "success"
      );
      router.push("/login");
    } catch (error: any) {
      Swal.fire(
        "Registration Failed",
        error.response?.data?.error || "An error occurred during registration",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIsTouched(true);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (isSubmitted) {
      validateField(name as keyof UserData, value);
    }
  };

  const validateField = (field: keyof UserData, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "email":
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Invalid email address.";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required.";
        } else if (
          !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(value)
        ) {
          newErrors.password =
            "Password must have at least 8 characters, one capital letter, one special symbol, and one number.";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirm Password is required.";
        } else if (value !== user.password) {
          newErrors.confirmPassword = "Passwords do not match.";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      case "username":
        if (!value) {
          newErrors.username = "Username is required.";
        } else {
          delete newErrors.username;
        }
        break;
      case "role":
        if (!value) {
          newErrors.role = "Role is required.";
        } else {
          delete newErrors.role;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsTouched(true);
    setIsSubmitted(true);

    Object.keys(user).forEach((key) => {
      validateField(key as keyof UserData, user[key as keyof UserData]);
    });

    if (Object.keys(errors).length === 0) {
      onSignup();
    }
  };

  useEffect(() => {
    const isFormFilled = Object.values(user).every((field) => field.length > 0);
    setButtonDisabled(!isFormFilled);
  }, [user]);

  return (
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
            {loading ? "Processing" : "Register Your Account"}
          </h2>
        </div>
        <div className="mt-6">
          <div className="space-y-6">
            <div className="relative text-left">
              <select
                value={user.role}
                onChange={handleInputChange}
                name="role"
                className="block w-full bg-lime-100 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="COLLEGE">College</option>
                <option value="COMPANY">Company</option>
                <option value="ADMIN">Admin</option>
              </select>
              {isTouched && errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>
            {(
              ["username", "email", "password", "confirmPassword"] as const
            ).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium leading-6 text-indigo-600"
                >
                  {field.charAt(0).toUpperCase() +
                    field
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </label>
                <div className="mt-2 relative">
                  <input
                    id={field}
                    name={field}
                    type={
                      field === "email"
                        ? "email"
                        : field.includes("password")
                        ? showPassword
                          ? "text"
                          : "password"
                        : "text"
                    }
                    value={user[field]}
                    onChange={handleInputChange}
                    autoComplete={
                      field === "email"
                        ? "email"
                        : field.includes("password")
                        ? "new-password"
                        : "off"
                    }
                    required
                    className="p-2 block w-full bg-lime-100 rounded-md border border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {field.includes("password") && (
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-500"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  )}
                  {isTouched && errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              </div>
            ))}
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
  );
}
