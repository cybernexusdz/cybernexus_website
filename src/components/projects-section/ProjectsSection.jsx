import { useEffect, useState, useMemo, useRef, useCallback, memo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Users,
  GitBranch,
  Terminal,
} from "lucide-react";
import ProjectCard from "../project-card/ProjectCard.jsx";
import { Badge } from "@/components/ui/badge";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

const sampleProjects = [
  {
    id: 1,
    name: "CYBERNEXUS Official Platform",
    description:
      "Official web presence for the CYBERNEXUS club, showcasing neural team networks, interactive workshop enrollments, and community projects.",
    imageURL: "/website-project.png",
    technologies: ["React", "TypeScript", "TailwindCSS", "Supabase", "GSAP"],
    githubURL: "https://github.com/cybernexusdz/cybernexus_website",
    liveURL: "https://cybernexusdz.vercel.app",
    contributors: 8,
    createdAt: "2025–2026",
  },
  {
    id: 2,
    name: "ShipBot Tactical Arcade",
    description:
      "Interactive Battleship strategy game featuring a custom hunt-and-target AI bot built by CyberNexus developers.",
    imageURL: "/Futuro.jpg",
    technologies: ["React", "JavaScript", "Algorithms", "TailwindCSS"],
    githubURL: "https://github.com/cybernexusdz/cybernexus_website",
    liveURL: "/shipgame",
    contributors: 4,
    createdAt: "2025",
  },
];

const ALL_TAG = "all";

// Memoized Stats Card
const StatCard = memo(({ icon: Icon, value, label }) => (
  <div className="relative group">
    <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-l-2 border-t-2 border-primary/50 pointer-events-none z-10" />
    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-r-2 border-t-2 border-primary/50 pointer-events-none z-10" />
    <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-l-2 border-b-2 border-primary/50 pointer-events-none z-10" />
    <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-r-2 border-b-2 border-primary/50 pointer-events-none z-10" />
    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
    <div className="absolute inset-0 rounded-xl border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300" />
    <div className="relative bg-base-200/95 rounded-xl p-4 sm:p-6 border-2 border-base-content/10 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-mono">
          {value}+
        </div>
      </div>
      <div className="text-sm font-bold text-base-content/60 font-mono uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  </div>
));

StatCard.displayName = "StatCard";

