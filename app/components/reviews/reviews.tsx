"use client";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import reviewData from "../../../data/review.json";

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

const ReviewSection = () => {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Load JSON reviews
  useEffect(() => {

    try {

      setReviews(reviewData as Review[]);

    } catch (error) {

      console.error("Error loading reviews:", error);

    }

  }, []);

  // Detect mobile screen
  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 768);

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  return (

    <div className="bg-[#f8f1e7] max-w-5xl mx-auto p-6 rounded-lg">

      <h2 className="text-2xl font-bold text-center text-gray-800">

        Our Reviews

      </h2>

      <div className="mt-6">

        {reviews.length > 0 ? (

          isMobile ? (

            <Carousel
              showArrows
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              className="rounded-lg p-4 shadow"
            >

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="p-6 text-center rounded-lg"
                >

                  <p className="text-yellow-500 text-lg">

                    {"⭐".repeat(review.rating)}

                  </p>

                  <p className="font-semibold text-lg text-gray-900">

                    {review.name}

                  </p>

                  <p className="text-gray-700 text-sm mt-2">

                    {review.text}

                  </p>

                </div>

              ))}

            </Carousel>

          ) : (

            <div className="flex flex-wrap gap-6 justify-center">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="p-5 text-center bg-white rounded-lg shadow-md w-[300px]"
                >

                  <p className="text-yellow-500 text-lg">

                    {"⭐".repeat(review.rating)}

                  </p>

                  <p className="font-semibold text-lg text-gray-900">

                    {review.name}

                  </p>

                  <p className="text-gray-700 text-sm mt-2">

                    {review.text}

                  </p>

                </div>

              ))}

            </div>

          )

        ) : (

          <p className="text-center text-gray-500 mt-4">

            No reviews available.

          </p>

        )}

      </div>

    </div>

  );

};

export default ReviewSection;