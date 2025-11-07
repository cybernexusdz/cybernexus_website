import { useEffect, useState, useMemo, useRef } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import ProjectCard from "../project-card/ProjectCard";

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
  const [fogOpacity, setFogOpacity] = useState({ left: 0, right: 1 });

  const carouselRef = useRef(null);

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
    const el = carouselRef.current;
    if (!el) return;
    const first = el.querySelector(".snap-center");
    if (!first) {
      const amount = Math.round(el.offsetWidth * 0.8);
      el.scrollBy({
        left: dir === "left" ? -amount : amount,
        behavior: "smooth",
      });
      return;
    }
    const gap = parseFloat(getComputedStyle(el).gap) || 16;
    const amount = Math.round(first.getBoundingClientRect().width + gap);
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // fog effects 
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;

      if (maxScroll <= 0) {
        setFogOpacity({ left: 0, right: 0 });
        return;
      }

      const threshold = 10; // pixels from edge to trigger fade
      const fadeDistance = 100; // distance over which to fade

      // Left fog: 0 when at start, 1 when scrolled past threshold
      const leftOpacity = scrollLeft <= threshold
        ? 0
        : Math.min((scrollLeft - threshold) / fadeDistance, 1);

      // Right fog: 0 when at end, 1 when not near end
      const distanceFromEnd = maxScroll - scrollLeft;
      const rightOpacity = distanceFromEnd <= threshold
        ? 0
        : Math.min((distanceFromEnd - threshold) / fadeDistance, 1);

      setFogOpacity({
        left: leftOpacity,
        right: rightOpacity,
      });
    };

    el.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 bg-base-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-base-content">
              Featured Projects
            </h2>
            <p className="text-sm opacity-70">A glimpse of what we've built.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input input-bordered input-sm pr-9 w-48"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
            </div>

            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 opacity-70" />
              <select
                className="select select-bordered select-sm"
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === ALL_TAG ? "All" : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation buttons (desktop only) */}
        <div className="hidden md:flex justify-end gap-2">
          <button
            onClick={() => scroll("left")}
            className="btn btn-circle btn-ghost btn-sm z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="btn btn-circle btn-ghost btn-sm z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Projects carousel preview */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-5 pb-10 scrollbar-thin scrollbar-thumb-base-300 scroll-px-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`loading-${i}`}
                  className="w-[260px] sm:w-[300px] flex-shrink-0 snap-center"
                >
                  <ProjectCard loading={true} />
                </div>
              ))
              : filteredProjects.map((project, idx) => (
                <div
                  key={`${project.id ?? idx}-${idx}`}
                  className="w-[260px] sm:w-[300px] lg:w-[360px] flex-shrink-0 snap-center"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>

          <div
            className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-base-100 to-transparent pointer-events-none transition-opacity duration-500"
            style={{ opacity: fogOpacity.left }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-base-100 to-transparent pointer-events-none transition-opacity duration-500"
            style={{ opacity: fogOpacity.right }}
          />



        </div>
      </div>
    </section>
  );
}
