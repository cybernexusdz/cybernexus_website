import ContactSection from "@/components/contact-section/ContactSection";
import HeroSection from "@/components/hero-section/HeroSection";
import SponsorsSection from "@/components/sponsors-caroussel/SponsorsCaroussel";
import TeamSection from "@/components/team-section/TeamSection";
import WhatWeDoSection from "@/components/what-we-do-section/WhatWeDoSection";
import MeetTheTeam from "./MeetTheTeam";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div id="Hero">
        <HeroSection />
      </div>
      <div id="The Team">
        <TeamSection />
      </div>
      <div id="Meet The Team">
        <MeetTheTeam />
      </div>
      <div id="What We Do">
        <WhatWeDoSection />
      </div>
      <div id="Sponsors">
        {" "}
        <SponsorsSection />
      </div>
      <div id="Contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
