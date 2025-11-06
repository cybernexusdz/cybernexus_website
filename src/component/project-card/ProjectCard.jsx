import { useState } from "react";
import { ExternalLink, Github, Users, Calendar } from "lucide-react";

const ProjectCard = ({ project, loading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 w-full">
        <figure className="relative h-40 sm:h-48 bg-base-300 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
          </div>
        </figure>
        <div className="card-body p-4 sm:p-6">
          <div className="h-5 sm:h-6 bg-base-300 rounded animate-pulse mb-2"></div>
          <div className="h-3 sm:h-4 bg-base-300 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-3 sm:h-4 bg-base-300 rounded animate-pulse mb-4 w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-8 sm:h-9 bg-base-300 rounded animate-pulse flex-1"></div>
            <div className="h-8 sm:h-9 bg-base-300 rounded animate-pulse flex-1"></div>
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
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 group w-full">
      <figure className="relative h-40 sm:h-48 overflow-hidden bg-base-200">
        {displayImage ? (
          <>
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
              </div>
            )}
            <img
              src={displayImage}
              alt={name}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-base-200">
                <div className="text-center text-base-content/50">
                  <div className="text-3xl sm:text-4xl mb-2">🖼️</div>
                  <p className="text-xs sm:text-sm">Image not available</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="text-center text-base-content/50">
              <div className="text-4xl sm:text-5xl mb-2">⚡</div>
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

      <div className="card-body p-4 sm:p-6">
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
          <div className="flex flex-wrap gap-1 mt-2">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="badge badge-outline badge-xs sm:badge-sm text-base-content/80"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="badge badge-ghost badge-xs sm:badge-sm">
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

        <div className="card-actions justify-end mt-3 sm:mt-4 flex-wrap gap-2">
          {githubURL && (
            <a
              href={githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-xs sm:btn-sm btn-outline btn-primary gap-1"
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Code</span>
            </a>
          )}
          {liveURL && (
            <a
              href={liveURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-xs sm:btn-sm btn-primary gap-1"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Demo</span>
            </a>
          )}
          {!githubURL && !liveURL && (
            <button className="btn btn-xs sm:btn-sm btn-primary">
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

// Example usage with demo data:
// <ProjectCard
//   project={{
//     id: 1,
//     name: "AI Chat Bot",
//     description: "An intelligent chatbot powered by machine learning that can understand context and provide helpful responses.",
//     imageURL: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
//     technologies: ["React", "Python", "TensorFlow", "Node.js"],
//     githubURL: "https://github.com/cybernexusdz/chatbot",
//     liveURL: "https://demo.cybernexus.com",
//     contributors: 5,
//     createdAt: "Oct 2024"
//   }}
// />
//
// Or with loading state:
// <ProjectCard loading={true} />
