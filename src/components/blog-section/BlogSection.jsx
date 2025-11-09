import React, { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import image1 from "./images/cc62374db4003c3af0243e519cfa96f159ecb65a (1).jpg";

import image2 from "./images/6354f8b78b2e2e6e1d0f1d3fa5b5074050fb3647.png";

import logoImage from "./images/6354f8b78b2e2e6e1d0f1d3fa5b5074050fb3647.png";

import en from "../locales/en.json";

import ar from "../locales/ar.json";

const BlogSection = ({ languageCode = "en" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = useMemo(() => {
    const dict = { en, ar };

    return dict[languageCode] || dict.en;
  }, [languageCode]);

  const images = { image1, image2 };

  const articles = useMemo(() => t.blog?.articles || [], [t]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(articles.length, 1));
  };

  const prevSlide = () => {
    const len = Math.max(articles.length, 1);

    setCurrentIndex((prev) => (prev - 1 + len) % len);
  };

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

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}

          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-2 md:left-0 z-10 bg-accent/80 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full border-2 border-primary/50 hover:bg-primary/20 transition-all duration-300"
            aria-label="Previous article"
          >
            <ChevronLeft className="text-base-content" size={20} />
          </button>

          {/* Article Cards */}

          <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-hidden w-full justify-center px-12 sm:px-16 md:px-20">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`flex-shrink-0 w-full sm:w-80 md:w-96 transition-all duration-500 ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-50 scale-95 hidden sm:block"
                }`}
              >
                <div className="bg-accent/60 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 hover:border-primary/50 transition-all duration-300">
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

          {/* Right Arrow */}

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-2 md:right-0 z-10 bg-accent/80 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-full border-2 border-primary/50 hover:bg-primary/20 transition-all duration-300"
            aria-label="Next article"
          >
            <ChevronRight className="text-base-content" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
