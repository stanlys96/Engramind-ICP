"use client";
import { useState, useEffect } from "react";

export default function Header({ isFixed }: { isFixed?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent SSR hydration mismatch
    return null;
  }

  return (
    <nav
      className={[
        isFixed ? "fixed z-50 top-0  " : "relative md:absolute z-10",
        "w-full inset-x-0 bg-white backdrop-blur-sm bg-opacity-95 dark:bg-zinc-950/30 dark:border-zinc-700 ",
      ].join(" ")}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-4 ">
        {/* Menu Content  */}
        <div className="flex justify-between items-center py-4">
          {/* Header Logo */}
          <div
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex items-center cursor-pointer"
          >
            <Image
              src={theme === "light" ? "/engramind.svg" : "/engramindDark.svg"}
              alt="Logo"
              width={120}
              height={80}
              priority
            />
          </div>

          {/* Button Get Started */}
          <div className="hidden md:flex items-center space-x-8">
            <div className=" gap-x-2 hidden">
              <button className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-colors">
                Contact
              </button>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
