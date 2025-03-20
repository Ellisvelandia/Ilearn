"use client";

import { HeroContent } from "./hero/HeroContent";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden mt-10 sm:mt-12 lg:mt-0 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/90"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-[10%] left-[15%] w-[250px] h-[250px] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-[15%] right-[10%] w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[80px]"></div>
        <div className="absolute top-[35%] right-[25%] w-[180px] h-[180px] rounded-full bg-purple-500/5 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-16 relative z-1">
        <div className="max-w-6xl mx-auto">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
