"use client"

import { useEffect } from 'react';

export default function EventPayment({ params }: any) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.setAttribute('data-payment_button_id', 'pl_N4jERjvSTSsI91');

    document.querySelector('form')?.appendChild(script);

    return () => {
      // Cleanup when the component is unmounted
      document.querySelector('form')?.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Event Transaction Id</h1>
      <hr />
      <p className="text-2xl">
        <span>{params.id}</span>
      </p>

      {/* Razorpay payment button form */}
      <form />
    </div>
  );
}
