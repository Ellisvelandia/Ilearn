"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-1 relative text-center lg:text-left space-y-6 max-w-xl lg:max-w-2xl pt-8 lg:pt-0 z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-fit mx-auto lg:mx-0"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">AI-powered learning</span>
        </div>
      </motion.div>

      <h1 className="font-bold leading-tight tracking-tighter">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl inline-block bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent pb-2"
        >
          Your AI-Powered
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl inline-block bg-gradient-to-br from-primary/90 to-primary bg-clip-text text-transparent"
        >
          Personal Learning Assistant
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-[500px] mx-auto lg:mx-0"
      >
        Upload any study material and let AI transform it into personalized
        lessons, summaries, flashcards, and quizzes. Learn smarter, not harder.
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
      className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
    >
      <Button
        asChild
        size="lg"
        className="relative w-full sm:w-auto text-sm sm:text-base font-semibold h-11 px-6 bg-gradient-to-r from-primary via-primary to-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <Link href="/auth/signup" className="flex items-center gap-2">
          Start Learning Now
          <ArrowRight className="h-4 w-4" />
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
      className="hidden md:flex items-center gap-6 text-muted-foreground/70 pt-2"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground">10x</span>
        <span className="text-xs">Faster Learning</span>
      </div>
      <div className="h-4 w-px bg-border/50"></div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground">5k+</span>
        <span className="text-xs">Active Students</span>
      </div>
      <div className="h-4 w-px bg-border/50"></div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-foreground">24/7</span>
        <span className="text-xs">Learning Support</span>
      </div>
    </motion.div>
  );
}
