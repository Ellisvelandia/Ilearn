"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FeatureCardProps } from "./types";

export const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
    {children}
  </div>
);

export const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
  <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
    {children}
  </p>
);

export const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
  <p className={cn(
    "text-sm md:text-base max-w-4xl text-left mx-auto",
    "text-neutral-500 text-center font-normal dark:text-neutral-300",
    "text-left max-w-sm mx-0 md:text-sm my-2"
  )}>
    {children}
  </p>
);

export const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:via-transparent dark:to-primary/10" />
    <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1]" />
  </>
);

export const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center relative"
  >
    <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1] bg-gradient-to-br from-foreground to-foreground/80 dark:from-foreground dark:to-foreground/80 bg-clip-text text-transparent">
      Democratizing Education Through AI
    </h2>
    <p className="max-w-[85%] sm:max-w-[75%] leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg">
      Making quality education accessible to everyone through personalized learning experiences
    </p>
  </motion.div>
); 