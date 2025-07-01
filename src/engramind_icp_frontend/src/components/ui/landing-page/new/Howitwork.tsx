import React from 'react';

export default function Howitwork() {
  return (
    <section className="mx-auto max-w-6xl container py-12 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-relaxed text-zinc-800 dark:text-zinc-100">
          How Eternity Chain Works
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-3xl leading-relaxed text-zinc-500 w-full sm:w-3/4 lg:w-xl">
          Three simple steps to create your living digital legacy
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row mt-14 gap-0 lg:gap-0">
        {/* sub set 1 & 2 */}
        <div className="flex flex-col lg:w-1/2">
          <div className="h-full py-8 sm:py-14 px-6 sm:px-8 border border-zinc-200 dark:border-zinc-700">
            <div className="h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center text-lg sm:text-xl rounded-full bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-600 text-white">
              1
            </div>
            <h4 className="text-xl sm:text-2xl mt-6 sm:mt-8 font-semibold text-zinc-800 dark:text-zinc-100">
              Reserve Your Digital Lot
            </h4>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-zinc-500">
              Secure your unique username on the blockchain and set up your
              personal Eternity Chain account.
            </p>
          </div>

          {/* section 2 */}
          <div className="py-8 sm:py-14 px-6 sm:px-8 border border-t-0 border-zinc-200 dark:border-zinc-700">
            <div className="h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center text-lg sm:text-xl rounded-full bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-600 text-white">
              2
            </div>
            <h4 className="text-xl sm:text-2xl mt-6 sm:mt-8 font-semibold text-zinc-800 dark:text-zinc-100">
              Upload Your Data
            </h4>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-zinc-500">
              Share your stories, knowledge, values, and experiences through
              text, audio, or video inputs.
            </p>
          </div>
        </div>

        {/* sub set 3 */}
        <div className="py-8 sm:py-14 px-6 sm:px-8 border border-t-0 lg:border-l-0 lg:border-t border-zinc-200 dark:border-zinc-700 flex flex-col justify-center items-start lg:w-1/2">
          <div className="h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center text-lg sm:text-xl rounded-full bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-600 text-white">
            3
          </div>
          <h4 className="text-xl sm:text-2xl mt-6 sm:mt-8 font-semibold text-zinc-800 dark:text-zinc-100">
            Meet Your AI Twin
          </h4>
          <p className="text-base sm:text-lg font-medium leading-relaxed text-zinc-500">
            {
              "Watch as our AI creates your digital twin 'Engram' that preserves your personality and wisdom."
            }
          </p>
        </div>
      </div>
    </section>
  );
}
