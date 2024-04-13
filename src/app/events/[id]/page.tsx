"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const EventDetailsPage: React.FC = ({ params }: any) => {
  const id = params.id;

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.post(`/api/events/eventDetails`, { id });
        const eventData = response.data;
        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString: string | number | Date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options as any);
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-300">
      <h1 className="text-3xl font-semibold text-center mb-8">
        {event?.title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          <Image
            src="https://images.unsplash.com/photo-1712846040326-a3d06c0b1667?q=80&w=3424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={event?.title}
            width={800}
            height={500}
            className="object-cover w-full h-64 transition-opacity duration-300 hover:opacity-80"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{event?.title}</h2>
            <p className="text-gray-600 mb-2">{event?.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-indigo-600 font-semibold">
                {event?.isPaid ? `$${event?.price}` : "Free"}
              </span>
              <Link
                href={event?.registrationUrl}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Event Details</h3>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {formatDate(event?.date)}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {event?.location.address},{" "}
              {event?.location.city}, {event?.location.state},{" "}
              {event?.location.country}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Organizer:</strong> {event?.organizerDetails?.name} (
              {event?.organizerDetails?.email})
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Capacity:</strong> {event?.capacity} attendees
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Categories:</strong> {event?.categories.join(", ")}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Attendees:</strong> {event?.attendees.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
