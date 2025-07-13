import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  customClassName?: string;
  loading?: boolean;
}

export const AnimatedDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  customClassName,
  loading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`${customClassName} relative inline-block text-left`}
      ref={ref}
    >
      <button
        onClick={() => {
          if (loading) return;
          toggleDropdown();
        }}
        className={`w-full border focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded text-left px-4 py-2 cursor-pointer text-[14px]`}
      >
        {label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full mt-2 w-48 cursor-pointer bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 border-zinc-200 bg-white rounded-lg shadow-lg overflow-hidden z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="w-full cursor-pointer text-gray-900 dark:text-white  text-left px-4 py-2 dark:hover:text-black hover:bg-blue-100 transition"
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
