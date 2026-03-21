"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    // ✅ Validate credentials
    if (email === savedEmail && password === savedPassword) {
      alert("✅ Login successful!");

      // Save session details
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", email.split("@")[0]); // derive name
      localStorage.setItem("email", email);

      // Redirect to dashboard
      router.push("/taxfiler");
    } else {
      alert("❌ Invalid credentials. Please try again or sign up first.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100 px-4">
      <div className="bg-slate-800/70 p-8 rounded-2xl shadow-xl border border-slate-700 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-white placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}

