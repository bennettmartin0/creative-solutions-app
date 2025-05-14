"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

const BusinessCard: React.FC = () => {
  // Motion values for 3D rotation
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth transformation with adjusted range
  const smoothRotateX = useTransform(rotateX, [50, -50], [25, -25]);
  const smoothRotateY = useTransform(rotateY, [50, -50], [25, -25]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Calculate rotation based on pointer position
    const xRotation = ((clientY - top) / height - 0.5) * 40;
    const yRotation = ((clientX - left) / width - 0.5) * 40;

    rotateX.set(xRotation);
    rotateY.set(yRotation);
  };

  const handlePointerLeave = () => {
    setTimeout(() => {
      animate(rotateX, 0, { type: "spring", stiffness: 100, damping: 20 });
      animate(rotateY, 0, { type: "spring", stiffness: 100, damping: 20 });
    }, 100); // Small delay prevents abrupt resets when re-entering quickly
  };

  const handlePointerEnter = () => {
    rotateX.set(rotateX.get()); // Preserve the last known rotation
    rotateY.set(rotateY.get());
  };

  return (
    <div className="perspective-distant bg-none h-screen flex items-center justify-center">
      {/* Wrapper to prevent abrupt pointer leave */}
      <div className="relative w-[600px] h-[420px] flex items-center justify-center">
        <motion.div
          className="relative w-[539px] h-[360px] shadow-xl p-8 rounded-lg border border-neutral-400 flex flex-col justify-center"
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            backgroundImage: `url('/img/paper_texture_539x360.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <span className="text-5xl font-[NineteenFortyTwo] font-bold bg-gradient-to-r from-gray-300 via-gray-500 to-gray-100 bg-clip-text text-transparent shadow-inner tracking-wide">
            Bennett Martin
          </span>
          <span className="text-4xl font-[NineteenFortyTwo] bg-gradient-to-r from-gray-300 via-gray-500 to-gray-100 bg-clip-text text-transparent shadow-inner tracking-wide text-left">
            Creative Solutions
          </span>
          <a href="mailto:bennett@bennettmartincreativesolutions.com" className="text-xl font-[NineteenFortyTwo] bg-gradient-to-r from-gray-300 via-gray-500 to-gray-100 bg-clip-text text-transparent shadow-inner tracking-wide text-left">
            email_me
          </a>
          <span className="text-xl font-[NineteenFortyTwo] bg-gradient-to-r from-gray-300 via-gray-500 to-gray-100 bg-clip-text text-transparent shadow-inner tracking-wide text-left">
            +1 (614) 796-3980
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessCard;