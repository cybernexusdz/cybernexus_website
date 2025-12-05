// src/components/sections/TeamSection.tsx
import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Terminal } from "lucide-react";
import CyberCard from "../ui/CyberCard";
import CyberCarousel from "../ui/CyberCarousel";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";
import MembersOfTheMonth from "../members-of-the-month/MembersOfTheMonth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

// Featured Members of the Month (IDs)
const FEATURED_MEMBER_IDS = [1, 2, 19, 11, 3];

const TeamSection: React.FC = () => {
  // Refs for scroll-pin animation
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const teamIntroRef = useRef<HTMLDivElement>(null);
  const membersMonthRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);

  // Animation refs with RGB CHROMATIC ABERRATION glitch effects
  const headerRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.1,
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
  });

  // GSAP Scroll Pin Effect with Beautiful Cyber Transition
  useEffect(() => {
    const pinContainer = pinContainerRef.current;
    const teamIntro = teamIntroRef.current;
    const membersMonth = membersMonthRef.current;
    const glitchOverlay = glitchOverlayRef.current;

    if (!pinContainer || !teamIntro || !membersMonth || !glitchOverlay) return;

    // Set initial states
    gsap.set(membersMonth, {
      opacity: 0,
      scale: 0.95,
      y: 50,
      pointerEvents: "none",
    });

    gsap.set(teamIntro, {
      opacity: 1,
      scale: 1,
      y: 0,
      pointerEvents: "auto",
    });

    gsap.set(glitchOverlay, {
      opacity: 0,
    });

    // Create timeline with scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinContainer,
        start: "top top",
        end: "+=2500",
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Intense glitch effect in the middle of transition (0.35 to 0.65)
          if (progress > 0.35 && progress < 0.65) {
            const transitionProgress = (progress - 0.35) / 0.3; // 0 to 1 within transition zone
            const glitchIntensity = Math.sin(transitionProgress * Math.PI); // peaks at 0.5

            // Multiple frequency waves for chaotic glitch
            const wave1 = Math.sin(progress * Math.PI * 12) * glitchIntensity;
            const wave2 = Math.cos(progress * Math.PI * 20) * glitchIntensity;
            const wave3 = Math.sin(progress * Math.PI * 8) * glitchIntensity;

            const combinedGlitch = (wave1 + wave2 * 0.6 + wave3 * 0.4) / 2;
            const rgbSplit = combinedGlitch * 8;

            // Micro jitters for extra chaos
            const microJitter = (Math.random() - 0.5) * 3;
            const finalRgbSplit =
              rgbSplit + (Math.abs(combinedGlitch) > 0.3 ? microJitter : 0);

            // Extreme chromatic aberration during transition
            const chromeEffect = `
              drop-shadow(${finalRgbSplit}px 0 0 rgba(255, 0, 0, 1))
              drop-shadow(${-finalRgbSplit}px 0 0 rgba(0, 255, 255, 1))
              drop-shadow(0 ${finalRgbSplit * 0.5}px 0 rgba(0, 255, 0, 0.6))
              drop-shadow(${finalRgbSplit * 0.3}px ${-finalRgbSplit * 0.3}px 0 rgba(255, 0, 255, 0.5))
              contrast(${1 + Math.abs(combinedGlitch) * 0.4})
              saturate(${1 + Math.abs(combinedGlitch) * 0.8})
              brightness(${1 + Math.abs(combinedGlitch) * 0.2})
              hue-rotate(${combinedGlitch * 15}deg)
            `;

            gsap.set([teamIntro, membersMonth], {
              filter: chromeEffect,
            });

            // Show glitch overlay during intense transition
            gsap.set(glitchOverlay, {
              opacity: glitchIntensity * 0.7,
            });
          } else {
            gsap.set([teamIntro, membersMonth], {
              filter: "none",
            });
            gsap.set(glitchOverlay, {
              opacity: 0,
            });
          }

          // Smooth pointer events switching
          if (progress > 0.6) {
            gsap.set(teamIntro, { pointerEvents: "none" });
            gsap.set(membersMonth, { pointerEvents: "auto" });
          } else {
            gsap.set(teamIntro, { pointerEvents: "auto" });
            gsap.set(membersMonth, { pointerEvents: "none" });
          }
        },
      },
    });

    // Beautiful cyber fade-out and fade-in transition
    tl
      // Phase 1: Team intro fades out and scales down (0% to 40%)
      .to(teamIntro, {
        opacity: 0,
        scale: 0.9,
        y: -30,
        duration: 0.4,
        ease: "power2.inOut",
      })
      // Phase 2: Transition zone with glitch overlay (40% to 60%)
      .to({}, { duration: 0.2 }) // Hold for glitch effect
      // Phase 3: Members section fades in and scales up (60% to 100%)
      .to(
        membersMonth,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.1",
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleMeetTeam = () => {
    window.location.href = "/meet-the-team";
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
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

        {/* SCROLL-PIN CONTAINER: Team Intro ↔ Members of the Month */}
        <div
          ref={pinContainerRef}
          className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Cyber Glitch Overlay - Shows during transition */}
          <div
            ref={glitchOverlayRef}
            className="absolute inset-0 pointer-events-none z-40 cyber-glitch-overlay"
          >
            {/* Horizontal scan lines */}
            <div className="absolute inset-0 cyber-scanlines" />

            {/* Fast moving glitch bars */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 h-full cyber-transition-bar"
                  style={{
                    width: `${8 + Math.random() * 10}%`,
                    left: `${i * 8.5}%`,
                    animationDelay: `${i * 0.03}s`,
                  }}
                />
              ))}
            </div>

            {/* RGB noise particles */}
            <div className="absolute inset-0 cyber-rgb-noise" />
          </div>

          {/* Team Introduction */}
          <div
            ref={teamIntroRef}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <div className="w-full max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Team Image */}
                <div>
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
                <div className="space-y-6">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground font-mono leading-tight">
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                      We Are
                    </span>
                    <br />
                    CyberNexus
                  </h2>

                  <div className="space-y-4 text-foreground/80 text-lg">
                    <p className="leading-relaxed">
                      A passionate community of{" "}
                      <span className="text-primary font-semibold">
                        students
                      </span>
                      ,{" "}
                      <span className="text-primary font-semibold">
                        developers
                      </span>
                      , and{" "}
                      <span className="text-primary font-semibold">
                        innovators
                      </span>{" "}
                      at Ibn Khaldoun University.
                    </p>

                    <p className="leading-relaxed font-mono text-base border-l-2 border-primary pl-4">
                      <span className="text-primary">&gt;_</span> We build, we
                      learn, we grow together. From beginner coders to tech
                      veterans, everyone has a place in our nexus.
                    </p>

                    <p className="leading-relaxed">
                      Join us as we embark on this journey to create, innovate,
                      and push the boundaries of what's possible in tech.{" "}
                      <span className="text-primary font-semibold">
                        The future starts here.
                      </span>
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleMeetTeam}
                    className="group bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-lg px-8 py-6 mt-6 transition-all duration-200 hover:scale-105"
                  >
                    <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    MEET_THE_TEAM
                    <span className="text-xs opacity-70 ml-1">.exe</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Members of the Month */}
          <div
            ref={membersMonthRef}
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <div className="w-full">
              <MembersOfTheMonth memberIds={FEATURED_MEMBER_IDS} />
            </div>
          </div>
        </div>

        {/* Photo Carousel */}
        <div className="space-y-4 pt-4">
          <div
            ref={carouselHeaderRef}
            className="flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <h3 className="text-xl sm:text-2xl font-bold text-center text-foreground font-mono">
              <span className="text-primary">//</span> Moments From Our{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
            <Terminal className="w-4 h-4 text-primary" />
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
