import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container flex flex-col items-center justify-center gap-4 pb-8 pt-24 md:pt-32 md:pb-12 lg:py-32">
      <a
        className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        href="https://github.com/youlearn"
        target="_blank"
        rel="noreferrer"
      >
        Follow along on GitHub
        <ArrowRight className="ml-1 h-4 w-4" />
      </a>
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
        Learn anything, anywhere,
        <br className="hidden sm:inline" />
        at your own pace
      </h1>
      <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
        YouLearn is your personal learning companion. Create custom study paths,
        track your progress, and connect with fellow learners.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/signup">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="/courses">
          <Button variant="outline" size="lg">
            Browse Courses
          </Button>
        </Link>
      </div>
    </section>
  );
} 