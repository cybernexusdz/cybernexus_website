import { useEffect, useState, useMemo, useRef } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Code2,
  Zap,
  Users,
  GitBranch,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../project-card/ProjectCard.jsx";
import useGlitchAnimation from "../../hooks/useGlitchAnimation.jsx";

gsap.registerPlugin(ScrollTrigger);

const sampleProjects = [
  {
    id: 1,
    name: "AI Chat Bot",
    description:
      "An intelligent chatbot powered by machine learning that can understand context and provide helpful responses.",
    imageURL:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=60",
    technologies: ["React", "Python", "TensorFlow"],
    githubURL: "https://github.com/cybernexusdz/chatbot",
    liveURL: "https://demo.cybernexus.com",
    contributors: 5,
    createdAt: "Oct 2024",
  },
  {
    id: 5,
    name: "Quantum Dashboard",
    description:
      "Real-time analytics dashboard with quantum-inspired visualizations and predictive modeling.",
    imageURL:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60",
    technologies: ["React", "Python", "TensorFlow"],
    githubURL: "https://github.com/cybernexusdz/chatbot",
    liveURL: "https://demo.cybernexus.com",
    contributors: 5,
    createdAt: "Oct 2024",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio built with React, Tailwind and Vite.",
    imageURL:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?w=600&q=60",
    technologies: ["React", "TailwindCSS"],
    githubURL: "https://github.com/cybernexusdz/portfolio",
    liveURL: "https://cybernexus.com",
    contributors: 2,
    createdAt: "Jan 2025",
  },
  {
    id: 3,
    name: "Student Manager",
    description: "Manage student records using SQLite and JavaFX.",
    imageURL:
      "https://images.unsplash.com/photo-1590608897129-79da98d159ad?w=600&q=60",
    technologies: ["Java", "SQLite"],
    githubURL: "https://github.com/cybernexusdz/student-manager",
    contributors: 3,
    createdAt: "Aug 2024",
  },
  {
    id: 4,
    name: "Smart Home System",
    description: "IoT-based home automation using Raspberry Pi and MQTT.",
    imageURL:
      "https://images.unsplash.com/photo-1581093588401-22d5f4f9c2a7?w=600&q=60",
    technologies: ["Python", "IoT"],
    githubURL: "#",
    liveURL: "#",
    contributors: 2,
    createdAt: "Mar 2024",
  },
];

const ALL_TAG = "all";

export default function ProjectsSection({
  projects = sampleProjects,
  loading = false,
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const searchFilterRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const scroll = (dir) => {
    if (dir === "left") {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentIndex((prev) =>
        Math.min(Math.max(filteredProjects.length - 1, 0), prev + 1),
      );
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
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
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTag, query]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements on scroll
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
        });
      }

      // Animate stats section
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          scale: 0.8,
          stagger: 0.15,
          duration: 1,
        });
      }

      // Animate carousel container
      if (cardsContainerRef.current) {
        gsap.from(cardsContainerRef.current, {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          y: 40,
          duration: 1,
        });
      }

      // Animate search and filter section
      if (searchFilterRef.current) {
        gsap.from(searchFilterRef.current.children, {
          scrollTrigger: {
            trigger: searchFilterRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const getCardStyle = (index) => {
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
  };

  // helper to determine when to disable navs (both should be disabled if no results)
  const noResults = filteredProjects.length === 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center"
    >
      {/* Animated background */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div> */}

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center space-y-3 transition-all duration-1000 `}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full text-primary text-sm font-semibold border border-primary/20 shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Built by Nexians</span>
            <Zap className="w-4 h-4" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            What We're{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
            >
              Building
            </span>
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Explore cutting-edge projects by our{" "}
            <span className="text-primary font-semibold">Nexians</span>{" "}
            community
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`flex items-center justify-center gap-6 sm:gap-10 transition-all duration-1000 delay-200 `}
        >
          <div className="text-center group">
            <div className="flex items-center justify-center gap-2 mb-1">
              <GitBranch className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
              <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {projects.length}+
              </div>
            </div>
            <div className="text-sm font-medium text-base-content/60">
              Projects
            </div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {projects.reduce((sum, p) => sum + (p.contributors || 0), 0)}+
              </div>
            </div>
            <div className="text-sm font-medium text-base-content/60">
              Contributors
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        {!loading && filteredProjects.length > 0 && (
          <div className="flex justify-center gap-2">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 h-2 bg-primary shadow-lg shadow-primary/50" : "w-2 h-2 bg-base-content/20 hover:bg-base-content/40"}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Carousel area with nav buttons */}
        <div
          ref={cardsContainerRef}
          className="relative flex justify-center items-center py-4 touch-pan-y"
          style={{ minHeight: "450px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left nav - hidden on mobile, visible on sm and above */}
          <button
            onClick={() => scroll("left")}
            disabled={noResults || currentIndex === 0}
            title="Previous project"
            aria-label="Previous project"
            className="hidden sm:flex absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-40 btn btn-circle btn-primary hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

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
              <Code2 className="w-16 h-16 mx-auto mb-3 text-base-content/10" />
              <p className="text-lg font-medium text-base-content/60 mb-2">
                No projects found
              </p>
              <p className="text-sm text-base-content/40">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Right nav - hidden on mobile, visible on sm and above */}
          <button
            onClick={() => scroll("right")}
            disabled={noResults || currentIndex === filteredProjects.length - 1}
            title="Next project"
            aria-label="Next project"
            className="hidden sm:flex absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-40 btn btn-circle btn-primary hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div
          ref={searchFilterRef}
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-1000 delay-100 `}
        >
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered w-full pr-10 pl-10 focus:input-primary transition-all bg-base-200/50 backdrop-blur-sm border-base-content/10 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-error transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          <div className="relative">
            <select
              className="select select-bordered bg-base-200/50 backdrop-blur-sm border-base-content/10 pl-9 pr-8 font-medium focus:border-primary/50 focus:outline-none focus:shadow-lg focus:shadow-primary/10 cursor-pointer hover:border-primary/30 transition-all"
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === ALL_TAG
                    ? "All Tech"
                    : tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <style>{`
      @keyframes gradient {
              0 %, 100 % { background- position: 0% 50%; }
            50% {background - position: 100% 50%; }
      }

            .animate-gradient {
              background - size: 200% 200%;
            animation: gradient 3s ease infinite;
      }

            /* Prevent the nav buttons from shifting when clicked */
            .btn.btn-circle:active {
              transform: translateY(-50%) !important;
      }
    `}</style>
    </section>
  );
}
