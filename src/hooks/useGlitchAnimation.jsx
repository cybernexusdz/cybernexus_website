import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom hook for creating a glitch animation effect on text elements
 * @param {Object} options - Configuration options
 * @param {number} options.repeatDelay - Delay between animation loops (default: 3)
 * @param {boolean} options.autoStart - Whether to start animation immediately (default: true)
 * @returns {Object} - Object containing refs and control functions
 */
export default function useGlitchAnimation({
  repeatDelay = 3,
  autoStart = true,
} = {}) {
  const elementsRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!autoStart || elementsRef.current.length === 0) return;

    // 💥 Intense GSAP Glitch animation with RGB splits
    const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay });

    glitchTimeline
      // Massive initial glitch with RGB split
      .to(elementsRef.current[0], {
        x: -20,
        textShadow: "5px 0 #ff0000, -5px 0 #00ffff",
        duration: 0.05,
        ease: "power4.inOut",
      })
      .to(
        elementsRef.current[1] || elementsRef.current[0],
        {
          x: 15,
          textShadow: "-5px 0 #ff00ff, 5px 0 #00ff00",
          duration: 0.05,
          ease: "power4.inOut",
        },
        "<",
      )
      // Quick shake
      .to(elementsRef.current, {
        x: () => gsap.utils.random(-30, 30),
        skewX: () => gsap.utils.random(-30, 30),
        textShadow: "3px 0 #ff0000, -3px 0 #00ffff, 0 3px #ff00ff",
        duration: 0.05,
        ease: "none",
      })
      .to(elementsRef.current, {
        x: () => gsap.utils.random(-25, 25),
        skewX: () => gsap.utils.random(-25, 25),
        duration: 0.05,
        ease: "none",
      })
      // Brief fade with heavy RGB
      .to(elementsRef.current, {
        opacity: 0.7,
        textShadow: "10px 0 #ff0000, -10px 0 #00ffff, 0 5px #ffff00",
        duration: 0.08,
        ease: "power2.inOut",
      })
      // Restore
      .to(elementsRef.current, {
        x: 0,
        skewX: 0,
        opacity: 1,
        textShadow: "none",
        duration: 0.15,
        ease: "power2.out",
      })
      // Second wave - horizontal slice
      .to(
        elementsRef.current[0],
        {
          x: 40,
          y: -3,
          textShadow: "8px 0 #00ff00, -8px 0 #ff00ff",
          duration: 0.06,
          ease: "power4.inOut",
        },
        "+=0.2",
      )
      .to(
        elementsRef.current[1] || elementsRef.current[0],
        {
          x: -35,
          y: 3,
          textShadow: "-8px 0 #ff0000, 8px 0 #00ffff",
          duration: 0.06,
          ease: "power4.inOut",
        },
        "<",
      )
      // Rapid fire glitches
      .to(elementsRef.current, {
        x: () => gsap.utils.random(-20, 20),
        skewX: () => gsap.utils.random(-15, 15),
        textShadow: "5px 0 #ff0000, -5px 0 #00ffff",
        duration: 0.03,
      })
      .to(elementsRef.current, {
        x: () => gsap.utils.random(-20, 20),
        skewX: () => gsap.utils.random(-15, 15),
        textShadow: "5px 0 #00ff00, -5px 0 #ff00ff",
        duration: 0.03,
      })
      .to(elementsRef.current, {
        x: () => gsap.utils.random(-20, 20),
        skewX: () => gsap.utils.random(-15, 15),
        textShadow: "5px 0 #ffff00, -5px 0 #ff0000",
        duration: 0.03,
      })
      // Final restore with slight bounce
      .to(elementsRef.current, {
        x: 0,
        y: 0,
        skewX: 0,
        opacity: 1,
        textShadow: "none",
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
      });

    timelineRef.current = glitchTimeline;

    return () => {
      glitchTimeline.kill();
    };
  }, [repeatDelay, autoStart]);

  // Helper function to add elements to the animation
  const addElement = (element) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  };

  // Control functions
  const play = () => timelineRef.current?.play();
  const pause = () => timelineRef.current?.pause();
  const restart = () => timelineRef.current?.restart();
  const kill = () => timelineRef.current?.kill();

  return {
    // For individual refs (assign to each element)
    ref: (element) => addElement(element),
    // Control methods
    play,
    pause,
    restart,
    kill,
  };
}
