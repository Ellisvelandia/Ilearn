import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Footer } from "@/components/landing/Footer";
import { Pricing } from "../components/landing/pricing";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth();

  // If authenticated, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent -z-[1]" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 z-50">
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

      {/* Main content */}
      <div className="flex-1 w-full">
        <HeroSection />
        <Features />
        <Pricing />
      </div>

      {/* Footer */}
     <Footer/>
    </main>
  );
}
