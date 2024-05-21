import React from "react";
import Image from "next/image";

const Resources = () => {
  return (
    <>
      <div className="bg-pink-500">
        <div className="bg-purple-600 text-white p-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold">
              Your knowledge hub for global work
            </h1>
            <p className="mt-4">
              Learn the ins and outs of hiring, paying, and managing
              international talent.
            </p>
            <Image
              src="https://placehold.co/600x300"
              alt="Knowledge Hub"
              className="mx-auto mt-8"
              width={600}
              height={300}
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-full max-w-xs"
            />
            <select className="border p-2 rounded ml-4">
              <option>Filter</option>
            </select>
          </div>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">
              HR & workforce management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="HRIS Guide"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  The Ultimate HRIS Guide for Early-Stage Startups
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Job Offer Letter"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">Job Offer Letter Template</h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Confidentiality Agreement"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  Confidentiality Agreement Template
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="HR Tech Stack"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  A Guide to Creating the Ideal HR Tech Stack
                </h3>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Global hiring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Finding Global Talent"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">A Guide to Finding Global Talent</h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Borderless Hiring"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  A Guide to Compliant Borderless Hiring at Speed
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Global Hiring Process"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">A Guide to Global Hiring Process</h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Building Borderless Teams"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  Finding Flexibility: How to Build Borderless Teams
                </h3>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Global expansion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Scaling US Startups"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  A Guide to Scaling US Startups in the US
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Employer of Record"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  A Guide to Using an Employer of Record to De-risk...
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Building and Scaling"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  A Founders Guide to Building and Scaling a...
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Setting Up Local Entity"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  A Guide to Setting Up a Local Entity
                </h3>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Global payroll</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Global Payroll"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  The Case for Global Payroll Consolidation
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Payroll Checklist"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  Global Payroll Compliance Checklist
                </h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Global Payroll Template"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">Global Payroll Template</h3>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Global mobility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Relocating Employees"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">A Guide to Relocating Employees</h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Mobility Strategy"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">Guide to Global Mobility Strategy</h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Relocation Policy"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  Employee Relocation Policy Template
                </h3>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">
              State of Global Hiring Report
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Global Hiring Report"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">State of Global Hiring Report</h3>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Hiring Report 2022"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">
                  State of Global Hiring Report 2022
                </h3>
              </div>
            </div>
          </section>
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Worker experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <Image
                  src="https://placehold.co/100x100"
                  alt="Get Hired Hub"
                  className="mb-4"
                  width={100}
                  height={100}
                />
                <h3 className="font-bold">Get Hired Hub</h3>
              </div>
            </div>
          </section>
        </div>
        <div className="bg-zinc-100 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Join our monthly newsletter
            </h2>
            <p className="mb-4">
              The latest insights to locally and remote work straight to your
              inbox.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign me up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
