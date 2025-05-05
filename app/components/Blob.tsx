"use client";

import React from "react";
import { motion } from "motion/react";

export interface BlobProps {
  size: string;
  initialPosition: { top: number; left: number };
  initialColor: string;
}

const colorOptions = ["#3B82F6", "#EF4444", "#22C55E", "#EAB308", "#A855F7"];
const sizeOptions = ["w-20 h-20", "w-40 h-40", "w-60 h-60", "w-80 h-80", "w-100 h-100", "w-120 h-120"];

const Blob: React.FC<BlobProps> = ({ size, initialPosition, initialColor }) => {
  // ✅ Generate a random transition delay for each blob
  const randomDelay = Math.random() * 5;

  return (
    <>
      {/* Main blob with independent color transition */}
      <motion.div
  className={`absolute rounded-full ${size} opacity-50 blur-sm`}
  style={{
    top: `${initialPosition.top}%`,
    left: `${initialPosition.left}%`,
    position: "absolute",
    backgroundColor: initialColor,
  }}
  animate={{
    backgroundColor: [
      initialColor, 
      "#3B82F6", "#EF4444", "#22C55E", "#EAB308", "#A855F7", 
      initialColor
    ],
    scale: [1, Math.random() * 1.5 + 0.5, 1], // 🔹 Smoothly enlarges & shrinks
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
    delay: Math.random() * 5,
  }}
/>

      {/* Blurred glow effect */}
        <motion.div
    className={`absolute rounded-full ${size} opacity-50 blur-xl`}
    style={{
        top: `${initialPosition.top}%`,
        left: `${initialPosition.left}%`,
        position: "absolute",
        backgroundColor: initialColor, // ✅ Each blob starts uniquely
    }}
    animate={{
        backgroundColor: [
        initialColor, 
        "#3B82F6", "#EF4444", "#22C55E", "#EAB308", "#A855F7", 
        initialColor // ✅ Comes back to its unique starting color for seamless looping
        ],
    }}
    transition={{
        duration: 10, // 🔹 Increased duration for smoother shifts
        repeat: Infinity,
        ease: "easeInOut", // ✅ Uses gradual easing instead of instant changes
        delay: Math.random() * 5, // ✅ Staggered transition timing per blob
    }}
    />
    </>
  );
};

export default Blob;