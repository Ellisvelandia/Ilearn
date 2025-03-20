import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { Features } from "@/components/landing/features";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth();

  // If authenticated, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Navigation - Enhanced for better mobile experience */}
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg sm:text-xl lg:text-2xl transition-all">YouLearn</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link href="/auth/login" aria-label="Log in to your account">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-sm sm:text-base px-2 sm:px-4"
              >
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup" aria-label="Create a new account">
              <Button 
                size="sm"
                className="text-sm sm:text-base px-3 sm:px-4 whitespace-nowrap"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content with responsive spacing */}
      <div className="flex-1 w-full">
        <HeroSection />
        <Features />
      </div>

      {/* Footer - Enhanced for better mobile layout */}
      <footer className="border-t py-4 sm:py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <p className="text-center text-xs sm:text-sm leading-loose text-muted-foreground md:text-left">
              Built with ❤️ by YouLearn Team. The source code is available on{" "}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
