"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update nav background opacity based on scroll
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ["features", "pricing"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar + some padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full border-b border-border/40 backdrop-blur-xl z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/60 supports-[backdrop-filter]:bg-background/40" 
        : "bg-background/0"
    )}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/20 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <span className="relative font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent transition-all duration-300 ease-out">
              YouLearn
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className={cn(
                  "px-4 py-2 text-sm rounded-md transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Theme Toggle and Auth Buttons */}
          <ThemeToggle />
          <Link href="/auth/login" aria-label="Log in to your account">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm sm:text-base px-3 sm:px-4 hover:bg-primary/5 hover:text-primary transition-colors duration-300"
            >
              Log in
            </Button>
          </Link>
          <Link href="/auth/signup" aria-label="Create a new account">
            <Button 
              size="sm"
              className="text-sm sm:text-base px-4 sm:px-6 whitespace-nowrap bg-gradient-to-r from-primary/90 to-primary hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
} 