"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setIsMobileMenuOpen(false);
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

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1">
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
          <ThemeToggle />
          <AuthButtons />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 px-4 flex flex-col gap-4 bg-background/80 backdrop-blur-lg">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm rounded-md transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-primary font-medium bg-primary/5"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.name}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
              <AuthButtons isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function AuthButtons({ isMobile = false }: { isMobile?: boolean }) {
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