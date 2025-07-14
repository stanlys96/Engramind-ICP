"use client";
import { BellDot, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../../../theme/theme-toggle";
import Cookies from "js-cookie";
import IC from "../../../utils/IC";
import { AnimatedModal } from "../AnimatedModal";

interface HeaderProps {
  name: string;
  setIsOpenDrawer: (value: boolean) => void;
  setShowConfirm: (value: boolean) => void;
}

export const ShowcaseHeader = (
  { name, setIsOpenDrawer, setShowConfirm }: HeaderProps // Default value for name
) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <header className="w-full border-b border-zinc-200 bg-white/50 backdrop-blur-sm dark:bg-zinc-800 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* <div className="text-lg font-bold text-purple-600 dark:text-purple-400 md:block hidden">
          Personas
        </div> */}
        <MenuIcon
          onClick={() => setIsOpenDrawer(true)}
          className="md:hidden text-black dark:text-white block cursor-pointer"
        />
        <nav className="hidden md:flex gap-6 text-md text-gray-700 dark:text-gray-300 leading-relaxed">
          <Link
            to="/showcase"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase" ? "text-purple-600 font-bold" : ""
            }`}
          >
            Persona
          </Link>
          <Link
            to="/showcase/rubrics"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/rubrics"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            Rubrics
          </Link>
          <Link
            to="/showcase/glossary"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/glossary"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            Glossary
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/scenarios"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            Scenarios
          </Link>
          <Link
            to="/showcase/file-management"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/file-management"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            File Management
          </Link>
          <Link
            to="/showcase/how-it-works"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/how-it-works"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            How It Works
          </Link>
          <Link
            to="/showcase/faq"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/faq" ? "text-purple-600 font-bold" : ""
            }`}
          >
            FAQ
          </Link>
        </nav>
        <div className="flex gap-4 items-center relative">
          <div className="text-sm text-purple-600 dark:text-purple-300 capitalize font-semibold">
            Hi, {name?.slice(0, 12) + "..."}
          </div>
          <BellDot className="text-purple-600 dark:text-purple-400 md:block hidden" />
          <img
            onClick={() => navigate("/dashboard")}
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="rounded-full w-8 h-8 cursor-pointer hover:shadow-lg transition-all duration-300"
            width={400}
            height={300}
          />
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm md:block hidden text-red-600 dark:text-red-400 hover:underline cursor-pointer transition"
          >
            Logout
          </button>
          <ThemeToggle customClassName="md:block hidden" />
        </div>
      </div>
    </header>
  );
};
