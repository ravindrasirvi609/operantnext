"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Jobs() {
  return (
    <section className="overflow-hidden bg-slate-300">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <Image
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src="/opflogo.png"
            alt="OPF Logo"
            height={800}
            width={800}
          />

          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              Recently posted
            </h2>
            <h1 className="my-4 text-3xl font-semibold text-black">
              Senior Product Designer (Remote)
            </h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27l-5.74 3.28 1.1-6.42L2.38 9.22l6.44-.94L12 2l2.18 6.28 6.44.94-4.98 4.91 1.1 6.42z" />
                  </svg>
                ))}
              </span>
              <span className="ml-3 inline-block text-xs font-semibold">
                4 Reviews
              </span>
            </div>

            <p className="leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
              rem amet repudiandae neque adipisci eum enim, natus illo inventore
              totam?
            </p>

            <div className="my-4">
              <span className="text-sm font-semibold">Job type:</span>
              <span className="ml-2 text-sm text-gray-600">Full Time</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Location:</span>
              <span className="ml-2 text-sm text-gray-600">Remote</span>
            </div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
