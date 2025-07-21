import { Variants } from "framer-motion";

export const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const modal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: "-50%",
    x: "-50%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: "-50%",
    x: "-50%",
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: "-50%",
    x: "-50%",
    transition: { duration: 0.2 },
  },
};
