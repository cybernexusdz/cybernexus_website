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
import ProjectCard from "../project-card/ProjectCard.jsx";

const sampleProjects = [
  {
    id: 1,
    name: "AI Chat Bot",
    description:
      "An intelligent chatbot powered by machine learning that can understand context and provide helpful responses.",
    imageURL: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
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
    imageURL: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
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
    imageURL: "https://images.unsplash.com/photo-1503264116251-35a269479413",
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
    imageURL: "https://images.unsplash.com/photo-1590608897129-79da98d159ad",
    technologies: ["Java", "SQLite"],
    githubURL: "https://github.com/cybernexusdz/student-manager",
    contributors: 3,
    createdAt: "Aug 2024",
  },
  {
    id: 4,
    name: "Smart Home System",
    description: "IoT-based home automation using Raspberry Pi and MQTT.",
    imageURL: "https://images.unsplash.com/photo-1581093588401-22d5f4f9c2a7",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
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
        Math.min(filteredProjects.length - 1, prev + 1),
      );
    }
  };

  // Handle touch events for swipe gesture
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance for a swipe

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swiped left - go to next
        scroll("right");
      } else {
        // Swiped right - go to previous
        scroll("left");
      }
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Reset current index when filters change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTag, query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate card styles based on position relative to current index
  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);

    // Hide cards that are too far away
    if (absDiff > 2) {
      return {
        opacity: 0,
        transform: "translateX(0) scale(0.75)",
        zIndex: 0,
        pointerEvents: "none",
      };
    }

    // Focused card
    if (diff === 0) {
      return {
        opacity: 1,
        transform: "translateX(0) scale(1)",
        zIndex: 30,
        pointerEvents: "auto",
      };
    }

    // Cards to the right - increased separation (less overlap)
    if (diff > 0) {
      return {
        opacity: absDiff === 1 ? 0.85 : 0.45,
        transform: `translateX(${absDiff * 45}%) scale(${1 - absDiff * 0.12})`,
        zIndex: 30 - absDiff,
        pointerEvents: absDiff === 1 ? "auto" : "none",
      };
    }

    // Cards to the left - increased separation (less overlap)
    return {
      opacity: absDiff === 1 ? 0.85 : 0.45,
      transform: `translateX(-${absDiff * 45}%) scale(${1 - absDiff * 0.12})`,
      zIndex: 30 - absDiff,
      pointerEvents: absDiff === 1 ? "auto" : "none",
    };
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center space-y-3 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full text-primary text-sm font-semibold border border-primary/20 shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Built by Nexians</span>
            <Zap className="w-4 h-4" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            What We're{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
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
          className={`flex items-center justify-center gap-6 sm:gap-10 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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

        {/* Carousel area with nav buttons beside it */}
        <div
          ref={cardsContainerRef}
          className="relative flex justify-center items-center py-4 touch-pan-y"
          style={{ minHeight: "450px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left nav */}
          <button
            onClick={() => scroll("left")}
            disabled={currentIndex === 0}
            title="Previous project"
            aria-label="Previous project"
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-40 btn btn-circle btn-primary hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {loading ? (
            <div className="w-full max-w-[450px] sm:max-w-[520px] lg:max-w-[580px]">
              <ProjectCard loading={true} />
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="relative w-full max-w-[450px] sm:max-w-[520px] lg:max-w-[560px] h-[460px]">
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

          {/* Right nav */}
          <button
            onClick={() => scroll("right")}
            disabled={currentIndex === filteredProjects.length - 1}
            title="Next project"
            aria-label="Next project"
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-40 btn btn-circle btn-primary hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Only remove transform on active state for the navigation buttons */
        .btn.btn-circle:active {
          transform: translateY(-50%) !important;
        }
      `}</style>
    </section>
  );
}
