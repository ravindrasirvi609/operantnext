"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface SkillsSubmissionProps {
  name: string;
}

const SkillsSubmission = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitSkill = async (data: SkillsSubmissionProps) => {
    try {
      const response = await axios.post("/api/skills/add-skill", data);
      console.log(response);
      setSubmitted(true); // Set submitted to true on successful submission
      setName(""); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting skill:", error);
      // Handle error submission
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitSkill({ name });
  };

  return (
    <div className="container mx-auto mt-1">
      <h1 className="text-2xl font-bold mb-4">Skills Submission</h1>
      {submitted ? (
        <p className="text-green-600 mb-4">Successfully submitted!</p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border bg-blue-400 border-gray-800 rounded-md px-4 py-2 mt-1 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SkillsSubmission;
