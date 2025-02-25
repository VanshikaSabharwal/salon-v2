import React from "react";

const Footer = () => {
  // Access location from environment variable
  const location = process.env.REACT_APP_LOCATION_URL;

  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2c2a4a] text-center py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
          {/* Address Section */}
          <div className="address-section mb-4 sm:mb-0 sm:w-1/3">
            <h4 className="text-lg font-semibold">Address</h4>
            <p>
            Bus stand, 13-14 Katju market, Sailana, near Chetak Bridge,<br />
              Ratlam, Madhya Pradesh<br />
              457001
            </p>
          </div>

          {/* Contact Section */}
          <div className="contact-section mb-4 sm:mb-0 sm:w-1/3">
            <h4 className="text-lg font-semibold">Contact</h4>
            <p>
              <a
                href="mailto:contact@kstyle.com"
                className="text-blue-400 hover:text-blue-600"
              >
                Email: contact@kstyle.com
              </a>
            </p>
            <p>
              <a
                href="tel:+918989896108"
                className="text-blue-400 hover:text-blue-600"
              >
                Phone: +918989896108
              </a>
            </p>
          </div>

          {/* Map Section */}
          <div className="map-section sm:w-1/3">
            <h4 className="text-lg font-semibold">Find Us</h4>
            <a
              href={location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              Click here to view on Google Maps
            </a>
          </div>
        </div>

        {/* Footer Copyright */}
        <p className="mt-6 text-sm">&copy; {currentYear} K-Style Professional. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
