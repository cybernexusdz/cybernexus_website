import React, { useState, useEffect, useRef } from "react";
import { Terminal, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface CyberCarouselProps {
  photos: string[];
  autoPlayInterval?: number;
}

const CyberCarousel: React.FC<CyberCarouselProps> = ({
  photos,
  autoPlayInterval = 4000,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate photos
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      handleTransition((prev) => (prev + 1) % photos.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, photos.length, autoPlayInterval]);

  const handleTransition = (
    nextIndexOrFn: number | ((prev: number) => number),
  ) => {
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentPhotoIndex(nextIndexOrFn);
      setTimeout(() => setIsGlitching(false), 400);
    }, 200);
  };

  const goToPrevious = () => {
    handleTransition((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    handleTransition((prev) => (prev + 1) % photos.length);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Only show 5 dots at a time for performance
  const getVisibleDots = () => {
    const totalDots = 5;
    const halfDots = Math.floor(totalDots / 2);

    let start = currentPhotoIndex - halfDots;
    let end = currentPhotoIndex + halfDots + 1;

    if (start < 0) {
      start = 0;
      end = Math.min(totalDots, photos.length);
    }

    if (end > photos.length) {
      end = photos.length;
      start = Math.max(0, photos.length - totalDots);
    }

    return { start, end };
  };

  const { start, end } = getVisibleDots();

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Cyber frame decoration */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg" />

      <div className="relative bg-background/50 border-2 border-primary/30 rounded-lg overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-20" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary z-20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-20" />

        {/* Image Container with touch support */}
        <div
          ref={containerRef}
          className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] bg-background/80 touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentPhotoIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter:
                  isGlitching && index === currentPhotoIndex
                    ? "blur(3px) saturate(3) hue-rotate(90deg)"
                    : "none",
                transform:
                  isGlitching && index === currentPhotoIndex
                    ? `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) skew(${Math.random() * 10 - 5}deg)`
                    : "none",
                transition: "filter 0.1s, transform 0.1s",
              }}
            >
              <img
                src={photo}
                alt={`Team moment ${index + 1}`}
                className="w-full h-full object-contain pointer-events-none"
                loading="lazy"
                draggable="false"
                style={{
                  textShadow:
                    isGlitching && index === currentPhotoIndex
                      ? "3px 0 #ff0000, -3px 0 #00ffff, 0 3px #00ff00"
                      : "none",
                }}
              />
            </div>
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Navigation Buttons - Hidden on mobile */}
        <button
          onClick={goToPrevious}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/90 border border-primary/30 rounded hover:bg-primary/20 hover:border-primary transition-colors duration-200"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/90 border border-primary/30 rounded hover:bg-primary/20 hover:border-primary transition-colors duration-200"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background/95 to-transparent border-t border-primary/20 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Counter */}
            <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-primary/80">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>
                {String(currentPhotoIndex + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </span>
            </div>

            {/* Carousel indicators - only show 5 dots */}
            <div className="hidden sm:flex gap-2">
              {start > 0 && (
                <div className="flex items-center">
                  <span className="text-primary/40 text-xs">...</span>
                </div>
              )}
              {photos.slice(start, end).map((_, idx) => {
                const actualIndex = start + idx;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => handleTransition(actualIndex)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      actualIndex === currentPhotoIndex
                        ? "bg-primary w-10"
                        : "bg-primary/30 hover:bg-primary/50 w-6"
                    }`}
                    aria-label={`Go to photo ${actualIndex + 1}`}
                  />
                );
              })}
              {end < photos.length && (
                <div className="flex items-center">
                  <span className="text-primary/40 text-xs">...</span>
                </div>
              )}
            </div>

            {/* Play/Pause button - larger on mobile */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 sm:p-2.5 bg-background/90 border border-primary/30 rounded hover:bg-primary/20 hover:border-primary transition-colors duration-200 active:scale-95"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-4 sm:h-4 text-primary" />
              ) : (
                <Play className="w-5 h-5 sm:w-4 sm:h-4 text-primary" />
              )}
            </button>
          </div>

          {/* Mobile swipe hint */}
          <div className="sm:hidden text-center mt-2 text-xs text-primary/50 font-mono">
            ← Swipe to navigate →
          </div>
        </div>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Loading bar */}
      {isPlaying && (
        <div className="mt-2 h-1 bg-primary/20 rounded-full overflow-hidden">
          <div
            key={currentPhotoIndex}
            className="h-full bg-primary w-full origin-left"
            style={{
              animation: `loading ${autoPlayInterval}ms linear`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CyberCarousel;
