"use client";

import { FileUp, Brain, Sparkles, Lightbulb, FlaskConical, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    name: "Smart Content Upload",
    description:
      "Upload PDFs, videos, audio, or slides. Our AI processes any study material into interactive learning content.",
    icon: FileUp,
  },
  {
    name: "AI-Powered Analysis",
    description:
      "Advanced AI breaks down complex topics into easily digestible concepts and personalized study paths.",
    icon: Brain,
  },
  {
    name: "Interactive Learning",
    description:
      "Generate summaries, flashcards, and quizzes automatically from your uploaded content.",
    icon: Sparkles,
  },
  {
    name: "Personalized Tutoring",
    description:
      "Get instant explanations and answers to your questions about any topic in your study material.",
    icon: Lightbulb,
  },
  {
    name: "Adaptive Learning",
    description:
      "AI adapts to your learning style and pace, ensuring optimal comprehension and retention.",
    icon: FlaskConical,
  },
  {
    name: "Instant Resources",
    description:
      "Transform any content into structured study materials in seconds, saving hours of manual work.",
    icon: Zap,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section
      id="features"
      className="container space-y-8 sm:space-y-12 lg:space-y-16 py-12 px-4 sm:px-6 lg:px-8 md:py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:via-transparent dark:to-primary/10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1]" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center relative"
      >
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] bg-gradient-to-br from-foreground to-foreground/80 dark:from-foreground dark:to-foreground/80 bg-clip-text text-transparent">
          Transform Your Learning Experience
        </h2>
        <p className="max-w-[85%] sm:max-w-[75%] leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg">
          Harness the power of AI to learn faster and more effectively
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid justify-center gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:max-w-[64rem] relative"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.name}
            variants={item}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/50 to-background/95 backdrop-blur-sm p-2 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-lg p-4 sm:p-6 relative">
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon with gradient */}
              <div className="relative">
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="space-y-2 relative">
                <h3 className="font-bold text-base sm:text-lg bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                  {feature.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 