"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Home() {
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  useEffect(() => {
    initializeRazorpay();
  }, []);

  const makePayment = async () => {
    if (!paymentInitialized) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const response = await axios.post("/api/users/rozorpay");
      const data = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: "OPF",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you",
        handler: async function (response: any) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);

          // Download the invoice PDF
          try {
            const invoiceResponse = await axios.post("/api/users/invoice");
            const blob = new Blob([invoiceResponse.data], {
              type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice_${data.id}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error("Error downloading invoice:", error);
            Swal.fire("An error occurred while downloading the invoice.");
          }
        },
        // ...rest of your options...
      };
      console.log("Invoice", options);

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      Swal.fire(error.message);
    }
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
