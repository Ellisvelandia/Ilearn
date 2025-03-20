"use client";

import { HeroContent } from "./hero/HeroContent";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden mt-14 sm:mt-16 lg:mt-0 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
