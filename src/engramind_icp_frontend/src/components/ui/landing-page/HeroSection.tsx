import React from "react";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto dark:bg-zinc-950">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 mb-6">
            Immortalize Your Legacy with
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              {" "}
              AI + Web3
            </span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-200 mb-8">
            Turn your life memories into a living, interactive AI bound forever
            on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-colors">
              Get Started
            </button>
            <button className="hidden px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors">
              Reserve My Spot
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute -z-10 w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-200 rounded-full opacity-50 blur-3xl top-0 right-0 sm:-right-6 md:-right-10 hidden xs:block"></div>
          <div className="rounded-2xl shadow-lg bg-white dark:bg-zinc-950 p-4 relative aspect-video">
            <img
              src="/image.jpeg"
              alt="AI Digital Legacy"
              width={600}
              height={400}
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
