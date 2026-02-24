import HeroSection from "@/components/modules/home/heroSection";
import HowItWorks from "@/components/modules/home/howItWorks";
import Testimonials from "@/components/modules/home/testimonials";
import WhyChooseUs from "@/components/modules/home/whyChooseUs";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
