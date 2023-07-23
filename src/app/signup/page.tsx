"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSighup = async () => {
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
        "User Registeration Failed!",
        error.response.data.error,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-15.5rem w-auto"
          src="/opflogo.png"
          alt="OPF Logo"
          height={1000} // The height of the image in pixels
          width={1000} // The width of the image in pixels
        />

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-lime-400	">
          {loading ? "Processing" : "Register Your Account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-lime-400"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                name="username"
                type="username"
                autoComplete="username"
                required
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-lime-400"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                name="email"
                type="email"
                autoComplete="email"
                required
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-lime-400	"
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="current-password"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-lime-400	"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                autoComplete="current-password"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={onSighup}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div> 
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>

    // <div className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#31c14e] to-[#1a3e85]">
    //   <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    //     <h1 className="font-bold text-green-400">{loading ? "Loading..." : " Sign Up"}</h1>
    //     <hr />
    //     <label htmlFor="username">Username</label>
    //     <input
    //       type="text"
    //       placeholder="username"
    //       id="username"
    //       value={user.username}
    //       onChange={(e) => setUser({ ...user, username: e.target.value })}
    //       className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
    //     />
    //     <hr />
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="email"
    //       placeholder="email"
    //       id="email"
    //       value={user.email}
    //       onChange={(e) => setUser({ ...user, email: e.target.value })}
    //       className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       placeholder="password"
    //       id="password"
    //       value={user.password}
    //       onChange={(e) => setUser({ ...user, password: e.target.value })}
    //       className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
    //     />
    //     <label htmlFor="password">Confirm Password</label>
    //     <input
    //       type="password"
    //       placeholder="Confirm Password"
    //       id="confirmPassword"
    //       value={user.confirmPassword}
    //       onChange={(e) =>
    //         setUser({ ...user, confirmPassword: e.target.value })
    //       }
    //       className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:before-gray-600 text-black"
    //     />
    //     <hr />

    //     <button
    //       onClick={onSighup}
    //       className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
    //     >
    //       {buttonDisabled ? "disabled" : "enabled"}
    //     </button>
    //     <Link href="/login">Visit Login Page</Link>
    //   </div>
    // </div>
  );
}
