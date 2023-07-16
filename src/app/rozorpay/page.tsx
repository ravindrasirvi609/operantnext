"use client";


import Head from "next/head";
import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/users/rozorpay", { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "OPF",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou",
      handler: function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Ravindra Choudhary",
        email: "sirviravindra609@gmail.com",
        contact: "8107199052",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#31c14e] to-[#1a3e85]">
      <Head>
        <title>Integrate Payments 🔥</title>
        <meta
          name="description"
          content="Integrate payments in your React and Next.js application with TailwindCSS and Razorpay"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center max-w-6xl justify-evenly mx-auto">
        <div className="md:w-1/3 mb-20 md:mb-0 mx-10">
          <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4">
            <button
              onClick={makePayment}
              
              className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-4 shadow-xl drop-shadow-2xl text-gray-300 font-bold"
            >
              payment 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
