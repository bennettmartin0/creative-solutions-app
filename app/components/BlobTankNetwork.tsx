"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const MAX_CONNECTION_DISTANCE = 500;
const POINT_RADIUS = 6;
const FADE_OUT_DURATION = 2;
const MOVEMENT_SPEED = 0.5;
const SPAWN_COUNT = 1;
const GLOW_STRENGTH = 3; // Adjust glow intensity
const POINT_COLOR = "#fff"; // Customize point and glow color
const LINE_COLOR = "#fff"; // Customize line color
const LINE_GLOW_STRENGTH = 1; // Adjust glow strength for lines

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  createdAt: number;
  opacity: number;
}

const generatePoint = (existingPoints: Point[]): Point => {
  const margin = 20;
  let newPoint: Point;

  do {
    newPoint = {
      x: Math.random() * (window.innerWidth - margin * 2) + margin,
      y: Math.random() * (window.innerHeight - margin * 2) + margin,
      vx: (Math.random() - 0.1) * MOVEMENT_SPEED,
      vy: (Math.random() - 0.1) * MOVEMENT_SPEED,
      createdAt: Date.now(),
      opacity: 1,
    };
  } while (
    existingPoints.some(
      p => Math.hypot(p.x - newPoint.x, p.y - newPoint.y) < POINT_RADIUS * 2
    )
  );

  return newPoint;
};

const CircleManager: React.FC<{ points: Point[]; setPoints: React.Dispatch<React.SetStateAction<Point[]>> }> = ({ points, setPoints }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints =>
        prevPoints
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: Math.max(0, 1 - (Date.now() - p.createdAt) / (FADE_OUT_DURATION * 1000)),
          }))
          .filter(p => p.opacity > 0)
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <defs>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={GLOW_STRENGTH} result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={LINE_GLOW_STRENGTH} result="blurredLine" />
          <feMerge>
            <feMergeNode in="blurredLine" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {points.map((point, index) => (
        <motion.circle
          key={`circle-${index}`}
          cx={point.x}
          cy={point.y}
          r={POINT_RADIUS}
          fill={POINT_COLOR}
          filter="url(#softGlow)"
          animate={{ opacity: point.opacity }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
};

const ConnectionManager: React.FC<{ points: Point[] }> = ({ points }) => {
  const validPoints = points.filter(p => p.opacity > 0);
  const lines = validPoints.flatMap((start, i) =>
    validPoints.slice(i + 1).map(end => ({
      start,
      end,
      length: Math.hypot(end.x - start.x, end.y - start.y),
    }))
  );

  return (
    <>
      {lines
        .filter(line => line.length <= MAX_CONNECTION_DISTANCE)
        .map((line, index) => (
          <motion.line
            key={`line-${index}`}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke={LINE_COLOR}
            strokeWidth="0.5"
            filter="url(#lineGlow)" // Applies the glow effect to lines
            animate={{ opacity: Math.min(line.start.opacity, line.end.opacity) }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
          />
        ))}
    </>
  );
};

const BlobTankNetwork: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints => [
        ...prevPoints,
        ...Array.from({ length: SPAWN_COUNT }, () => generatePoint(prevPoints)),
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute -z-10 w-full h-screen flex items-center justify-center">
      <svg className="absolute w-full h-full">
        <CircleManager points={points} setPoints={setPoints} />
        <ConnectionManager points={points} />
      </svg>
    </div>
  );
};

export default BlobTankNetwork;