import FeaturedTutors from "@/components/modules/home/featuredTutors";
import HeroSection from "@/components/modules/home/heroSection";
import HowItWorks from "@/components/modules/home/howItWorks";
import SuccessStats from "@/components/modules/home/successStats";
import Testimonials from "@/components/modules/home/testimonials";
import WhyChooseUs from "@/components/modules/home/whyChooseUs";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <FeaturedTutors/>
      <SuccessStats />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
