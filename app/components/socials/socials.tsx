"use client";
import React from "react";
import { useState } from "react";
import socials from "../../../data/socials.json";
import {
  FaWhatsapp,
  FaPhone,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Socials = () => {
  const [socialsData] = useState(socials); 
  const icons: Record<string, React.ReactNode> = {
    WhatsApp: <FaWhatsapp />,
    Phone: <FaPhone />,
    Instagram: <FaInstagram />,
    LinkedIn: <FaLinkedinIn />,
    Twitter: <FaTwitter />,
  };

  return (
    <div className="text-white bg-white p-5 shadow-md">
      {/* Social Links Below Navbar */}
      <div className="bg-gray-800 py-3 mt-4">
        <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center space-x-6 space-y-4 lg:space-y-0 lg:flex-row">
          {socialsData.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white text-sm hover:text-[#e0b0ff] transition-colors duration-300"
            >
              <span className="text-lg">{icons[social.name]}</span>
              <span className="hidden sm:inline">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socials;
