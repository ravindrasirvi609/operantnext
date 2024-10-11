"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RoleSelection = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!role) return;

    const response = await fetch("/api/set-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (response.ok) {
      router.push("/dashboard"); // Redirect after successful role selection
    } else {
      console.error("Failed to update role");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Select Your Role</h1>
      <div className="mt-4">
        <select
          className="border border-gray-300 rounded p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="COLLEGE">College</option>
          <option value="COMPANY">Company</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default RoleSelection;
