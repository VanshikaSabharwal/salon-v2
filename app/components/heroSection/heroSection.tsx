import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center px-6 sm:px-12 lg:px-16 min-h-screen">
      {/* Background Image with Blur Effect */}
      <div className="absolute inset-0">
        <Image
          src="/images/opt-hero-1.png" // Background Image
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-40 blur-sm"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-7xl mx-auto">
        {/* Left Section: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg italic text-[#d4af37] mb-2">
            Comfortable • Affordable • Amazing-Services
          </p>
          <h1 className="text-3xl sm:text-3xl leading-tight">
            Welcome to <br />{" "}
            <span className="text-[#d4af37] pt-6 font-bold text-4xl font-merienda">
              K-Style Professional
            </span>
          </h1>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
            {/* Book Now button */}
            <Link href="https://wa.me/+918989896108">
              <button className="bg-[#d4af37] text-gray-900 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-md text-lg sm:text-xl hover:bg-[#b9962c] transition duration-300">
                Book Now
              </button>
            </Link>

            {/* Call Us button */}
            <Link href="tel:+918989896108">
              <button className="bg-transparent border-2 border-[#d4af37] text-[#d4af37] font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-md text-lg sm:text-xl hover:bg-[#d4af37] hover:text-gray-900 transition duration-300 mt-4 sm:mt-0">
                Call Us +918989896108
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
