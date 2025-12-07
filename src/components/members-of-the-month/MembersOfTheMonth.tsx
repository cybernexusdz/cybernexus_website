import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import ProfileCard from "../team-section/ProfileCard";
import { teamMembers, type TeamMember } from "@/data/teamData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MembersOfTheMonthProps {
  memberIds: number[]; // Array of 5 member IDs
}

const MembersOfTheMonth: React.FC<MembersOfTheMonthProps> = ({ memberIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Get the selected members and transform them to include full member data
  const selectedMembers = memberIds
    .map((id) => teamMembers.find((member) => member.id === id))
    .filter((member): member is TeamMember => member !== undefined)
    .slice(0, 5); // Ensure max 5 members

  // Custom alternating wave glitch animation
  useEffect(() => {
    if (isCarouselMode || !gridRef.current) return;

    const cards = gridRef.current.children;
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      Array.from(cards).forEach((card, index) => {
        const isOddPosition = index % 2 === 0;
        const direction = isOddPosition ? -1 : 1; // Left vs Right

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        // Set initial state
        gsap.set(card, {
          opacity: 0.3,
          x: direction * 80,
          filter: "blur(5px)",
          scale: 0.95,
          pointerEvents: "none",
        });

        // Create the glitch animation
        tl
          // Initial slide in with RGB split
          .to(card, {
            opacity: 0.85,
            x: direction * 15,
            filter: "blur(2px)",
            scale: 0.98,
            duration: 0.35,
            delay: index * 0.12,
            ease: "power2.out",
          })
          // RGB glitch shake sequence
          .to(card, {
            x: () => gsap.utils.random(-8, 8),
            y: () => gsap.utils.random(-2, 2),
            skewX: () => gsap.utils.random(-3, 3),
            filter: "blur(1px) saturate(1.4) brightness(1.1)",
            duration: 0.04,
            ease: "none",
          })
          .to(card, {
            x: () => gsap.utils.random(-6, 6),
            y: () => gsap.utils.random(-2, 2),
            skewX: () => gsap.utils.random(-2, 2),
            filter: "blur(1px) saturate(1.3)",
            duration: 0.04,
            ease: "none",
          })
          .to(card, {
            x: () => gsap.utils.random(-4, 4),
            y: () => gsap.utils.random(-1, 1),
            skewX: () => gsap.utils.random(-2, 2),
            filter: "blur(0.5px) saturate(1.2)",
            duration: 0.04,
            ease: "none",
          })
          // Settle to final position with bounce
          .to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            skewX: 0,
            scale: 1,
            filter: "blur(0px)",
            pointerEvents: "auto",
            duration: 0.5,
            ease: "elastic.out(1, 0.6)",
          });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [isCarouselMode]);

  useEffect(() => {
    const checkCarouselMode = () => {
      // Switch to carousel mode on screens smaller than 1280px (xl breakpoint)
      setIsCarouselMode(window.innerWidth < 1280);
    };

    checkCarouselMode();
    window.addEventListener("resize", checkCarouselMode);
    return () => window.removeEventListener("resize", checkCarouselMode);
  }, []);

  // Intersection Observer for scroll-based navigation
  useEffect(() => {
    if (!isCarouselMode || !containerRef.current) return;

    const container = containerRef.current;
    const cards = container.querySelectorAll("[data-card-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-card-index") || "0",
            );
            setCurrentIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [isCarouselMode]);

  // Get member's primary role (first department role)
  const getMemberPrimaryRole = (member: TeamMember) => {
    return member.departmentRoles[0]?.role || "Member";
  };

  // Get member's primary department ID
  const getMemberDepartmentId = (member: TeamMember) => {
    return member.departmentRoles[0]?.departmentId || "";
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center py-6 md:py-8 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-4 md:mb-6 space-y-1.5 md:space-y-2 flex-shrink-0 px-4">
        <Badge
          variant="outline"
          className="border-primary/50 bg-background/80 backdrop-blur-sm px-3 py-1.5 font-mono text-xs md:text-sm"
        >
          <Trophy className="w-3 h-3 md:w-4 md:h-4 mr-2 inline" />
          &lt;FEATURED_MEMBERS&gt;
        </Badge>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-mono leading-tight">
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Nexians
          </span>
          <br />
          Of The Month
        </h2>

        <p className="text-foreground/70 font-mono text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
          <span className="text-primary">&gt;_</span> Celebrating our
          outstanding contributors who went above and beyond this month
        </p>
      </div>

      {/* Grid Mode (Desktop - XL and above) with Alternating Wave Glitch */}
      {!isCarouselMode && (
        <div className="w-full flex-1 flex items-center justify-center px-8">
          <div
            ref={gridRef}
            className="grid grid-cols-5 gap-6 w-full max-w-[1600px]"
            style={{ pointerEvents: "auto" }}
          >
            {selectedMembers.map((member, index) => {
              return (
                <div
                  key={member.id}
                  className="flex justify-center items-start"
                  style={{ pointerEvents: "auto" }}
                >
                  <ProfileCard
                    name={member.name}
                    role={getMemberPrimaryRole(member)}
                    image={member.image}
                    socialLinks={member.socialLinks}
                    memberId={member.id}
                    departmentId={getMemberDepartmentId(member)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Carousel Mode (Mobile/Tablet - below XL) - Scroll-based */}
      {isCarouselMode && (
        <div className="relative w-full flex-1 flex flex-col items-center justify-center">
          {/* Horizontal Scroll Container */}
          <div
            ref={containerRef}
            className="w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className="flex items-center h-full gap-8"
              style={{ width: `${selectedMembers.length * 100}vw` }}
            >
              {selectedMembers.map((member, index) => (
                <div
                  key={member.id}
                  data-card-index={index}
                  className="flex-shrink-0 w-screen h-full flex items-center justify-center snap-center px-4"
                >
                  <div className="mx-4">
                    <ProfileCard
                      name={member.name}
                      role={getMemberPrimaryRole(member)}
                      image={member.image}
                      socialLinks={member.socialLinks}
                      memberId={member.id}
                      departmentId={getMemberDepartmentId(member)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2.5 md:gap-3 mt-6 flex-shrink-0">
            {selectedMembers.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ease-out border ${
                  index === currentIndex
                    ? "w-6 md:w-8 bg-primary border-primary shadow-lg shadow-primary/50 scale-110"
                    : "w-1.5 md:w-2 bg-transparent border-primary/30"
                }`}
                aria-label={`Member ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Accent */}
      <div className="mt-4 md:mt-6 flex items-center gap-2 text-primary/50 font-mono text-xs flex-shrink-0">
        <div className="h-px w-6 md:w-8 bg-primary/50" />
        <span className="text-[10px] md:text-xs">EXCELLENCE_RECOGNIZED</span>
        <div className="h-px w-6 md:w-8 bg-primary/50" />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MembersOfTheMonth;
