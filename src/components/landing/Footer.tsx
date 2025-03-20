"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full py-8 sm:py-12 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Link href="/" className="inline-block group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="font-bold text-lg sm:text-xl">//</span>
            </div>
          </Link>
        </div>

        {/* Navigation - Responsive grid for mobile */}
        <nav className="mb-6 sm:mb-8 overflow-x-auto">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 px-4 min-w-max mx-auto">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links with improved mobile spacing */}
        <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
          {socialLinks.map((social) => (
            <Link 
              key={social.name}
              href={social.href}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-all duration-200 hover:scale-105"
              aria-label={social.name}
            >
              <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Newsletter with responsive width */}
        <form onSubmit={handleSubscribe} className="flex justify-center mb-6 sm:mb-8 px-4">
          <div className="flex flex-col sm:flex-row w-full max-w-sm gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-10 bg-background border-border text-sm focus:ring-2 focus:ring-primary/20"
              required
            />
            <Button 
              type="submit"
              className="h-10 px-4 sm:px-6 bg-primary hover:bg-primary/90 text-primary-foreground text-sm whitespace-nowrap font-medium"
            >
              Subscribe
            </Button>
          </div>
        </form>

        {/* Copyright with improved responsive text */}
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} iLearnAI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Democratizing high quality education worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
