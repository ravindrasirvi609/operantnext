"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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
    <div className="container mx-auto p-4 bg-lime-200">
      <Head>
        <title>{event.title} - Event Details</title>
      </Head>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4 transform transition-transform hover:scale-105">
          <Image
            src="https://images.unsplash.com/photo-1712846040326-a3d06c0b1667?q=80&w=3424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={event.title}
            width={500}
            height={300}
            className="rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          />
        </div>
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
          <p className="text-gray-600 mb-4">
            {event.location.address}, {event.location.city},{" "}
            {event.location.state}, {event.location.country}
          </p>
          <p className="text-lg mb-4">{event.description}</p>
          <div className="flex items-center space-x-4">
            {event.isPaid ? (
              <p className="text-green-500 text-xl font-semibold">
                Price: ${event.price}
              </p>
            ) : (
              <p className="text-green-500 text-xl font-semibold">Free Event</p>
            )}
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 ease-in-out"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Organizer Details</h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
          <p className="text-lg mb-2">Name: {event.organizerDetails.name}</p>
          <p className="text-lg mb-2">Email: {event.organizerDetails.email}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Event Categories</h2>
        <ul className="list-disc list-inside space-y-2">
          {event.categories.map((category, index) => (
            <li key={index} className="text-gray-600 text-lg">
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Event Capacity</h2>
        <p className="text-lg">
          {event.attendees.length} / {event.capacity}
        </p>
      </div>
    </div>
  );
};

export default EventDetailsPage;
