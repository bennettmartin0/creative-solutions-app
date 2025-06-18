"use client";
import { useEffect, useState } from "react";


const STARTING_SCALE = 20;
const STARTING_BLUR = 20;

export default function ZoomBackground() {
  const [scale, setScale] = useState(STARTING_SCALE);
  const [blur, setBlur] = useState(STARTING_BLUR);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = Math.max(1, STARTING_SCALE - scrollY * 0.035);
      const newBlur = Math.max(0, STARTING_BLUR - scrollY * 0.035); // slow dreamy fade

      setScale(newScale);
      setBlur(newBlur);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="w-full h-screen bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: "url('/img/sunset_background_201200x635279.jpg')",
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}