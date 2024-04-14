"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  applyUrl: string;
  companyLogo: string;
}

const JobDetailsPage: React.FC<{ params: any }> = ({ params }) => {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">{job.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          <Image
            src={job.companyLogo}
            alt={`${job.company} Logo`}
            width={800}
            height={500}
            className="object-cover w-full h-64 transition-opacity duration-300 hover:opacity-80"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{job.company}</h2>
            <p className="text-gray-600 mb-2">{job.location}</p>
            <p className="text-gray-600 mb-2">{job.type}</p>
            <p className="text-gray-600 mb-2">{job.description}</p>
            <div className="flex justify-between items-center mt-4">
              <Link
                href={`/jobs/${job._id}/apply`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Apply Now
              </Link>
              <Link
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                External Apply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
