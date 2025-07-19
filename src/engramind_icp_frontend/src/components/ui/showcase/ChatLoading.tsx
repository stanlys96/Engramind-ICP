// ChatLoading.tsx
import { motion } from "framer-motion";

export default function ChatLoading() {
  return (
    <div className="w-full flex justify-start p-4">
      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-md max-w-[180px]">
        <motion.div
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
