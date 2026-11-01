import ContactSection from "@/components/contact-section/ContactSection";
import HeroSection from "@/components/hero-section/HeroSection";
import TeamSection from "@/components/team-section/TeamSection";
import WhatWeDoSection from "@/components/what-we-do-section/WhatWeDoSection";
import MembersOfTheMonth from "@/components/members-of-the-month/MembersOfTheMonth";
import ProjectsSection from "@/components/projects-section/ProjectsSection";
import BlogSection from "@/components/blog-section/BlogSection";
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
      <div id="Members Of The Month">
        <MembersOfTheMonth memberIds={[1, 2, 19, 16, 7]} />
      </div>
      <div id="What We Do">
        <WhatWeDoSection />
      </div>
      <div id="Projects">
        <ProjectsSection />
      </div>
      <div id="Blog">
        <BlogSection />
      </div>
      <div id="Contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
