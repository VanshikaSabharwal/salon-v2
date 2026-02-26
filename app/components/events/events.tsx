"use client";

import Image from "next/image";
import Link from "next/link";
import events from "@/data/events.json";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

const EventsSection = () => {

  const previewEvents = (events as Event[]).slice(0,3);

  return (

    <section className="bg-[#f8f1e7] py-16 px-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center text-[#3f3a6e]">

          Upcoming Events

        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          {previewEvents.map((event)=> (

            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <p className="text-sm text-pink-500 font-semibold">

                  {event.date}

                </p>

                <h3 className="font-semibold text-lg text-black mt-2">

                  {event.title}

                </h3>

                <p className="text-gray-600 mt-2 text-sm">

                  {event.description}

                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Redirect Button */}

        <div className="text-center mt-10">

          <Link href="/events">

            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700">

              View All Events

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

};

export default EventsSection;