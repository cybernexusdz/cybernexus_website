import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function CountdownToNov18() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const prevValues = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      let targetDate = new Date(currentYear, 10, 18);

      if (today > targetDate) {
        targetDate = new Date(currentYear + 1, 10, 18);
      }

      const diffTime = targetDate - today;
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
      const seconds = Math.floor((diffTime / 1000) % 60);

      setDaysLeft(days);
      setHoursLeft(hours);
      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const AnimatedDigit = ({ value, prevValue }) => {
    const containerRef = useRef(null);
    const currentRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
      if (
        value !== prevValue &&
        containerRef.current &&
        currentRef.current &&
        nextRef.current
      ) {
        const tl = gsap.timeline();

        // Glitch effect on change
        tl
          // Initial glitch with RGB split
          .to(currentRef.current, {
            x: gsap.utils.random(-5, 5),
            textShadow: "3px 0 #ff0000, -3px 0 #00ffff",
            duration: 0.05,
            ease: "none",
          })
          // Quick shake
          .to(currentRef.current, {
            x: gsap.utils.random(-8, 8),
            skewX: gsap.utils.random(-15, 15),
            textShadow: "2px 0 #00ff00, -2px 0 #ff00ff",
            duration: 0.05,
            ease: "none",
          })
          // Slide out with glitch
          .to(currentRef.current, {
            y: "100%",
            opacity: 0,
            x: gsap.utils.random(-10, 10),
            textShadow: "5px 0 #ff0000, -5px 0 #00ffff",
            duration: 0.15,
            ease: "power2.in",
          })
          // Slide in new digit with glitch from top
          .fromTo(
            nextRef.current,
            {
              y: "-100%",
              opacity: 0,
              x: gsap.utils.random(-10, 10),
              textShadow: "4px 0 #ffff00, -4px 0 #ff00ff",
            },
            {
              y: "0%",
              opacity: 1,
              x: 0,
              duration: 0.15,
              ease: "power2.out",
            },
            "-=0.05",
          )
          // Final glitch settle
          .to(nextRef.current, {
            x: gsap.utils.random(-5, 5),
            skewX: gsap.utils.random(-10, 10),
            textShadow: "3px 0 #00ffff, -3px 0 #ff0000",
            duration: 0.04,
            ease: "none",
          })
          .to(nextRef.current, {
            x: gsap.utils.random(-3, 3),
            skewX: gsap.utils.random(-8, 8),
            textShadow: "2px 0 #ff00ff, -2px 0 #00ff00",
            duration: 0.04,
            ease: "none",
          })
          // Reset to normal
          .to(nextRef.current, {
            x: 0,
            skewX: 0,
            textShadow: "none",
            duration: 0.1,
            ease: "power2.out",
          });
      }
    }, [value, prevValue]);

    return (
      <div
        ref={containerRef}
        className="relative w-8 h-12 md:w-12 md:h-16 overflow-hidden"
      >
        <div
          ref={currentRef}
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-black text-primary"
        >
          {prevValue}
        </div>
        <div
          ref={nextRef}
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-black text-primary"
        >
          {value}
        </div>
      </div>
    );
  };

  const CountdownCard = ({ value, label, prevValue }) => {
    const digits = String(value).padStart(2, "0").split("");
    const prevDigits = String(prevValue).padStart(2, "0").split("");
    const cardRef = useRef(null);

    // Add subtle card glitch when value changes
    useEffect(() => {
      if (value !== prevValue && cardRef.current) {
        gsap
          .timeline()
          .to(cardRef.current, {
            scale: 1.02,
            boxShadow: "0 0 20px rgba(231, 118, 247, 0.4)",
            duration: 0.1,
            ease: "none",
          })
          .to(cardRef.current, {
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            duration: 0.2,
            ease: "power2.out",
          });
      }
    }, [value, prevValue]);

    return (
      <div className="group">
        <div
          ref={cardRef}
          className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/20 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border border-primary/20 transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-1"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          {/* Content */}
          <div className="relative z-10">
            {/* Numbers */}
            <div className="flex justify-center items-center gap-1 mb-3">
              <AnimatedDigit value={digits[0]} prevValue={prevDigits[0]} />
              <AnimatedDigit value={digits[1]} prevValue={prevDigits[1]} />
            </div>

            {/* Label */}
            <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-secondary/80 text-center">
              {label}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Update previous values after render
  useEffect(() => {
    prevValues.current = {
      days: daysLeft,
      hours: hoursLeft,
      minutes: minutesLeft,
      seconds: secondsLeft,
    };
  }, [daysLeft, hoursLeft, minutesLeft, secondsLeft]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Countdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl">
        <CountdownCard
          value={daysLeft}
          label="Days"
          prevValue={prevValues.current.days}
        />
        <CountdownCard
          value={hoursLeft}
          label="Hours"
          prevValue={prevValues.current.hours}
        />
        <CountdownCard
          value={minutesLeft}
          label="Minutes"
          prevValue={prevValues.current.minutes}
        />
        <CountdownCard
          value={secondsLeft}
          label="Seconds"
          prevValue={prevValues.current.seconds}
        />
      </div>
    </div>
  );
}
