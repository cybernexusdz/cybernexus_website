import { useEffect, useRef, useMemo } from "react";
import { Handshake, Coins } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";

gsap.registerPlugin(ScrollTrigger);

const defaultSponsors = [
  {
    id: 1,
    name: "Futuro",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
  },
];

export default function SponsorsSection({
  sponsors = defaultSponsors,
  loading = false,
}) {
  const sectionRef = useRef(null);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });
  const headerRef = useRef(null);
  const sponsorsGridRef = useRef(null);

  const list = useMemo(
    () =>
      Array.isArray(sponsors) && sponsors.length ? sponsors : defaultSponsors,
    [sponsors],
  );

  // helper to open a link in a new tab (used by keyboard Enter/Space handlers)
  const openInNewTab = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardKeyDown = (e, url) => {
    // support Enter and Space to activate the card
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openInNewTab(url);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header section
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
          y: 30,
          stagger: 0.1,
          duration: 0.8,
        });
      }

      // Animate sponsors grid
      if (sponsorsGridRef.current) {
        gsap.from(sponsorsGridRef.current, {
          scrollTrigger: {
            trigger: sponsorsGridRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          y: 50,
          duration: 1,
        });

        // Animate individual sponsor cards
        const sponsorCards =
          sponsorsGridRef.current.querySelectorAll(".sponsor-card");
        if (sponsorCards.length > 0) {
          gsap.from(sponsorCards, {
            scrollTrigger: {
              trigger: sponsorsGridRef.current,
              start: "top 65%",
              end: "top 25%",
              scrub: 1,
              markers: false,
            },
            opacity: 0,
            scale: 0.8,
            y: 20,
            stagger: 0.1,
            duration: 0.9,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        <div
          ref={headerRef}
          className={`text-center space-y-3 transition-all duration-1000`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full text-primary text-sm font-semibold border border-primary/20 shadow-md">
            <Handshake className="w-4 h-4 animate-pulse" />
            <span>Built with partners</span>
            <Coins className="w-4 h-4" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            Supporting The{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
            >
              Nexian
            </span>{" "}
            Mission
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            We’re grateful to the organisations that support our community.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-6xl">
            {loading ? (
              <div className="py-12 text-center">
                <div className="h-44 w-full max-w-[520px] mx-auto rounded-2xl bg-base-200/40 animate-pulse" />
              </div>
            ) : (
              <div
                ref={sponsorsGridRef}
                className={`grid gap-6 ${
                  list.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}
              >
                {list.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-r from-base-200/40 via-base-200/30 to-base-200/40 border border-base-content/10 shadow-lg sponsor-card"
                  >
                    {/* Outer clickable area converted to an accessible div (not <a>) */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => openInNewTab(s.lien)}
                      onKeyDown={(e) => handleCardKeyDown(e, s.lien)}
                      aria-label={`Open ${s.name} website`}
                      className="flex flex-col items-center w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 rounded"
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
                    </div>

                    {/* The actual anchor for Visit — now NOT nested inside another anchor */}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </section>
  );
}
