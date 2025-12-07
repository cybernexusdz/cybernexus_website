import React from "react";
import { Badge } from "@/components/ui/badge";
import { Terminal, Users } from "lucide-react";
import CyberCard from "../ui/CyberCard";
import CyberCarousel from "../ui/CyberCarousel";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

const teamPhotos = [
  "/images/events/team-photo-1.jpg",
  "/images/events/team-photo-2.jpg",
  "/images/events/team-photo-3.jpg",
  "/images/events/team-photo-4.jpg",
  "/images/events/team-photo-5.jpg",
  "/images/events/team-photo-6.jpg",
  "/images/events/team-photo-7.jpg",
  "/images/events/team-photo-8.jpg",
  "/images/events/team-photo-9.jpg",
  "/images/events/team-photo-10.jpg",
  "/images/events/team-photo-11.jpeg",
  "/images/events/team-photo-12.jpeg",
  "/images/events/team-photo-13.jpeg",
  "/images/events/team-photo-14.jpeg",
  "/images/events/team-photo-15.jpeg",
  "/images/events/team-photo-16.jpeg",
  "/images/events/team-photo-17.jpeg",
  "/images/events/team-photo-18.jpeg",
  "/images/events/team-photo-19.jpeg",
  "/images/events/team-photo-20.jpeg",
  "/images/events/team-photo-21.jpeg",
  "/images/events/team-photo-22.jpg",
  "/images/events/team-photo-23.jpg",
];

const TeamSection: React.FC = () => {
  // Animation refs with scroll animations
  const headerRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.1,
  });

  const imageRef = useCyberScrollAnimation({
    animation: "cyberGlitchLeft",
    duration: 1.3,
    delay: 0.2,
    lightMode: true,
  });

  const contentRef = useCyberScrollAnimation({
    animation: "cyberGlitchRight",
    duration: 1.3,
    delay: 0.3,
  });

  const carouselHeaderRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.1,
  });

  const carouselRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.4,
    delay: 0.3,
    lightMode: true,
  });

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20 relative z-10">
        {/* Header Badge */}
        <div ref={headerRef} className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono"
          >
            <Terminal className="w-4 h-4 mr-2 inline" />
            &lt;OUR_TEAM&gt;
          </Badge>
        </div>

        {/* Team Introduction */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Team Image */}
          <div ref={imageRef}>
            <CyberCard variant="hologram">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src="/team-main-picture.jpg"
                  alt="CyberNexus Team"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 pointer-events-none">
                  <Badge className="bg-primary text-primary-foreground font-mono">
                    <Users className="w-4 h-4 mr-2" />
                    CyberNexus Team
                  </Badge>
                </div>
              </div>
            </CyberCard>
          </div>

          {/* Description */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-mono leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                We Are
              </span>
              <br />
              CyberNexus
            </h2>

            <div className="space-y-4 text-foreground/80 text-base sm:text-lg">
              <p className="leading-relaxed">
                A passionate community of{" "}
                <span className="text-primary font-semibold">students</span>,{" "}
                <span className="text-primary font-semibold">developers</span>,
                and{" "}
                <span className="text-primary font-semibold">innovators</span>{" "}
                at Ibn Khaldoun University.
              </p>

              <p className="leading-relaxed font-mono text-sm sm:text-base border-l-2 border-primary pl-4">
                <span className="text-primary">&gt;_</span> We build, we learn,
                we grow together. From beginner coders to tech veterans,
                everyone has a place in our nexus.
              </p>

              <p className="leading-relaxed">
                Join us as we embark on this journey to create, innovate, and
                push the boundaries of what's possible in tech.{" "}
                <span className="text-primary font-semibold">
                  The future starts here.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Photo Carousel */}
        <div className="space-y-6 sm:space-y-8">
          <div
            ref={carouselHeaderRef}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center text-foreground font-mono">
              <span className="text-primary">//</span> Moments From Our{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
            <Terminal className="w-4 h-4 text-primary flex-shrink-0" />
          </div>

          <div ref={carouselRef}>
            <CyberCarousel photos={teamPhotos} autoPlayInterval={4000} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
