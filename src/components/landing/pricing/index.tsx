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
    description: "For individuals who want to explore AI-powered learning at their own pace.",
    price: 0,
    buttonText: "Try Now",
    deviceCount: 1,
    features: [
      "AI-powered study notes",
      "Basic flashcard generation",
      "Limited content processing",
      "Community support"
    ],
  },
  {
    name: "starter",
    title: "Starter",
    description: "Perfect for students and educators looking to enhance their learning experience.",
    price: 2.99,
    buttonText: "Subscribe Now",
    deviceCount: 5,
    extraMonths: 3,
    popular: true,
    features: [
      "All Personal features",
      "Advanced AI summaries",
      "Custom study paths",
      "Priority support",
      "Unlimited content processing"
    ],
  },
  {
    name: "premium",
    title: "Premium",
    description: "For institutions and organizations requiring advanced learning tools and analytics.",
    price: 6.99,
    buttonText: "Subscribe Now",
    deviceCount: 10,
    extraMonths: 3,
    features: [
      "All Starter features",
      "Advanced analytics",
      "Team collaboration",
      "Custom integrations",
      "API access"
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
            Invest in Your Learning Journey
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Choose the plan that best fits your learning goals. Upgrade or downgrade anytime.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 px-4">
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

        {/* Features Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold">AI-Powered Learning</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Our advanced AI technology adapts to your learning style and creates personalized study materials.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold">Learn Anywhere</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Access your study materials on any device, anytime. Perfect for learning on the go.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold">Expert Support</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Get help when you need it. Our education specialists are here to support your learning journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 