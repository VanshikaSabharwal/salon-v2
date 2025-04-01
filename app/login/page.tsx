"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        router.push("/");
        router.refresh(); // Refresh to update auth state
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }
    
    setError("");
    setMessage("Sending password reset email...");

    try {
      const res = await fetch("/api/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage(data.message || "Password reset email sent. Check your inbox.");
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={isResetMode ? handlePasswordReset : handleLogin} className="p-6 bg-black shadow rounded w-80">
        <h1 className="text-xl font-bold mb-4 text-white">{isResetMode ? "Reset Password" : "Admin Login"}</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <div className="mb-4">
          <label className="block text-sm text-white font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 text-black py-2 border rounded"
            placeholder="Email"
            required
          />
        </div>
        {!isResetMode && (
          <div className="mb-4">
            <label className="block text-sm text-white font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border text-black rounded"
              placeholder="Password"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isResetMode ? "Send Reset Link" : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setIsResetMode(!isResetMode)}
          className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-600"
        >
          {isResetMode ? "Back to Login" : "Forgot Password"}
        </button>
      </form>
    </div>
  );
}
