"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Box, BookOpen, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Floating elements animation variants
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function HeroSection() {
  return (
    <section className="container relative flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-20 sm:pt-24 md:pt-32 lg:pt-40 min-h-[85vh] sm:min-h-[80vh]">
      {/* Floating elements */}
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-20 right-[20%] opacity-20 hidden sm:block"
      >
        <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-primary rotate-12" />
      </motion.div>
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute bottom-32 left-[15%] opacity-20 hidden sm:block"
      >
        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary/30" />
      </motion.div>
      <motion.div
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        className="absolute top-40 left-[25%] opacity-20 hidden sm:block"
      >
        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary/40" />
      </motion.div>

      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1000px] w-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center justify-center w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-xl opacity-30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative text-center space-y-4 sm:space-y-6 max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
      >
        <h1 className="text-center font-bold leading-tight tracking-tighter md:leading-[1.1] lg:leading-[1.1]">
          <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl inline-block bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent pb-2">
            Your AI-Powered
          </span>
          <br className="hidden sm:block" />
          <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl inline-block bg-gradient-to-br from-primary/90 to-primary bg-clip-text text-transparent">
            Personal Learning Assistant
          </span>
        </h1>
        <p className="max-w-[95%] sm:max-w-[85%] md:max-w-[75%] mx-auto text-center text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground/80 leading-relaxed">
          Upload any study material and let AI transform it into personalized
          lessons, summaries, flashcards, and quizzes. Learn smarter, not
          harder.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-[90%] sm:w-auto max-w-md mx-auto"
      >
        <Button
          asChild
          className="relative w-full sm:w-auto text-sm sm:text-base md:text-lg font-semibold h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-12 bg-gradient-to-r from-primary via-primary to-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <Link href="/auth/signup" className="flex items-center justify-center">
            Start Learning Now
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
