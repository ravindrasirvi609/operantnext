"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaPhone,
  FaBuilding,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  role: string;
  firstName?: string;
  lastName?: string;
  mobileNo?: string;
  collegeName?: string;
  companyName?: string;
}

type ValidationErrors = {
  [key in keyof UserData]?: string;
};

const colleges = ["College A", "College B", "College C"]; // Add more colleges as needed

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
        setErrors({
          ...errors,
          confirmPassword: "Password and Confirm Password must be the same!",
        });
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
      case "firstName":
      case "lastName":
      case "mobileNo":
      case "collegeName":
      case "companyName":
        if (!value) {
          newErrors[field] = `${
            field.charAt(0).toUpperCase() +
            field
              .slice(1)
              .replace(/([A-Z])/g, " $1")
              .trim()
          } is required.`;
        } else {
          delete newErrors[field];
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTouched(true);
    setIsSubmitted(true);

    Object.keys(user).forEach((key) => {
      validateField(key as keyof UserData, user[key as keyof UserData] ?? "");
    });

    if (Object.keys(errors).length === 0) {
      onSignup();
    }
  };

  useEffect(() => {
    const isFormFilled = Object.entries(user).every(([key, value]) => {
      if (user.role === "STUDENT" || user.role === "TEACHER") {
        return key === "collegeName" || value.length > 0;
      }
      return value.length > 0;
    });
    setButtonDisabled(!isFormFilled);
  }, [user]);

  const renderRoleSpecificFields = () => {
    switch (user.role) {
      case "STUDENT":
      case "TEACHER":
        return (
          <>
            <InputField
              name="firstName"
              label="First Name"
              icon={<FaUser />}
              value={user.firstName || ""}
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <InputField
              name="lastName"
              label="Last Name"
              icon={<FaUser />}
              value={user.lastName || ""}
              onChange={handleInputChange}
              error={errors.lastName}
            />
            <InputField
              name="mobileNo"
              label="Mobile Number"
              icon={<FaPhone />}
              value={user.mobileNo || ""}
              onChange={handleInputChange}
              error={errors.mobileNo}
            />
            {user.role === "TEACHER" && (
              <div className="relative">
                <FaBuilding className="absolute top-3 left-3 text-gray-400" />
                <select
                  id="collegeName"
                  name="collegeName"
                  value={user.collegeName || ""}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none"
                >
                  <option value="">Select College</option>
                  {colleges.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
                {isTouched && errors.collegeName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.collegeName}
                  </p>
                )}
              </div>
            )}
          </>
        );
      case "COLLEGE":
        return (
          <>
            <InputField
              name="collegeName"
              label="College Name"
              icon={<FaBuilding />}
              value={user.collegeName || ""}
              onChange={handleInputChange}
              error={errors.collegeName}
            />
            <InputField
              name="mobileNo"
              label="Mobile Number"
              icon={<FaPhone />}
              value={user.mobileNo || ""}
              onChange={handleInputChange}
              error={errors.mobileNo}
            />
          </>
        );
      case "COMPANY":
        return (
          <>
            <InputField
              name="companyName"
              label="Company Name"
              icon={<FaBuilding />}
              value={user.companyName || ""}
              onChange={handleInputChange}
              error={errors.companyName}
            />
            <InputField
              name="mobileNo"
              label="Mobile Number"
              icon={<FaPhone />}
              value={user.mobileNo || ""}
              onChange={handleInputChange}
              error={errors.mobileNo}
            />
          </>
        );
      default:
        return null;
    }
  };

  const InputField = ({
    name,
    label,
    icon,
    value,
    onChange,
    error,
    type = "text",
  }: any) => (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="relative"
    >
      {React.cloneElement(icon, {
        className: "absolute top-3 left-3 text-gray-400",
      })}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        placeholder={label}
      />
      {isTouched && error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md overflow-hidden relative"
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center mb-8"
        >
          <Image
            className="h-24 w-24 mb-4 rounded-full shadow-xl"
            src="/opflogo.png"
            alt="OPF Logo"
            height={96}
            width={96}
          />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">Join us and start your journey</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <FaUserTag className="absolute top-3 left-3 text-gray-400" />
            <select
              id="role"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none"
            >
              <option value="">Select a role</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="COLLEGE">College</option>
              <option value="COMPANY">Company</option>
            </select>
            {isTouched && errors.role && (
              <p className="mt-2 text-sm text-red-500">{errors.role}</p>
            )}
          </motion.div>

          <InputField
            name="username"
            label="Username"
            icon={<FaUser />}
            value={user.username}
            onChange={handleInputChange}
            error={errors.username}
          />

          <InputField
            name="email"
            label="Email address"
            icon={<FaEnvelope />}
            value={user.email}
            onChange={handleInputChange}
            error={errors.email}
            type="email"
          />

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-3 right-3 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {isTouched && errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </motion.div>

          <InputField
            name="confirmPassword"
            label="Confirm Password"
            icon={<FaLock />}
            value={user.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            type={showPassword ? "text" : "password"}
          />

          {user.role && renderRoleSpecificFields()}

          <AnimatePresence>
            {Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm"
              >
                Please correct the errors above.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ${
              buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition duration-300"
          >
            Log in here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
