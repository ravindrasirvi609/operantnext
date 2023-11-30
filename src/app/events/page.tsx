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
  organizerDetails: {
    name: string;
    email: string;
  };
}

export default function EventList() {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event[] | null>(null);

  const getEventList = async () => {
    try {
      const res = await axios.get("/api/events/eventLists");
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
    <div className="bg-gradient-to-b from-purple-500 to-blue-600 absolute inset-x-0 top-0 z-50">
      <div className="flex flex-col items-center justify-center min-h-screen mt-2">
        <h1 className="p-4 text-5xl font-extrabold mb-6 text-white">
          Discover Upcoming Events
        </h1>

        {eventData ? (
          <div>
            {eventData.map((event) => (
              <div
                key={event._id}
                className="text-white bg-gray-800 border-green-600 shadow-lg border-2 p-6 w-auto align-center m-5 rounded-md"
              >
                <h1 className="font-extrabold text-4xl text-center capitalize mb-8">
                  {event.title}
                </h1>
                <div className="flex justify-between mb-6">
                  <p className="m-3 p-2 bg-indigo-700 rounded-lg font-extrabold hover:bg-indigo-300 text-white hover:text-black">
                    <Link href={`/events/${event._id}`}>Details & RSVP</Link>
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold flex justify-end mb-2 text-center">
                      {formatDate(event.date)}
                    </span>
                    <div className="text-gray-400 text-center">
                      {event.location.address}, {event.location.city},{" "}
                      {event.location.state}, {event.location.country}
                    </div>
                  </p>
                  <p>
                  <div>
                    {event.attendees.length}{" "}
                    {event.attendees.length === 1 ? "person" : "people"} going
                  </div>
                  <div className="m-3 p-2 bg-indigo-700 rounded-lg font-extrabold hover:bg-indigo-300 text-white hover:text-black">
                    <Link href={`/rozorpay/${event._id}`}>join this event</Link>
                  </div>
                  </p>
                
                </div>
                {event.isPaid ? (
                  <p className="mb-2 m-3">
                    <span className="text-yellow-400 text-2xl	font-bold bg-gray-950 rounded-lg p-2">
                      {event.price}
                    </span>
                  </p>
                ) : (
                  <p className="mb-2 m-3">
                    <span className="text-green-400 font-bold text-2xl bg-gray-950 rounded-lg p-2">
                      Free
                    </span>
                  </p>
                )}
                <p className="mb-2 mt-6">
                  <span className="font-semibold">Categories:</span>{" "}
                  {event.categories.map((category) => (
                    <span
                      key={category}
                      className="mr-2 p-1 bg-indigo-500 rounded-md"
                    >
                      {category}
                    </span>
                  ))}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Capacity:</span>{" "}
                  <span className="text-yellow-400">{event.capacity}</span>{" "}
                  Members
                </p>
                <p className="m-2">
                  <span className="font-semibold italic text-justify">
                    Description:
                  </span>{" "}
                  {event.description}
                </p>

                {/* Additional Information */}
                <div className="mt-4">
                  <p className="text-xl font-semibold text-yellow-500 mb-2">
                    Hosted by {event.organizerDetails.name}
                  </p>
                  <p className="text-gray-300">
                    Join us for an incredible experience! Connect with industry
                    experts, learn new skills, and be part of a vibrant
                    community. Don t miss out!
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">Loading event data...</p>
        )}
      </div>
    </div>
  );
}
