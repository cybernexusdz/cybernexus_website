import { memo } from "react";
import { ArrowRight, Clock, User } from "lucide-react";
import { Article, Images } from "../../types/blog";

interface ArticleCardProps {
  article: Article;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  images: Images;
}

const ArticleCard = memo<ArticleCardProps>(
  ({ article, isHovered, onMouseEnter, onMouseLeave, onClick, images }) => {
    const handleClick = () => {
      if (article.link) {
        onClick();
      }
    };

    return (
      <article
        className="group relative bg-base-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
      >
        {/* Gradient border on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

        <div className="relative bg-base-100 rounded-xl overflow-hidden h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
            <img
              src={images[article.imageKey]}
              alt={article.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/20 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <div
                className={`bg-gradient-to-r ${article.tagColor} text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}
              >
                {article.category}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-base-content/60 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime || "5 min read"}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-base-content/70 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3 flex-1">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-base-content/10 mt-auto">
              <span className="text-xs text-base-content/50">
                {article.date}
              </span>

              <button
                onClick={handleClick}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300"
              >
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  },
  (prev, next) =>
    prev.isHovered === next.isHovered && prev.article.id === next.article.id,
);

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
