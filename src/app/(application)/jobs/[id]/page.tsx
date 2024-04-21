"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export interface Job {
  title: string;
  description: string;
  company: any; // reference to Organizer model
  location: {
    type: LocationType;
    address?: string;
  };
  type: JobType;
  applyUrl: string;
  companyLogo?: string; // optional URL string
  createdAt: Date;
  updatedAt: Date;
  skills: any[]; // references to Skill model
  benefits: string[];
  salaryRange?: SalaryRange; // optional salary range object
  experienceLevel?: ExperienceLevel; // optional experience level string
  remoteOptions?: RemoteOptions; // optional remote options object
  department?: string;
}

export type LocationType = "Remote" | "On-site" | "Hybrid";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type SalaryRange = {
  min: number;
  max: number;
};
export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level";
export type RemoteOptions = {
  flexibleHours: boolean;
  timezone?: string; // optional timezone string
};

const JobDetailsPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const jobId = params.id;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.post(`/api/Jobs/jobDetails`, {
          id: jobId,
        });
        const jobData = response.data;
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 px-4">
      <Head>
        <title>{job.title} - Job Details</title>
      </Head>

      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/3 p-8 bg-blue-500 text-white flex justify-center items-center">
          {job.companyLogo && (
            <Image
              src={job.companyLogo}
              alt={job.company}
              width={200}
              height={200}
              className="rounded-full"
            />
          )}
        </div>
        <div className="md:w-2/3 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{job.title}</h1>
          <p className="text-gray-600 mb-4">{job.company}</p>
          <p className="text-gray-600 mb-4">
            {job.location.address}, {job.location.type}
          </p>
          <p className="text-lg text-gray-700 mb-8">{job.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <p className="text-lg font-semibold text-gray-800">{job.type}</p>
            {job.applyUrl && (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 ease-in-out"
              >
                Apply Now
              </a>
            )}
          </div>
          {job.skills && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Skills Required:
              </h2>
              <ul className="list-disc list-inside">
                {job.skills.map((skill, index) => (
                  <li key={index} className="text-gray-600">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {job.benefits && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Benefits:
              </h2>
              <ul className="list-disc list-inside">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {job.salaryRange && (
            <p className="text-lg text-gray-700 mb-4">
              Salary Range: ${job.salaryRange.min} - ${job.salaryRange.max}
            </p>
          )}
          {job.experienceLevel && (
            <p className="text-lg text-gray-700 mb-4">
              Experience Level: {job.experienceLevel}
            </p>
          )}
          {job.remoteOptions && (
            <p className="text-lg text-gray-700 mb-4">
              Remote Options:{" "}
              {job.remoteOptions.flexibleHours
                ? "Flexible Hours"
                : "Fixed Hours"}
              {job.remoteOptions.timezone &&
                `, Timezone: ${job.remoteOptions.timezone}`}
            </p>
          )}
          {job.department && (
            <p className="text-lg text-gray-700 mb-4">
              Department: {job.department}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
