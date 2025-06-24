"use client";

import { cn } from "@/lib/utils"; // Utility for conditional classes
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}) => {
  // Convert each word into an array of characters
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""), // Split text into individual characters
  }));

  const [scope, animate] = useAnimate(); // Framer Motion hooks
  const isInView = useInView(scope); // Detect when the element is in view

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { opacity: 1, display: "inline-block" }, // Animate each span
        {
          duration: 0.3,
          delay: stagger(0.1), // Stagger the animation
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  // Render the words with typewriter animation
  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{ opacity: 0 }}
              key={`char-${index}`}
              className={cn(
                `dark:text-white text-black opacity-0 hidden`,
                word.className
              )}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.div>
  );

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      {/* Cursor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
