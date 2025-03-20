"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "./nav/mobile-nav";
import { AuthButtons } from "./nav/auth-buttons";
import { navItems } from "./nav/nav-items";

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = navItems.map(item => item.href.slice(1));
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
      const offset = 80;
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
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/20 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <span className="relative font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent transition-all duration-300 ease-out">
              iLearnAI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Navigation */}
        <MobileNav
          items={navItems}
          isOpen={isMobileMenuOpen}
          activeSection={activeSection}
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onNavigate={scrollToSection}
        />
      </div>
    </nav>
  );
} 