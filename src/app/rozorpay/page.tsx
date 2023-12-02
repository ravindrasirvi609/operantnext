"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface planDetails {
  planId?: string;
  price: number;
  currency: string;
}

export default function Home() {
  const [paymentInitialized, setPaymentInitialized] = useState(false);
  const [planDetails, setPlanDetails] = useState<planDetails>();


  useEffect(() => {
    GetPlansDetails();
    initializeRazorpay();
  }, []);

  const GetPlansDetails = async () => {
    const payload = {
      planId: "656abe776c566036dad189d7",
    }
    const response = await axios.post(  
      "/api/plans/plandetails", payload
    );
    const data = response.data;
    console.log("data", data);
    console.log("response", data.price , data.currency);
    setPlanDetails(data);

  };

  const makePayment = async () => {
    if (!paymentInitialized) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const payload = {
        amount: planDetails?.price,
        currency: planDetails?.currency,
        payment_capture: 1,
      };
      const response = await axios.post("/api/payments/rozorpay", payload);
      const data = response.data;
      console.log("data", data);

      const options = {
        // key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: "OPF",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thank you",
        handler: async function (response: any) {
          const payment = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: data.amount,
            currency: data.currency,
            status: "success",
          };

          // Send the payment details to your server for verification
          const resultRes = await axios.post(
            "/api/payments/transaction",
            payment
          );

          // join Event API After the payment has been Completed 
          const joinEvent = await axios.post(
            "/api/events/joinEvent",
            { id: "655266302eb91bdc1da242de" }
          );

          // Download the invoice PDF
          try {
            const json = {
              orderId: resultRes.data.transaction.orderId,
            };
            const invoiceResponse = await axios.post(
              "/api/payments/invoice",
              json,
              { responseType: "arraybuffer" } // Set the response type to arraybuffer
            );

            // Create a Blob from the received data
            const blob = new Blob([invoiceResponse.data], {
              type: "application/pdf",
            });

            // Create a link element and trigger a download
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `invoice_${data.id}.pdf`;

            // Append the link to the document body and trigger a click
            document.body.appendChild(link);
            setTimeout(() => {
              // Trigger a click to start the download
              link.click();

              // Remove the link from the document body after the click
              document.body.removeChild(link);
            }, 1000);
            // Remove the link from the document body
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
            {paymentInitialized && (
              <button
                onClick={makePayment}
                className="bg-gradient-to-r from-[#2E3137] to-[#1D2328] rounded-md w-full py-4 shadow-xl drop-shadow-2xl text-gray-300 font-bold"
              >
                Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
