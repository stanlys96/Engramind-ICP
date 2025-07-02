import { Scenario, DetailDescription } from "../../../interface/scenario";
import React from "react";

export default function ModalDetailRelic({
  selectedScenario,
  detailDescription,
  setShowRoleplayModal,
  setshowModalDescription,
}: {
  selectedScenario: Scenario | null;
  detailDescription: DetailDescription | null;
  setShowRoleplayModal: React.Dispatch<React.SetStateAction<boolean>>;
  setshowModalDescription: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="fixed inset-0 bg-zinc-900/70 backdrop-blur-sm z-50 overflow-hidden"
      onClick={() => setshowModalDescription(false)}
    >
      <div className="flex items-center justify-center h-screen">
        <div
          className="max-w-6xl bg-zinc-200 dark:bg-zinc-900 rounded-xl shadow-lg p-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Heading  */}
          <div className="flex justify-between items-center text-sm border border-zinc-200 dark:border-zinc-800 rounded-full p-2 dark:bg-zinc-800 bg-zinc-300">
            {/* Icon Solana */}
            <div className="flex items-center gap-x-2">
              <img
                src={"assets/coin.svg"}
                alt="solana"
                className="w-6 h-6"
                width={30}
                height={30}
              />
              <p className="text-lg font-medium">30</p>
            </div>
            {/* Title */}
            <p className="font-bold text-center dark:text-white text-zinc-800 italic">
              You need 10 credits to start a roleplay session.
            </p>
            {/* Button Purchase */}
            <button className="bg-purple-500 cursor-pointer text-white font-medium px-4 py-2 rounded-full hover:bg-purple-600 transition duration-200">
              Purchase more credits
            </button>
          </div>

          {/* AI Scenario */}
          <div className="flex gap-x-4 mt-4">
            <img
              src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              alt="character"
              className="w-32 h-32 object-cover rounded-md"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-y-1.5">
              <h2 className="text-xl font-semibold">
                {selectedScenario?.name}
              </h2>
              <p className="text-base italic dark:text-zinc-300 text-zinc-800 ">
                My Name {detailDescription?.charactersName}, I am{" "}
                {detailDescription?.charactersAge} years old.
              </p>
              <p className="text-sm dark:text-zinc-400 text-zinc-700">
                {detailDescription?.charactersBackground}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="mt-4">
              <h3 className="font-semibold dark:text-zinc-200 text-zinc-800 mb-2">
                Character Details
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-700">
                Gender : {detailDescription?.charactersGender}
              </p>
              <p className="text-sm dark:text-zinc-400 text-zinc-700">
                Occupation :{detailDescription?.charactersOccupation}{" "}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold dark:text-zinc-200 text-zinc-800 mb-2">
                Scenario Details
              </h3>
              <p className="text-sm dark:text-zinc-300 text-zinc-700 font-semibold">
                Scenario Snippet :{" "}
                <span className="font-normal dark:text-zinc-400 text-zinc-700">
                  {detailDescription?.charactersScenarioSnippet}
                </span>
              </p>
              <p className="text-sm dark:text-zinc-300 text-zinc-700 font-semibold mt-2">
                Relevance To Persona :{" "}
                <span className="font-normal dark:text-zinc-400 text-zinc-700">
                  {detailDescription?.charactersRelevanceToScenario}
                </span>
              </p>
            </div>
          </div>

          {/* Setup  */}
          <div className="flex justify-end items-center p-4">
            <button
              onClick={() => {
                setShowRoleplayModal(true);
              }}
              className="px-4 py-2 cursor-pointer rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition duration-300 ease-in-out font-medium"
            >
              Go to setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
