"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Plan {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  currency: string;
}

const PlanList: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/plans/planList");
      setPlans(response.data);
      console.log("response", response);
    }
    fetchData();
  }, []);

  const handleEdit = (plan: Plan) => {
    console.log("Editing plan:", plan);
  };

  const handleDelete = (plan: Plan) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      {plans.map((plan, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded focus:outline-none"
                onClick={() => handleEdit(plan)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none"
                onClick={() => handleDelete(plan)}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-2">{plan.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">
              Price: {plan.price} {plan.currency}
            </p>
            <p className={`text-${plan.isActive ? "green" : "red"}-500`}>
              {plan.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanList;
