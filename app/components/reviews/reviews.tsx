"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const supabase = createClientComponentClient();

const ReviewSection = () => {
  const [reviews, setReviews] = useState<{ id: string; name: string; text: string; rating: number }[]>([]);
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, text, rating, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(data || []);
      }
    };

    fetchReviews();
  }, []);

  // Detect screen width for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile if less than 768px (Tailwind 'md' breakpoint)
    };
    
    handleResize(); // Set on initial load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name.trim()) {
      setError("Name is required.");
      setIsSubmitting(false);
      return;
    }
    if (reviewText.length > 50) {
      setError("Review must be 50 characters or less.");
      setIsSubmitting(false);
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([{ name, text: reviewText, rating }])
      .select("*");

    if (error) {
      console.error("Error adding review:", error);
      setError("Something went wrong. Try again.");
    } else {
      setReviews((prevReviews) => [data[0], ...prevReviews].slice(0, 3));
      setReviewText("");
      setRating(0);
      setName("");
      setError("");
    }

    setIsSubmitting(false);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="bg-[#f8f1e7] max-w-3xl mx-auto p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Our Reviews</h2>

      {/* Conditional rendering: Carousel on mobile, Grid on Desktop */}
      <div className="mt-4">
        {reviews.length > 0 ? (
          isMobile ? (
            <Carousel
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              className="rounded-lg p-4 shadow"
            >
              {reviews.map((review) => (
                <div key={review.id} className="p-6 text-center rounded-lg">
                  <p className="text-yellow-500 text-lg mt-1">{"⭐".repeat(review.rating)}</p>
                  <p className="font-semibold text-lg text-gray-900">{review.name}</p>
                  <p className="text-gray-700 text-sm mt-2">{review.text}</p>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex space-x-4 justify-center">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 text-center bg-white rounded-lg shadow-md w-1/3">
                  <p className="text-yellow-500 text-lg mt-1">{"⭐".repeat(review.rating)}</p>
                  <p className="font-semibold text-lg text-gray-900">{review.name}</p>
                  <p className="text-gray-700 text-sm mt-2">{review.text}</p>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-center text-gray-500 mt-4">No reviews yet.</p>
        )}
      </div>

      {/* Review Form */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800">Leave a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your review (max 50 characters)"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={50}
          />
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => handleStarClick(i)}
              >
                ★
              </span>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black text-white px-4 py-2 rounded-lg transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
