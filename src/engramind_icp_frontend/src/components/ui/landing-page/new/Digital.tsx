import { Terminal } from "lucide-react";
import React from "react";

export default function Digital() {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-y-12 lg:gap-x-24 mt-24 items-center mx-auto container max-w-6xl py-12">
      <div className="flex flex-col gap-y-8 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-semibold dark:text-zinc-50 text-zinc-800 max-w-xl mx-auto lg:mx-0">
          Your Digital Life Monument
        </h1>
        <p className="text-xl lg:text-3xl mt-4 text-zinc-500 max-w-lg mx-auto lg:mx-0">
          Eternity Chain combines cutting-edge AI and blockchain technology to
          preserve your authentic self for generations to come.
        </p>
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex justify-center items-center p-3 w-full">
          <img
            src={"/assets/digital.svg"}
            alt="Digital Life"
            className=""
            width={300}
            height={300}
          />
        </div>
        <div className="bg-purple-500 p-6 lg:p-12 w-full lg:w-auto">
          <div className="flex gap-2 items-center justify-center lg:justify-start">
            <span className="px-4.5 py-2 rounded-full bg-purple-400 text-zinc-50 text-xl font-medium">
              1
            </span>
            <Terminal className="text-zinc-50" />
            <h3 className="text-xl lg:text-2xl font-medium text-zinc-50">
              AI-Generated Personality
            </h3>
          </div>
          <h1 className="mt-4 text-2xl lg:text-4xl font-semibold text-zinc-100 max-w-2xl text-center lg:text-left">
            Advanced AI technology learns your personality, values, and
            knowledge{" "}
            <span className="opacity-55">
              to create a digital twin that thinks and speaks like you.
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
