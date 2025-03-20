"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  // Optimized animations for accessibility
  const fadeInAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: [0, 1], y: [20, 0] };

  const slideInAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: [0, 1], x: [-30, 0] };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 w-full z-10">
      {/* Left Column - Text Content */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
        animate={slideInAnimation}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative flex flex-col items-start justify-center text-left space-y-5 md:space-y-6 lg:space-y-8 px-1 sm:px-0"
      >
        <div className="w-full">
          <motion.h1
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={fadeInAnimation}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-bold leading-[1.1] tracking-tighter text-left"
            aria-label="AI-Powered Study Tools"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl block bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent pb-2 drop-shadow-sm">
              AI-POWERED
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl block bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent pb-2 drop-shadow-sm">
              STUDY TOOLS
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
          }
          animate={fadeInAnimation}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-md font-medium"
        >
          Transform text into interactive study materials with AI-powered
          summaries, flashcards, and quizzes.
        </motion.p>

        <div className="flex flex-wrap pt-3 sm:pt-4 md:pt-5 w-full">
          <HeroButtons prefersReducedMotion={prefersReducedMotion} />
        </div>

        <HeroMetrics prefersReducedMotion={prefersReducedMotion} />
      </motion.div>

      {/* Right Column - Visual Element - Hidden on mobile */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="relative hidden lg:flex items-center justify-center"
      >
        <div className="relative w-full h-[450px]">
          {/* Improved gradient glow */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 blur-3xl"
            aria-hidden="true"
          ></div>

          {!prefersReducedMotion && (
            <>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-primary/90 to-primary-foreground rounded-xl shadow-lg"
                aria-hidden="true"
              />

              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 rounded-xl shadow-lg"
                aria-hidden="true"
              />

              <motion.div
                initial={{ rotate: 0, y: 0 }}
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-40 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-primary/90 to-primary-foreground/90 rounded-xl shadow-lg"
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </motion.div>

      {/* Mobile Visual Elements - Only shown on mobile/tablet */}
      <div className="relative lg:hidden flex justify-center mt-6 sm:mt-8">
        <div className="relative h-[180px] w-full max-w-[300px]">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 blur-3xl"
            aria-hidden="true"
          ></div>

          {!prefersReducedMotion && (
            <>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-primary/90 to-primary-foreground rounded-xl shadow-lg"
                aria-hidden="true"
              />

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-blue-500/90 to-cyan-500/90 rounded-xl shadow-lg"
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroButtons({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full sm:w-auto"
    >
      <Button
        asChild
        size="lg"
        className="w-full sm:w-auto text-base sm:text-lg font-semibold h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-primary/95 via-primary to-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-lg"
      >
        <Link
          href="/auth/signup"
          className="flex items-center justify-center gap-2"
          aria-label="Get Started with AI Study Tools"
        >
          Get Started
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </Link>
      </Button>
    </motion.div>
  );
}

function HeroMetrics({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-wrap gap-5 sm:gap-6 md:gap-8 lg:gap-10 text-muted-foreground/90 pt-6 md:pt-8 border-t border-muted/30 w-full"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold text-foreground/90 drop-shadow-sm">
          2x
        </span>
        <span className="text-xs sm:text-sm font-medium">Study Speed</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold text-foreground/90 drop-shadow-sm">
          10k+
        </span>
        <span className="text-xs sm:text-sm font-medium">Active Users</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold text-foreground/90 drop-shadow-sm">
          24/7
        </span>
        <span className="text-xs sm:text-sm font-medium">Study Help</span>
      </div>
    </motion.div>
  );
}
