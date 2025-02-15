"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import ServicesPage from "../components/services/services";

const Page = () => {
  const router = useRouter(); // Initialize the router

  const handleBack = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 mb-4"
      >
        Back
      </button>
      <ServicesPage />
    </div>
  );
};

export default Page;
