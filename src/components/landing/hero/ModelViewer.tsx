"use client";

import { motion } from "framer-motion";
import { DroneModel } from "../DroneModel";

export function ModelViewer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full h-full"
    >
      <motion.div 
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 0.5, 0, -0.5, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative w-full h-full"
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-2xl"
          style={{ transform: 'translate(-50%, -50%) scale(1.2)', left: '50%', top: '50%' }}
        />
        
        {/* 3D Model container */}
        <div className="relative w-full h-full">
          <DroneModel />
        </div>
      </motion.div>
    </motion.div>
  );
} 