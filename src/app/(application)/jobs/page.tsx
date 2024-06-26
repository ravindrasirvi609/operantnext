"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: Location;
  description: string;
  type: string;
  applyUrl: string;
  companyLogo: string;
}

const JobListPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/api/Jobs/jobList`);
        const jobData = response.data;
        setJobs(jobData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Loading...</h1>
          <div className="mt-4">
            <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8 bg-lime-100">
      <h1 className="text-3xl font-semibold text-center mb-8">Job List</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-xl font-semibold mb-4">
          No job is listed
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={job.companyLogo}
                alt={`${job.company} Logo`}
                width={800}
                height={500}
                className="object-cover w-full h-64 transition-opacity duration-300 hover:opacity-80"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <p className="text-gray-600 mb-2">{`${job.location.address}, ${job.location.city}, ${job.location.state}, ${job.location.country}`}</p>
                <p className="text-gray-600 mb-2">{job.type}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                  {job.applyUrl && (
                    <Link
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Apply Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListPage;
