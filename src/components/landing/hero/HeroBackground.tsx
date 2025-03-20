"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-background to-primary/10" />
      <div className="absolute h-[800px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/5 to-transparent blur-3xl opacity-30" />
      </div>
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] bg-cyan-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
    </div>
  );
} 