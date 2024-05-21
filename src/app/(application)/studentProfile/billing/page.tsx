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
      <h2 className="text-2xl font-bold mb-4">Billing List</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <>
          {billingItems.length === 0 ? (
            <p>No billing items available</p>
          ) : (
            <div className="p-6 mt-8 bg-lime-100 dark:bg-zinc-800 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                Transactions
              </h2>

              <table className="min-w-full bg-white dark:bg-zinc-800 border border-zinc-300 rounded-lg overflow-hidden">
                <thead className="bg-lime-200 dark:bg-zinc-700">
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-zinc-600 dark:text-zinc-300">
                      DATE
                    </th>
                    <th className="py-2 px-4 border-b text-left text-zinc-600 dark:text-zinc-300">
                      Order ID
                    </th>
                    <th className="py-2 px-4 border-b text-left text-zinc-600 dark:text-zinc-300">
                      Payment ID
                    </th>
                    <th className="py-2 px-4 border-b text-left text-zinc-600 dark:text-zinc-300">
                      Status
                    </th>
                    <th className="py-2 px-4 border-b text-left text-zinc-600 dark:text-zinc-300">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billingItems.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-zinc-100 dark:hover:bg-zinc-700 ${
                        index % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800" : ""
                      }`}
                    >
                      <td className="py-2 px-4 border-b">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b">{item.orderId}</td>
                      <td className="py-2 px-4 border-b">{item.paymentId}</td>
                      <td className="py-2 px-4 border-b">
                        {item.status === "success" ? (
                          <span className="text-green-500 font-black uppercase">
                            {item.status}
                          </span>
                        ) : (
                          <span className="text-red-500">{item.status}</span>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {item.amount} {item.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-zinc-600 dark:text-zinc-300">Show</span>
                  <select className="border border-zinc-300 rounded-lg p-2 dark:bg-zinc-700 dark:text-zinc-300">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                  <span className="text-zinc-600 dark:text-zinc-300">
                    entries
                  </span>
                </div>
                <div className="text-zinc-600 dark:text-zinc-300">
                  Showing 1 to {Math.min(billingItems.length, 10)} of{" "}
                  {billingItems.length} entries
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BillingList;
