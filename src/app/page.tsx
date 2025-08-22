import HeroSection from "@/components/sections/HeroSection";
import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
import CategoriesSection from "@/components/sections/CategoriesSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedBlogs />
      <CategoriesSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}
