import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8 pb-8 pt-20 md:pt-28 lg:pt-32">
      <a
        className="group inline-flex items-center rounded-lg bg-muted px-3 py-1 text-xs sm:text-sm font-medium transition-colors hover:bg-muted/80"
        href="https://github.com/youlearn"
        target="_blank"
        rel="noreferrer"
      >
        Follow along on GitHub
        <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
      </a>
      <h1 className="text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter md:leading-[1.1] lg:leading-[1.1] max-w-[90%] sm:max-w-[85%] md:max-w-[80%]">
        Learn anything, anywhere,
        <br className="hidden sm:inline" />
        at your own pace
      </h1>
      <p className="max-w-[85%] sm:max-w-[75%] md:max-w-[65%] text-center text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
        YouLearn is your personal learning companion. Create custom study paths,
        track your progress, and connect with fellow learners.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-4">
        <Link href="/signup" className="w-full sm:w-auto">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
          >
            Get Started
          </Button>
        </Link>
        <Link href="/courses" className="w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
          >
            Browse Courses
          </Button>
        </Link>
      </div>
    </section>
  );
} 