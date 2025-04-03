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
  FaYoutube,
} from "react-icons/fa";
import socialsData from "../../../data/socials.json";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const socials = socialsData;

  // Map social names to corresponding React Icons
  const icons: Record<string, React.ReactNode> = {
    WhatsApp: <FaWhatsapp aria-hidden="true" />,
    Phone: <FaPhone aria-hidden="true" />,
    Instagram: <FaInstagram aria-hidden="true" />,
    LinkedIn: <FaLinkedinIn aria-hidden="true" />,
    Facebook: <FaFacebook aria-hidden="true" />,
    Twitter: <FaTwitter aria-hidden="true" />,
    YouTube: <FaYoutube aria-hidden="true" />,
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenuOnOutsideClick = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".navbar-container")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", closeMenuOnOutsideClick);
    } else {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    }

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-black text-white p-5 shadow-md navbar-container">
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
            {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
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
                {["/", "/services", "/gallery", "/contact"].map((route, index) => (
                  <li key={index}>
                    <Link
                      href={route}
                      className={`text-2xl lg:text-xl transition duration-300 ${
                        pathname === route ? "text-[#e0b0ff] font-bold" : "hover:text-gray-400"
                      }`}
                      onClick={toggleMenu}
                    >
                      {route === "/" ? "Home" : route.substring(1).charAt(0).toUpperCase() + route.substring(2)}
                    </Link>
                  </li>
                ))}
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
