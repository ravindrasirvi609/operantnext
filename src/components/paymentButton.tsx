"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface PaymentProps {
  price: number;
  id: string;
  enumType: string;
}

export default function Payment({ price, id, enumType }: PaymentProps) {
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  useEffect(() => {
    initializeRazorpay();
  }, []);

  const makePayment = async () => {
    if (!paymentInitialized) {
      Swal.fire("Error", "Razorpay SDK failed to load", "error");
      return;
    }

    try {
      const payload = {
        amount: price,
        currency: "INR",
        payment_capture: 1,
      };
      const response = await axios.post("/api/payments/rozorpay", payload);
      const data = response.data;

      const options = {
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

          // Join Event API After the payment has been completed
          if (enumType === "COURSE") {
            const joinCourse = await axios.post("/api/course/joinCourse", {
              courseId: id,
            });

            if (joinCourse.data.success) {
              Swal.fire({
                icon: "success",
                title: "Payment successful",
                text: "You have successfully joined the course",
              });
            }
          }

          if (enumType === "EVENT") {
            const joinEvent = await axios.post("/api/events/joinEvent", {
              eventId: id,
            });

            if (joinEvent.data.success) {
              Swal.fire({
                icon: "success",
                title: "Payment successful",
                text: "You have successfully joined the event",
              });
            }
          }

          // Download the invoice PDF
          try {
            const json = {
              orderId: resultRes.data.transaction.orderId,
            };
            const invoiceResponse = await axios.post(
              "/api/payments/invoice",
              json,
              {
                responseType: "arraybuffer",
              }
            );

            // Create a Blob from the received data
            const blob = new Blob([invoiceResponse.data], {
              type: "application/pdf",
            });

            // Create a link element and trigger a download
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `invoice_${data.id}.pdf`;

            document.body.appendChild(link);
            setTimeout(() => {
              link.click();
              document.body.removeChild(link);
            }, 1000);
          } catch (error) {
            console.error("Error downloading invoice:", error);
            Swal.fire(
              "Error",
              "An error occurred while downloading the invoice.",
              "error"
            );
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "8107199052",
        },
        notes: {
          address: "Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
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
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <div className="mb-4">
          {paymentInitialized && (
            <button
              onClick={makePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
