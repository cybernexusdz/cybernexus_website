import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import { useScrollReveal } from "../../hooks/useGsapAnimation";
import ClubNewsCard from "./ClubNewsCard";
import ArticleCard from "./ArticleCard";
import { Article, Images, HoveredCard } from "../../types/blog";

gsap.registerPlugin(ScrollTrigger);

const images: Images = { image1, image2, openDayImage, shipbotImage };

const BlogSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<HoveredCard>(null);
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 5 });
  const clubNewsRef = useScrollReveal({ y: 60, duration: 1 });
  const headerRef = useScrollReveal({ y: 40, duration: 0.8 });
  const carouselRef = useScrollReveal({
    y: 50,
    duration: 0.9,
    start: "top 85%",
  });

  useEffect(() => {
    if (hasAnimatedRef.current || !headerRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  const articles: Article[] = useMemo(
    () => [
      {
        id: 1,
        title: "Getting Started with CYBERNEXUS: A Beginner's Guide",
        category: "Guide",
        tagColor: "from-blue-500 to-cyan-500",
        author: "Alex Smith",
        date: "Jan 18, 2025",
        readTime: "8 min read",
        excerpt:
          "Learn how to get started with our community and make the most of your membership. Discover resources, events, and networking opportunities.",
        imageKey: "image1",
        link: "/join",
      },
      {
        id: 2,
        title: "Advanced Web Development Tips for Modern Applications",
        category: "Tutorial",
        tagColor: "from-green-500 to-emerald-500",
        author: "Sarah Johnson",
        date: "Jan 15, 2025",
        readTime: "12 min read",
        excerpt:
          "Discover advanced techniques to improve your web development skills, from performance optimization to cutting-edge frameworks.",
        imageKey: "image2",
      },
      {
        id: 3,
        title: "The Future of AI in Tech: What to Expect in 2025",
        category: "News",
        tagColor: "from-purple-500 to-pink-500",
        author: "Mike Chen",
        date: "Jan 12, 2025",
        readTime: "10 min read",
        excerpt:
          "Exploring how artificial intelligence is shaping the future of technology and what developments we can anticipate this year.",
        imageKey: "image1",
      },
      {
        id: 4,
        title: "ShipBot Game Challenge: Test Your Skills",
        category: "Game",
        tagColor: "from-orange-500 to-red-500",
        author: "CYBERNEXUS Team",
        date: "Jan 10, 2025",
        readTime: "3 min read",
        excerpt:
          "Test your skills in our interactive ShipBot game. Can you master the challenge and climb the leaderboard?",
        imageKey: "shipbotImage",
        link: "/shipgame",
      },
      {
        id: 5,
        title: "Cybersecurity Best Practices Every Developer Should Know",
        category: "Security",
        tagColor: "from-red-500 to-rose-500",
        author: "John Wilson",
        date: "Jan 8, 2025",
        readTime: "15 min read",
        excerpt:
          "Essential security practices every developer should implement to protect applications and user data in 2025.",
        imageKey: "image1",
      },
    ],
    [],
  );

  const handleHover = useCallback((cardId: HoveredCard) => {
    setHoveredCard(cardId);
  }, []);

  const handleArticleClick = useCallback(
    (article: Article) => {
      if (article.link) {
        navigate(article.link);
      }
    },
    [navigate],
  );

  const articleClickHandlers = useMemo(() => {
    return articles.reduce(
      (acc, article) => {
        acc[article.id] = () => handleArticleClick(article);
        return acc;
      },
      {} as Record<number, () => void>,
    );
  }, [articles, handleArticleClick]);

  const articleHoverHandlers = useMemo(() => {
    return articles.reduce(
      (acc, article, index) => {
        acc[article.id] = {
          onEnter: () => handleHover(index),
          onLeave: () => handleHover(null),
        };
        return acc;
      },
      {} as Record<number, { onEnter: () => void; onLeave: () => void }>,
    );
  }, [articles, handleHover]);

  useEffect(() => {
    const updateItemsPerView = () => {
      const newItemsPerView =
        window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const needsCarousel = articles.length > itemsPerView;
  const maxIndex = Math.max(0, articles.length - itemsPerView);

  const nextSlide = useCallback(() => {
    if (needsCarousel) {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
  }, [needsCarousel, maxIndex]);

  const prevSlide = useCallback(() => {
    if (needsCarousel) {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }
  }, [needsCarousel, maxIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      if (needsCarousel) {
        setCurrentIndex(index);
      }
    },
    [needsCarousel],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  useEffect(() => {
    if (isAutoPlaying && needsCarousel) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, needsCarousel, maxIndex]);

  const visibleArticles = useMemo(() => {
    return articles;
  }, [articles]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-base-200/30"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
            <div className="w-8 h-0.5 bg-primary" />
            Our Blog
            <div className="w-8 h-0.5 bg-primary" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-6">
            Latest{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
            >
              Articles
            </span>{" "}
            & News
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest insights, tutorials, and news from the
            CYBERNEXUS community
          </p>
        </div>

        {/* Featured Post */}
        <ClubNewsCard
          onHover={handleHover}
          clubNewsRef={clubNewsRef}
          openDayImage={openDayImage}
        />

        {/* Articles Grid/Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {needsCarousel ? (
              <>
                <div
                  className="flex transition-transform duration-500 ease-out gap-6"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {visibleArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 1.5}rem / ${itemsPerView})`,
                      }}
                    >
                      <ArticleCard
                        article={article}
                        isHovered={hoveredCard === index}
                        onMouseEnter={articleHoverHandlers[article.id].onEnter}
                        onMouseLeave={articleHoverHandlers[article.id].onLeave}
                        onClick={articleClickHandlers[article.id]}
                        images={images}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 items-center justify-center rounded-full bg-base-100 border-2 border-base-content/10 text-base-content hover:border-primary hover:text-primary hover:bg-primary/10 transition-all shadow-lg"
                  aria-label="Previous articles"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 items-center justify-center rounded-full bg-base-100 border-2 border-base-content/10 text-base-content hover:border-primary hover:text-primary hover:bg-primary/10 transition-all shadow-lg"
                  aria-label="Next articles"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-base-content/20 hover:bg-base-content/40"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div
                className={`grid gap-6 ${
                  itemsPerView === 1
                    ? "grid-cols-1"
                    : itemsPerView === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {visibleArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isHovered={hoveredCard === index}
                    onMouseEnter={articleHoverHandlers[article.id].onEnter}
                    onMouseLeave={articleHoverHandlers[article.id].onLeave}
                    onClick={articleClickHandlers[article.id]}
                    images={images}
                  />
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
