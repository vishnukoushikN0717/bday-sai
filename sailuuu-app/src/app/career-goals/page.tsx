"use client";

import Link from "next/link";
import VideoMessageSection from "../components/VideoMessageSection";

export default function CareerGoals() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-300 mb-2">
            📹 Schedule a Video Message
          </h1>
          <p className="text-pink-100">
            Record and schedule video messages to be delivered at the perfect moment
          </p>
        </div>

        <VideoMessageSection />

        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="text-pink-300 hover:text-pink-200 flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-900/30 to-purple-900/30 hover:from-pink-800/40 hover:to-purple-800/40 transition-all duration-300 border border-pink-500/30 hover:border-pink-400/50 shadow-lg hover:shadow-pink-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
