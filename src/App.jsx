import Footer from "./component/Footer";
import Header from "./component/Header";
import HeroSection from "./component/hero-section/HeroSection";
import BlogSection from "./component/blog-section/BlogSection";
import SponsorsCarousel from "./component/sponsors-caroussel/SponsorsCaroussel";
import ProjectsSection from "./component/projects-section/ProjectsSection";
import Separator from "./component/ui/Separator";
import ContactSection from "./component/Contact/Contact";

function App() {
  const handleScrollComponent = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-navyDark to-purpleDeep">
      <Header handleScrollComponent={handleScrollComponent} />
      {/* Hero Section */}
      <section id="Hero">
        <HeroSection />
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
      <ContactSection />
      <Separator />
      {/* Footer */}

      <Footer />
    </div>
  );
}

export default App;
