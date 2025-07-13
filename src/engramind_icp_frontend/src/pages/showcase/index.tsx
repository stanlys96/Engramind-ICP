"use client";
import { CategoryFilter } from "../../components/ui/showcase/CategoryFilter";
import Relic from "../../components/ui/showcase/Relic";
import { SearchBar } from "../../components/ui/showcase/SearchBar";
import { useUser } from "../../context/UserContext";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { Link } from "react-router-dom";
import { AnimatedModal } from "../../components/ui/AnimatedModal";
import { useState } from "react";
import { AnimatedDropdown } from "../../components/ui/AnimatedDropdown";

export default function ShowcasePage() {
  const { name } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <ShowcaseLayout>
      <div>
        <div className="flex md:flex-row flex-col justify-between items-center mb-2">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              Welcome, {name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Curated profiles. Proven expertise. Find and connect with your AI
              Mentor, at your own time.
            </p>
          </div>

          <Link
            onClick={() => {
              setIsOpen(true);
            }}
            // to={"/showcase/create"}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer md:mb-0 mb-[20px]"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Persona</span>
          </Link>
        </div>
        <SearchBar />
        <CategoryFilter />
        <Relic />
        <AnimatedModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-[15px]">
            ⚡ Create New Persona
          </h2>
          <div className="flex justify-between items-center mb-3">
            <label className="block mb-1 flex flex-1 text-md text-gray-700 dark:text-white">
              Add Source File
            </label>
            <AnimatedDropdown
              label="Select file to add..."
              options={["Profile", "Settings", "Logout"]}
              onSelect={(e) => {}}
              customClassName="w-[80%]"
            />
          </div>
          <div className="flex gap-x-2 items-center justify-end">
            <p className="italic text-[14px] text-[#627084]">
              Do you not have the file you need?
            </p>
            <button
              onClick={() => {}}
              className={`bg-purple-600 text-white px-4 py-2 rounded-full cursor-pointer`}
            >
              Upload New File
            </button>
          </div>
          <label className="block mb-1 text-gray-700 text-md dark:text-white">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={scenarioTitle}
            onChange={(e) => setScenarioTitle(e.target.value)}
            placeholder="Enter persona name"
            className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
              loading
                ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                : "dark:bg-zinc-800 bg-zinc-50"
            }`}
            disabled={loading}
          />
          <label className="block mb-1 text-gray-700 text-md dark:text-white mt-[10px]">
            Persona Prompt <span className="text-red-500">*</span>
          </label>
          <textarea
            value={scenarioDescription}
            onChange={(e) => setScenarioDescription(e.target.value)}
            placeholder="Make a personalized description of the persona"
            className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded p-2 text-sm ${
              loading
                ? "dark:bg-zinc-700 bg-zinc-100 cursor-not-allowed"
                : "dark:bg-zinc-800 bg-zinc-50"
            }`}
            rows={4}
            disabled={loading}
          />
          <div className="flex justify-end mt-5 gap-x-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 h-fit cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {}}
              disabled={!scenarioTitle || !scenarioDescription || loading}
              className={`bg-purple-600 text-white px-4 py-2 rounded cursor-pointer ${
                !scenarioTitle || !scenarioDescription || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              {loading ? "Creating..." : "Create Persona"}
            </button>
          </div>
        </AnimatedModal>
      </div>
    </ShowcaseLayout>
  );
}
