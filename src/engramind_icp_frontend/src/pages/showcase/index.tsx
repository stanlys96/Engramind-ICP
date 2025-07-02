"use client";
import { CategoryFilter } from "../../components/ui/showcase/CategoryFilter";
import Relic from "../../components/ui/showcase/Relic";
import { SearchBar } from "../../components/ui/showcase/SearchBar";
import { useUser } from "../../context/UserContext";
import { PlusIcon } from "lucide-react";
import ShowcaseLayout from "./ShowcaseLayout";
import { Link } from "react-router-dom";

export default function ShowcasePage() {
  const { name } = useUser();
  return (
    <ShowcaseLayout>
      <div>
        <div className="flex justify-between items-center mb-2">
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
            to={"/showcase/create"}
            className="flex items-center gap-x-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer"
          >
            <PlusIcon className="h-4 w-4" />
            <span>New Persona</span>
          </Link>
        </div>
        <SearchBar />
        <CategoryFilter />
        <Relic />
      </div>
    </ShowcaseLayout>
  );
}
