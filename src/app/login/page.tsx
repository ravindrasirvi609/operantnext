"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    role: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = React.useState(false);

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      localStorage.setItem("role", response.data.data.role);
      router.push("/");
      Swal.fire("Good job!", "Login Successfully!", "success");
    } catch (error: any) {
      Swal.fire("Login failed", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };

  const ForgotPassword = async () => {
    try {
      const result = await Swal.fire({
        title: "Submit your Email",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (login) => {
          try {
            const formdata = {
              email: login,
            };
            const response = await axios.post(
              "/api/users/forgotpassword",
              formdata
            );
            if (response.data.sendEmail) {
              Swal.fire(
                "success",
                "Please Check your mailbox for a new password",
                "success"
              );
              return response.data;
            } else {
              throw new Error("Error creating a new password for the user");
            }
          } catch (error) {
            throw new Error("Password reset request failed.");
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        Swal.fire(
          "success",
          "Please Check your mailbox for a new password",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("error", "Forgot Password Failed", "error");
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="relative h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                className="mx-auto h-15.5rem w-auto"
                src="/opflogo.png"
                alt="OPF Logo"
                height={1000} // The height of the image in pixels
                width={1000} // The width of the image in pixels
              />

              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
                {loading ? "Processing" : "Sign in to your account"}
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-indigo-600"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
                        onClick={ForgotPassword}
                        className="font-semibold text-indigo-300 hover:text-indigo-800"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      autoComplete="current-password"
                      required
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={onLogin}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <a
                  href="/signup"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  New Registration
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