// Memoized Navigation Button - Simplified
const NavButton = memo(({ direction, onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 z-40 disabled:opacity-30 disabled:cursor-not-allowed ${
        direction === "left" ? "left-4 md:left-8" : "right-4 md:right-8"
      }`}
      aria-label={`${direction === "left" ? "Previous" : "Next"} project`}
    >
      <div className="relative group/nav overflow-hidden">
        <div
          className={`absolute inset-0 bg-primary transition-opacity duration-300 ${
            isHovered ? "opacity-30" : "opacity-0"
          }`}
        />
        {/* Removed backdrop-blur */}
        <div className="relative bg-base-200/90 p-3 md:p-4 rounded-lg hover:bg-primary hover:border-primary hover:text-white border-2 border-primary/40 hover:border-primary/80 transition-all duration-300 shadow-lg">
          {direction === "left" ? (
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </div>
      </div>
    </button>
  );
});

NavButton.displayName = "NavButton";

// Memoized Dot Indicator - Removed blur
const DotIndicator = memo(({ index, currentIndex, onClick }) => (
  <button
    onClick={onClick}
    className="relative group/dot"
    aria-label={`Go to project ${index + 1}`}
  >
    {/* Removed blur effect */}
    <div
      className={`relative h-2 rounded-full transition-all duration-300 border ${
        index === currentIndex
          ? "w-8 bg-primary border-primary/50"
          : "w-2 bg-base-content/20 border-base-content/20 hover:bg-base-content/40"
      }`}
    />
  </button>
));

DotIndicator.displayName = "DotIndicator";

export default function ProjectsSection({
  projects = sampleProjects,
  loading = false,
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const headerRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.0,
    delay: 0.1,
  });
  const statsRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.2,
  });
  const carouselWrapperRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.1,
    delay: 0.3,
    lightMode: true,
  });

  const tags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) =>
      p.technologies?.forEach((t) => set.add(t.toLowerCase())),
    );
    return [ALL_TAG, ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = projects;
    if (activeTag !== ALL_TAG) {
      list = list.filter((p) =>
        p.technologies?.some(
          (t) => t.toLowerCase() === activeTag.toLowerCase(),
        ),
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [projects, activeTag, query]);

  const totalContributors = useMemo(
    () => projects.reduce((sum, p) => sum + (p.contributors || 0), 0),
    [projects],
  );

  const scroll = useCallback(
    (dir) => {
      if (dir === "left") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else {
        setCurrentIndex((prev) =>
          Math.min(Math.max(filteredProjects.length - 1, 0), prev + 1),
        );
      }
    },
    [filteredProjects.length],
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        scroll("right");
      } else {
        scroll("left");
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [scroll]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTag, query]);

  const getCardStyle = useCallback(
    (index) => {
      const diff = index - currentIndex;
      const absDiff = Math.abs(diff);
      if (absDiff > 2) {
        return {
          opacity: 0,
          transform: "translateX(0) scale(0.75)",
          zIndex: 0,
          pointerEvents: "none",
        };
      }
      if (diff === 0) {
        return {
          opacity: 1,
          transform: "translateX(0) scale(1)",
          zIndex: 30,
          pointerEvents: "auto",
        };
      }
      if (diff > 0) {
        return {
          opacity: absDiff === 1 ? 0.85 : 0.45,
          transform: `translateX(${absDiff * 45}%) scale(${1 - absDiff * 0.12})`,
          zIndex: 30 - absDiff,
          pointerEvents: absDiff === 1 ? "auto" : "none",
        };
      }
      return {
        opacity: absDiff === 1 ? 0.85 : 0.45,
        transform: `translateX(-${absDiff * 45}%) scale(${1 - absDiff * 0.12})`,
        zIndex: 30 - absDiff,
        pointerEvents: absDiff === 1 ? "auto" : "none",
      };
    },
    [currentIndex],
  );

  const noResults = filteredProjects.length === 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/20 to-base-100 relative overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-4">
          <div className="mb-4 flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono"
            >
              <Terminal className="w-4 h-4 mr-2 inline" />
              &lt;PROJECT_ARCHIVE&gt;
            </Badge>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-base-content font-mono">
            <span className="text-primary/60">&gt;</span> What We're{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent">
              Building
            </span>
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed font-mono">
            <span className="text-secondary">&gt;</span> Explore cutting-edge
            projects by our{" "}
            <span className="text-primary font-bold">Nexians</span> community
          </p>
          <div className="flex items-center justify-center gap-2 text-primary/40 font-mono text-xs pt-4">
            <Code2 className="w-4 h-4" />
            <div className="flex gap-1">
              <span className="animate-pulse">
                ────────────────────────────────────────
              </span>
            </div>
            <Code2 className="w-4 h-4" />
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex items-center justify-center gap-6 sm:gap-10"
        >
          <StatCard icon={GitBranch} value={projects.length} label="Projects" />
          <StatCard
            icon={Users}
            value={totalContributors}
            label="Contributors"
          />
        </div>

        {/* Technology Filter Pills */}
        {tags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full font-mono text-xs uppercase transition-all border ${
                  activeTag === tag
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-base-200/50 text-base-content/70 border-primary/20 hover:border-primary/50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Dot Indicators */}
        {!loading && filteredProjects.length > 0 && (
          <div className="flex justify-center gap-2">
            {filteredProjects.map((_, idx) => (
              <DotIndicator
                key={idx}
                index={idx}
                currentIndex={currentIndex}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}

        {/* Carousel area */}
        <div
          ref={carouselWrapperRef}
          className="relative flex justify-center items-center py-4 touch-pan-y"
          style={{ minHeight: "450px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <NavButton
            direction="left"
            onClick={() => scroll("left")}
            disabled={noResults || currentIndex === 0}
          />
          {loading ? (
            <div className="w-full max-w-[280px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[580px]">
              <ProjectCard loading={true} />
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="relative w-full max-w-[280px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[560px] h-[460px]">
              {filteredProjects.map((project, idx) => {
                const style = getCardStyle(idx);
                return (
                  <div
                    key={`${project.id}-${idx}`}
                    className="absolute inset-0 w-full transition-all duration-500 ease-out cursor-pointer select-none"
                    style={{
                      opacity: style.opacity,
                      transform: style.transform,
                      zIndex: style.zIndex,
                      pointerEvents: style.pointerEvents,
                    }}
                    onClick={() => {
                      if (Math.abs(idx - currentIndex) === 1) {
                        setCurrentIndex(idx);
                      }
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="relative inline-block mb-4">
                {/* Removed blur effect */}
                <Code2 className="relative w-16 h-16 text-primary/40" />
              </div>
              <p className="text-lg font-bold text-base-content/60 mb-2 font-mono">
                <span className="text-error">&gt;</span> NO_PROJECTS_FOUND
              </p>
              <p className="text-sm text-base-content/40 font-mono">
                Try adjusting your search parameters
              </p>
            </div>
          )}
          <NavButton
            direction="right"
            onClick={() => scroll("right")}
            disabled={noResults || currentIndex === filteredProjects.length - 1}
          />
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge
            variant="outline"
            className="bg-green-500/10 border-green-500/30 text-green-400 font-mono uppercase tracking-wide"
          >
            ACTIVE: {filteredProjects.length}
          </Badge>
        </div>
      </div>
    </section>
  );
}
