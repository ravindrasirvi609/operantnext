"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Event {
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  _id: string;
  title: string;
  date: string;
  description: string;
  isPaid: boolean;
  price: number;
  registrationUrl: string;
  organizer: string;
  categories: string[];
  capacity: number;
  attendees: string[];
  __v: number;
}

export default function EventList() {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event[] | null>(null);

  const getEventList = async () => {
    try {
      const res = await axios.get("/api/events/eventLists");
      console.log("res", res);
      setEventData(res.data); // Set 'eventData' with response data
    } catch (error) {
      toast.error("Failed to get event details");
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  function formatDate(dateString: string | number | Date) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options as any );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-2">
      <h1 className="bg-purple-900 rounded-lg p-2 text-3xl font-semibold mb-4 text-white">Event List</h1>
      <div className="bg-purple-400 rounded-lg p-6 shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {eventData ? (
          <div>
            {eventData.map((event, index) => (
              <div key={event._id}>
                <p className="mb-2">
                  <span className="font-semibold">Title:</span> {event.title}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {event.description}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Date:</span>{" "}
                  {formatDate(event.date)}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Is Paid:</span>{" "}
                  {event.isPaid.toString()}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Price</span> {event.price}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Registration</span>{" "}
                  {event.registrationUrl}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Categories</span>{" "}
                  {event.categories}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Capacity</span>{" "}
                  {event.capacity} Members
                </p>
                
                <p className="mb-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {event.location.address}, {event.location.city},{" "}
                  {event.location.state},{event.location.country}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading event data...</p>
        )}
      </div>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
          Logout
        </button> */}
    </div>
  );
}
