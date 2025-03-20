"use client";

import { cn } from "@/lib/utils";
import { PricingCardProps } from "./types";
import { Button } from "@/components/ui/button";
import { Check, Monitor } from "lucide-react";

export const PricingCard = ({ plan, isAnnual }: PricingCardProps) => {
  const monthlyPrice = isAnnual ? plan.price * 0.8 : plan.price; // 20% discount for annual

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 sm:p-8 bg-card backdrop-blur-sm border h-full",
        "transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
        "flex flex-col",
        plan.popular && "ring-2 ring-primary/50 scale-[1.02]"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-primary text-primary-foreground text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-medium">
            ⭐ Best Value
          </div>
        </div>
      )}

      <div className="space-y-6 flex-1">
        {/* Header */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">{plan.title}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-bold">
            {plan.price === 0 ? "Free" : `$${monthlyPrice.toFixed(2)}`}
          </span>
          {plan.price > 0 && (
            <span className="text-muted-foreground text-sm">/month</span>
          )}
        </div>

        {/* Extra months */}
        {isAnnual && plan.extraMonths && (
          <div className="text-primary text-sm font-medium flex items-center gap-1.5">
            <span className="text-xs">🎁</span>
            +{plan.extraMonths} months free
          </div>
        )}

        {/* Features */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm border-b border-border/50 pb-3">
            <Monitor className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>Access on {plan.deviceCount} device{plan.deviceCount > 1 ? 's' : ''}</span>
          </div>
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-6">
        {/* Button */}
        <Button 
          className={cn(
            "w-full font-medium",
            plan.popular 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {plan.buttonText}
        </Button>

        {/* Money back guarantee */}
        {plan.price > 0 && (
          <div className="text-xs text-center text-muted-foreground">
            30-day money-back guarantee
          </div>
        )}
      </div>
    </div>
  );
}; 