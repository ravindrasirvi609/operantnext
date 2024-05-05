"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

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
  image: string;
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Event List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventData?.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={500}
              height={300}
              className="object-cover w-full h-48 transition-opacity duration-300 hover:opacity-70"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-indigo-600 font-semibold">
                  {event.isPaid ? `${event.price}` : "Free"}
                </span>
                <Link
                  href={`/events/${event._id}`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
