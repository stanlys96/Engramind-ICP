import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { backdrop, modal } from "../../utils/uiHelper";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  widthFitContainer?: boolean;
  showCrossIcon?: boolean;
  className?: string;
}

export const AnimatedModal = ({
  isOpen,
  onClose,
  children,
  widthFitContainer = false,
  showCrossIcon = true,
  className,
}: AnimatedModalProps) => {
  useEffect(() => {
    const handleEsc = (e: any) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdrop}
          onClick={onClose}
        >
          <motion.div
            className={`${className} absolute border dark:border-zinc-700 border-zinc-200 top-1/2 left-1/2 bg-[#FEFEFE] dark:bg-[#101213] rounded-2xl shadow-xl p-6 ${
              widthFitContainer ? "w-full md:w-fit" : "w-full lg:w-[80%]"
            }`}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {showCrossIcon && (
              <button
                type="button"
                onClick={onClose}
                className="absolute cursor-pointer top-3 right-3 text-gray-500 dark:hover:text-white hover:text-black"
              >
                ✕
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
