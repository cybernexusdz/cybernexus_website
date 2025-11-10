import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileCard from "./ProfileCard";

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const teamMembers = [
    {
      id: 1,
      name: "Hafid",
      role: "Human Resources",
      image: "/user01.png",
    },
    {
      id: 2,
      name: "Hakim Ait Nouri",
      role: "Developement Lead",
      image: "/user01.png",
    },
    {
      id: 3,
      name: "Kamel AB",
      role: "Video Editor",
      image: "/user04.png",
    },
    {
      id: 4,
      name: "Catrina",
      role: "Leader",
      image: "/user03.png",
    },
    {
      id: 5,
      name: "Sofiane Dex",
      role: "Perisdent of Dortmund",
      image: "/user02.png",
    },
    {
      id: 6,
      name: "Kadi Smith",
      role: "Developer",
      image: "/user01.png",
    },
    {
      id: 7,
      name: "Mouhamed Bachir",
      role: "Blockchain Developer",
      image: "/user01.png",
    },
    {
      id: 8,
      name: "Aziz Ben",
      role: "CEO Facebook",
      image: "/user01.png",
    },
    {
      id: 9,
      name: "Samadoo",
      role: "Ai Specialist",
      image: "/user01.png",
    },
    {
      id: 10,
      name: "法拉",
      role: "Media Manager",
      image: "/user03.png",
    },
    {
      id: 11,
      name: "Adda Hadi",
      role: "Human Resources",
      image: "/user01.png",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(teamMembers.length - 1, prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = currentIndex - 2; i <= currentIndex + 2; i++) {
      if (i >= 0 && i < teamMembers.length) {
        cards.push({
          ...teamMembers[i],
          position: i - currentIndex,
          index: i,
        });
      }
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-[1800px] mx-auto space-y-12 w-full relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 transition-all duration-1000">
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Team
            </span>
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Introducing the{" "}
            <span className="text-primary font-semibold">Talented</span> Minds
            Behind Our Innovation
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative px-4 sm:px-8 md:px-16 lg:px-20"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 sm:left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-primary text-white hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === teamMembers.length - 1}
            className="absolute right-0 sm:right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-primary text-white hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Cards Container */}
          <div className="relative h-[500px] sm:h-[550px] md:h-[600px] flex items-center justify-center">
            <div className="relative w-full flex items-center justify-center">
              {visibleCards.map((member) => {
                const position = member.position;
                const isCenterCard = position === 0;

                const baseScale = isCenterCard ? 1 : 0.85;
                const baseOpacity = isCenterCard ? 1 : 0.6;
                const translateX = position * (typeof window !== 'undefined' && window.innerWidth < 640 ? 280 : 340);
                const zIndex = 5 - Math.abs(position);

                return (
                  <div
                    key={member.id}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${baseScale})`,
                      opacity: baseOpacity,
                      zIndex: zIndex,
                      pointerEvents: isCenterCard ? "auto" : "none",
                    }}
                  >
                    <ProfileCard
                      name={member.name}
                      role={member.role}
                      image={member.image}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-base-content/30 hover:bg-base-content/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
