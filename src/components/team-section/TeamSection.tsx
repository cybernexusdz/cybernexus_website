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
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 lg:space-y-16 relative z-10">
        {/* Header Badge */}
        <div ref={headerRef} className="text-center">
          <Badge
            variant="outline"
            className="border-primary/50 bg-background/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs sm:text-sm"
          >
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 inline" />
            &lt;OUR_TEAM&gt;
          </Badge>
        </div>

        {/* Team Introduction */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Team Image */}
          <div ref={imageRef}>
            <CyberCard variant="hologram">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/team-main-picture.jpg"
                  alt="CyberNexus Team"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </CyberCard>
          </div>

          {/* Description */}
          <div ref={contentRef} className="space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground font-mono leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                We Are
              </span>
              <br />
              CyberNexus
            </h2>

            <div className="space-y-3 sm:space-y-4 text-foreground/80 text-sm sm:text-base lg:text-lg">
              <p className="leading-relaxed">
                A passionate community of{" "}
                <span className="text-primary font-semibold">students</span>,{" "}
                <span className="text-primary font-semibold">developers</span>,
                and{" "}
                <span className="text-primary font-semibold">innovators</span>{" "}
                at Ibn Khaldoun University.
              </p>

              <p className="leading-relaxed font-mono text-xs sm:text-sm lg:text-base border-l-2 border-primary pl-3 sm:pl-4 py-1">
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
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div
            ref={carouselHeaderRef}
            className="flex items-center justify-center gap-2 flex-wrap px-2"
          >
            <Terminal className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
            <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-center text-foreground font-mono">
              <span className="text-primary">//</span> Moments From Our{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
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
