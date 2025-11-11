import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import image1 from "./images/cc62374db4003c3af0243e519cfa96f159ecb65a (1).jpg";
import image2 from "./images/6354f8b78b2e2e6e1d0f1d3fa5b5074050fb3647.png";
import openDayImage from "./images/photo_5791963918254148386_y (1).jpg";
import shipbotImage from "./images/shipbot.png";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const BlogSection = ({ languageCode = "en" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const t = useMemo(() => {
    const dict = { en, ar };

    return dict[languageCode] || dict.en;
  }, [languageCode]);

  const images = { image1, image2, openDayImage, shipbotImage };

  const articles = useMemo(() => t.blog?.articles || [], [t]);

  const handleArticleClick = (article) => {
    if (article.link) {
      navigate(article.link);
    }
  };

  // Responsive items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const newItemsPerView = window.innerWidth < 768 
        ? 1  // Mobile: show 1 item
        : window.innerWidth < 1024 
        ? 2  // Tablet: show 2 items
        : 3; // Desktop: show 3 items
      
      setItemsPerView(newItemsPerView);
      // Reset carousel index when screen size changes
      setCurrentIndex(0);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Calculate if we need carousel and number of slides
  const needsCarousel = articles.length > itemsPerView;
  const totalSlides = needsCarousel ? articles.length - itemsPerView + 1 : 1;

  const nextSlide = () => {
    if (needsCarousel) {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, articles.length - itemsPerView),
      );
    }
  };

  const prevSlide = () => {
    if (needsCarousel) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    if (needsCarousel) {
      setCurrentIndex(index);
    }
  };

  // Get articles for current view
  const getCurrentViewArticles = () => {
    if (!needsCarousel) {
      return articles.slice(0, itemsPerView); // Show first N items based on screen size
    }
    // Show N articles starting from currentIndex
    return articles.slice(currentIndex, currentIndex + itemsPerView);
  };

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && needsCarousel && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          return next >= articles.length - itemsPerView ? 0 : next;
        });
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [
    isAutoPlaying,
    needsCarousel,
    totalSlides,
    articles.length,
    itemsPerView,
  ]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Article Card Component
  const ArticleCard = ({ article }) => (
    <div className="bg-accent/60 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 h-full flex flex-col">
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
        {/* Tag */}
        <div className="bg-blue-500 w-fit px-3 py-1 rounded-full mb-3 sm:mb-4">
          <span className="text-white text-xs sm:text-sm font-semibold">
            {article.category}
          </span>
        </div>

        {/* Title - Always visible */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-base-content mb-3 sm:mb-4 line-clamp-2">
          {article.title}
        </h3>

        {/* Author/Date */}
        <p className="text-base-content/60 text-xs sm:text-sm mb-3">
          {languageCode === "ar"
            ? `${article.author}، ${article.date}`
            : `${article.author}, ${article.date}`}
        </p>

        {/* Image */}
        <div className="w-full h-40 sm:h-48 flex-shrink-0 mb-4">
          <img
            src={images[article.imageKey]}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Excerpt */}
        <p className="text-base-content/70 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Action Button */}
        <button
          onClick={() => handleArticleClick(article)}
          className="w-full bg-gradient-to-r from-primary to-info text-base-100 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 border border-primary/30 text-sm sm:text-base mt-auto"
        >
          {article.link === "/shipgame" ? (
            <>
              <span>Play</span>
              <ArrowRight size={16} />
            </>
          ) : (
            <>
              {t.blog.readMore}
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <section
      className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 relative"
      dir={languageCode === "ar" ? "rtl" : "ltr"}
    >
      {/* Geometric Pattern Background */}

      <div className="absolute top-0 right-0 opacity-10 sm:opacity-20">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative text-primary">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M200 50 L250 100 L150 100 Z"
              fill="currentColor"
              opacity="0.3"
            />

            <path
              d="M350 150 L300 200 L400 200 Z"
              fill="currentColor"
              opacity="0.3"
            />

            <path
              d="M50 200 L100 250 L100 150 Z"
              fill="currentColor"
              opacity="0.3"
            />

            <rect
              x="150"
              y="150"
              width="100"
              height="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}

        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
            {t.blog.title}
          </h2>

          <p className="text-base-content/70 text-base sm:text-lg">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Main Club News Card */}

        <div className="mb-12 sm:mb-14 md:mb-16">
          <div className="bg-accent/60 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Open Day Image */}

              <div className="md:w-1/2 bg-gradient-to-br from-secondary/50 to-secondary/30 p-0 overflow-hidden">
                <img
                  src={openDayImage}
                  alt={t.blog.openDayTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side - News Content */}

              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-base-content mb-3 sm:mb-4">
                    {t.blog.openDayTitle}
                  </h3>

                  <p className="text-base-content/60 mb-4 sm:mb-6 text-sm sm:text-base">
                    {t.blog.openDayDate}
                  </p>

                  <p className="text-base-content/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {t.blog.openDayDescription}
                  </p>
                </div>

                <button className="self-start sm:self-end bg-gradient-to-r from-primary to-info text-base-100 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2 border border-primary/30">
                  {t.blog.readMore}

                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Articles Section */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Articles Container */}
          <div className="relative overflow-hidden rounded-xl mx-auto max-w-7xl">
            {needsCarousel ? (
              // Carousel mode (4+ articles) - show 3 at once, move one at a time
              <>
                <div className="relative overflow-hidden w-full">
                  <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
                    style={{
                      transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                    }}
                  >
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="flex-shrink-0"
                        style={{
                          width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 1.5}rem / ${itemsPerView})`,
                        }}
                      >
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-accent/90 backdrop-blur-sm p-2 sm:p-3 rounded-full border-2 border-primary/50 hover:bg-primary/30 hover:scale-110 transition-all duration-300 shadow-lg ${
                        currentIndex === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="text-base-content" size={20} />
                    </button>

                    <button
                      onClick={nextSlide}
                      disabled={currentIndex >= articles.length - itemsPerView}
                      className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-accent/90 backdrop-blur-sm p-2 sm:p-3 rounded-full border-2 border-primary/50 hover:bg-primary/30 hover:scale-110 transition-all duration-300 shadow-lg ${
                        currentIndex >= articles.length - itemsPerView
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      aria-label="Next slide"
                    >
                      <ChevronRight className="text-base-content" size={20} />
                    </button>
                  </>
                )}

                {/* Carousel Indicators */}
                {totalSlides > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                          index === currentIndex
                            ? "w-8 h-2 bg-primary"
                            : "w-2 h-2 bg-base-content/30 hover:bg-base-content/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Grid mode (itemsPerView or fewer articles)
              <div className={`grid gap-4 sm:gap-6 px-2 sm:px-4 ${
                itemsPerView === 1 
                  ? "grid-cols-1" 
                  : itemsPerView === 2 
                  ? "grid-cols-1 md:grid-cols-2" 
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}>
                {getCurrentViewArticles().map((article) => (
                  <div key={article.id}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
