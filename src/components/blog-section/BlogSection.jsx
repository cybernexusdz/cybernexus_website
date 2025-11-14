import { useMemo, useState, useRef, useEffect } from "react";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";

import image1 from "./images/cc62374db4003c3af0243e519cfa96f159ecb65a (1).jpg";

import image2 from "./images/6354f8b78b2e2e6e1d0f1d3fa5b5074050fb3647.png";

import en from "../locales/en.json";

gsap.registerPlugin(ScrollTrigger);

// Mock articles data
const mockArticles = [
  {
    id: 1,
    title: "Getting Started with CYBERNEXUS",
    category: "Guide",
    tagColor: "bg-blue-500",
    author: "Alex Smith",
    date: "18 January 2025",
    excerpt:
      "Learn how to get started with our community and make the most of it.",
    imageKey: "image1",
  },
  {
    id: 2,
    title: "Advanced Web Development Tips",
    category: "Tutorial",
    tagColor: "bg-green-500",
    author: "Sarah Johnson",
    date: "15 January 2025",
    excerpt:
      "Discover advanced techniques to improve your web development skills.",
    imageKey: "image2",
  },
  {
    id: 3,
    title: "The Future of AI in Tech",
    category: "News",
    tagColor: "bg-purple-500",
    author: "Mike Chen",
    date: "12 January 2025",
    excerpt:
      "Exploring how artificial intelligence is shaping the future of technology.",
    imageKey: "image1",
  },
  {
    id: 4,
    title: "Community Success Stories",
    category: "Highlight",
    tagColor: "bg-orange-500",
    author: "Emma Davis",
    date: "10 January 2025",
    excerpt: "Read inspiring stories from members of our CYBERNEXUS community.",
    imageKey: "image2",
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices",
    category: "Security",
    tagColor: "bg-red-500",
    author: "John Wilson",
    date: "8 January 2025",
    excerpt: "Essential security practices every developer should know.",
    imageKey: "image1",
  },
];

const BlogSection = ({ languageCode = "en" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });

  const t = useMemo(() => {
    const dict = { en };

    return dict[languageCode] || dict.en;
  }, [languageCode]);

  const articles = mockArticles;

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const clubNewsRef = useRef(null);
  const carouselRef = useRef(null);

  const images = { image1, image2 };

  // Carousel logic
  const itemsPerPage = 1;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
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

      // Animate club news card
      if (clubNewsRef.current) {
        gsap.from(clubNewsRef.current, {
          scrollTrigger: {
            trigger: clubNewsRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          y: 50,
          duration: 1,
        });
      }

      // Animate carousel section - only when scrolling into view
      if (carouselRef.current) {
        // Don't animate the container itself, only the cards

        // Animate individual article cards on scroll
        const articleCards =
          carouselRef.current.querySelectorAll(".blog-article-card");
        if (articleCards.length > 0) {
          gsap.set(articleCards, { opacity: 1, scale: 1 }); // Set initial state visible

          gsap.from(articleCards, {
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 65%",
              end: "top 25%",
              scrub: 1,
              markers: false,
            },
            opacity: 0,
            scale: 0.8,
            stagger: 0.08,
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

        <div
          ref={headerRef}
          className="text-center space-y-3 transition-all duration-1000"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            Blog &{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
            >
              News
            </span>
          </h2>

          <p className="text-base  sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news and articles from CYBERNEXUS
          </p>
        </div>

        {/* Main Club News Card */}

        <div ref={clubNewsRef} className="mb-12 sm:mb-14 md:mb-16 mt-24">
          <div className="bg-accent/60 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 hover:border-primary/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Logo and Motto */}

              <div className="md:w-1/3 bg-gradient-to-br from-secondary/50 to-secondary/30 p-6 sm:p-8 flex flex-col items-center justify-center">
                <div className="mb-4 sm:mb-6">
                  <img
                    src={image1}
                    alt="CYBERNEXUS Logo"
                    className="w-32 h-auto sm:w-40 md:w-48 object-contain"
                  />
                </div>
              </div>

              {/* Right Side - News Content */}

              <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-base-content mb-3 sm:mb-4">
                    {t.blog.clubNews}
                  </h3>

                  <p className="text-base-content/60 mb-4 sm:mb-6 text-sm sm:text-base">
                    {languageCode === "ar"
                      ? `Alex، 18 جانفي`
                      : `Alex, 18 January`}
                  </p>

                  <p className="text-base-content/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {languageCode === "ar"
                      ? "هذا نص تجريبي لعرض الأخبار الخاصة بالنادي كنموذج مبدئي."
                      : "This is a placeholder text to showcase the club news content as an initial sample."}
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

        {/* Blog Articles Carousel */}

        <div ref={carouselRef} className="relative w-full">
          {/* Carousel Container */}
          <div className="relative overflow-hidden w-full">
            {/* Articles Wrapper */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="min-w-full flex-shrink-0 px-4 sm:px-6 md:px-8"
                >
                  <div className="blog-article-card bg-accent/60 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 hover:border-primary/50 transition-all duration-300">
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Tag */}
                      <div
                        className={`${article.tagColor} w-fit px-3 py-1 rounded-full mb-3 sm:mb-4`}
                      >
                        <span className="text-base-100 text-xs sm:text-sm font-semibold">
                          {article.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-3 sm:mb-4">
                        {article.title}
                      </h3>

                      {/* Author/Date and Image Row */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                        <div className="flex-1">
                          <p className="text-base-content/60 text-xs sm:text-sm mb-3 sm:mb-4">
                            {languageCode === "ar"
                              ? `${article.author}، ${article.date}`
                              : `${article.author}, ${article.date}`}
                          </p>

                          <p className="text-base-content/70 text-xs sm:text-sm mb-3 sm:mb-4">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0">
                          <img
                            src={images[article.imageKey]}
                            alt={article.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Read More Button */}
                      <button className="w-full bg-gradient-to-r from-primary to-info text-base-100 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 border border-primary/30 text-sm sm:text-base">
                        {t.blog.readMore}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              className="bg-accent/80 backdrop-blur-sm p-2 sm:p-3 rounded-full border-2 border-primary/50 hover:bg-primary/20 transition-all duration-300"
              aria-label="Previous article"
            >
              <ChevronLeft className="text-base-content" size={20} />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-base-content/30 hover:bg-base-content/50"
                  }`}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-accent/80 backdrop-blur-sm p-2 sm:p-3 rounded-full border-2 border-primary/50 hover:bg-primary/20 transition-all duration-300"
              aria-label="Next article"
            >
              <ChevronRight className="text-base-content" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
