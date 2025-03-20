"use client";

import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { ModelViewer } from "./hero/ModelViewer";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="w-full lg:w-[45%]">
            <HeroContent />
          </div>
          <div className="w-full lg:w-[50%] h-[400px] lg:h-[500px]">
            <ModelViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
