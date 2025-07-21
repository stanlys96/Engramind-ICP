// src/components/Collapse.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

export const AnimatedCollapse = ({ title, children }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen((prevState) => !prevState)}
      className="w-full cursor-pointer border border-[#88888850] mx-auto bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-4 mb-4 group"
    >
      <button
        type="button"
        className="w-full cursor-pointer flex justify-between items-center text-left"
      >
        <span className="text-md font-semibold group-hover:underline">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <div className="p-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
