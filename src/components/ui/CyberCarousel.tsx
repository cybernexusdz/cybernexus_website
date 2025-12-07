// src/components/ui/CyberCarousel.tsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Terminal, Pause, Play } from "lucide-react";

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

  // Auto-rotate photos
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, photos.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
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
      {/* Simplified cyber frame decoration - removed blur for performance */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg" />

      <div className="relative bg-background/50 border-2 border-primary/30 rounded-lg overflow-hidden">
        {/* Corner decorations - smaller for less visual weight */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-20" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary z-20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-20" />

        {/* Image Container - reduced height */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-background/80">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentPhotoIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={photo}
                alt={`Team moment ${index + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}

          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Navigation Buttons - simplified */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/90 border border-primary/30 rounded hover:bg-primary/20 hover:border-primary transition-colors duration-200"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/90 border border-primary/30 rounded hover:bg-primary/20 hover:border-primary transition-colors duration-200"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>

        {/* Bottom Control Bar - reduced padding */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-background/95 to-transparent border-t border-primary/20 p-2 sm:p-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Counter */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-primary/80">
              <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>
                {String(currentPhotoIndex + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </span>
            </div>

            {/* Optimized carousel indicators - only show 5 dots */}
            <div className="flex gap-1.5 sm:gap-2">
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
                    onClick={() => setCurrentPhotoIndex(actualIndex)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      actualIndex === currentPhotoIndex
                        ? "bg-primary w-8 sm:w-10"
                        : "bg-primary/30 hover:bg-primary/50 w-4 sm:w-6"
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

            {/* Play/Pause button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 sm:p-2 bg-background/90 border border-primary/30 rounded hover:bg-primary/20 hover:border-primary transition-colors duration-200"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              ) : (
                <Play className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Simplified top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Simplified loading bar */}
      {isPlaying && (
        <div className="mt-2 h-0.5 bg-primary/20 rounded-full overflow-hidden">
          <div
            key={currentPhotoIndex}
            className="h-full bg-primary w-full origin-left animate-loading-bar"
          />
        </div>
      )}
    </div>
  );
};

export default CyberCarousel;
