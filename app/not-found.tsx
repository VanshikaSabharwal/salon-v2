import Link from "next/link";
import { notFound } from "next/navigation";

export default function NotFound() {
  notFound(); // This triggers the default 404 behavior

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-10">
      <h1 className="text-4xl font-semibold text-red-600">
        Oops! Page Not Found
      </h1>
      <p className="text-lg mt-4 text-gray-700">
        The page you&apos;re looking for doesn&apos;t exist. Please check the
        URL or go back to the homepage.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go to Homepage
      </Link>
    </div>
  );
}
