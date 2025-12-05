import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animation options type
export interface CyberScrollOptions {
  animation?: "cyberGlitchLeft" | "cyberGlitchRight" | "cyberGlitchCenter";
  duration?: number;
  delay?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  stagger?: number;
  // NEW: Option to apply lighter effects for cards/images
  lightMode?: boolean;
}

// Reusable hook for cyberpunk scroll animations with RGB chromatic aberration
export const useCyberScrollAnimation = (options: CyberScrollOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    const {
      animation = "cyberGlitchCenter",
      duration = 1,
      delay = 0,
      start = "top 80%",
      end = "bottom 20%",
      scrub = false,
      markers = false,
      stagger = 0,
      lightMode = false, // Use lighter effects for cards/images
    } = options;

    const ctx = gsap.context(() => {
      const targets = element.children.length > 0 ? element.children : element;

      // Helper function to apply RGB shadow effect only to text elements
      const applyRGBToText = (target: Element, shadow: string) => {
        const textElements = target.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, span, a, button, li",
        );
        textElements.forEach((el) => {
          gsap.set(el, { textShadow: shadow });
        });
      };

      // Helper function to remove RGB shadow from text elements
      const removeRGBFromText = (target: Element) => {
        const textElements = target.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, span, a, button, li",
        );
        textElements.forEach((el) => {
          gsap.set(el, { textShadow: "none" });
        });
      };

      switch (animation) {
        case "cyberGlitchLeft":
          const tlLeft = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play none none none",
              once: true,
              markers,
              onEnter: () => {
                hasAnimated.current = true;
              },
            },
          });

          gsap.set(targets, {
            opacity: lightMode ? 0.3 : 0, // Start with some visibility for cards
            x: lightMode ? -80 : -150,
            filter: lightMode ? "blur(5px)" : "blur(20px)",
          });

          tlLeft
            // Initial slide in with RGB split (lighter for cards)
            .to(targets, {
              opacity: lightMode ? 0.9 : 0.7, // Higher opacity for cards
              x: lightMode ? -15 : -30,
              filter: lightMode ? "blur(2px)" : "blur(10px)", // Less blur for cards
              duration: duration * 0.3,
              delay,
              ease: "power2.out",
              stagger,
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "20px 0 #ff0000, -20px 0 #00ffff, 0 10px #00ff00",
                    );
                  });
                }
              },
            })
            // RGB glitch shake (lighter for cards)
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -10 : -30, lightMode ? 10 : 30),
              y: () =>
                gsap.utils.random(lightMode ? -3 : -10, lightMode ? 3 : 10),
              skewX: () =>
                gsap.utils.random(lightMode ? -5 : -15, lightMode ? 5 : 15),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(90deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "8px 0 #ff0000, -8px 0 #00ffff, 0 4px #00ff00",
                    );
                  });
                }
              },
            })
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -8 : -25, lightMode ? 8 : 25),
              y: () =>
                gsap.utils.random(lightMode ? -2 : -8, lightMode ? 2 : 8),
              skewX: () =>
                gsap.utils.random(lightMode ? -4 : -12, lightMode ? 4 : 12),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(-90deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "-8px 0 #ff00ff, 8px 0 #00ff00, 0 4px #ffff00",
                    );
                  });
                }
              },
            })
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -6 : -20, lightMode ? 6 : 20),
              y: () =>
                gsap.utils.random(lightMode ? -2 : -6, lightMode ? 2 : 6),
              skewX: () =>
                gsap.utils.random(lightMode ? -3 : -10, lightMode ? 3 : 10),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(180deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "10px 0 #00ffff, -10px 0 #ff0000, 0 5px #ff00ff",
                    );
                  });
                }
              },
            })
            // Settle to final position
            .to(targets, {
              opacity: 1,
              x: 0,
              y: 0,
              skewX: 0,
              filter: "blur(0px)",
              duration: duration * 0.4,
              ease: "power2.out",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(target, "3px 0 #ff0000, -3px 0 #00ffff");
                  });
                }
              },
            })
            // Remove text shadow
            .to(targets, {
              duration: duration * 0.2,
              ease: "power2.out",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    removeRGBFromText(target);
                  });
                }
              },
            });
          break;

        case "cyberGlitchRight":
          const tlRight = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play none none none",
              once: true,
              markers,
              onEnter: () => {
                hasAnimated.current = true;
              },
            },
          });

          gsap.set(targets, {
            opacity: lightMode ? 0.3 : 0,
            x: lightMode ? 80 : 150,
            filter: lightMode ? "blur(5px)" : "blur(20px)",
          });

          tlRight
            // Initial slide in with RGB split
            .to(targets, {
              opacity: lightMode ? 0.9 : 0.7,
              x: lightMode ? 15 : 30,
              filter: lightMode ? "blur(2px)" : "blur(10px)",
              duration: duration * 0.3,
              delay,
              ease: "power2.out",
              stagger,
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "-20px 0 #ff00ff, 20px 0 #00ff00, 0 10px #ffff00",
                    );
                  });
                }
              },
            })
            // RGB glitch shake
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -10 : -30, lightMode ? 10 : 30),
              y: () =>
                gsap.utils.random(lightMode ? -3 : -10, lightMode ? 3 : 10),
              skewX: () =>
                gsap.utils.random(lightMode ? -5 : -15, lightMode ? 5 : 15),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(90deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "-8px 0 #ff00ff, 8px 0 #00ff00, 0 4px #ffff00",
                    );
                  });
                }
              },
            })
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -8 : -25, lightMode ? 8 : 25),
              y: () =>
                gsap.utils.random(lightMode ? -2 : -8, lightMode ? 2 : 8),
              skewX: () =>
                gsap.utils.random(lightMode ? -4 : -12, lightMode ? 4 : 12),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(-90deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "8px 0 #ff0000, -8px 0 #00ffff, 0 4px #00ff00",
                    );
                  });
                }
              },
            })
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -6 : -20, lightMode ? 6 : 20),
              y: () =>
                gsap.utils.random(lightMode ? -2 : -6, lightMode ? 2 : 6),
              skewX: () =>
                gsap.utils.random(lightMode ? -3 : -10, lightMode ? 3 : 10),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(180deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "-10px 0 #00ffff, 10px 0 #ff00ff, 0 5px #ff0000",
                    );
                  });
                }
              },
            })
            // Settle to final position
            .to(targets, {
              opacity: 1,
              x: 0,
              y: 0,
              skewX: 0,
              filter: "blur(0px)",
              duration: duration * 0.4,
              ease: "power2.out",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(target, "-3px 0 #ff00ff, 3px 0 #00ff00");
                  });
                }
              },
            })
            // Remove text shadow
            .to(targets, {
              duration: duration * 0.2,
              ease: "power2.out",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    removeRGBFromText(target);
                  });
                }
              },
            });
          break;

        case "cyberGlitchCenter":
          const tlCenter = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play none none none",
              once: true,
              markers,
              onEnter: () => {
                hasAnimated.current = true;
              },
            },
          });

          gsap.set(targets, {
            opacity: lightMode ? 0.3 : 0,
            scale: lightMode ? 0.97 : 0.9,
            filter: lightMode ? "blur(5px)" : "blur(20px)",
          });

          tlCenter
            // Initial fade in with RGB split
            .to(targets, {
              opacity: lightMode ? 0.9 : 0.7,
              scale: 1,
              filter: lightMode ? "blur(2px)" : "blur(10px)",
              duration: duration * 0.3,
              delay,
              ease: "power2.out",
              stagger,
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "15px 0 #ff0000, -15px 0 #00ffff, 0 8px #00ff00",
                    );
                  });
                }
              },
            })
            // RGB glitch shake
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -10 : -30, lightMode ? 10 : 30),
              y: () =>
                gsap.utils.random(lightMode ? -3 : -10, lightMode ? 3 : 10),
              rotate: () =>
                gsap.utils.random(lightMode ? -1 : -5, lightMode ? 1 : 5),
              skewX: () =>
                gsap.utils.random(lightMode ? -5 : -15, lightMode ? 5 : 15),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(90deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "10px 0 #ff0000, -10px 0 #00ffff, 0 5px #00ff00",
                    );
                  });
                }
              },
            })
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -8 : -25, lightMode ? 8 : 25),
              y: () =>
                gsap.utils.random(lightMode ? -2 : -8, lightMode ? 2 : 8),
              rotate: () =>
                gsap.utils.random(lightMode ? -0.8 : -4, lightMode ? 0.8 : 4),
              skewX: () =>
                gsap.utils.random(lightMode ? -4 : -12, lightMode ? 4 : 12),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(-90deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "-10px 0 #ff00ff, 10px 0 #00ff00, 0 5px #ffff00",
                    );
                  });
                }
              },
            })
            .to(targets, {
              x: () =>
                gsap.utils.random(lightMode ? -6 : -20, lightMode ? 6 : 20),
              y: () =>
                gsap.utils.random(lightMode ? -2 : -6, lightMode ? 2 : 6),
              rotate: () =>
                gsap.utils.random(lightMode ? -0.5 : -3, lightMode ? 0.5 : 3),
              skewX: () =>
                gsap.utils.random(lightMode ? -3 : -10, lightMode ? 3 : 10),
              filter: lightMode
                ? "blur(1px) saturate(1.3)"
                : "blur(5px) saturate(3) hue-rotate(180deg)",
              duration: 0.05,
              ease: "none",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(
                      target,
                      "12px 0 #00ffff, -12px 0 #ff0000, 0 6px #ff00ff",
                    );
                  });
                }
              },
            })
            // Settle to final position
            .to(targets, {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              skewX: 0,
              filter: "blur(0px)",
              duration: duration * 0.4,
              ease: "power2.out",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    applyRGBToText(target, "3px 0 #ff0000, -3px 0 #00ffff");
                  });
                }
              },
            })
            // Remove text shadow
            .to(targets, {
              duration: duration * 0.2,
              ease: "power2.out",
              onStart: function () {
                if (!lightMode) {
                  gsap.utils.toArray(targets).forEach((target: any) => {
                    removeRGBFromText(target);
                  });
                }
              },
            });
          break;
      }
    }, element);

    return () => {
      ctx.revert();
    };
  }, []);

  return elementRef;
};
