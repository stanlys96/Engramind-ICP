import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { LucideEye } from "lucide-react";

interface DropdownProps {
  label: string;
  options: any[];
  onSelect: (option: any) => void;
  customClassName?: string;
  loading?: boolean;
  isNested?: boolean;
  labelPlaceholder?: boolean;
  onReset?: () => void;
  showDetailButton?: boolean;
  onDetailPress?: () => void;
}

export const AnimatedDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  customClassName,
  loading,
  isNested = false,
  labelPlaceholder = true,
  onReset,
  showDetailButton,
  onDetailPress,
}) => {
  const [isOpen, settingIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        settingIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => settingIsOpen((prev) => !prev);

  return (
    <div
      className={`${customClassName} relative inline-block text-left`}
      ref={ref}
    >
      <div className="flex gap-x-2 items-center">
        <button
          type="button"
          onClick={() => {
            if (loading) return;
            toggleDropdown();
          }}
          className={`w-full shadow-sm border flex justify-between items-center ${
            labelPlaceholder ? "text-[#888]" : ""
          } focus-visible:outline-none dark:border-zinc-700 border-zinc-200 rounded text-left px-2 py-2 cursor-pointer text-[14px]`}
        >
          {label}
          <CaretSortIcon />
        </button>
        {showDetailButton && (
          <button
            onClick={() => {
              if (onDetailPress) {
                onDetailPress();
              }
            }}
            type="button"
            className="cursor-pointer duration-300 hover:bg-[#88888830] focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 border-zinc-200 hover:text-accent-foreground border shadow-sm h-9 w-9 flex-shrink-0 rounded-full"
          >
            <LucideEye size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && !isNested && (
          <motion.ul
            className="absolute max-h-[350px] overflow-scroll shadow-sm bg-[#FFFFFF] w-full mt-2 w-48 cursor-pointer bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 border-zinc-200 bg-white rounded-lg shadow-lg overflow-hidden z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <li key={option?.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    settingIsOpen(false);
                  }}
                  className="w-full cursor-pointer text-gray-900 dark:text-white  text-left px-4 py-2 dark:hover:text-black hover:bg-blue-100 transition"
                >
                  {option?.name}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
        {isOpen && isNested && (
          <motion.ul
            className="absolute shadow-sm w-full mt-2 w-48 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 border-zinc-200 bg-white rounded-lg shadow-lg overflow-hidden z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => {
                if (onReset) {
                  onReset();
                }
                settingIsOpen(false);
              }}
              type="button"
              className="w-full cursor-pointer text-gray-900 dark:text-white text-left px-3 py-2 dark:hover:text-black hover:bg-blue-100 transition"
            >
              -- None --
            </button>
            {options.map((option: any) => (
              <div key={option.id}>
                <p className="px-3 py-1 font-bold">{option.type}</p>
                {option?.options?.map((nestedOption: any) => (
                  <li key={nestedOption?.title}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(nestedOption);
                        settingIsOpen(false);
                      }}
                      className="w-full cursor-pointer text-gray-900 dark:text-white text-left px-3 py-1 dark:hover:text-black hover:bg-blue-100 transition"
                    >
                      {nestedOption?.title}
                    </button>
                  </li>
                ))}
              </div>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
