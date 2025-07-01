import React from 'react';

export default function TrustIndicator() {
  return (
    <section className="max-w-6xl lg:mx-auto flex flex-col md:flex-row items-center justify-between gap-12 border border-zinc-200 dark:border-none">
      {/* Left Side */}
      <div className="lg:w-3/5 py-14 px-8 border border-b-0 border-t-0 border-l-0 border-zinc-200 dark:border-none">
        <h2 className="text-3xl font-medium text-zinc-900 dark:text-white mb-4">
          Ready to Immortalize Your Legacy?{' '}
          <span className="text-purple-600 dark:text-purple-400">
            Start today.
          </span>
        </h2>
        <p className="text-zinc-400 dark:text-zinc-500 text-lg font-medium mb-8 max-w-xl leading-relaxed">
          Create a digital twin that preserves your wisdom, personality, and
          stories for generations to come.
        </p>
        <div className="flex flex-col sm:flex-row justify-between md:justify-start gap-4">
          <button className="bg-purple-600 dark:bg-purple-500 w-full sm:w-auto text-white font-semibold py-3 px-8 rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 transition">
            Reserve My Username
          </button>
          <button className="bg-purple-50 dark:bg-zinc-800 w-full sm:w-auto text-purple-600 dark:text-purple-400 font-semibold py-3 px-8 rounded-md hover:bg-purple-100 dark:hover:bg-zinc-700 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="lg:w-2/5 dark:bg-zinc-950 bg-white dark:border-none pb-8">
        <div className="flex flex-start flex-col justify-center items-center lg:justify-start lg:items-start">
          <span className="inline-block  w-fit bg-green-100 dark:bg-green-900 leading-relaxed text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            ✨ Limited Time Offer
          </span>
          <p className="text-2xl text-center font-medium mb-2 text-zinc-800 dark:text-zinc-200">
            First 500 registrations receive
          </p>
        </div>
        <h1 className="text-7xl text-center font-medium text-zinc-950 dark:text-white mb-1 mt-8">
          50%
          <span className="text-zinc-400 dark:text-zinc-500 text-sm mb-4">
            Discount
          </span>
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-4">
          Spots left:{' '}
          <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
            127
          </span>
        </p>
      </div>
    </section>
  );
}
