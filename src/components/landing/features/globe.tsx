"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { SkeletonProps } from "./types";

export const Globe = ({ className }: SkeletonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 350 * 2,
      height: 350 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <canvas
        ref={canvasRef}
        className={`${className} transform scale-75 sm:scale-90 md:scale-100 lg:scale-110`}
        style={{
          width: "350px",
          height: "350px",
          maxWidth: "none",
          aspectRatio: "1",
        }}
      />
    </div>
  );
}; 