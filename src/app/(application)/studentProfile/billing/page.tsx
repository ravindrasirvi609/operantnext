"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface BillingItem {
  _id: string;
  orderId: string;
  paymentId: string;
  signature: string;
  amount: number;
  currency: string;
  status: string;
  user: string;
  createdAt: string;
}

const BillingList: React.FC = () => {
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/api/payments/transactionList")
      .then((response) => {
        setBillingItems(response.data.transactions);
        setLoading(false);
        console.log(response.data.transactions);
      })
      .catch((error) => {
        console.error("Error fetching billing items:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-xl font-bold mb-4">Billing List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {billingItems.length === 0 ? (
            <p>No billing items available</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {billingItems.map((item) => (
                <li key={item._id} className="py-2">
                  <span className="text-gray-700 font-bold">Order ID:</span>{" "}
                  {item.orderId}
                  <br />
                  <span className="text-gray-700 font-bold">
                    Payment ID:
                  </span>{" "}
                  {item.paymentId}
                  <br />
                  <span className="text-gray-700 font-bold">Amount:</span>{" "}
                  {item.amount} {item.currency}
                  <br />
                  <span className="text-gray-700 font-bold">Status:</span>{" "}
                  {item.status}
                  <br />
                  <span className="text-gray-700 font-bold">
                    Transaction Date:
                  </span>{" "}
                  {new Date(item.createdAt).toLocaleString()}
                  <br />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default BillingList;
