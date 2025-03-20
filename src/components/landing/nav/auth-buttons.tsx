"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  isMobile?: boolean;
}

export function AuthButtons({ isMobile = false }: AuthButtonsProps) {
  const buttonClasses = isMobile ? "w-full justify-center" : "";
  
  return (
    <>
      <Link href="/auth/login" aria-label="Log in to your account">
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(
            "text-sm sm:text-base px-3 sm:px-4 hover:bg-primary/5 hover:text-primary transition-colors duration-300",
            buttonClasses
          )}
        >
          Log in
        </Button>
      </Link>
      <Link href="/auth/signup" aria-label="Create a new account">
        <Button 
          size="sm"
          className={cn(
            "text-sm sm:text-base px-4 sm:px-6 whitespace-nowrap bg-gradient-to-r from-primary/90 to-primary hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20",
            buttonClasses
          )}
        >
          Get Started
        </Button>
      </Link>
    </>
  );
} 