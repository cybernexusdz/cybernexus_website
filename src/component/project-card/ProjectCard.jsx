import { useState } from "react";
import { ExternalLink, Github, Users, Calendar } from "lucide-react";

const ProjectCard = ({ project, loading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 w-full h-full flex flex-col">
        <figure className="relative h-40 sm:h-48 bg-base-300 animate-pulse flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
          </div>
        </figure>
        <div className="card-body p-4 sm:p-6 flex flex-col flex-grow">
          <div className="h-5 sm:h-6 bg-base-300 rounded animate-pulse mb-2"></div>
          <div className="h-3 sm:h-4 bg-base-300 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-3 sm:h-4 bg-base-300 rounded animate-pulse mb-4 w-1/2"></div>
          <div className="flex gap-2 mt-auto">
            <div className="h-11 bg-base-300 rounded animate-pulse flex-1"></div>
            <div className="h-11 bg-base-300 rounded animate-pulse flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  const {
    id,
    name = "Untitled Project",
    description = "No description available",
    imageURL = "",
    images = [],
    technologies = [],
    githubURL = "",
    liveURL = "",
    contributors = 0,
    createdAt = "",
  } = project || {};

  const displayImage = imageURL || (images && images[0]) || "";

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 group w-full h-full flex flex-col">
      <figure className="relative h-40 sm:h-48 overflow-hidden bg-base-200 flex-shrink-0">
        {displayImage ? (
          <>
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
              </div>
            )}
            +{" "}
            <img
              src={displayImage}
              alt={name}
              loading="lazy"
              decoding="async"
              width={600} // pick a reasonable intrinsic size matching your layout
              height={360} // keep aspect ratio consistent with CSS height (h-40 / h-48)
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-base-200">
                <div className="text-center text-base-content/50">
                  <div aria-hidden="true" className="text-3xl sm:text-4xl mb-2">
                    🖼️
                  </div>
                  <p className="text-xs sm:text-sm">Image not available</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="text-center text-base-content/50">
              <div aria-hidden="true" className="text-4xl sm:text-5xl mb-2">
                ⚡
              </div>
              <p className="text-xs sm:text-sm font-semibold">CYBERNEXUS</p>
            </div>
          </div>
        )}

        {images && images.length > 1 && (
          <div className="absolute bottom-2 right-2 badge badge-primary badge-xs sm:badge-sm">
            +{images.length - 1}
          </div>
        )}
      </figure>

      <div className="card-body p-4 sm:p-6 flex flex-col flex-grow">
        <h2 className="card-title text-base sm:text-lg text-base-content flex-wrap gap-2">
          <span className="break-words">{name}</span>
          {id && (
            <div className="badge badge-secondary badge-xs sm:badge-sm">
              #{id}
            </div>
          )}
        </h2>

        <p className="text-base-content/70 text-xs sm:text-sm line-clamp-2 break-words">
          {description}
        </p>

        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="badge badge-outline text-[0.65rem] sm:text-xs px-2 py-[2px] sm:px-3 sm:py-1 text-base-content/80 font-medium rounded-md"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="badge badge-ghost text-[0.65rem] sm:text-xs px-2 py-[2px] sm:px-3 sm:py-1 rounded-md">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs text-base-content/60">
          {contributors > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{contributors}</span>
            </div>
          )}
          {createdAt && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className="truncate">{createdAt}</span>
            </div>
          )}
        </div>

        {/* Responsive actions: stacked full-width on mobile, inline on desktop */}
        <div className="card-actions mt-auto sm:mt-4 flex flex-col sm:flex-row gap-2 w-full">
          {githubURL && (
            <a
              href={githubURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source of ${name}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] btn btn-outline btn-primary"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </a>
          )}

          {liveURL && (
            <a
              href={liveURL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View demo of ${name}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] btn btn-primary"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Demo</span>
            </a>
          )}

          {!githubURL && !liveURL && (
            <button
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] btn btn-primary"
              aria-label={`View details of ${name}`}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
