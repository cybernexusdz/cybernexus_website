import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import HeroSection from "./components/hero-section/HeroSection";
import BlogSection from "./components/blog-section/BlogSection";
import SponsorsCarousel from "./components/sponsors-caroussel/SponsorsCaroussel";
import ProjectsSection from "./components/projects-section/ProjectsSection";
import Separator from "./components/ui/Separator";
import ContactSection from "./components/contact-section/ContactSection";
import TeamSection from "./components/team-section/TeamSection";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "boyLight",
  );
  const handleScrollComponent = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-navyDark to-purpleDeep">
      <Navbar
        theme={theme}
        setTheme={setTheme}
        handleScrollComponent={handleScrollComponent}
      />
      {/* Hero Section */}
      <section id="Hero">
        <HeroSection theme={theme} />
      </section>
      <Separator />
      <section id="Team Members">
        <TeamSection languageCode="en" />
      </section>

      <Separator />

      {/* Blog Section */}
      <section id="Blog">
        <BlogSection languageCode="en" />
      </section>
      <Separator />
      {/* Projects Section */}

      <section id="Projects">
        <ProjectsSection />
      </section>
      <Separator />
      {/* Sponsors Carousel */}
      <section id="Sponsors">
        <SponsorsCarousel />
      </section>
      <Separator />
      <section id="Contact">
        <ContactSection />
      </section>
      <Separator />
      {/* Footer */}

      <Footer />
    </div>
  );
}

export default App;
