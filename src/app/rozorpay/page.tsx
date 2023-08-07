"use client";


import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function Home() {
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  useEffect(() => {
    initializeRazorpay();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/form");
        const receivedFormData = response.data.data;
        console.log("received", receivedFormData);
        console.log("received first name and last", receivedFormData.firstName);
        
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  const makePayment = async () => {
    if (!paymentInitialized) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const data = await fetch("/api/users/rozorpay", { method: "POST" }).then((response) => response.json());    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: "OPF",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you",
      handler: function (response: any) {
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

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      setPaymentInitialized(true);
    };
    script.onerror = () => {
      setPaymentInitialized(false);
    };
    document.body.appendChild(script);
  };

  return (
    <div className="font-Inter h-screen overflow-auto bg-gradient-to-r from-blue-400 to-blue-500">
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
