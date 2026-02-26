"use client";

import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="bg-[#f8f1e7] py-16 px-6 md:px-12">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div className="relative w-full h-[350px] md:h-[450px]">

          <Image
            src="/images/opt-hero-2.png"
            alt="Salon Interior"
            fill
            className="object-cover rounded-xl shadow-lg"
          />

        </div>

        {/* Content */}
        <div>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#3f3a6e]">

            About Our Salon

          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">

            Welcome to our salon — a place where beauty meets relaxation.
            Our experienced professionals are dedicated to providing
            premium beauty and wellness services tailored to your needs.

            From stylish haircuts and rejuvenating facials to relaxing
            manicures and expert hair coloring, we ensure every visit
            leaves you feeling confident and refreshed.

          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">

            We believe self-care is essential, and our goal is to create
            a warm, comfortable environment where you can unwind while
            receiving exceptional service.

          </p>

          {/* Highlights */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="bg-white p-4 rounded-lg shadow">

              <h3 className="font-semibold text-[#3f3a6e]">

                10+ Years Experience

              </h3>

              <p className="text-sm text-gray-600">

                Trusted by hundreds of happy clients.

              </p>

            </div>

            <div className="bg-white p-4 rounded-lg shadow">

              <h3 className="font-semibold text-[#3f3a6e]">

                Expert Professionals

              </h3>

              <p className="text-sm text-gray-600">

                Certified stylists and beauty experts.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutSection;