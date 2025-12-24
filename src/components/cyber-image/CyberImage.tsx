import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

export interface CyberImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  revealEffect?: "scanline" | "glitch" | "fade";
  testDelay?: number;
  testError?: boolean;
}

const CyberImage: React.FC<CyberImageProps> = ({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  onLoad,
  onError,
  priority = false,
  revealEffect = "scanline",
  testDelay,
  testError = false,
}) => {
  const [loadingState, setLoadingState] = useState<
    "loading" | "revealing" | "complete"
  >("loading");
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(testError);
  const [revealProgress, setRevealProgress] = useState(0);
  const [imageSize, setImageSize] = useState<"small" | "medium" | "large">(
    "medium",
  );

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const maxDimension = Math.max(width, height);

      if (maxDimension < 150) {
        setImageSize("small");
      } else if (maxDimension < 400) {
        setImageSize("medium");
      } else {
        setImageSize("large");
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!isInView || testError) return;

    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      const startReveal = () => {
        setLoadingState("revealing");

        const duration =
          imageSize === "small" ? 400 : imageSize === "medium" ? 800 : 1200;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          setRevealProgress(progress);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            setLoadingState("complete");
            onLoad?.();
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      if (testDelay) {
        setTimeout(startReveal, testDelay);
      } else {
        startReveal();
      }
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    if (img.complete && img.naturalHeight !== 0) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [isInView, testDelay, testError, imageSize, onLoad, onError]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <style>{`
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes scan-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes glitch-shift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -2px); }
        }

        @keyframes data-stream {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }

        @keyframes corner-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {loadingState === "loading" && !hasError && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-base-300 via-base-200 to-base-300 ${skeletonClassName}`}
        >
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)",
                animation: "scan-move 8s linear infinite",
              }}
            />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            {[15, 35, 55, 75, 90].map((top, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-[2px] opacity-40"
                style={{
                  top: `${top}%`,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.6), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.6), transparent)",
                  animation: `cyber-pulse ${1 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <Terminal
                className={`text-primary ${imageSize === "small" ? "w-8 h-8" : imageSize === "medium" ? "w-12 h-12" : "w-16 h-16"}`}
                style={{ animation: "cyber-pulse 1.5s ease-in-out infinite" }}
              />

              {imageSize !== "small" && (
                <>
                  <Terminal
                    className={`text-cyan-400/40 absolute top-0 left-0 ${imageSize === "medium" ? "w-12 h-12" : "w-16 h-16"}`}
                    style={{
                      transform: "translate(2px, -2px)",
                      animation: "cyber-pulse 1.5s ease-in-out infinite",
                      animationDelay: "0.1s",
                    }}
                  />
                  <Terminal
                    className={`text-magenta-400/40 absolute top-0 left-0 ${imageSize === "medium" ? "w-12 h-12" : "w-16 h-16"}`}
                    style={{
                      transform: "translate(-2px, 2px)",
                      animation: "cyber-pulse 1.5s ease-in-out infinite",
                      animationDelay: "0.2s",
                    }}
                  />
                </>
              )}

              <div
                className="absolute inset-[-8px] border-2 border-cyan-400/30 rounded-full"
                style={{ animation: "corner-pulse 2s ease-in-out infinite" }}
              />
            </div>

            {imageSize !== "small" && (
              <div className="font-mono text-xs text-cyan-400 flex items-center gap-2">
                <span className="opacity-60">&gt;_</span>
                <span className="font-bold">DECRYPTING</span>
                <span className="animate-pulse">.</span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                >
                  .
                </span>
                <span
                  className="animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                >
                  .
                </span>
              </div>
            )}
          </div>

          {imageSize !== "small" && (
            <>
              <div
                className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40"
                style={{ animation: "corner-pulse 2s ease-in-out infinite" }}
              />
              <div
                className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-magenta-400/40"
                style={{
                  animation: "corner-pulse 2s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              />
              <div
                className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-400/40"
                style={{
                  animation: "corner-pulse 2s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              />
              <div
                className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40"
                style={{
                  animation: "corner-pulse 2s ease-in-out infinite",
                  animationDelay: "1.5s",
                }}
              />
            </>
          )}

          {imageSize === "large" && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${10 + i * 10}%`,
                    animation: `data-stream ${1 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: "0 0 4px rgba(0, 255, 255, 0.8)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {loadingState === "revealing" && revealEffect === "scanline" && (
        <div className="absolute inset-0">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 bg-gradient-to-br from-base-300/80 via-base-200/80 to-base-300/80 backdrop-blur-sm"
            style={{
              transform: `translateY(${revealProgress * 100}%)`,
              willChange: "transform",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)",
              }}
            />
            {imageSize === "large" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-mono text-4xl font-black text-cyan-400/10 rotate-[-15deg]">
                  ENCRYPTED
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${revealProgress * 100}%`,
              transform: "translateZ(0)",
              willChange: "top",
            }}
          >
            <div className="relative h-[3px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                style={{
                  boxShadow:
                    "0 0 20px rgba(0, 255, 255, 0.9), 0 0 40px rgba(0, 255, 255, 0.5)",
                  animation: "cyber-pulse 0.5s ease-in-out infinite",
                }}
              />
            </div>

            {imageSize !== "small" && (
              <>
                <div className="absolute top-[-3px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                <div className="absolute top-[3px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              </>
            )}

            <div className="absolute top-[-20px] left-0 right-0 h-[40px] bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent" />
          </div>

          {imageSize === "large" && (
            <div className="absolute bottom-3 right-3 font-mono text-xs text-cyan-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-cyan-400/30">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span>{Math.floor(revealProgress * 100)}%</span>
              </div>
            </div>
          )}
        </div>
      )}

      {loadingState === "revealing" && revealEffect === "glitch" && (
        <div className="absolute inset-0">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            style={{
              opacity: revealProgress,
              animation:
                revealProgress < 1 ? "glitch-shift 0.1s infinite" : "none",
              willChange: "opacity, transform",
            }}
          />

          {revealProgress < 1 && (
            <>
              <img
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen"
                style={{
                  opacity: 0.3,
                  filter: "hue-rotate(180deg)",
                  transform: `translate(${Math.sin(revealProgress * 20) * 3}px, ${Math.cos(revealProgress * 20) * 2}px)`,
                  willChange: "transform",
                }}
              />
              <img
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen"
                style={{
                  opacity: 0.3,
                  filter: "hue-rotate(90deg)",
                  transform: `translate(${Math.cos(revealProgress * 20) * -3}px, ${Math.sin(revealProgress * 20) * -2}px)`,
                  willChange: "transform",
                }}
              />
            </>
          )}
        </div>
      )}

      {loadingState === "revealing" && revealEffect === "fade" && (
        <div className="absolute inset-0">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            style={{
              opacity: revealProgress,
              willChange: "opacity",
            }}
          />
        </div>
      )}

      {loadingState === "complete" && !hasError && (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      )}

      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-base-200 to-base-300 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Terminal
              className={`text-red-500 mx-auto animate-pulse ${imageSize === "small" ? "w-6 h-6" : "w-10 h-10"}`}
            />
            {imageSize !== "small" && (
              <div className="font-mono text-xs text-red-500">
                <span className="font-bold">[ERROR]</span> Decrypt Failed
              </div>
            )}
          </div>
        </div>
      )}

      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt=""
          className="absolute opacity-0 pointer-events-none"
          style={{ width: 1, height: 1 }}
        />
      )}
    </div>
  );
};

export default CyberImage;
