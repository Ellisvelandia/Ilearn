import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features";
import { PricingSection } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
