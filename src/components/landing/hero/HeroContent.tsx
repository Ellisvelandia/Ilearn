"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative text-center space-y-8 w-full z-10"
    >
      <h1 className="font-bold leading-tight tracking-tighter">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl inline-block bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent pb-1 sm:pb-2"
        >
          Learn Faster with AI
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-base sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
      >
        Turn any text into smart study materials instantly. AI-powered
        summaries, flashcards, and quizzes to boost your learning.
      </motion.p>

      <HeroButtons />
      <HeroMetrics />
    </motion.div>
  );
}

function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4 sm:pt-6"
    >
      <Button
        asChild
        size="lg"
        className="relative w-full sm:w-auto text-base sm:text-lg font-semibold h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-primary via-primary to-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <Link href="/auth/signup" className="flex items-center gap-2">
          Try AI Study Tools
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>
      </Button>
    </motion.div>
  );
}

function HeroMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 lg:gap-10 text-muted-foreground/70 pt-6 sm:pt-8"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold text-foreground">2x</span>
        <span className="text-xs sm:text-sm">Study Speed</span>
      </div>
      <div className="h-4 sm:h-5 w-px bg-border/50 hidden xs:block"></div>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold text-foreground">
          10k+
        </span>
        <span className="text-xs sm:text-sm">Active Users</span>
      </div>
      <div className="h-4 sm:h-5 w-px bg-border/50 hidden xs:block"></div>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold text-foreground">
          24/7
        </span>
        <span className="text-xs sm:text-sm">Study Help</span>
      </div>
    </motion.div>
  );
}
