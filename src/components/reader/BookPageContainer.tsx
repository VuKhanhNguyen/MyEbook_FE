"use client";

import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface BookPageContainerProps {
  children: ReactNode;
  location: string | number;
}

export const BookPageContainer = ({
  children,
  location,
}: BookPageContainerProps) => {
  const controls = useAnimation();

  useEffect(() => {
    // Trigger the "Flip" animation whenever location changes
    controls.start({
      rotateY: [0, -5, 0], // Gentle swing
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  }, [location, controls]);

  return (
    <div className="relative w-full h-full perspective-[1500px]">
      {/* Book Cover/Shadow Detail */}
      <div className="absolute inset-0 bg-[#fffcf5] rounded-r-md shadow-[inset_20px_0_50px_rgba(0,0,0,0.1),20px_0_30px_rgba(0,0,0,0.3)] z-0" />

      {/* Spine Detail */}
      <div className="absolute left-0 top-0 bottom-0 w-[40px] bg-gradient-to-r from-[#ddd] via-[#fff] to-[#eee] opacity-20 z-10 pointer-events-none mix-blend-multiply" />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 px-4 md:px-12 py-8 overflow-hidden">
        <motion.div
          animate={controls}
          className="w-full h-full origin-left bg-transparent"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
