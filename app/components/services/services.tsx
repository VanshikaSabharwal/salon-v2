"use client";

import Image from "next/image";
import servicesData from "../../../data/services.json";

interface Service {
  id: number;
  iconSrc: string;
  iconType: "image" | "video";
  iconAlt: string;
  title: string;
  description: string;
}

const ServicesPage = () => {

  const services = servicesData as Service[];

  return (
    <div className="bg-[#f8f1e7] text-black text-center px-4 sm:px-6 md:px-10 py-12 md:py-20 min-h-screen">

      <header className="mb-12">

        <h1 className="text-xl md:text-3xl font-semibold text-[#3f3a6e]">
          Our Salon Services
        </h1>

        <p className="text-lg mt-4 text-[#6f6f6f]">
          Discover our premium services designed to pamper you.
        </p>

      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

        {services.map((service) => (

          <div
            key={service.id}
            className="bg-white shadow-lg rounded-xl p-6 text-left"
          >

            <div className="mb-4">

              {service.iconType === "image" ? (

                <Image
                  src={service.iconSrc}
                  alt={service.iconAlt}
                  width={300}
                  height={200}
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform"
                />

              ) : (

                <video
                  src={service.iconSrc}
                  controls
                  className="w-full h-64 object-cover rounded-lg"
                />

              )}

            </div>

            <h3 className="text-xl font-semibold text-[#3f3a6e]">

              {service.title}

            </h3>

            <p className="text-gray-600 mt-2">

              {service.description}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ServicesPage;