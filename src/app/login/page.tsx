"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

type FormValues = {
  role: string;
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

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
      <div className="relative h-screen bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <Image
                className="mx-auto h-15.5rem w-auto"
                src="/opflogo.png"
                alt="OPF Logo"
                height={1000}
                width={1000}
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative text-left">
                  <select
                    {...register("role")}
                    defaultValue={"DEFAULT"}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <option value="DEFAULT" disabled>
                      Choose a role
                    </option>
                    <option value="user">Student</option>
                    <option value="organization">Organization</option>
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
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <div className="mt-2">
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
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
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member? <Link href="/signup">New Registration</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
