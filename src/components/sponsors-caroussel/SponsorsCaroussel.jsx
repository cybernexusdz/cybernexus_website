import React, { useEffect, useRef, useState, useMemo } from "react";
import { Handshake, Coins } from "lucide-react";

const defaultSponsors = [
  {
    id: 1,
    name: "Futuro",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
  },
];

// Clean, non-looping Sponsors section designed to match ProjectsSection
// - No infinite loop: logos are shown statically (centered single sponsor or responsive grid when more added)
// - Typography, spacing and heading sizes mirror ProjectsSection for visual consistency
// - Keeps theme-from-localStorage behaviour
// - Accessible links that open in a new tab

export default function SponsorsSection({
  sponsors = defaultSponsors,
  loading = false,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Keep your theme behaviour
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "boyLight";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  // Fade-in observer (same approach as ProjectsSection)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Ensure we always have an array
  const list = useMemo(
    () =>
      Array.isArray(sponsors) && sponsors.length ? sponsors : defaultSponsors,
    [sponsors],
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center"
    >
      {/* Animated background matching ProjectsSection */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* Header (mirrors ProjectsSection sizes) */}
        <div
          className={`text-center space-y-3 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full text-primary text-sm font-semibold border border-primary/20 shadow-md">
            <Handshake className="w-4 h-4 animate-pulse" />
            <span>Built with partners</span>
            <Coins className="w-4 h-4" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            Supporting The{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Nexian
            </span>{" "}
            Mission
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            We’re grateful to the organisations that support our community.
          </p>
        </div>

        {/* Sponsors area: single centered card when 1 sponsor, responsive grid for many */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-6xl">
            {loading ? (
              <div className="py-12 text-center">
                <div className="h-44 w-full max-w-[520px] mx-auto rounded-2xl bg-base-200/40 animate-pulse" />
              </div>
            ) : (
              <div
                className={`grid gap-6 ${list.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}
              >
                {list.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-r from-base-200/40 via-base-200/30 to-base-200/40 border border-base-content/10 shadow-lg"
                  >
                    <a
                      href={s.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center w-full"
                    >
                      <div className="w-44 h-28 sm:w-56 sm:h-36 flex items-center justify-center bg-white/6 rounded-md shadow-sm p-4">
                        <img
                          src={s.logo}
                          alt={s.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="mt-4 text-lg sm:text-base font-semibold text-base-content/90">
                        {s.name}
                      </div>

                      {s.description && (
                        <p className="mt-2 text-sm text-base-content/60 max-w-[30ch]">
                          {s.description}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-3">
                        <a
                          href={s.githubURL || s.lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary underline-offset-2 hover:underline"
                        >
                          Visit
                        </a>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )}
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

        /* Keep consistent small visual tweak with ProjectsSection */
        .btn.btn-circle:active {
          transform: translateY(-50%) !important;
        }
      `}</style>
    </section>
  );
}
