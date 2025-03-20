"use client";

import { cn } from "@/lib/utils";
import { PricingCardProps } from "./types";
import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";

export const PricingCard = ({ plan, isAnnual }: PricingCardProps) => {
  const monthlyPrice = isAnnual ? plan.price * 0.9 : plan.price;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 bg-background/50 backdrop-blur-sm border",
        "transition-all duration-300 hover:shadow-lg",
        plan.popular && "ring-2 ring-primary/50 scale-105"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-primary text-primary-foreground text-sm px-4 py-1 rounded-full">
            🎵 Best Deal
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-semibold">{plan.title}</h3>
          <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">
            ${monthlyPrice.toFixed(2)}
          </span>
          <span className="text-muted-foreground">/month</span>
        </div>

        {/* Extra months */}
        {isAnnual && plan.extraMonths && (
          <div className="text-primary text-sm font-medium">
            +{plan.extraMonths} EXTRA months
          </div>
        )}

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Monitor className="h-4 w-4" />
            <span>Covers {plan.deviceCount} devices</span>
          </div>
        </div>

        {/* Button */}
        <Button 
          className={cn(
            "w-full",
            plan.popular ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          )}
        >
          {plan.buttonText}
        </Button>

        {/* Money back guarantee */}
        <div className="text-xs text-center text-muted-foreground">
          30-day money-back guarantee
        </div>
      </div>
    </div>
  );
}; 