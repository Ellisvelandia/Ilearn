"use client";

import { BentoFeature } from "./types";
import { SkeletonOne, SkeletonTwo, SkeletonThree, SkeletonFour } from "./skeletons";
import { FeatureCard, FeatureTitle, FeatureDescription, BackgroundEffects, Header } from "./feature-components";

// Data
const bentoFeatures: BentoFeature[] = [
  {
    title: "Smart Content Processing",
    description: "Upload any study material - PDFs, videos, audio, or slides. Our AI instantly processes and structures your content for effective learning.",
    skeleton: <SkeletonOne />,
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r dark:border-neutral-800",
  },
  {
    title: "AI-Powered Learning",
    description: "Our advanced AI creates personalized study paths and breaks down complex topics into digestible concepts that adapt to your learning style.",
    skeleton: <SkeletonTwo />,
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b dark:border-neutral-800",
  },
  {
    title: "Interactive Study Tools",
    description: "Get instant AI-generated summaries, flashcards, and practice quizzes. Track your progress with smart insights and recommendations.",
    skeleton: <SkeletonThree />,
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r dark:border-neutral-800",
  },
  {
    title: "Global Learning Platform",
    description: "Join our worldwide community of learners. Access your personalized materials anytime, anywhere, and connect with fellow students and educators.",
    skeleton: <SkeletonFour />,
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-none",
  },
];

const BentoGrid = ({ features }: { features: BentoFeature[] }) => (
  <div className="relative z-20 py-10 lg:py-20 max-w-7xl mx-auto">
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
        {features.map((feature) => (
          <FeatureCard key={feature.title} className={feature.className}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <div className="h-full w-full">{feature.skeleton}</div>
          </FeatureCard>
        ))}
      </div>
    </div>
  </div>
);

export function Features() {
  return (
    <section
      id="features"
      className="container space-y-8 sm:space-y-12 lg:space-y-16 py-12 px-4 sm:px-6 lg:px-8 md:py-16 lg:py-24 relative overflow-hidden"
    >
      <BackgroundEffects />
      <Header />
      <BentoGrid features={bentoFeatures} />
    </section>
  );
} 