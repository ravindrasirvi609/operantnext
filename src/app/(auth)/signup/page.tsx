"use client";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaLock,
  FaUserTag,
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

const colleges = ["College A", "College B", "College C"];

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [role, setRole] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const mobileNoRef = useRef<HTMLInputElement>(null);
  const collegeNameRef = useRef<HTMLSelectElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    if (!emailRef.current?.value) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(emailRef.current.value)) {
      newErrors.email = "Invalid email address.";
    }

    if (!passwordRef.current?.value) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(passwordRef.current.value)) {
      newErrors.password =
        "Password must have at least 8 characters, one capital letter, one special symbol, and one number.";
    }

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!usernameRef.current?.value) {
      newErrors.username = "Username is required.";
    }

    if (!roleRef.current?.value) {
      newErrors.role = "Role is required.";
    }

    // Add role-specific validations
    if (role === "STUDENT" || role === "TEACHER") {
      if (!firstNameRef.current?.value)
        newErrors.firstName = "First Name is required.";
      if (!lastNameRef.current?.value)
        newErrors.lastName = "Last Name is required.";
      if (!mobileNoRef.current?.value)
        newErrors.mobileNo = "Mobile Number is required.";
      if (role === "TEACHER" && !collegeNameRef.current?.value)
        newErrors.collegeName = "College Name is required.";
    } else if (role === "COLLEGE") {
      if (!collegeNameRef.current?.value)
        newErrors.collegeName = "College Name is required.";
      if (!mobileNoRef.current?.value)
        newErrors.mobileNo = "Mobile Number is required.";
    } else if (role === "COMPANY") {
      if (!companyNameRef.current?.value)
        newErrors.companyName = "Company Name is required.";
      if (!mobileNoRef.current?.value)
        newErrors.mobileNo = "Mobile Number is required.";
    }

    return newErrors;
  };

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const userData: UserData = {
          email: emailRef.current!.value,
          password: passwordRef.current!.value,
          confirmPassword: confirmPasswordRef.current!.value,
          username: usernameRef.current!.value,
          role: roleRef.current!.value,
        };

        if (role === "STUDENT" || role === "TEACHER") {
          userData.firstName = firstNameRef.current!.value;
          userData.lastName = lastNameRef.current!.value;
          userData.mobileNo = mobileNoRef.current!.value;
          if (role === "TEACHER") {
            userData.collegeName = collegeNameRef.current!.value;
          }
        } else if (role === "COLLEGE") {
          userData.collegeName = collegeNameRef.current!.value;
          userData.mobileNo = mobileNoRef.current!.value;
        } else if (role === "COMPANY") {
          userData.companyName = companyNameRef.current!.value;
          userData.mobileNo = mobileNoRef.current!.value;
        }

        const response = await axios.post("/api/users/signup", userData);
        Swal.fire(
          "Success",
          "User successfully registered. Please verify your account from the received email.",
          "success"
        );
        router.push("/login");
      } catch (error: any) {
        Swal.fire(
          "Registration Failed",
          error.response?.data?.error ||
            "An error occurred during registration",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const renderRoleSpecificFields = () => {
    switch (role) {
      case "STUDENT":
      case "TEACHER":
        return (
          <>
            <InputField
              name="firstName"
              label="First Name"
              icon={<FaUser />}
              ref={firstNameRef}
              error={errors.firstName}
            />
            <InputField
              name="lastName"
              label="Last Name"
              icon={<FaUser />}
              ref={lastNameRef}
              error={errors.lastName}
            />
            <InputField
              name="mobileNo"
              label="Mobile Number"
              icon={<FaPhone />}
              ref={mobileNoRef}
              error={errors.mobileNo}
            />
            {role === "TEACHER" && (
              <div className="relative">
                <FaBuilding className="absolute top-3 left-3 text-gray-400" />
                <select
                  id="collegeName"
                  name="collegeName"
                  ref={collegeNameRef}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none"
                >
                  <option value="">Select College</option>
                  {colleges.map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
                </select>
                {errors.collegeName && (
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
              ref={collegeNameRef}
              error={errors.collegeName}
            />
            <InputField
              name="mobileNo"
              label="Mobile Number"
              icon={<FaPhone />}
              ref={mobileNoRef}
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
              ref={companyNameRef}
              error={errors.companyName}
            />
            <InputField
              name="mobileNo"
              label="Mobile Number"
              icon={<FaPhone />}
              ref={mobileNoRef}
              error={errors.mobileNo}
            />
          </>
        );
      default:
        return null;
    }
  };

  const InputField = React.forwardRef(
    ({ name, label, icon, error, type = "text" }: any, ref: any) => (
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
          ref={ref}
          className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder={label}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </motion.div>
    )
  );

  InputField.displayName = "InputField";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl mt-20 shadow-2xl p-8 w-full max-w-md overflow-hidden relative"
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

        <form ref={formRef} onSubmit={onSignup} className="space-y-6">
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
              ref={roleRef}
              onChange={handleRoleChange}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 appearance-none"
            >
              <option value="">Select a role</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
              <option value="COLLEGE">College</option>
              <option value="COMPANY">Company</option>
            </select>
            {errors.role && (
              <p className="mt-2 text-sm text-red-500">{errors.role}</p>
            )}
          </motion.div>

          <InputField
            name="username"
            label="Username"
            icon={<FaUser />}
            ref={usernameRef}
            error={errors.username}
          />

          <InputField
            name="email"
            label="Email address"
            icon={<FaEnvelope />}
            ref={emailRef}
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
              ref={passwordRef}
              className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute top-3 right-3 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">{errors.password}</p>
            )}
          </motion.div>

          <InputField
            name="confirmPassword"
            label="Confirm Password"
            icon={<FaLock />}
            ref={confirmPasswordRef}
            error={errors.confirmPassword}
            type={showPassword ? "text" : "password"}
          />

          {role && renderRoleSpecificFields()}

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
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
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
