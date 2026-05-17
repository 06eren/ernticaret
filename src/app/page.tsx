import Hero from "@/components/Hero";
import Features from "@/components/sections/Features";
import ScrollShowcase from "@/components/sections/ScrollShowcase";
import Categories from "@/components/sections/Categories";
import FeaturedApps from "@/components/sections/FeaturedApps";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ScrollShowcase />
      <Categories />
      <FeaturedApps />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
