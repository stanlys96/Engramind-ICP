import { LockClosedIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Hero() {
  const imageAsset = [
    "/assets/image.png",
    "/assets/image2.png",
    "/assets/image3.png",
    "/assets/image4.png",
  ];

  return (
    <section className="pt-24 pb-12 container mx-auto px-4 lg:max-w-6xl">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-zinc-800 dark:text-zinc-100 text-center">
          Secure Your <span className="text-purple-700">Legacy.</span>
        </h1>
        <p className="text-center text-zinc-400 text-lg sm:text-xl lg:text-2xl w-full sm:w-3/4 lg:w-lg mt-4">
          Turn your life’s memories into digital treasures that live forever on
          the blockchain.
        </p>
        <button className="mt-8 sm:mt-10 lg:mt-12 px-4 py-2 flex items-center gap-x-2 bg-purple-600 leading-relaxed text-white rounded-md hover:bg-purple-700 transition duration-300 ease-in-out text-base sm:text-lg">
          <LockClosedIcon />
          Secure Your Slot
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 my-8 sm:my-10 lg:my-12">
        {imageAsset.map((image, index) => (
          <div key={index} className="relative w-full">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className=""
              width={400}
              height={600}
            />
            <div className="absolute inset-0 dark:bg-black dark:opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mb-8 sm:mb-10 lg:mb-12 mt-16 sm:mt-18 lg:mt-20 px-4">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-800 dark:text-zinc-100 max-w-full sm:max-w-2xl lg:max-w-3xl text-center">
          Digitalized your loved ones, instantly and securely connected through
          the Solana blockchain.
        </h3>
      </div>
    </section>
  );
}
