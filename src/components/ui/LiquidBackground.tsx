"use client";

import { motion } from "framer-motion";

export const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] rounded-full bg-purple-900/40 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -60, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-[20%] -right-[10%] h-[60vh] w-[60vw] rounded-full bg-blue-900/30 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 45, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vw] rounded-full bg-pink-900/30 blur-[110px]"
      />
    </div>
  );
};
