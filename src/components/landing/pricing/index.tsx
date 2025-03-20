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
    description: "For individuals who want to securely connect personal devices, for free.",
    price: 0,
    buttonText: "Try Now",
    deviceCount: 1,
    features: ["Basic features", "Personal use", "Limited connections"],
  },
  {
    name: "starter",
    title: "Starter",
    description: "For teams or organizations looking for an easy-to-use, secure API replacement.",
    price: 2.99,
    buttonText: "Subscribe Now",
    deviceCount: 5,
    extraMonths: 3,
    popular: true,
    features: ["All Personal features", "Team collaboration", "Priority support"],
  },
  {
    name: "premium",
    title: "Premium",
    description: "For companies who need service and resource level authentication and access control.",
    price: 6.99,
    buttonText: "Subscribe Now",
    deviceCount: 10,
    extraMonths: 3,
    features: ["All Starter features", "Advanced security", "Custom integrations"],
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="container py-24 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Simple, transparent pricing
        </h2>
        <p className="text-muted-foreground">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4">
        <span className={!isAnnual ? "text-primary" : "text-muted-foreground"}>
          Monthly
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="relative h-6 w-11 rounded-full bg-primary/10 transition-colors"
        >
          <div
            className={cn(
              "absolute h-5 w-5 rounded-full bg-primary transition-all top-0.5",
              isAnnual ? "left-6" : "left-0.5"
            )}
          />
        </button>
        <span className={isAnnual ? "text-primary" : "text-muted-foreground"}>
          Annually
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: plans.indexOf(plan) * 0.1 }}
          >
            <PricingCard plan={plan} isAnnual={isAnnual} />
          </motion.div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Security First</h3>
          <p className="text-muted-foreground">
            Your data is always encrypted and protected. We take security seriously.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Flexible Scaling</h3>
          <p className="text-muted-foreground">
            Start small and scale as you grow. Change plans anytime.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">24/7 Support</h3>
          <p className="text-muted-foreground">
            Get help when you need it. Our support team is always available.
          </p>
        </div>
      </div>
    </section>
  );
} 