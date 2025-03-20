"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavItem } from "@/components/landing/nav/nav-items";
import { AuthButtons } from "@/components/landing/nav/auth-buttons";
import { ThemeToggle } from "@/components/theme-toggle";

interface MobileNavProps {
  items: NavItem[];
  isOpen: boolean;
  activeSection: string;
  onToggle: () => void;
  onNavigate: (sectionId: string) => void;
}

export function MobileNav({ items, isOpen, activeSection, onToggle, onNavigate }: MobileNavProps) {
  return (
    <>
      <div className="flex md:hidden items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={onToggle}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="container py-4 px-4 flex flex-col gap-4 bg-background/80 backdrop-blur-lg">
            {items.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.href.slice(1))}
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
    </>
  );
} 