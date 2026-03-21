"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100 flex flex-col items-center px-4 py-10">
      {/* Header */}
      <header className="flex justify-between w-full max-w-6xl items-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white">
          TAX <span className="text-blue-400">&</span> GUY
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-medium transition-all"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white font-medium transition-all"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Introduction */}
      <motion.section
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Simplify Your Tax Filing with <span className="text-blue-400">AI</span>
        </h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          TAX & GUY helps individuals, freelancers, and professionals prepare and file taxes effortlessly using
          advanced AI. Upload your documents, answer simple questions, and let our AI handle the rest.
        </p>
        <p className="text-gray-400 italic mb-10">
          “Because taxes shouldn’t be stressful — they should be smart.”
        </p>
      </motion.section>

      {/* Goals Section */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-slate-800/70 p-6 rounded-2xl shadow-lg border border-slate-700 hover:shadow-blue-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-blue-400">What We Do</h3>
          <p>We analyze your income, deductions, and documents to maximize your tax savings using AI-driven insights.</p>
        </div>
        <div className="bg-slate-800/70 p-6 rounded-2xl shadow-lg border border-slate-700 hover:shadow-green-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-green-400">Our Goals</h3>
          <p>To make tax filing effortless, accurate, and stress-free for every Indian taxpayer — powered by technology.</p>
        </div>
        <div className="bg-slate-800/70 p-6 rounded-2xl shadow-lg border border-slate-700 hover:shadow-purple-500/30 transition-all">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Why Choose Us</h3>
          <p>Simple UI, expert-backed logic, and AI suggestions tailored to your income, investments, and lifestyle.</p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        © 2025 TAX N GUY — Empowering Smarter Tax Decisions
      </footer>
    </main>
  );
}




