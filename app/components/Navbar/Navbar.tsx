"use client";

import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaPhone,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaFacebook,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import socialsData from "../../../data/socials.json";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const socials = socialsData;

  // Map social names to corresponding React Icons
  const icons: Record<string, React.ReactNode> = {
    WhatsApp: <FaWhatsapp />,
    Phone: <FaPhone />,
    Instagram: <FaInstagram />,
    LinkedIn: <FaLinkedinIn />,
    Facebook: <FaFacebook />,
    Twitter: <FaTwitter />,
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-black text-white p-5 shadow-md">
      {/* Navbar Section */}
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="logo">
          <h1 className="text-3xl font-semibold font-merienda">
            K Style Professional
          </h1>
        </div>
        <div className="relative">
          {/* Hamburger Icon (Visible on mobile) */}
          <button
            className="lg:hidden text-white text-3xl z-50 relative"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Dropdown Menu */}
          <div
            className={`${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } fixed top-0 right-0 w-full h-full bg-black bg-opacity-95 lg:bg-transparent lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none z-40`}
          >
            <div className="flex flex-col h-full justify-center items-center lg:flex-row lg:justify-end lg:h-auto lg:space-x-8">
              {/* Navigation Links */}
              <ul className="flex flex-col items-center space-y-6 mb-8 lg:flex-row lg:space-x-8 lg:space-y-0 lg:mb-0">
                <li>
                  <Link
                    href="/"
                    className="text-2xl lg:text-xl hover:text-gray-400 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-2xl lg:text-xl hover:text-gray-400 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-2xl lg:text-xl hover:text-gray-400 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-2xl lg:text-xl hover:text-gray-400 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex justify-center space-x-6 lg:ml-6">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl hover:text-[#e0b0ff] transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    {icons[social.name]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
