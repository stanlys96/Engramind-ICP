"use client";
import { BellDot, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../../../theme/theme-toggle";

interface HeaderProps {
  name: string;
  setIsOpenDrawer: (value: boolean) => void;
}

export const ShowcaseHeader = (
  { name, setIsOpenDrawer }: HeaderProps // Default value for name
) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/");
  };

  return (
    <header className="w-full border-b border-zinc-200 bg-white/50 backdrop-blur-sm dark:bg-zinc-800 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* <div className="text-lg font-bold text-purple-600 dark:text-purple-400 md:block hidden">
          Personas
        </div> */}
        <MenuIcon
          onClick={() => setIsOpenDrawer(true)}
          className="md:hidden block cursor-pointer"
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
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Glossary
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Scenarios
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
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
            Hi, {name}
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
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 p-6 shadow-md text-center rounded-lg">
            <p className="text-lg mb-4 text-zinc-800 font-semibold dark:text-zinc-100">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
