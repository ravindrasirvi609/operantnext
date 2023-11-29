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
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options as any);
  }

  return (
    <div className="bg-lime-100 absolute inset-x-0 top-0 z-50">
      <div className="flex flex-col items-center justify-center min-h-screen mt-2">
        <h1 className=" p-2 text-3xl font-extrabold mb-4 text-sky-800">
          Upcoming Events
        </h1>

        {eventData ? (
          <div>
            {eventData.map((event) => (
              <div
                key={event._id}
                className="text-black bg-sky-200 border-green-600 shadow-lg shadow-green-950	 border-2	 p-6 w-90 align-center  m-5"
              >
                <h1 className="font-extrabold text-4xl text-center text-black capitalize">
                  {event.title}
                </h1>
                <div className="flex justify-between">
                  <p className="m-3 p-2 bg-violet-700 rounded-lg	 font-extrabold hover:bg-violet-300 text-white hover:text-black">
                    <Link href="/rozorpay">Join here</Link>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold flex justify-end">
                      {formatDate(event.date)}
                    </span>
                    <div>
                      {event.location.address}, {event.location.city},{" "}
                      {event.location.state}, {event.location.country}
                    </div>
                  </p>
                </div>
                {event.isPaid ? (
                  <p className="mb-2">
                    <span className="font-semibold">Price:</span> {event.price}
                  </p>
                ) : (
                  <p className="mb-2">
                    <span className="font-semibold">Price:</span> Free
                  </p>
                )}
                <p className="mb-2">
                  <span className="font-semibold">Categories:</span>{" "}
                  {event.categories.join(", ")}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Capacity:</span>{" "}
                  {event.capacity} Members
                </p>
                <p className="mb-2">
                  <span className="font-semibold italic">Description:</span>{" "}
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading event data...</p>
        )}
      </div>
    </div>
  );
}
