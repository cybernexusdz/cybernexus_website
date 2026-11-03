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
      let targetDate = new Date(currentYear, 10, 18, 11, 0, 0); // November 18, 11 AM

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

        // Simplified digit transition with glitch
        tl
          // Glitch current digit
          .to(currentRef.current, {
            x: gsap.utils.random(-5, 5),
            textShadow: "3px 0 #ff0000, -3px 0 #00ffff",
            duration: 0.05,
            ease: "none",
          })
          // Slide out
          .to(currentRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.15,
            ease: "power2.in",
          })
          // Slide in new digit
          .fromTo(
            nextRef.current,
            {
              y: "-100%",
              opacity: 0,
            },
            {
              y: "0%",
              opacity: 1,
              duration: 0.15,
              ease: "power2.out",
            },
            "-=0.05",
          )
          // Quick settle glitch
          .to(nextRef.current, {
            x: gsap.utils.random(-3, 3),
            textShadow: "2px 0 #00ffff, -2px 0 #ff0000",
            duration: 0.04,
            ease: "none",
          })
          .to(nextRef.current, {
            x: 0,
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

    // Simple pulse on value change
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
            boxShadow: "0 0 0px transparent",
            duration: 0.2,
            ease: "power2.out",
          });
      }
    }, [value, prevValue]);

    return (
      <div className="group">
        <div
          ref={cardRef}
          className="relative bg-base-200/40 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-primary/20 transition-all duration-300 hover:border-primary/40 hover:bg-base-200/60"
        >
          {/* Subtle scanline */}
          <div className="absolute inset-0 opacity-20 rounded-xl pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Numbers */}
            <div className="flex justify-center items-center gap-1 mb-3">
              <AnimatedDigit value={digits[0]} prevValue={prevDigits[0]} />
              <AnimatedDigit value={digits[1]} prevValue={prevDigits[1]} />
            </div>

            {/* Label */}
            <div className="relative">
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-primary/70 text-center font-mono">
                {label}
              </p>
              {/* Underline effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-300" />
            </div>
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
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      {/* System Status */}
      <div className="flex flex-wrap justify-center gap-2 mb-2 font-mono text-xs">
        <span className="px-2.5 py-1 rounded bg-success/10 border border-success/30 text-success">
          STATUS: TRACKING
        </span>
        <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary">
          TARGET: NOV_18
        </span>
        <span className="px-2.5 py-1 rounded bg-info/10 border border-info/30 text-info">
          MODE: COUNTDOWN
        </span>
      </div>

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
