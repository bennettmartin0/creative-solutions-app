"use client";

import React, { useEffect, useState } from "react";
import Blob from "./Blob";
import Link from "next/link";
import { motion } from "motion/react";


const sizeOptions = ["w-40 h-40", "w-60 h-60", "w-80 h-80"];
const colorOptions = ["#3B82F6", "#EF4444", "#22C55E", "#EAB308", "#A855F7"];

const generateRandomBlob = () => ({
  size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
  initialPosition: { top: Math.random() * 80, left: Math.random() * 80 },
  initialColor: colorOptions[Math.floor(Math.random() * colorOptions.length)], // ✅ Restores unique starting color for each blob
});

const BlobTank: React.FC = () => {
  const [blobs, setBlobs] = useState<Array<{ id: number } & ReturnType<typeof generateRandomBlob>>>([]);

  useEffect(() => {
    if (blobs.length === 0) {
      setBlobs(Array.from({ length: 12 }, (_, index) => ({ id: index, ...generateRandomBlob() })));
    }
  }, [blobs]); // ✅ Prevents unnecessary re-renders

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-800 flex items-center justify-center">
      {blobs.length > 0 ? (
        blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute"
            initial={{ top: `${blob.initialPosition.top}%`, left: `${blob.initialPosition.left}%` }}
            animate={{
              x: [0, Math.random() * 500 - 250, Math.random() * 500 - 250, 0], // ✅ Extended wandering distance
              y: [0, Math.random() * 500 - 250, Math.random() * 500 - 250, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Blob {...blob} />
          </motion.div>
        ))
      ) : (
        <></>
      )}

      {/* Centered text and links */}
      <div className="absolute flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-4xl font-[dogica] text-neutral-50 p-10">Creative Solutions</h1>
        <br />
        <br />
        <h2 className="text-2xl font-[dogica] text-neutral-400">
          <Link href="/web" className="text-neutral-50 hover:text-neutral-400">Web</Link>
          |
          <Link href="/music" className="text-neutral-50 hover:text-neutral-400">Music</Link>
        </h2>
      </div>
    </div>
  );
};

export default BlobTank;