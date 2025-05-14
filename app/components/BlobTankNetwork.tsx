"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const MAX_CONNECTION_DISTANCE = 150;
const POINT_RADIUS = 6;
const FADE_OUT_DURATION = 10;
const MOVEMENT_SPEED = 1;
const SPAWN_COUNT = 3;

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
      vx: (Math.random() - 0.5) * MOVEMENT_SPEED,
      vy: (Math.random() - 0.5) * MOVEMENT_SPEED,
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
      {points.map((point, index) => (
        <motion.circle
          key={`circle-${index}`}
          cx={point.x}
          cy={point.y}
          r={POINT_RADIUS}
          fill="#00f0ff"
          animate={{ opacity: point.opacity }}
          transition={{
            duration: 1,
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
            stroke="#0088ff"
            strokeWidth="0.5"
            animate={{ opacity: Math.min(line.start.opacity, line.end.opacity) }}
            transition={{
              duration: 1,
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
    <div className="absolute w-full h-screen bg-black flex items-center justify-center">
      <svg className="absolute w-full h-full">
        <CircleManager points={points} setPoints={setPoints} />
        <ConnectionManager points={points} />
      </svg>
    </div>
  );
};

export default BlobTankNetwork;