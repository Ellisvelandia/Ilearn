"use client";

import { useState } from "react";
import { PricingCard } from "./pricing-card";
import { PricingPlan } from "./types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const plans: PricingPlan[] = [
  {
    name: "personal",
    title: "Personal",
    description:
      "Perfect for individuals who want to explore AI-powered learning at their own pace.",
    price: 0,
    buttonText: "Get Started Free",
    deviceCount: 1,
    features: [
      "Basic AI study notes",
      "Limited flashcard generation",
      "1GB content storage",
      "Community support",
      "Basic learning analytics",
    ],
  },
  {
    name: "premium",
    title: "Premium",
    description:
      "Unlock the full potential of AI-powered learning with advanced features and unlimited access.",
    price: 10,
    buttonText: "Upgrade Now",
    deviceCount: 5,
    extraMonths: 3,
    popular: true,
    features: [
      "Advanced AI study tools",
      "Unlimited flashcards",
      "Unlimited storage",
      "Priority support 24/7",
      "Custom study paths",
      "Team collaboration",
      "Advanced analytics",
    ],
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1]" />

      <div className="container relative py-12 sm:py-16 lg:py-24 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-transparent">
            Choose Your Learning Journey
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Start for free or unlock all features with Premium. No hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4">
          <span
            className={cn(
              "text-sm sm:text-base transition-colors",
              !isAnnual ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative h-6 w-11 rounded-full bg-primary/10 transition-colors hover:bg-primary/20"
            aria-label="Toggle billing period"
          >
            <div
              className={cn(
                "absolute h-5 w-5 rounded-full bg-primary transition-all duration-200 top-0.5",
                isAnnual ? "left-6" : "left-0.5"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm sm:text-base transition-colors",
              isAnnual ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            Annually
            <span className="ml-1.5 text-xs text-primary">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 pt-8 px-4 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plans.indexOf(plan) * 0.1 }}
              viewport={{ once: true }}
            >
              <PricingCard plan={plan} isAnnual={isAnnual} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
