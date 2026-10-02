import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Metrics } from "@/components/sections/Metrics";
import { Services } from "@/components/sections/Services";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TechList } from "@/components/sections/TechList";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { GlobalPresence } from "@/components/sections/GlobalPresence";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <WhoWeAre />
      <Metrics />
      <GlobalPresence />
      <Services />
      <SelectedWork />
      <ProcessTimeline />
      <TechList />
      <Testimonials />
      <CTASection />
    </>
  );
}
